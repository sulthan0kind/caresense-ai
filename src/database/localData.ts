import { db } from './database';

export type SensorData = {
  camera: string;
  microphone: string;
  wearable: string;
};

export function getLocalStatus() {
  const patient = db.getFirstSync<{
    patient_name: string;
    patient_age: number;
    fall_detected: number;
    safety_status: string;
  }>(
    `SELECT patient_name, patient_age, fall_detected, safety_status
     FROM patient_state WHERE id = 1`
  );

  const sensorRows = db.getAllSync<{
    sensor_name: string;
    status: string;
  }>('SELECT sensor_name, status FROM sensor_state');

  const sensors: SensorData = {
    camera: 'simulated',
    microphone: 'simulated',
    wearable: 'disconnected',
  };

  sensorRows.forEach((sensor) => {
    if (sensor.sensor_name in sensors) {
      sensors[sensor.sensor_name as keyof SensorData] = sensor.status;
    }
  });

  return {
    patient: patient?.patient_name ?? 'Siti Aminah',
    age: patient?.patient_age ?? 72,
    fall_detected: Boolean(patient?.fall_detected ?? 0),
    safety_status: patient?.safety_status ?? 'normal',
    sensors,
    updated_at: new Date().toISOString(),
  };
}

export function getLocalHistory() {
  const rows = db.getAllSync<{
    id: number;
    event_type: string;
    description: string | null;
    created_at: string;
  }>(
    `SELECT id, event_type, description, created_at
     FROM event_history
     ORDER BY id DESC`
  );

  return rows.map((event) => ({
    id: event.id,
    event_type: event.event_type,
    description: event.description ?? '',
    patient: 'Siti Aminah',
    timestamp: event.created_at,
  }));
}

export function simulateLocalFall(detected: boolean) {
  const safetyStatus = detected ? 'fall_detected' : 'normal';

  db.runSync(
    `UPDATE patient_state
     SET fall_detected = ?, safety_status = ?
     WHERE id = 1`,
    [detected ? 1 : 0, safetyStatus]
  );

  db.runSync(
    `INSERT INTO event_history
     (event_type, description, created_at)
     VALUES (?, ?, ?)`,
    [
      detected ? 'fall_detected' : 'status_normal',
      detected
        ? 'Simulasi jatuh terdeteksi pada pasien.'
        : 'Status keselamatan kembali normal setelah simulasi direset.',
      new Date().toISOString(),
    ]
  );

  return getLocalStatus();
}

export function updateLocalSensor(
  sensorName: keyof SensorData,
  status: string
) {
  db.runSync(
    `UPDATE sensor_state
     SET status = ?
     WHERE sensor_name = ?`,
    [status, sensorName]
  );

  return getLocalStatus().sensors;
}

export function testLocalSensors() {
  const sensors = db.getAllSync<{
    sensor_name: string;
    status: string;
  }>(
    `SELECT sensor_name, status
     FROM sensor_state`
  );

  return sensors.map((sensor) => ({
    name: sensor.sensor_name,
    status: sensor.status,
    available: sensor.status === 'simulated',
    message:
      sensor.status === 'simulated'
        ? 'Sensor simulasi tersedia.'
        : 'Sensor belum terhubung.',
  }));
}
