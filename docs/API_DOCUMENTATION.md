# API Documentation – CareSense AI

## 1. Overview

CareSense AI menggunakan REST API untuk menghubungkan aplikasi mobile dengan backend.

Backend dikembangkan menggunakan Flask (Python), sedangkan data status pasien, sensor, dan riwayat kejadian disimpan menggunakan SQLite.

**Base URL:**

```text
http://ALAMAT-IP-LAPTOP:5000
```

Ganti `ALAMAT-IP-LAPTOP` dengan alamat IP laptop yang menjalankan backend.

## 2. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Memeriksa apakah backend berjalan |
| GET | `/api/status` | Mengambil status keselamatan pasien |
| POST | `/api/fall` | Memperbarui status deteksi jatuh |
| GET | `/api/sensors` | Mengambil status seluruh sensor |
| POST | `/api/sensors` | Memperbarui status sensor |
| POST | `/api/sensors/test` | Menguji status sensor |
| GET | `/api/history` | Mengambil riwayat kejadian |

## 3. Endpoint Details

### 3.1 Check Backend

**GET /**

Digunakan untuk memeriksa apakah backend berhasil dijalankan.

Contoh response:

```json
{
  "app": "CareSense AI",
  "message": "Backend berhasil berjalan",
  "status": "online"
}
```

### 3.2 Get Patient Status

**GET /api/status**

Mengambil informasi status keselamatan pasien dan kondisi sensor.

Informasi yang tersedia meliputi:
- Identitas pasien.
- Status deteksi jatuh.
- Status keselamatan.
- Kondisi sensor.
- Waktu pembaruan terakhir.

### 3.3 Update Fall Status

**POST /api/fall**

Digunakan untuk memperbarui status simulasi deteksi jatuh.

Contoh request:

```json
{
  "fall_detected": true
}
```

Nilai `true` menunjukkan simulasi jatuh terdeteksi, sedangkan `false` menunjukkan status tidak terdeteksi jatuh.

### 3.4 Get Sensor Status

**GET /api/sensors**

Mengambil informasi kondisi sensor yang digunakan dalam prototype.

Sensor yang tersedia:
- Camera.
- Microphone.
- Wearable.

Status sensor dapat berupa kondisi simulasi atau terputus, sesuai konfigurasi backend.

### 3.5 Update Sensor Status

**POST /api/sensors**

Digunakan untuk mengubah status sensor.

Contoh request:

```json
{
  "sensor": "camera",
  "status": "disconnected"
}
```

Contoh untuk mengembalikan sensor ke kondisi simulasi:

```json
{
  "sensor": "camera",
  "status": "simulated"
}
```

### 3.6 Test Sensor

**POST /api/sensors/test**

Digunakan untuk melakukan pengujian sensor berdasarkan status yang tersimpan di backend.

Contoh request untuk menguji satu sensor:

```json
{
  "sensor": "camera"
}
```

Frontend juga dapat mengirimkan objek JSON kosong untuk meminta pengujian seluruh sensor.

Hasil pengujian ditampilkan pada aplikasi mobile.

### 3.7 Get Event History

**GET /api/history**

Mengambil riwayat kejadian yang tersimpan di backend.

Riwayat digunakan untuk menampilkan perubahan status keselamatan pasien, termasuk kejadian terdeteksi jatuh dan status kembali normal.

## 4. Communication Flow

Alur komunikasi sistem:

1. Pengguna berinteraksi dengan aplikasi CareSense AI.
2. Aplikasi mobile mengirimkan HTTP request ke backend Flask.
3. Backend memproses request.
4. Backend membaca atau memperbarui data pada SQLite jika diperlukan.
5. Backend mengirimkan HTTP response.
6. Aplikasi mobile menampilkan hasil kepada pengguna.

## 5. Technology

| Component | Technology |
|---|---|
| Mobile Application | React Native |
| Development Framework | Expo |
| Backend | Flask |
| Programming Language | Python |
| Database | SQLite |
| Communication | REST API / HTTP |
| Data Format | JSON |

## 6. Notes and Limitations

- API digunakan untuk mendukung komunikasi aplikasi mobile dengan backend.
- Deteksi jatuh masih menggunakan simulasi.
- Sensor kamera, mikrofon, dan wearable belum terhubung dengan perangkat fisik.
- Pengujian sensor dilakukan berdasarkan status simulasi.
- Alamat IP backend perlu disesuaikan dengan jaringan yang digunakan.
- Backend harus berjalan agar aplikasi mobile dapat mengambil dan memperbarui data melalui API.

---

**Project:** CareSense AI  
**Documentation:** API Documentation  
**Status:** Prototype