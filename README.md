> [!IMPORTANT]
> **Status Proyek: Prototype Simulasi**
>
> CareSense AI saat ini masih merupakan prototype untuk keperluan pembelajaran dan demonstrasi. Fitur-fitur yang tersedia sebagian besar masih menggunakan simulasi, bukan implementasi sistem pemantauan lansia yang siap digunakan dalam kondisi nyata.
>
> Beberapa hal yang perlu diperhatikan:
> - Deteksi jatuh belum menggunakan AI atau sensor fisik secara langsung.
> - Kamera, mikrofon, dan wearable belum terintegrasi dengan perangkat keras sebenarnya.
> - Data dan aktivitas pasien yang ditampilkan digunakan untuk kebutuhan simulasi.
> - Peringatan kejadian belum terhubung dengan layanan darurat atau sistem notifikasi nyata.
> - Fitur lokasi belum berfungsi sebagai pelacakan GPS secara langsung.
>
> Aplikasi ini belum ditujukan untuk penggunaan medis, pemantauan pasien secara nyata, atau pengambilan keputusan darurat.
>
> Tujuan utama proyek ini adalah mendemonstrasikan konsep aplikasi mobile, komunikasi client-server melalui jaringan nirkabel, pengelolaan data, serta alur simulasi pemantauan.

# CareSense AI

**Aplikasi Pemantauan Lansia Berbasis Mobile dengan Simulasi Deteksi Jatuh**

## 1. Tentang Proyek

CareSense AI merupakan prototipe aplikasi mobile yang dirancang untuk membantu caregiver dalam memantau kondisi dan keselamatan lansia. Aplikasi ini menyediakan dashboard pemantauan pasien, simulasi deteksi jatuh, notifikasi peringatan, pengelolaan sensor, serta riwayat kejadian.

Proyek ini dikembangkan sebagai bagian dari tugas mata kuliah **Mobile & Wireless Computing** dengan menerapkan integrasi data antara aplikasi mobile, backend, dan database melalui REST API.

## 2. Tujuan Pengembangan

Tujuan pengembangan CareSense AI adalah:

- Membantu caregiver memantau kondisi lansia melalui aplikasi mobile.
- Menyediakan simulasi deteksi jatuh dan peringatan kejadian.
- Mempermudah pemantauan status sensor.
- Menyimpan dan menampilkan riwayat kejadian pasien.
- Menerapkan komunikasi data antara frontend dan backend menggunakan REST API.

## 3. Fitur Utama

### A. Caregiver Dashboard
Menampilkan informasi pasien, status keselamatan, kondisi sensor, dan aktivitas terbaru.

### B. Fall Detection Simulation
Menyediakan simulasi kejadian jatuh untuk menguji sistem pemantauan pasien.

### C. Fall Alert
Menampilkan peringatan ketika sistem menerima status jatuh terdeteksi.

### D. Caregiver Confirmation
Menyediakan fitur konfirmasi kejadian jatuh oleh caregiver serta penanganan alarm palsu.

### E. Incident History
Menampilkan riwayat kejadian yang tersimpan melalui backend.

### F. Sensor Management
Memungkinkan caregiver mengubah status sensor simulasi, seperti aktif dan tidak terhubung.

### G. Sensor Testing
Menyediakan fitur pengujian status seluruh sensor melalui backend.

### H. Patient Profile
Menampilkan informasi dasar pasien yang dipantau.

## 4. Teknologi yang Digunakan

| Bagian | Teknologi |
|---|---|
| Mobile Frontend | React Native |
| Framework Mobile | Expo |
| Backend | Python Flask |
| Database | SQLite |
| Bahasa Pemrograman | TypeScript dan Python |
| Komunikasi Data | REST API |
| Format Pertukaran Data | JSON |
| Development Tools | Visual Studio Code |

## 5. Struktur Proyek

Berikut gambaran struktur utama repository CareSense AI:

```text
caresense-ai/
├── backend/
│   └── app.py
├── src/
│   ├── app/
│   └── components/
├── assets/
├── docs/
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

Keterangan:

- `backend/` berisi source code backend Flask.
- `src/app/` berisi halaman dan navigasi aplikasi mobile.
- `src/components/` berisi komponen antarmuka aplikasi.
- `assets/` berisi aset gambar dan kebutuhan tampilan.
- `docs/` berisi dokumentasi tambahan proyek.
- `app.json` berisi konfigurasi aplikasi Expo.
- `package.json` berisi informasi dan dependensi proyek.
- `README.md` berisi dokumentasi utama repository.

## 6. Integrasi Data (REST API)

CareSense AI menerapkan REST API untuk menghubungkan aplikasi mobile berbasis React Native dengan backend menggunakan Python Flask.

Melalui integrasi ini, aplikasi mobile dapat mengirim permintaan, menerima respons, mengambil data pasien, mengubah status sensor, serta memperbarui status simulasi deteksi jatuh.

Pertukaran data dilakukan menggunakan format JSON melalui protokol HTTP.

### 6.1 Arsitektur Integrasi

Alur komunikasi data pada CareSense AI adalah sebagai berikut:

1. Pengguna melakukan tindakan melalui aplikasi mobile.
2. Frontend React Native mengirimkan permintaan HTTP ke backend Flask.
3. Backend menerima dan memproses permintaan API.
4. Backend membaca atau memperbarui data pada database SQLite.
5. Backend mengirimkan respons dalam format JSON.
6. Frontend menerima respons dan memperbarui informasi yang ditampilkan kepada pengguna.

### 6.2 Daftar Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/status` | Mengambil informasi pasien dan status keselamatan. |
| GET | `/api/history` | Mengambil riwayat kejadian pasien. |
| GET | `/api/sensors` | Mengambil status seluruh sensor. |
| POST | `/api/fall` | Memperbarui status simulasi deteksi jatuh. |
| POST | `/api/sensors` | Mengubah status sensor. |
| POST | `/api/sensors/test` | Melakukan pengujian seluruh sensor. |

### 6.3 Contoh Request API

**A. Mengubah Status Deteksi Jatuh**

Method: `POST`

Endpoint: `/api/fall`

Request Body:

```json
{
  "fall_detected": true
}
```

Request tersebut digunakan untuk mengirim status simulasi jatuh terdeteksi kepada backend.

**B. Mengubah Status Sensor**

Method: `POST`

Endpoint: `/api/sensors`

Request Body:

```json
{
  "sensor": "camera",
  "status": "disconnected"
}
```

Request tersebut digunakan untuk mengubah status sensor kamera menjadi tidak terhubung.

**C. Menguji Seluruh Sensor**

Method: `POST`

Endpoint: `/api/sensors/test`

Request Body:

```json
{}
```

Request tersebut digunakan untuk meminta backend melakukan pengujian status seluruh sensor simulasi.

### 6.4 Contoh Respons API

Contoh respons ketika status jatuh berhasil diperbarui:

```json
{
  "fall_detected": true,
  "message": "Status jatuh berhasil diperbarui",
  "safety_status": "fall_detected"
}
```

Contoh respons ketika status sensor berhasil diperbarui:

```json
{
  "message": "Status sensor berhasil diperbarui",
  "sensor": "camera",
  "status": "disconnected"
}
```

Respons aktual dapat menyertakan informasi tambahan seperti waktu pembaruan dan status seluruh sensor.

### 6.5 Pengujian Integrasi API

Pengujian API dilakukan menggunakan PowerShell dan aplikasi mobile.

Hasil pengujian endpoint yang valid:

| No. | Method | Endpoint | Hasil |
|---|---|---|---|
| 1 | GET | `/api/status` | Berhasil |
| 2 | GET | `/api/history` | Berhasil |
| 3 | GET | `/api/sensors` | Berhasil |
| 4 | POST | `/api/fall` | Berhasil |
| 5 | POST | `/api/sensors` | Berhasil |
| 6 | POST | `/api/sensors/test` | Berhasil |

Seluruh endpoint berhasil memberikan respons HTTP `200 OK` pada pengujian yang valid.

Pengujian langsung melalui perangkat mobile juga berhasil. Hal ini dibuktikan melalui log backend Flask yang menerima permintaan dari alamat IP perangkat HP, termasuk permintaan GET dan POST.

## 7. Persyaratan Sistem

Sebelum menjalankan proyek, pastikan perangkat pengembangan telah memiliki:

- Node.js dan npm.
- Python.
- Visual Studio Code.
- Aplikasi Expo Go pada perangkat Android.
- Koneksi Wi-Fi lokal untuk komunikasi antara HP dan laptop.

## 8. Cara Menjalankan Aplikasi

### A. Mengunduh Source Code

Clone repository GitHub:

```bash
git clone https://github.com/sulthan0kind/caresense-ai.git
```

Masuk ke folder proyek:

```bash
cd caresense-ai
```

### B. Menjalankan Backend

Buka terminal pada folder proyek dan jalankan:

```bash
python backend/app.py
```

Jika berhasil, backend Flask akan berjalan pada port `5000`.

Contoh alamat backend:

```text
http://127.0.0.1:5000
```

### C. Menjalankan Frontend

Buka terminal baru pada folder proyek.

Instal dependensi:

```bash
npm install
```

Jalankan Expo:

```bash
npx expo start
```

Pindai QR Code menggunakan aplikasi Expo Go untuk membuka aplikasi pada perangkat Android.

### D. Menghubungkan Frontend dengan Backend

Agar aplikasi mobile dapat berkomunikasi dengan backend:

1. Pastikan laptop dan HP terhubung ke jaringan Wi-Fi yang sama.
2. Periksa alamat IPv4 laptop.
3. Buka file `src/app/index.tsx`.
4. Sesuaikan alamat API dengan alamat IP laptop.

Contoh:

```tsx
const API_URL = 'http://192.168.1.3:5000';
```

Ganti alamat IP tersebut sesuai alamat IPv4 laptop yang digunakan.

**Catatan:** Alamat `127.0.0.1` hanya mengarah ke perangkat itu sendiri. Untuk mengakses backend laptop dari HP, gunakan alamat IPv4 laptop.

## 9. Build Aplikasi Android (APK)

CareSense AI menggunakan Expo Application Services (EAS) untuk membangun project React Native menjadi aplikasi Android dengan format APK.

### Persiapan

Pastikan sudah tersedia:
- Node.js dan npm.
- Akun Expo.
- Konfigurasi `eas.json`.
- Konfigurasi aplikasi pada `app.json`.

### Proses Build APK

1. Buka terminal pada folder utama project.
2. Login ke akun Expo:

```bash
npx eas-cli@latest login
```

3. Jalankan proses build Android:

```bash
npx eas-cli@latest build --platform android --profile preview
```

4. Tunggu sampai proses build selesai.
5. Buka tautan hasil build yang diberikan oleh EAS.
6. Unduh file APK dan instal pada perangkat Android yang kompatibel.

**Catatan:** Proses build dilakukan melalui layanan cloud EAS. Folder native `android/` tidak harus tersedia pada project Expo managed workflow.
## 10. Batasan Prototipe

CareSense AI masih berupa prototipe dengan beberapa fungsi yang menggunakan simulasi.

Batasan sistem saat ini meliputi:

- Deteksi jatuh belum menggunakan model AI secara langsung.
- Kamera belum terhubung dengan sistem pengolahan visual secara nyata.
- Mikrofon belum digunakan untuk analisis suara secara langsung.
- Wearable belum terhubung dengan perangkat fisik.
- Status sensor masih menggunakan simulasi.
- GPS dan peta belum diintegrasikan secara penuh.
- Ringkasan laporan berbasis AI belum tersedia.

Dengan demikian, fitur deteksi jatuh dan pengujian sensor saat ini digunakan untuk demonstrasi serta pengujian alur sistem, bukan sebagai sistem pemantauan medis yang siap digunakan.

## 11. Status Proyek

CareSense AI telah memiliki prototipe aplikasi mobile, backend Flask, database SQLite, dan integrasi REST API.

Fitur yang telah diuji meliputi:

- Pengambilan data status pasien.
- Pengambilan riwayat kejadian.
- Pengambilan status sensor.
- Simulasi deteksi jatuh.
- Perubahan status sensor.
- Pengujian seluruh sensor.
- Komunikasi data antara aplikasi mobile dan backend melalui jaringan Wi-Fi lokal.

Proyek masih dapat dikembangkan lebih lanjut dengan integrasi perangkat sensor fisik dan penerapan model AI untuk mendukung deteksi jatuh.

---

**CareSense AI — Supporting Safer Elderly Care Through Mobile Technology.**# CareSense AI

**CareSense AI** adalah prototype aplikasi mobile untuk membantu caregiver memantau kondisi dan keselamatan lansia. Aplikasi ini dirancang dengan fitur pemantauan kondisi pasien, simulasi deteksi jatuh, peringatan kejadian, pengelolaan sensor, serta riwayat aktivitas.

Prototype ini dikembangkan sebagai implementasi konsep Mobile & Wireless Computing dengan komunikasi antara aplikasi mobile dan backend melalui jaringan lokal.

---

## 1. Tujuan Proyek

CareSense AI dikembangkan untuk:

- Membantu caregiver memantau kondisi keselamatan lansia.
- Menyediakan simulasi deteksi jatuh pada pasien.
- Memberikan peringatan ketika simulasi kejadian jatuh terdeteksi.
- Menyimpan riwayat kejadian untuk kebutuhan pemantauan.
- Mengimplementasikan komunikasi antara aplikasi mobile dan backend melalui jaringan nirkabel.

---

## 2. Fitur Utama

### A. Caregiver Login

- Menyediakan halaman login caregiver.
- Menyimpan sesi login menggunakan AsyncStorage.
- Mempertahankan status login ketika aplikasi dibuka kembali.
- Menyediakan fitur logout.

### B. Caregiver Dashboard

- Menampilkan informasi pasien.
- Menampilkan status keselamatan pasien.
- Menampilkan status koneksi backend.
- Menampilkan kondisi sensor.
- Memberikan akses ke fitur utama aplikasi.

### C. Simulasi Deteksi Jatuh

- Menyediakan tombol untuk menjalankan simulasi jatuh.
- Mengubah status keselamatan pasien ketika simulasi diaktifkan.
- Menyediakan fitur reset untuk mengembalikan status ke kondisi normal.

### D. Fall Alert

- Menampilkan peringatan ketika simulasi jatuh terdeteksi.
- Memberikan informasi kejadian kepada caregiver.
- Menyediakan fitur konfirmasi bahwa caregiver telah menerima peringatan.
- Menyediakan fitur penyelesaian penanganan kejadian.

### E. Incident History

- Menyimpan riwayat kejadian menggunakan SQLite.
- Mencatat kejadian simulasi jatuh dan perubahan status keselamatan.
- Menampilkan riwayat kejadian pada halaman laporan.
- Mempertahankan data riwayat meskipun backend dijalankan ulang.

### F. Sensor Management

- Menampilkan status sensor kamera, mikrofon, dan wearable.
- Menyediakan pengaturan status sensor.
- Mendukung status simulasi dan tidak terhubung.

### G. Sensor Testing

- Menyediakan fitur pengujian sensor.
- Menampilkan hasil pengujian setiap sensor.
- Menggunakan simulasi untuk menggambarkan proses pemeriksaan sensor.

### H. Reports

- Menampilkan riwayat aktivitas pasien.
- Menampilkan tren kejadian jatuh dalam 7 hari terakhir.
- Menyediakan visualisasi data kejadian dalam bentuk grafik.

### I. Patient Profile

- Menampilkan informasi pasien.
- Menampilkan informasi caregiver.
- Menyediakan pengaturan nama caregiver.
- Menyediakan fitur logout.

### J. Location

- Menyediakan halaman lokasi sebagai bagian dari navigasi aplikasi.
- Fitur pelacakan GPS dan pemetaan lokasi belum diimplementasikan sepenuhnya.

---

## 3. Teknologi yang Digunakan

### Frontend
- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage

### Backend
- Python
- Flask
- SQLite
- REST API

### Komunikasi
- HTTP
- JSON
- Jaringan Wi-Fi / Hotspot

### Development Tools
- Visual Studio Code
- Node.js
- npm
- Python
- Expo Go
- Git dan GitHub

---

## 4. Struktur Proyek

```text
caresense-ai/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── caresense.db
│
├── src/
│   ├── app/
│   │   ├── index.tsx
│   │   └── ...
│   │
│   ├── components/
│   │   ├── LoginScreen.tsx
│   │   └── ...
│   │
│   └── ...
│
├── assets/
├── docs/
│
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
└── README.md
```

**Catatan:** `caresense.db` merupakan database lokal yang dibuat oleh backend ketika aplikasi dijalankan. File database lokal tidak perlu diunggah ke GitHub.

---

## 5. REST API

Backend menyediakan beberapa endpoint untuk komunikasi dengan aplikasi mobile.

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Memeriksa backend |
| GET | `/api/status` | Mengambil status pasien |
| GET | `/api/history` | Mengambil riwayat kejadian |
| GET | `/api/sensors` | Mengambil status sensor |
| POST | `/api/fall` | Menjalankan atau mereset simulasi jatuh |
| POST | `/api/sensors` | Mengubah status sensor |
| POST | `/api/sensors/test` | Menguji sensor |

Komunikasi antara frontend dan backend menggunakan format JSON.

---

## 6. Persyaratan Sistem

Sebelum menjalankan CareSense AI, pastikan perangkat sudah memiliki:

- Windows, macOS, atau Linux.
- Node.js dan npm.
- Python 3.
- Visual Studio Code.
- Expo Go pada smartphone Android.
- Koneksi jaringan Wi-Fi atau hotspot.

Laptop dan smartphone harus terhubung ke jaringan yang sama ketika menggunakan backend lokal.

---

## 7. Cara Instalasi

### A. Clone Repository

Buka terminal dan jalankan:

```bash
git clone https://github.com/sulthan0kind/caresense-ai.git
```

Masuk ke direktori proyek:

```bash
cd caresense-ai
```

### B. Instalasi Dependensi Frontend

Jalankan:

```bash
npm install
```

### C. Instalasi Dependensi Backend

Jalankan:

```bash
pip install -r backend/requirements.txt
```

---

## 8. Cara Menjalankan Aplikasi

CareSense AI membutuhkan backend dan frontend yang berjalan secara bersamaan.

### A. Menjalankan Backend

Buka terminal pertama di direktori proyek.

Jalankan:

```bash
python backend/app.py
```

Backend akan berjalan pada:

```text
http://localhost:5000
```

Untuk memastikan backend aktif, buka alamat tersebut melalui browser laptop.

### B. Menjalankan Frontend

Buka terminal kedua di direktori proyek.

Jalankan:

```bash
npx expo start
```

Setelah Expo berjalan, scan QR Code menggunakan aplikasi Expo Go pada smartphone.

### C. Menghubungkan Frontend dengan Backend

Agar aplikasi mobile dapat berkomunikasi dengan backend Flask melalui jaringan lokal:

1. Aktifkan hotspot pada smartphone.
2. Hubungkan laptop ke hotspot tersebut.
3. Buka PowerShell pada laptop.
4. Jalankan perintah:

```bash
ipconfig
```

5. Cari bagian Wireless LAN adapter Wi-Fi.
6. Catat alamat IPv4 laptop.
7. Buka file `src/app/index.tsx`.
8. Cari konfigurasi `API_URL`.
9. Sesuaikan alamat IP dengan alamat IPv4 laptop.

Contoh:

```tsx
const API_URL = 'http://192.168.43.100:5000';
```

Ganti alamat IP contoh tersebut dengan alamat IPv4 laptop yang sedang digunakan.

**Hal yang perlu diperhatikan:**

- Smartphone dan laptop harus terhubung ke jaringan yang sama.
- Backend Flask harus tetap berjalan selama aplikasi digunakan.
- Frontend Expo juga harus tetap berjalan.
- Alamat IPv4 dapat berubah ketika berpindah jaringan atau mengaktifkan hotspot yang berbeda.
- Jangan menggunakan `localhost` atau `127.0.0.1` sebagai alamat backend pada smartphone karena alamat tersebut mengarah ke perangkat smartphone itu sendiri.

---

## 9. Cara Menggunakan Aplikasi

1. Jalankan backend Flask pada laptop.
2. Jalankan frontend Expo.
3. Buka CareSense AI melalui Expo Go.
4. Masuk menggunakan akun demo caregiver jika diperlukan.
5. Periksa status koneksi backend pada dashboard.
6. Jalankan simulasi deteksi jatuh.
7. Perhatikan peringatan yang muncul pada aplikasi.
8. Lakukan konfirmasi penerimaan peringatan oleh caregiver.
9. Selesaikan penanganan simulasi.
10. Buka halaman laporan untuk melihat riwayat kejadian.

**Catatan:** Akun login pada prototype ini merupakan autentikasi demo lokal, bukan sistem autentikasi produksi.

---

## 10. Pengujian Sistem

Pengujian dilakukan untuk memastikan fitur utama aplikasi berjalan dengan baik.

Beberapa pengujian yang telah dilakukan:

- Pengujian login dan logout caregiver.
- Pengujian penyimpanan sesi login.
- Pengujian koneksi frontend dengan backend.
- Pengujian simulasi deteksi jatuh.
- Pengujian tampilan peringatan jatuh.
- Pengujian konfirmasi caregiver.
- Pengujian penyelesaian penanganan kejadian.
- Pengujian penyimpanan riwayat kejadian pada SQLite.
- Pengujian pengelolaan status sensor.
- Pengujian simulasi sensor.
- Pengujian komunikasi aplikasi melalui jaringan hotspot smartphone.

---

## 11. Build Android APK (Opsional)

Untuk membuat file APK menggunakan Expo Application Services (EAS):

Instalasi dan login:

```bash
npx eas-cli@latest login
```

Kemudian jalankan:

```bash
npx eas-cli@latest build --platform android --profile preview
```

Ikuti petunjuk yang diberikan oleh EAS Build sampai proses selesai.

**Catatan:** Build APK merupakan proses terpisah dari menjalankan aplikasi melalui Expo Go. Pastikan konfigurasi aplikasi sudah sesuai sebelum melakukan build.

---

## 12. Batasan Prototype

CareSense AI saat ini masih berupa prototype dengan beberapa batasan:

- Deteksi jatuh masih menggunakan simulasi, belum menggunakan algoritma AI secara nyata.
- Kamera dan mikrofon belum melakukan pemrosesan data secara langsung.
- Wearable belum terhubung dengan perangkat fisik.
- Pengelolaan sensor masih menggunakan data simulasi.
- Pelacakan lokasi GPS dan peta belum diimplementasikan sepenuhnya.
- Notifikasi darurat otomatis belum tersedia.
- Autentikasi caregiver masih berupa autentikasi demo lokal.

Fitur-fitur tersebut dapat dikembangkan lebih lanjut pada tahap pengembangan berikutnya.

---

## 13. Status Pengembangan

**Project:** CareSense AI  
**Platform:** Mobile Application  
**Development Status:** Prototype  
**Frontend:** React Native + Expo  
**Backend:** Python + Flask  
**Database:** SQLite  
**Communication:** REST API melalui jaringan lokal

Prototype telah memiliki fitur utama untuk simulasi pemantauan pasien lansia dan telah diuji melalui koneksi jaringan lokal menggunakan hotspot smartphone.

---

## 14. Repository

GitHub Repository:

https://github.com/sulthan0kind/caresense-ai.git

---

**CareSense AI — Supporting Safer and Smarter Elderly Care.**