# 03 — Halaman & Konten

Teks di bawah adalah **draf** Bahasa Indonesia. Tanda `[?]` = konfirmasi dulu; jangan dipublikasikan sebagai fakta sebelum dikonfirmasi.

## Peta Situs
```
/                 → index.html     (Beranda / landing)
/katalog.html     → Katalog + filter + pencarian
/produk.html?id=  → Detail produk
/404.html         → Halaman tidak ditemukan
```
Navigasi: **Beranda · Layanan · Katalog · Galeri · Lokasi** + tombol **Chat WhatsApp**.
Di beranda, menu memakai anchor (`#layanan`, `#galeri`, `#lokasi`).

---

## A. BERANDA (`index.html`) — urutan section

### 1. Header
Logo (dua lingkaran + "2Mata"), menu, tombol `.btn-wa` "Chat WhatsApp".

### 2. Hero
- **H1:** "Lihat Lebih Jelas, Tampil Lebih Percaya Diri" `[?]` tagline resmi
- **Sub:** "Optik 2Mata Bengkayang — kacamata, lensa, dan layanan optik untuk keluarga Anda. Buka setiap hari 08.00–21.00."
- **CTA:** `[Chat WhatsApp]` `[Lihat Katalog]`
- **Visual:** foto toko/ produk di kanan, dua lingkaran besar di belakang.
- **Trust row:** ⭐ 4,3 di Google · 📍 Sebalo, Bengkayang · 🕗 Buka setiap hari

### 3. Strip Info Cepat (3 kolom)
- 🕗 Buka tiap hari, 08.00–21.00
- 📍 Jl. Bengkayang–Sanggau Ledo, Sebalo
- 📞 0813-8951-4572 (tombol langsung telepon/WA)

### 4. Layanan (kartu 4)
| Ikon | Judul | Teks |
|---|---|---|
| eye | Pemeriksaan Mata `[?]` | "Cek ukuran mata Anda dengan nyaman. Hubungi kami untuk jadwal." |
| glasses | Kacamata & Frame | "Pilihan frame untuk dewasa dan anak, sesuai gaya dan anggaran." |
| circle | Lensa | "Lensa sesuai kebutuhan: harian, layar komputer, hingga lensa khusus." `[?]` jenis |
| wrench | Servis & Penyesuaian | "Frame longgar atau miring? Kami bantu rapikan." `[?]` |

### 5. Cara Belanja (3 langkah/ kartu) — sesuai layanan di Google
1. **Belanja di Toko** — "Datang, coba langsung, pilih yang paling cocok."
2. **Ambil di Toko** — "Pesan lewat WhatsApp, ambil saat sudah siap."
3. **Pesan Antar** — "Kami antar ke rumah Anda." `[?]` jangkauan & ongkir

### 6. Katalog Pilihan
Judul "Pilihan Frame Kami". 6–8 kartu produk (ambil yang `featured: true`). Tombol "Lihat Semua Koleksi" → `katalog.html`.

### 7. Kenapa 2Mata `[?]` (pilih yang benar-benar ada)
- Buka setiap hari, termasuk Minggu
- Lokasi mudah dijangkau di jalur Bengkayang–Sanggau Ledo
- Bisa pesan & tanya lewat WhatsApp
- Pilihan frame untuk semua usia `[?]`

### 8. Proses Pembuatan Kacamata (stepper 4 langkah)
Periksa/siapkan resep → Pilih frame → Pilih lensa → Ambil/diantar.

### 9. Galeri
Grid 6–9 foto (toko, etalase, produk, momen pelanggan dengan izin). Lightbox sederhana.

### 10. Testimoni
- Ringkasan: "⭐ 4,3 di Google Maps" + tombol "Lihat ulasan di Google" (tautan Maps).
- Kutipan pelanggan: **hanya yang asli & dengan izin**. Jika belum ada, sembunyikan kartu kutipan (`config.showTestimonials=false`).

### 11. FAQ (accordion)
1. Apakah bisa periksa mata di sini? `[?]`
2. Berapa lama pembuatan kacamata? `[?]`
3. Apakah bisa pakai resep dari dokter/optik lain? `[?]`
4. Apakah ada layanan antar? Ke mana saja? `[?]`
5. Bagaimana cara pesan lewat WhatsApp?
6. Metode pembayaran yang diterima? `[?]`

### 12. Lokasi & Kontak
- Peta tertanam (Plus code RFMR+V2 Sebalo / link Maps).
- Alamat lengkap, tabel jam buka, tombol `Rute`, `Telepon`, `WhatsApp`.
- Patokan menuju toko `[?]`.

### 13. CTA Penutup
"Siap melihat lebih jelas? Chat kami sekarang atau mampir ke toko." `[Chat WhatsApp]` `[Lihat Rute]`

### 14. Footer
Logo, alamat, jam, kontak, tautan menu, sosial media `[?]`, "© 2026 Optik 2Mata Bengkayang".

---

## B. KATALOG (`katalog.html`)
- **Header halaman:** "Koleksi Frame & Kacamata" + 1 kalimat pengantar.
- **Bar pencarian** (ketik nama/kode).
- **Filter (chip):** Kategori (Pria, Wanita, Anak, Unisex, Kacamata Hitam), Bahan `[?]`, Rentang harga `[?]`.
- **Urutkan:** Terbaru · Harga terendah · Harga tertinggi.
- **Grid kartu:** 2 kolom mobile, 3 tablet, 4 desktop.
- **Empty state:** "Belum ketemu? Tanya kami via WhatsApp, kami carikan." + tombol WA.
- Produk `available: false` ditampilkan dengan badge "Habis"/disembunyikan (konfigurasi).

## C. DETAIL PRODUK (`produk.html?id=xxx`)
- Galeri foto (utama + thumbnail).
- Nama, kategori, badge, harga.
- Spesifikasi: bahan, warna, ukuran (lebar lensa–jembatan–tangkai) `[?]`.
- Deskripsi singkat.
- **Tombol WA besar:** "Tanya produk ini via WhatsApp" (pesan terisi otomatis).
- Catatan: "Harga dan ketersediaan dapat berubah. Konfirmasi lewat WhatsApp."
- "Produk serupa" (3 kartu, kategori sama).

## D. 404
Pesan ramah + tombol kembali ke beranda + tombol WA.

---

## E. Pesan WhatsApp Otomatis (template)
| Konteks | Template (di-encode URL) |
|---|---|
| Umum | "Halo Optik 2Mata, saya ingin bertanya tentang kacamata." |
| Produk | "Halo Optik 2Mata, saya tertarik dengan {nama} (kode {id}). Apakah tersedia? {url_produk}" |
| Pemeriksaan mata | "Halo Optik 2Mata, saya ingin menanyakan jadwal pemeriksaan mata." |
| Pesan antar | "Halo Optik 2Mata, saya ingin pesan antar ke {lokasi}." |

## F. Gaya Penulisan
- Kalimat pendek, aktif, sopan ("Anda"), tanpa jargon medis berlebih.
- Jangan menjanjikan hasil medis; gunakan "kami bantu", "silakan konsultasikan".
- Konsisten: "kacamata", "lensa", "frame" (bukan campur "bingkai/frame").
