# Testing Documentation – CareSense AI

## 1. Overview

Dokumen ini berisi hasil pengujian fitur-fitur pada aplikasi CareSense AI.

Pengujian dilakukan untuk memastikan bahwa aplikasi mobile dapat berkomunikasi dengan backend Flask, mengelola status sensor simulasi, serta menampilkan informasi keselamatan pasien dengan benar.

## 2. Testing Environment

| Component | Description |
|---|---|
| Operating System | Windows 11 |
| Code Editor | Visual Studio Code |
| Mobile Framework | React Native |
| Development Framework | Expo |
| Backend | Flask |
| Database | SQLite |
| Communication | HTTP REST API |
| Testing Device | Android Smartphone |

## 3. Testing Method

Pengujian dilakukan menggunakan metode functional testing, yaitu menguji fungsi aplikasi berdasarkan masukan dan keluaran yang diharapkan.

Status pengujian:

| Status | Description |
|---|---|
| Pass | Fitur berjalan sesuai harapan |
| Fail | Fitur tidak berjalan sesuai harapan |
| Blocked | Pengujian belum dapat dilakukan |
| Not Run | Pengujian belum dilakukan |

## 4. Test Cases

### TC-01: Backend Connection

**Objective:** Memastikan backend Flask dapat dijalankan dan diakses.

**Steps:**
1. Jalankan backend menggunakan `python backend/app.py`.
2. Buka alamat backend melalui browser.
3. Periksa response yang ditampilkan.

**Expected Result:** Backend memberikan response dengan status online.

**Actual Result:** ....................................

**Status:** Not Run

### TC-02: Patient Status

**Objective:** Memastikan aplikasi dapat mengambil status pasien dari backend.

**Steps:**
1. Jalankan backend.
2. Buka aplikasi CareSense AI.
3. Periksa informasi status pasien pada dashboard.

**Expected Result:** Informasi pasien dan status keselamatan ditampilkan.

**Actual Result:** ....................................

**Status:** Not Run

### TC-03: Fall Detection Simulation

**Objective:** Memastikan simulasi deteksi jatuh dapat mengubah status keselamatan pasien.

**Steps:**
1. Buka dashboard caregiver.
2. Tekan tombol simulasi jatuh.
3. Periksa perubahan status pada aplikasi.

**Expected Result:** Status jatuh terdeteksi dan peringatan ditampilkan.

**Actual Result:** ....................................

**Status:** Not Run

### TC-04: Fall Alert

**Objective:** Memastikan aplikasi menampilkan peringatan ketika simulasi jatuh terdeteksi.

**Steps:**
1. Aktifkan simulasi jatuh.
2. Periksa dialog atau banner peringatan.

**Expected Result:** Dialog atau banner peringatan jatuh muncul.

**Actual Result:** ....................................

**Status:** Not Run

### TC-05: Fall Confirmation

**Objective:** Memastikan caregiver dapat memberikan konfirmasi terhadap peringatan jatuh.

**Steps:**
1. Aktifkan simulasi jatuh.
2. Pilih tindakan konfirmasi pada peringatan.
3. Periksa perubahan tampilan aplikasi.

**Expected Result:** Aplikasi menampilkan bahwa peringatan telah dikonfirmasi.

**Actual Result:** ....................................

**Status:** Not Run

### TC-06: Finish Handling

**Objective:** Memastikan caregiver dapat menyelesaikan penanganan simulasi kejadian.

**Steps:**
1. Aktifkan simulasi jatuh.
2. Pilih tindakan penyelesaian penanganan.
3. Periksa status keselamatan pasien.

**Expected Result:** Status keselamatan kembali normal.

**Actual Result:** ....................................

**Status:** Not Run

### TC-07: False Alarm

**Objective:** Memastikan caregiver dapat menandai peringatan sebagai alarm palsu.

**Steps:**
1. Aktifkan simulasi jatuh.
2. Pilih tindakan alarm palsu.
3. Periksa status keselamatan pasien.

**Expected Result:** Status keselamatan kembali normal.

**Actual Result:** ....................................

**Status:** Not Run

### TC-08: Event History

**Objective:** Memastikan riwayat kejadian dapat ditampilkan.

**Steps:**
1. Lakukan simulasi jatuh.
2. Lakukan reset atau penyelesaian penanganan.
3. Buka halaman riwayat kejadian.

**Expected Result:** Riwayat perubahan status keselamatan ditampilkan.

**Actual Result:** ....................................

**Status:** Not Run

### TC-09: Sensor Management

**Objective:** Memastikan caregiver dapat mengubah status sensor simulasi.

**Steps:**
1. Buka bagian pengelolaan sensor.
2. Pilih salah satu sensor.
3. Ubah status menjadi aktif atau terputus.
4. Periksa perubahan status.

**Expected Result:** Status sensor berubah sesuai tindakan pengguna.

**Actual Result:** ....................................

**Status:** Not Run

### TC-10: Sensor Testing

**Objective:** Memastikan fitur pengujian sensor dapat memberikan hasil sesuai status sensor.

**Steps:**
1. Buka bagian pengelolaan sensor.
2. Jalankan pengujian sensor.
3. Periksa hasil pengujian.
4. Ubah status salah satu sensor menjadi terputus.
5. Jalankan pengujian kembali.

**Expected Result:** Hasil pengujian menunjukkan kondisi sensor berdasarkan status yang tersimpan.

**Actual Result:** ....................................

**Status:** Not Run

### TC-11: SQLite Data Persistence

**Objective:** Memastikan status kejadian tetap tersimpan setelah backend dimulai ulang.

**Steps:**
1. Aktifkan simulasi jatuh.
2. Hentikan backend.
3. Jalankan kembali backend.
4. Periksa status pasien melalui aplikasi atau endpoint API.

**Expected Result:** Status terakhir tetap tersimpan setelah backend dimulai ulang, sampai status diubah atau direset.

**Actual Result:** ....................................

**Status:** Not Run

## 5. Testing Summary

| Category | Total Test Cases | Pass | Fail | Blocked | Not Run |
|---|---:|---:|---:|---:|---:|
| Backend and API | 2 | 0 | 0 | 0 | 2 |
| Fall Detection and Alert | 5 | 0 | 0 | 0 | 5 |
| Event History | 1 | 0 | 0 | 0 | 1 |
| Sensor Management | 2 | 0 | 0 | 0 | 2 |
| Database | 1 | 0 | 0 | 0 | 1 |
| **Total** | **11** | **0** | **0** | **0** | **11** |

*Catatan: Tabel ini merupakan template awal. Perbarui jumlah dan status setelah seluruh pengujian dicatat.*

## 6. Testing Limitations

- Deteksi jatuh masih menggunakan simulasi, bukan hasil pemrosesan AI secara real-time.
- Kamera, mikrofon, dan wearable belum menggunakan perangkat fisik.
- Pengujian dilakukan pada lingkungan pengembangan.
- Hasil pengujian dapat berbeda pada perangkat dan jaringan yang berbeda.

## 7. Conclusion

Pengujian dilakukan untuk mengevaluasi fungsi utama CareSense AI, meliputi dashboard caregiver, simulasi deteksi jatuh, peringatan, riwayat kejadian, pengelolaan sensor, komunikasi API, dan penyimpanan data menggunakan SQLite.

Hasil akhir pengujian akan diperbarui berdasarkan pelaksanaan setiap test case.

---

**Project:** CareSense AI  
**Documentation:** Testing Documentation  
**Status:** Prototype