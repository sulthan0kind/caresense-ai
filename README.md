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

**CareSense AI — Supporting Safer Elderly Care Through Mobile Technology.**