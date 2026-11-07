# CareSense AI - Feature Documentation

## 1. Overview

CareSense AI merupakan prototipe aplikasi mobile yang dirancang untuk membantu caregiver dalam memantau kondisi lansia.

Dokumentasi ini menjelaskan fitur-fitur yang telah dikembangkan pada prototipe CareSense AI.

## 2. Daftar Fitur

### 2.1 Caregiver Dashboard

Dashboard merupakan halaman utama aplikasi yang menampilkan informasi pemantauan pasien.

Informasi yang ditampilkan:
- Nama dan usia pasien.
- Status keselamatan pasien.
- Jumlah sensor aktif.
- Jumlah insiden hari ini.
- Aktivitas terbaru.
- Status masing-masing sensor.

### 2.2 Fall Detection Simulation

Fitur ini digunakan untuk menyimulasikan kondisi jatuh pada pasien.

Cara kerja:
1. Caregiver membuka halaman Home.
2. Caregiver menekan tombol Simulasikan Jatuh.
3. Aplikasi mengirimkan permintaan ke backend melalui API.
4. Backend memperbarui status jatuh pasien.
5. Aplikasi menampilkan status Jatuh Terdeteksi.

Catatan: Deteksi jatuh pada prototipe ini masih menggunakan simulasi, bukan model AI secara langsung.

### 2.3 Fall Alert

Fitur ini memberikan peringatan ketika backend menerima status jatuh.

Informasi yang ditampilkan:
- Status peringatan.
- Nama pasien.
- Usia pasien.
- Waktu kejadian.
- Keterangan kejadian.

Aplikasi juga menampilkan dialog peringatan ketika status jatuh berubah menjadi aktif.

### 2.4 Caregiver Confirmation

Fitur ini memungkinkan caregiver mengonfirmasi bahwa peringatan jatuh telah diperiksa.

Ketika tombol Konfirmasi Jatuh ditekan, aplikasi memperbarui status konfirmasi pada tampilan.

### 2.5 Finish Handling

Fitur ini digunakan untuk menyelesaikan penanganan kejadian.

Cara kerja:
1. Caregiver mengonfirmasi kejadian jatuh.
2. Caregiver memilih Selesaikan Penanganan.
3. Aplikasi meminta konfirmasi.
4. Jika disetujui, aplikasi mengirimkan status normal ke backend.
5. Aplikasi kembali ke halaman Home.

### 2.6 False Alarm

Fitur ini digunakan ketika peringatan dianggap sebagai alarm palsu.

Cara kerja:
1. Caregiver memilih Alarm Palsu.
2. Aplikasi meminta konfirmasi.
3. Jika disetujui, aplikasi mengirimkan status normal ke backend.
4. Status peringatan direset.

### 2.7 Incident History

Fitur ini menampilkan riwayat perubahan status keselamatan pasien.

Informasi yang ditampilkan:
- Jenis kejadian.
- Deskripsi kejadian.
- Waktu kejadian.

Data riwayat diperoleh dari backend melalui endpoint API.

### 2.8 Sensor Management

Fitur ini memungkinkan caregiver mengubah status sensor simulasi.

Sensor yang tersedia:
- Camera (Visual).
- Microphone (Audio).
- Wearable.

Pilihan status:
- Simulated.
- Disconnected.

Perubahan status dikirimkan ke backend melalui REST API.

### 2.9 Sensor Testing

Fitur ini digunakan untuk menguji status sensor simulasi.

Cara kerja:
1. Caregiver membuka bagian Pengelolaan Sensor.
2. Caregiver menekan Uji Semua Sensor.
3. Aplikasi mengirimkan permintaan ke backend.
4. Backend mengembalikan hasil pengujian.
5. Aplikasi menampilkan hasil Lulus atau Tidak Lulus.

Pengujian ini hanya memeriksa mekanisme sensor simulasi, bukan akurasi perangkat fisik.

### 2.10 Patient Profile

Halaman profil menampilkan informasi pasien, meliputi:
- Nama pasien.
- Usia pasien.
- Informasi kontak darurat.
- Riwayat kesehatan.

Informasi kontak darurat dan riwayat kesehatan masih berupa placeholder.

## 3. Fitur yang Belum Diimplementasikan

Beberapa fitur dalam konsep CareSense AI belum tersedia pada prototipe saat ini:

| Fitur | Status |
|---|---|
| Deteksi jatuh menggunakan AI | Belum diimplementasikan |
| Integrasi kamera fisik | Belum diimplementasikan |
| Analisis audio | Belum diimplementasikan |
| Integrasi wearable/IMU | Belum diimplementasikan |
| GPS dan peta GIS | Belum diimplementasikan |
| Ringkasan laporan berbasis AI | Belum diimplementasikan |
| Komunikasi caregiver | Belum diimplementasikan |

## 4. Kesimpulan

Prototipe CareSense AI telah menyediakan fitur dasar pemantauan caregiver, simulasi deteksi jatuh, peringatan, riwayat kejadian, serta pengelolaan dan pengujian sensor simulasi.

Pengembangan selanjutnya dapat difokuskan pada integrasi perangkat fisik dan implementasi teknologi AI untuk mendukung pemantauan lansia secara lebih nyata.