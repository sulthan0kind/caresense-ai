# User Guide – CareSense AI

## 1. Introduction

CareSense AI merupakan prototype aplikasi mobile yang dirancang untuk membantu caregiver memantau status keselamatan pasien melalui dashboard.

Aplikasi ini menyediakan fitur simulasi deteksi jatuh, peringatan kejadian, pengelolaan sensor simulasi, dan riwayat kejadian.

Panduan ini menjelaskan cara menggunakan fitur-fitur utama CareSense AI.

## 2. Getting Started

Sebelum menggunakan aplikasi, pastikan:

- Backend Flask sudah berjalan.
- Aplikasi mobile sudah dijalankan melalui Expo.
- Smartphone dan laptop terhubung ke jaringan Wi-Fi yang sama.
- Alamat IP backend sudah sesuai dengan konfigurasi aplikasi.

## 3. Caregiver Dashboard

Dashboard merupakan halaman utama aplikasi yang menampilkan informasi pasien dan status keselamatannya.

Langkah penggunaan:

1. Buka aplikasi CareSense AI.
2. Masuk ke halaman Home.
3. Periksa informasi pasien.
4. Perhatikan indikator status keselamatan.
5. Periksa informasi kondisi sensor.

Dashboard membantu caregiver melihat kondisi sistem melalui satu halaman utama.

## 4. Fall Detection Simulation

Fitur ini digunakan untuk menyimulasikan kondisi pasien terdeteksi jatuh.

Langkah penggunaan:

1. Buka halaman Home.
2. Cari tombol simulasi jatuh.
3. Tekan tombol tersebut.
4. Tunggu hingga status keselamatan diperbarui.
5. Perhatikan peringatan yang muncul pada aplikasi.

**Catatan:** Fitur ini masih berupa simulasi dan belum menggunakan algoritma AI untuk mendeteksi jatuh secara langsung.

## 5. Fall Alert

Ketika simulasi jatuh diaktifkan, aplikasi akan menampilkan peringatan kepada caregiver.

Langkah penggunaan:

1. Aktifkan simulasi jatuh.
2. Perhatikan dialog atau banner peringatan.
3. Baca informasi kejadian yang ditampilkan.
4. Pilih tindakan yang tersedia sesuai kebutuhan simulasi.

## 6. Caregiver Confirmation

Fitur konfirmasi digunakan untuk menunjukkan bahwa caregiver telah mengetahui peringatan yang muncul.

Langkah penggunaan:

1. Buka peringatan jatuh.
2. Pilih tombol konfirmasi.
3. Periksa perubahan tampilan pada aplikasi.

Konfirmasi ini merupakan tindakan pada antarmuka prototype.

## 7. Finish Handling

Fitur ini digunakan untuk menyelesaikan simulasi penanganan kejadian.

Langkah penggunaan:

1. Buka peringatan jatuh.
2. Pilih tindakan penyelesaian penanganan.
3. Periksa kembali status keselamatan pasien.

Setelah tindakan dilakukan, status keselamatan akan kembali normal.

## 8. False Alarm

Fitur False Alarm digunakan ketika caregiver menganggap peringatan yang muncul sebagai alarm palsu dalam skenario simulasi.

Langkah penggunaan:

1. Buka peringatan jatuh.
2. Pilih opsi False Alarm.
3. Periksa perubahan status keselamatan.

Status keselamatan akan dikembalikan menjadi normal.

## 9. Event History

Fitur riwayat kejadian digunakan untuk melihat catatan perubahan status keselamatan pasien.

Langkah penggunaan:

1. Buka tab Laporan atau halaman riwayat.
2. Periksa daftar kejadian yang ditampilkan.
3. Amati informasi waktu dan jenis perubahan status yang tersedia.

Riwayat kejadian disimpan menggunakan database SQLite pada backend.

## 10. Sensor Management

Fitur pengelolaan sensor digunakan untuk mengubah status sensor simulasi.

Sensor yang tersedia:

- Camera
- Microphone
- Wearable

Langkah penggunaan:

1. Buka bagian pengelolaan sensor pada dashboard.
2. Pilih sensor yang ingin diubah.
3. Gunakan tombol untuk mengaktifkan atau memutuskan sensor.
4. Periksa status sensor setelah perubahan dilakukan.

Status sensor pada prototype tidak menunjukkan koneksi ke perangkat fisik.

## 11. Sensor Testing

Fitur ini digunakan untuk menguji kondisi sensor berdasarkan status simulasi yang tersimpan pada backend.

Langkah penggunaan:

1. Buka bagian pengelolaan sensor.
2. Tekan tombol Uji Semua Sensor.
3. Tunggu hingga proses pengujian selesai.
4. Periksa hasil pengujian setiap sensor.
5. Jika diperlukan, ubah status sensor dan lakukan pengujian kembali.

Hasil pengujian ditampilkan berdasarkan status sensor yang tersimpan pada sistem.

## 12. Navigation

Aplikasi menyediakan navigasi untuk berpindah antarhalaman.

Tab navigasi yang tersedia:

- **Home:** Menampilkan dashboard caregiver.
- **Lokasi:** Halaman untuk fitur informasi lokasi.
- **Laporan:** Menampilkan informasi riwayat kejadian.
- **Profil:** Menampilkan halaman profil.

Ketersediaan fungsi pada setiap halaman mengikuti fitur yang sudah diimplementasikan pada prototype.

## 13. Troubleshooting

### A. Aplikasi tidak dapat terhubung ke backend

Periksa hal berikut:

1. Pastikan backend Flask sudah berjalan.
2. Pastikan smartphone dan laptop menggunakan jaringan Wi-Fi yang sama.
3. Periksa alamat IP laptop pada konfigurasi API aplikasi.
4. Pastikan backend dapat diakses melalui browser smartphone.

### B. Status aplikasi tidak berubah

1. Periksa koneksi aplikasi ke backend.
2. Pastikan request API berhasil.
3. Periksa apakah backend masih berjalan.
4. Coba muat ulang aplikasi.

### C. Pengujian sensor tidak memberikan hasil

1. Periksa status sensor pada dashboard.
2. Pastikan backend berjalan.
3. Jalankan kembali pengujian sensor.
4. Periksa hasil yang ditampilkan aplikasi.

## 14. Prototype Limitations

CareSense AI masih berada pada tahap prototype. Beberapa keterbatasannya adalah:

- Deteksi jatuh masih menggunakan simulasi.
- Kamera dan mikrofon belum terhubung ke perangkat fisik.
- Wearable belum terhubung ke perangkat fisik.
- Pengujian sensor menggunakan status simulasi.
- Fitur AI belum digunakan untuk analisis kejadian secara otomatis.

## 15. Closing

Panduan ini dibuat untuk membantu caregiver memahami penggunaan fitur utama CareSense AI selama tahap demonstrasi dan pengujian prototype.

---

**Project:** CareSense AI  
**Documentation:** User Guide  
**Status:** Prototype