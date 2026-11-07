# CareSense AI

**Aplikasi Pemantauan Lansia Berbasis Mobile dengan Simulasi Deteksi Jatuh**

## 1. Tentang Proyek

CareSense AI merupakan prototipe aplikasi mobile yang dirancang untuk membantu caregiver memantau kondisi lansia. Aplikasi ini menyediakan dashboard pemantauan, simulasi deteksi jatuh, notifikasi peringatan, pengelolaan sensor, dan riwayat kejadian.

Proyek ini dikembangkan sebagai bagian dari tugas mata kuliah **Mobile & Wireless Computing**.

## 2. Fitur Utama

- **Caregiver Dashboard** — Menampilkan informasi pasien, status keselamatan, sensor, dan aktivitas terbaru.
- **Fall Detection Simulation** — Simulasi kejadian jatuh pada lansia.
- **Fall Alert** — Menampilkan peringatan ketika simulasi jatuh terdeteksi.
- **Caregiver Confirmation** — Konfirmasi kejadian jatuh oleh caregiver.
- **Incident History** — Menampilkan riwayat kejadian.
- **Sensor Management** — Mengubah status sensor simulasi.
- **Sensor Testing** — Menguji status sensor melalui backend.
- **Patient Profile** — Menampilkan informasi pasien.

## 3. Teknologi yang Digunakan

| Bagian | Teknologi |
|---|---|
| Mobile Frontend | React Native |
| Framework | Expo |
| Backend | Python Flask |
| Database | SQLite |
| Bahasa Pemrograman | TypeScript dan Python |
| API | REST API |

## 4. Struktur Proyek

```text
caresense-ai/
├── backend/
├── src/
│   ├── app/
│   └── components/
├── assets/
├── docs/
├── package.json
└── README.md
```

## 5. Persyaratan

Pastikan perangkat pengembangan sudah memiliki:

- Node.js dan npm
- Python
- Flask
- Expo
- Visual Studio Code

## 6. Cara Menjalankan Aplikasi

### A. Menjalankan Backend

Buka terminal pada folder proyek, kemudian jalankan:

```bash
python backend/app.py
```

Backend berjalan pada port `5000`.

### B. Menjalankan Frontend

Buka terminal baru, kemudian jalankan:

```bash
npx expo start
```

Pindai QR Code menggunakan aplikasi Expo Go untuk menjalankan prototipe pada perangkat Android.

### C. Koneksi Frontend dan Backend

Pastikan perangkat Android dan laptop terhubung ke jaringan Wi-Fi yang sama.

Sesuaikan alamat API pada file `src/app/index.tsx`:

```tsx
const API_URL = 'http://ALAMAT-IP-LAPTOP:5000';
```

Ganti `ALAMAT-IP-LAPTOP` dengan alamat IPv4 laptop yang sedang digunakan.

## 7. Dokumentasi

Dokumentasi proyek tersedia pada folder `docs/`:

- API Documentation
- Feature Documentation
- Testing Documentation
- User Guide
- Screenshots

## 8. Batasan Prototipe

Prototipe saat ini masih menggunakan simulasi untuk beberapa fungsi:

- Deteksi jatuh belum menggunakan model AI secara langsung.
- Kamera dan mikrofon belum terhubung ke perangkat fisik.
- Wearable belum terhubung ke perangkat sebenarnya.
- GPS dan peta belum diintegrasikan.
- Ringkasan laporan berbasis AI belum tersedia.

## 9. Status Proyek

Prototipe sedang dalam tahap pengembangan dan pengujian fitur.

---

**CareSense AI — Supporting Safer Elderly Care Through Mobile Technology.**