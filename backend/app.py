
from flask import Flask, jsonify, request
from datetime import datetime
from pathlib import Path
import sqlite3

app = Flask(__name__)

# ==========================================
# KONFIGURASI
# ==========================================

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "caresense.db"

PATIENT_NAME = "Siti Aminah"
PATIENT_AGE = 72

SENSOR_NAMES = ("camera", "microphone", "wearable")

# Status yang diizinkan untuk simulasi
ALLOWED_SENSOR_STATUSES = (
    "simulated",
    "disconnected",
    "unavailable"
)


def now_iso():
    return datetime.now().isoformat()


def get_db_connection():
    conn = sqlite3.connect(DATABASE, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn


# ==========================================
# DATABASE
# ==========================================

def init_db():
    with get_db_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS event_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                event_type TEXT NOT NULL,
                description TEXT NOT NULL,
                patient TEXT NOT NULL,
                timestamp TEXT NOT NULL
            )
        """)

        conn.execute("""
            CREATE TABLE IF NOT EXISTS patient_state (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                fall_detected INTEGER NOT NULL DEFAULT 0,
                updated_at TEXT NOT NULL
            )
        """)

        conn.execute("""
            CREATE TABLE IF NOT EXISTS sensor_state (
                sensor_name TEXT PRIMARY KEY,
                status TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
        """)

        # Status pasien dibuat hanya jika belum tersedia.
        conn.execute("""
            INSERT OR IGNORE INTO patient_state
                (id, fall_detected, updated_at)
            VALUES (1, 0, ?)
        """, (now_iso(),))

        # Status awal sensor dibuat hanya jika belum tersedia.
        initial_sensors = {
            "camera": "simulated",
            "microphone": "simulated",
            "wearable": "disconnected"
        }

        for sensor_name, status in initial_sensors.items():
            conn.execute("""
                INSERT OR IGNORE INTO sensor_state
                    (sensor_name, status, updated_at)
                VALUES (?, ?, ?)
            """, (sensor_name, status, now_iso()))


init_db()


# ==========================================
# STATUS PASIEN
# ==========================================

def load_patient_state():
    with get_db_connection() as conn:
        row = conn.execute("""
            SELECT fall_detected, updated_at
            FROM patient_state
            WHERE id = 1
        """).fetchone()

    fall_detected = bool(row["fall_detected"])

    return {
        "patient": PATIENT_NAME,
        "age": PATIENT_AGE,
        "safety_status": (
            "fall_detected" if fall_detected else "normal"
        ),
        "fall_detected": fall_detected,
        "sensors": {},
        "updated_at": row["updated_at"]
    }


def load_sensor_states():
    with get_db_connection() as conn:
        rows = conn.execute("""
            SELECT sensor_name, status
            FROM sensor_state
        """).fetchall()

    return {
        row["sensor_name"]: row["status"]
        for row in rows
    }


patient_status = load_patient_state()
patient_status["sensors"] = load_sensor_states()


# ==========================================
# PENYIMPANAN STATUS PASIEN
# ==========================================

def save_patient_state():
    with get_db_connection() as conn:
        conn.execute("""
            UPDATE patient_state
            SET fall_detected = ?,
                updated_at = ?
            WHERE id = 1
        """, (
            int(patient_status["fall_detected"]),
            patient_status["updated_at"]
        ))


# ==========================================
# RIWAYAT KEJADIAN
# ==========================================

def record_event(event_type, description):
    with get_db_connection() as conn:
        conn.execute("""
            INSERT INTO event_history
                (event_type, description, patient, timestamp)
            VALUES (?, ?, ?, ?)
        """, (
            event_type,
            description,
            PATIENT_NAME,
            now_iso()
        ))


def read_history():
    with get_db_connection() as conn:
        rows = conn.execute("""
            SELECT id, event_type, description, patient, timestamp
            FROM event_history
            ORDER BY id DESC
        """).fetchall()

    return [dict(row) for row in rows]


# ==========================================
# HALAMAN UTAMA
# ==========================================

@app.route("/")
def home():
    return jsonify({
        "app": "CareSense AI",
        "message": "Backend berhasil berjalan",
        "status": "online"
    })


# ==========================================
# API STATUS PASIEN
# ==========================================

@app.route("/api/status", methods=["GET"])
def get_status():
    return jsonify(patient_status)


# ==========================================
# API SIMULASI JATUH
# ==========================================

@app.route("/api/fall", methods=["POST"])
def update_fall():
    data = request.get_json(silent=True) or {}

    if "fall_detected" not in data:
        return jsonify({
            "message": "Field fall_detected wajib diisi"
        }), 400

    fall_detected = data["fall_detected"]

    if not isinstance(fall_detected, bool):
        return jsonify({
            "message": "fall_detected harus bernilai true atau false"
        }), 400

    previous_status = patient_status["fall_detected"]

    patient_status["fall_detected"] = fall_detected
    patient_status["safety_status"] = (
        "fall_detected" if fall_detected else "normal"
    )
    patient_status["updated_at"] = now_iso()

    save_patient_state()

    if fall_detected and not previous_status:
        record_event(
            "fall_detected",
            "Simulasi kejadian jatuh terdeteksi."
        )

    elif not fall_detected and previous_status:
        record_event(
            "status_normal",
            "Status keselamatan kembali normal setelah simulasi direset."
        )

    return jsonify({
        "message": "Status jatuh berhasil diperbarui",
        "fall_detected": fall_detected,
        "safety_status": patient_status["safety_status"],
        "updated_at": patient_status["updated_at"]
    })


# ==========================================
# API STATUS SENSOR
# ==========================================

@app.route("/api/sensors", methods=["GET"])
def get_sensors():
    return jsonify({
        "mode": "simulation",
        "message": "Status sensor simulasi CareSense AI",
        "sensors": patient_status["sensors"]
    })


# ==========================================
# API MEMPERBARUI STATUS SENSOR
# ==========================================

@app.route("/api/sensors", methods=["POST"])
def update_sensor():
    data = request.get_json(silent=True) or {}

    sensor_name = data.get("sensor")
    new_status = data.get("status")

    if sensor_name not in SENSOR_NAMES:
        return jsonify({
            "message": (
                "Sensor tidak valid. Gunakan camera, "
                "microphone, atau wearable."
            )
        }), 400

    if new_status not in ALLOWED_SENSOR_STATUSES:
        return jsonify({
            "message": (
                "Status tidak valid. Gunakan simulated, "
                "disconnected, atau unavailable."
            )
        }), 400

    previous_status = patient_status["sensors"][sensor_name]

    # Simpan status baru ke database.
    with get_db_connection() as conn:
        conn.execute("""
            UPDATE sensor_state
            SET status = ?, updated_at = ?
            WHERE sensor_name = ?
        """, (new_status, now_iso(), sensor_name))

    # Perbarui data yang dibaca dashboard.
    patient_status["sensors"][sensor_name] = new_status

    # Catat perubahan status sensor di riwayat.
    if previous_status != new_status:
        record_event(
            "sensor_status_changed",
            f"Status sensor {sensor_name} berubah dari "
            f"{previous_status} menjadi {new_status}."
        )

    return jsonify({
        "message": "Status sensor berhasil diperbarui",
        "sensor": sensor_name,
        "previous_status": previous_status,
        "status": new_status,
        "sensors": patient_status["sensors"]
    })


# ==========================================
# API PENGUJIAN SENSOR SIMULASI
# ==========================================

@app.route("/api/sensors/test", methods=["POST"])
def test_sensors():
    data = request.get_json(silent=True) or {}
    sensor_name = data.get("sensor")

    if sensor_name is not None and sensor_name not in SENSOR_NAMES:
        return jsonify({
            "message": (
                "Sensor tidak valid. Gunakan camera, "
                "microphone, atau wearable."
            )
        }), 400

    # Pengujian ini memeriksa ketersediaan data simulasi,
    # bukan menguji perangkat fisik.
    if sensor_name:
        current_status = patient_status["sensors"][sensor_name]

        result = {
            sensor_name: {
                "status": current_status,
                "test_passed": current_status == "simulated",
                "mode": "simulation"
            }
        }
    else:
        result = {
            name: {
                "status": status,
                "test_passed": status == "simulated",
                "mode": "simulation"
            }
            for name, status in patient_status["sensors"].items()
        }

    return jsonify({
        "message": "Pengujian status sensor simulasi selesai",
        "mode": "simulation",
        "results": result
    })


# ==========================================
# API RIWAYAT
# ==========================================

@app.route("/api/history", methods=["GET"])
def get_history():
    history = read_history()

    return jsonify({
        "count": len(history),
        "history": history
    })


# ==========================================
# JALANKAN SERVER
# ==========================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
