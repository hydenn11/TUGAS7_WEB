# TUGAS 7: AJAX dan Konsumsi API Eksternal / Mock

Proyek ini merupakan pengembangan lanjutan dari platform rekrutmen **AYOKERJA!**, yang menambahkan fitur konsumsi REST API eksternal secara asinkron (AJAX) pada halaman **Lowongan Global** (`/lowongan-api`).

---

## 1. Jawaban Pertanyaan Evaluasi Tugas (Nomor 5)

### Pertanyaan 5.a: Mengapa Anda memilih API/endpoint tersebut?

**Jawaban:**
Dalam pengerjaan tugas ini, endpoint yang dipilih adalah:
```
https://jsonplaceholder.typicode.com/posts?_limit=9
```

Alasan pemilihan endpoint tersebut meliputi:
1. **Rekomendasi Resmi Modul**: Endpoint ini merupakan *mock REST API* yang secara eksplisit disarankan di dalam lembar panduan tugas praktikum karena teruji valid dan stabil.
2. **Bebas Pembatasan CORS (*Cross-Origin Resource Sharing*)**: Server JSONPlaceholder mengizinkan header `Access-Control-Allow-Origin: *` secara bawaan, sehingga request AJAX dari browser (`localhost:5173`) dijamin berhasil tanpa terblokir kebijakan keamanan lintas domain.
3. **Tanpa Kebutuhan API Key (*Zero Configuration*)**: Tidak membutuhkan pendaftaran token rahasia atau kartu kredit. Hal ini memudahkan dosen/penilai saat melakukan *clone* repositori dan menjalankan proyek tanpa harus mengatur konfigurasi file `.env` terlebih dahulu.
4. **Struktur Data Ideal untuk Kartu Lowongan**:
   - `id`: Digunakan sebagai `key` unik React yang wajib ada saat perulangan `.map()`.
   - `title`: Dipetakan menjadi judul posisi pekerjaan (*Job Title*).
   - `body`: Dipetakan menjadi ringkasan deskripsi tugas (*Job Overview/Description*).
5. **Dukungan Pembatas Data (`_limit`)**: Parameter `_limit=9` memungkinkan aplikasi mengambil tepat 9 data pertama sehingga tampilan grid 3 kolom simetris, ringan, dan tidak membebani memori browser.

---

### Pertanyaan 5.b: Bagaimana alur penanganan loading dan error pada kode Anda? Sebutkan nama fungsi atau state yang digunakan.

**Jawaban:**
Alur penanganan siklus asinkron diimplementasikan di dalam komponen [`LowonganApi.jsx`](src/pages/LowonganApi.jsx) dengan rincian teknis sebagai berikut:

#### 1. State Hooks yang Digunakan
- **`jobs`** (`useState([])`): Menyimpan array data lowongan hasil pengambilan dari REST API.
- **`loading`** (`useState(true)`): Bertipe *boolean*, menandakan apakah proses pengambilan data di latar belakang sedang berjalan.
- **`error`** (`useState(null)`): Menyimpan pesan galat (*string*) apabila request jaringan gagal atau server merespons dengan status error.

#### 2. Fungsi Utama: `fetchJobs`
Fungsi `fetchJobs` dideklarasikan secara asinkron (`async/await`) dengan alur eksekusi terstruktur:

```javascript
const fetchJobs = async () => {
  setLoading(true);
  setError(null);

  const endpoint = 'https://jsonplaceholder.typicode.com/posts?_limit=9';

  try {
    // Jeda singkat buatan agar transisi skeleton loader terlihat halus
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await fetch(endpoint);

    // Validasi status HTTP (misal 404, 500)
    if (!response.ok) {
      throw new Error(
        `Gagal menghubungi server API (HTTP ${response.status}: ${response.statusText || 'Gagal memuat sumber daya'}).`
      );
    }

    const data = await response.json();
    setJobs(enrichedData); // Simpan data ke state
  } catch (err) {
    setError(err.message || 'Terjadi kesalahan jaringan saat mengambil data dari server.');
  } finally {
    setLoading(false); // Matikan loading dalam kondisi apapun
  }
};
```

#### 3. Alur Tiga Kondisi Tampilan (*Conditional Rendering*):
1. **State Loading (`loading === true`)**:
   - Menampilkan animasi **Skeleton Loader** modern yang memiliki proporsi kartu asli (avatar perusahaan, judul posisi, lencana tag, dan tombol aksi).
2. **State Error (`!loading && error`)**:
   - Menampilkan kotak peringatan informatif berisi pesan galat spesifik dan menyediakan tombol interaksi **"Coba Lagi"** (*Retry*). Ketika tombol ini diklik, fungsi `fetchJobs()` akan dipanggil kembali untuk mencoba menyambungkan ulang koneksi.
3. **State Success (`!loading && !error`)**:
   - Data lowongan dirender ke dalam kartu-kartu interaktif menggunakan metode `.map()` dengan menyertakan atribut unik `key={job.id}`.