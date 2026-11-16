import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('caresense.db');

export function initializeDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS patient_state (
      id INTEGER PRIMARY KEY NOT NULL,
      patient_name TEXT NOT NULL,
      patient_age INTEGER NOT NULL,
      fall_detected INTEGER NOT NULL DEFAULT 0,
      safety_status TEXT NOT NULL DEFAULT 'normal'
    );

    CREATE TABLE IF NOT EXISTS sensor_state (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sensor_name TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'simulated'
    );

    CREATE TABLE IF NOT EXISTS event_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      description TEXT,
      created_at TEXT NOT NULL
    );
  `);

  db.runSync(
    `INSERT OR IGNORE INTO patient_state
    (id, patient_name, patient_age, fall_detected, safety_status)
    VALUES (1, 'Siti Aminah', 72, 0, 'normal')`
  );

  const sensors = [
    { name: 'camera', status: 'simulated' },
    { name: 'microphone', status: 'simulated' },
    { name: 'wearable', status: 'disconnected' },
  ];

  sensors.forEach((sensor) => {
    db.runSync(
      `INSERT OR IGNORE INTO sensor_state (sensor_name, status)
       VALUES (?, ?)`,
      [sensor.name, sensor.status]
    );
  });
}
