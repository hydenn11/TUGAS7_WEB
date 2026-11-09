# AYOKERJA! - Portal Rekrutmen Terpadu
### Evaluasi Praktik Frontend Development (Tugas Besar 1 / UTS)
**Mata Kuliah:** Perancangan dan Pemrograman Web  
**Dosen Pengampu / Penilai:** Tim Dosen & Asisten Praktikum WebPro  

---

## 📌 Ringkasan Eksekutif & Deskripsi Proyek
**AYOKERJA!** adalah aplikasi web portal lowongan kerja dan rekrutmen terpadu berbasis Single Page Application (SPA). Aplikasi ini menghubungkan dua entitas utama dalam pasar tenaga kerja:
1. **Pencari Kerja (Job Seekers)**: Mencari, menyaring lowongan lokal maupun internasional, menyimpan pekerjaan favorit (*bookmarks*), mengajukan lamaran kerja lengkap dengan berkas portofolio, serta melacak riwayat lamaran secara real-time.
2. **Mitra Perusahaan (Employers)**: Mengelola profil perusahaan terverifikasi, mempublikasikan lowongan kerja baru, serta meninjau dan mengevaluasi kandidat pelamar kerja melalui dashboard interaktif.

Proyek ini dibangun menggunakan arsitektur modern **React 19**, utilitas styling **Tailwind CSS v3**, dan routing dinamis **React Router DOM v7** dengan standar *Semantic HTML5*, *Responsive Web Design*, serta integrasi *REST API* asinkron.

---

## 🔗 Rekam Jejak Pengembangan Bertahap (Progressive Development History)
Proyek ini dikembangkan secara konsisten dari pekan ke pekan melalui 3 repositori utama sebagai bukti rekam jejak pengerjaan berkala:

| Tahap & Periode | Repositori GitHub | Fokus & Capaian Pengerjaan |
| :--- | :--- | :--- |
| **Pekan 1 – 5** *(Fondasi & Prototyping)* | [hydenn11/tugasWEBPRO](https://github.com/hydenn11/tugasWEBPRO.git) | Perancangan tata letak dasar, semantik HTML5, tipografi CSS modern, Flexbox & Grid, serta validasi form client-side vanilla JavaScript. |
| **Pekan 6** *(Migrasi Framework)* | [hydenn11/TUGAS6_WEB](https://github.com/hydenn11/TUGAS6_WEB.git) | Rekayasa ulang antarmuka ke dalam arsitektur komponen React.js, modularisasi komponen reusable, SPA Routing 8 halaman, State & Props, serta manajemen otentikasi dummy via Context API. |
| **Pekan 7 & Final UTS** *(Integrasi API & Polish UX)* | [hydenn11/TUGAS7_WEB](https://github.com/hydenn11/TUGAS7_WEB.git) *(Repo Utama UTS)* | Integrasi data asinkron (AJAX) menggunakan native `fetch()` ke Public REST API JSONPlaceholder dan Mock Data JSON lokal, implementasi Skeleton Loading, Error State dengan mekanisme Retry, serta audit aksesibilitas & performa build. |

---

## 👥 Identitas Kelompok & Pembagian Peran
* **Nama Tim / Kelompok**: Kelompok AYOKERJA!
* **Daftar Anggota & Kontribusi**:
  - **Luthfi Ramadhan** (`hydenn11`): Frontend Architect, Setup React + Vite, Routing React Router DOM, Integrasi REST API JSONPlaceholder, State Management `AuthContext`, Form Validation & Filtering.
  - *(Anggota Kelompok Lainnya)*: Desain UI/UX & Responsive Breakpoints, Pengujian Fitur Dashboard Perusahaan, Penyusunan Laporan Dokumentasi & Screenshot Antarmuka.

---

## 🚀 Fitur Utama & Daftar 8 Halaman Terkoneksi

Aplikasi memiliki **8 Halaman Utama** yang saling terhubung melalui navigasi terpadu:

1. **Beranda (`/`)**:
   - Hero banner interaktif dengan pencarian cepat lowongan kerja.
   - Kategori pekerjaan populer dengan filter visual.
   - Seksi lowongan kerja unggulan terintegrasi dengan aksi simpan/lamar.
   - Statistik platform dan testimoni alumni.
2. **Katalog Lowongan Lokal (`/jobs`)**:
   - Menampilkan daftar lowongan kerja nasional yang di-fetch secara asinkron dari `/data/jobs.json`.
   - Filter multikriteria: kata kunci pencarian, kategori pekerjaan, lokasi kerja, dan tipe komitmen (Remote, Hybrid, Full-time).
   - Tab navigasi dinamis: *Semua Lowongan*, *Lowongan Tersimpan*, dan *Riwayat Lamaran*.
   - Modal detail deskripsi lowongan dan modal formulir pengajuan lamaran interaktif.
3. **Lowongan Global API Eksternal (`/lowongan-api`)**:
   - Konsumsi data asinkron (AJAX) dari Public REST API JSONPlaceholder (`posts`).
   - Penanganan siklus hidup data: **Loading State** (Skeleton Loader), **Error State** (Alert error informatif + tombol *Coba Lagi* / *Retry*), dan **Success State** (Grid kartu interaktif).
   - Fitur pencarian instan dan filter kategori langsung pada data hasil API.
4. **Daftar Mitra Perusahaan (`/companies`)**:
   - Menampilkan profil perusahaan terverifikasi yang di-fetch secara asinkron dari `/data/companies.json`.
   - Fitur pencarian instan berdasarkan nama perusahaan, sektor industri, atau kota.
   - Tautan langsung (*cross-link*) ke lowongan yang dibuka oleh perusahaan terkait.
5. **Autentikasi Pelamar (`/login-pelamar`)**:
   - Tab ganda (*Masuk* dan *Daftar Akun Baru*).
   - Validasi form client-side (format email, password, username).
   - Terintegrasi dengan `AuthContext` dan penyimpanan sesi browser (`localStorage`).
6. **Autentikasi Perusahaan (`/login-perusahaan`)**:
   - Portal masuk khusus akun perwakilan HR / Rekruter perusahaan.
   - Redirection otomatis ke dashboard manajemen perusahaan.
7. **Profil Pelamar Kerja (`/profile`)**:
   - Manajemen informasi pribadi: foto profil, nama lengkap, kontak, headline karir, bio/ringkasan eksekutif.
   - Manajemen berkas Curriculum Vitae (CV) dan tautan portofolio profesional (LinkedIn/GitHub).
8. **Dashboard Perusahaan (`/company-dashboard`)**:
   - Panel ringkasan statistik rekrutmen (jumlah lowongan aktif, total pelamar masuk).
   - Formulir pembuatan & publikasi lowongan kerja baru.
   - Tabel manajemen lowongan (edit status aktif/tutup, edit rincian).
   - Peninjauan berkas lamaran dan data kandidat pelamar yang masuk.

---

## 🛠️ Tech Stack & Dependencies

* **Core Framework**: React 19 (`^19.3.1`)
* **Build Tool & Bundler**: Vite 8 (`^8.3.4`)
* **Routing**: React Router DOM 7 (`^7.18.4`)
* **Styling**: Tailwind CSS 3 (`^3.4.19`), PostCSS, Autoprefixer
* **Icons & Typography**: Font Awesome 6.5.1 & Google Font (Inter)
* **Code Linter**: Oxlint (`^1.88.0`)
* **HTTP Client**: Native Browser `fetch()` API (ES6+ `async/await`)
* **Storage**: Browser Web Storage API (`localStorage`)

---

## 💻 Panduan Instalasi & Menjalankan Proyek Secara Lokal

Pastikan Anda telah menginstal **Node.js** (versi 18 ke atas) dan **npm** pada sistem operasi Anda.

### 1. Kloning Repositori
```bash
git clone https://github.com/hydenn11/TUGAS7_WEB.git
cd TUGAS7_WEB
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Buka browser dan akses alamat lokal yang ditampilkan (biasanya `http://localhost:5173`).

### 4. Menjalankan Pemeriksaan Kode (Linting)
```bash
npm run lint
```
*Hasil: 0 errors, 0 warnings.*

### 5. Membangun Proyek untuk Produksi (Production Build)
```bash
npm run build
```
Hasil build optimal akan tersimpan di direktori `dist/`.

---

## 📡 Implementasi Fetching & Manajemen Status Data (AJAX)

Sesuai spesifikasi Tugas Besar 1 (Rubrik 4.5), **seluruh data dinamis dalam aplikasi diperoleh melalui pemanggilan HTTP asinkron (`fetch`)**:

1. **REST API Eksternal (`/lowongan-api`)**:
   - **Endpoint**: `https://jsonplaceholder.typicode.com/posts?_limit=9`
   - **Metode**: HTTP GET via `fetch()` di dalam hook `useEffect`.
   - **Enrichment**: Data pos ditransformasikan menjadi entitas pekerjaan lengkap (nama perusahaan, logo, rentang gaji, dan level jabatan).
2. **Mock API Lokal (`/jobs` & `/companies`)**:
   - **Endpoints**: `/data/jobs.json` dan `/data/companies.json` yang tersimpan di direktori `public/data/`.
   - **Siklus Hidup**: Dilengkapi penanganan *Loading State* (skeleton animasi), *Error Handling* (blok `try-catch`), serta fallback tersinkronisasi dengan `localStorage`.

---

## 📝 Jawaban Pertanyaan Evaluasi Praktikum

### Pertanyaan 5.a: Mengapa Anda memilih API/endpoint tersebut?
**Jawaban:**
Dalam pengujian konsumsi API eksternal, endpoint yang dipilih adalah:
```
https://jsonplaceholder.typicode.com/posts?_limit=9
```
Alasan pemilihan:
1. **Rekomendasi Resmi Modul**: Merupakan *mock REST API* standar industri yang stabil dan disarankan dalam lembar tugas.
2. **Bebas Hambatan CORS**: Menyediakan header `Access-Control-Allow-Origin: *` bawaan, sehingga request dari browser `localhost` dijamin aman tanpa blokir keamanan lintas domain.
3. **Zero Configuration**: Bebas token/API key rahasia, memastikan dosen dan asisten dapat langsung menguji aplikasi tanpa setup `.env`.
4. **Struktur Data Ideal**: Objek JSON memiliki `id` (unik untuk React key), `title` (dipetakan menjadi posisi kerja), dan `body` (dipetakan menjadi ringkasan deskripsi tugas).
5. **Dukungan Pagination/Limit**: Parameter `_limit=9` membatasi data tepat 9 item untuk tata letak kartu simetris 3 kolom.

---

### Pertanyaan 5.b: Bagaimana alur penanganan loading dan error pada kode Anda?
**Jawaban:**
Implementasi pada komponen `LowonganApi.jsx`:
1. **State Hooks**:
   - `jobs` (`useState([])`): Menyimpan data yang berhasil di-fetch.
   - `loading` (`useState(true)`): Menandakan proses request jaringan sedang berjalan.
   - `error` (`useState(null)`): Menyimpan pesan galat apabila terjadi kegagalan jaringan atau respons status HTTP di luar kode 200–299.
2. **Fungsi Asinkron `fetchJobs`**:
   - Di awal, `setLoading(true)` dan `setError(null)` diaktifkan.
   - Blok `try` melakukan `fetch(endpoint)`.
   - Validasi respons menggunakan `if (!response.ok) throw new Error(...)`.
   - Blok `catch(err)` menangkap kegagalan dan menyimpan pesan error ke state `error`.
   - Blok `finally` memastikan `setLoading(false)` terpanggil dalam kondisi apa pun.
3. **Penyajian Tampilan (Conditional Rendering)**:
   - **Loading State**: Menampilkan Skeleton Loader kartu lowongan beranimasi denyut (*pulse*).
   - **Error State**: Menampilkan banner error interaktif lengkap dengan pesan status HTTP dan tombol **Coba Lagi** (*Retry*) untuk mere-fetch data.
   - **Success State**: Menampilkan data ke dalam grid kartu interaktif dengan `key={job.id}`.

---

## 📂 Struktur Direktori Proyek

```
TUGAS_7/
├── public/
│   ├── assets/              # Aset logo perusahaan, avatar, dan icon aplikasi
│   └── data/                # Mock REST API data source (JSON)
│       ├── jobs.json        # Data lowongan kerja nasional
│       └── companies.json   # Data direktori mitra perusahaan
├── screenshots/             # Dokumentasi screenshot kondisi aplikasi
│   ├── 01_kondisi_loading.png
│   ├── 02_kondisi_berhasil.png
│   └── 03_kondisi_error_coba_lagi.png
├── src/
│   ├── components/          # Komponen modular UI (Navbar, Footer, Modal, Filter, dll)
│   ├── context/             # React Context (AuthContext & persistent state)
│   ├── data/                # Helper dan pemetaan data lokal
│   ├── pages/               # 8 Halaman Utama aplikasi web
│   ├── App.jsx              # Routing pusat & sinkronisasi state
│   ├── index.css            # Utilitas Tailwind CSS
│   └── main.jsx             # Entry point React 19
├── .oxlintrc.json           # Konfigurasi linter Oxlint
├── package.json             # Manifest dependensi & skrip npm
├── tailwind.config.js       # Konfigurasi tema & breakpoints Tailwind
└── vite.config.js           # Konfigurasi bundler Vite
```

---
*Proyek ini diajukan untuk memenuhi persyaratan evaluasi Tugas Besar I (UTS) Perancangan dan Pemrograman Web.*
