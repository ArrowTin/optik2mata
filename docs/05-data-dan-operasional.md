# 05 — Data & Operasional (Mudah Dioperasikan Pemilik)

Prinsip: **pemilik hanya menyentuh satu tempat**. Dua mode, pilih satu saat serah terima.

| Mode | Cara pemilik update | Cocok untuk |
|---|---|---|
| **A. Google Sheets (disarankan)** | Edit tabel di HP/laptop → web otomatis berubah | Pemilik yang sering ganti produk |
| **B. products.json** | Edit file / dibantu Anda | Pemilik jarang update; paling stabil |

## 1. Skema Data Produk
Kolom (header baris pertama, huruf kecil):

| Kolom | Tipe | Wajib | Contoh | Keterangan |
|---|---|---|---|---|
| `id` | teks unik, tanpa spasi | ✔ | `fr-001` | Dipakai di URL |
| `nama` | teks | ✔ | `Frame Titanium Slim` | Contoh data harus berlabel "Contoh" |
| `kategori` | pria / wanita / anak / unisex / kacamata-hitam / aksesori | ✔ | `pria` | |
| `harga` | angka (Rupiah) | – | `450000` | Kosong → "Tanya harga" |
| `harga_label` | teks | – | `Mulai Rp 450.000` | Menimpa tampilan harga |
| `bahan` | teks | – | `Titanium` | |
| `warna` | teks (pisah koma) | – | `Hitam, Emas` | |
| `ukuran` | teks | – | `52-18-140` | lebar lensa–jembatan–tangkai |
| `deskripsi` | teks pendek | – | `Ringan dan nyaman…` | ≤ 200 karakter |
| `foto` | nama file/URL (pisah koma) | ✔ | `fr-001-a.webp, fr-001-b.webp` | Foto pertama = utama |
| `badge` | teks | – | `Baru` / `Promo` | |
| `unggulan` | ya/tidak | – | `ya` | Tampil di beranda |
| `tersedia` | ya/tidak | ✔ | `ya` | `tidak` → badge "Habis" |
| `urutan` | angka | – | `10` | Urutan manual |

### Contoh `products.json`
```json
[
  {
    "id": "contoh-001",
    "nama": "Contoh Frame Klasik Bulat",
    "kategori": "unisex",
    "harga": 350000,
    "bahan": "Asetat",
    "warna": ["Hitam", "Tortoise"],
    "ukuran": "49-20-145",
    "deskripsi": "DATA CONTOH — ganti dengan produk asli.",
    "foto": ["contoh-001-a.webp"],
    "badge": "Contoh",
    "unggulan": true,
    "tersedia": true,
    "urutan": 10
  }
]
```
> Buat **12 produk contoh berlabel "Contoh"** saat demo (campuran kategori & rentang harga) agar katalog tampak hidup, lalu ganti dengan produk asli.

## 2. Setup Google Sheets (Mode A)
1. Buat Google Sheet dengan kolom sesuai skema.
2. Menu **File → Share → Publish to web** → pilih sheet "Produk" → format **CSV** → salin URL.
3. Tempel URL ke `CONFIG.data.sheetCsvUrl`, ubah `source: "sheet"`.
4. Aktifkan validasi data (dropdown) untuk `kategori`, `tersedia`, `unggulan`.
5. Perubahan tampil di web dalam ±5 menit (cache Google). Tetap sediakan `products.json` sebagai cadangan.

## 3. Panduan Pemilik (1 Halaman) — "Cara Tambah Produk"
1. Foto frame: latar putih, dekat jendela, tampak depan miring, lalu kirim ke Anda / unggah ke folder bersama.
2. Buka Google Sheet "Katalog 2Mata".
3. Tambah baris baru: isi `nama`, `kategori`, `harga`, `foto`, `tersedia = ya`.
4. Simpan otomatis. Tunggu beberapa menit → cek di web.
5. Produk habis? Ganti `tersedia` jadi `tidak`.
6. Mau tampil di beranda? `unggulan` = `ya`.
7. Ganti jam/ nomor/ promo? Hubungi pengembang (atau paket perawatan).

## 4. Panduan Foto Produk
- Latar putih/abu polos (kertas/kain), cahaya jendela, tanpa flash.
- 1 foto depan miring + 1 foto samping (minimal).
- HP landscape, kamera bersih, jangan zoom digital.
- Ukuran dioptimasi (lihat `06`): WebP lebar 800px.

## 5. Operasional Pasca-Peluncuran (untuk paket perawatan)
| Kegiatan | Frekuensi |
|---|---|
| Cek tombol WA/Rute | Bulanan |
| Update produk & promo | Sesuai pemilik |
| Laporan klik WA & kunjungan | Bulanan (ringkas 1 halaman) |
| Backup data & perpanjang domain | Tahunan |
