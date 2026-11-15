# 08 — QA, Deploy & Serah Terima

## 1. Checklist QA

### Fungsional
- [ ] Tombol WA (header, hero, kartu produk, detail, footer, mengambang) membuka `wa.me/6281389514572` dengan pesan benar
- [ ] Tombol Telepon (`tel:+6281389514572`) & Rute (link Maps) berfungsi
- [ ] Katalog: cari, filter, urut, query string, empty state
- [ ] Detail produk: id valid/invalid, galeri, produk serupa
- [ ] Toggle `config.features` bekerja (testimoni, harga, antar, pemeriksaan mata)
- [ ] JSON gagal dimuat → fallback ramah muncul
- [ ] Mode Google Sheets: tambah baris → tampil di web

### Visual & Konsistensi
- [ ] Tidak ada warna/font di luar token
- [ ] Tombol seragam, tinggi ≥ 48px
- [ ] Tampil rapi di 360, 390, 768, 1024, 1280px; tanpa scroll horizontal
- [ ] Foto produk seragam rasio 4:3; placeholder berlabel jelas
- [ ] Logo, favicon, OG image terpasang
- [ ] Tidak ada Lorem Ipsum / teks sisa

### Konten
- [ ] Semua `[?]` sudah dikonfirmasi atau disembunyikan
- [ ] Tidak ada klaim medis/harga/merek yang belum dikonfirmasi
- [ ] Ejaan & istilah konsisten (kacamata, lensa, frame)
- [ ] Data usaha sama persis dengan Google Maps

### Teknis
- [ ] Lighthouse mobile: Perf ≥ 90, A11y ≥ 95, SEO ≥ 95, BP ≥ 95
- [ ] HTTPS aktif, tidak ada mixed content
- [ ] `sitemap.xml`, `robots.txt`, JSON-LD valid (Rich Results Test)
- [ ] 404 berfungsi
- [ ] Uji di: Android Chrome, iPhone Safari, 1 HP RAM kecil, 1 laptop

## 2. Deploy
| Opsi | Langkah ringkas |
|---|---|
| **Cloudflare Pages / Netlify (demo)** | Push ke GitHub → hubungkan repo → publish dir = root → dapat URL demo gratis |
| **Hosting biasa (produksi)** | Upload via File Manager/FTP ke `public_html` |
| **Domain** | Beli `.com`/`.id`; arahkan DNS; aktifkan SSL |

Urutan:
1. Deploy **demo di URL sementara** (untuk presentasi ke pemilik).
2. Setelah deal: domain resmi, ganti placeholder dengan data/foto asli.
3. Kirim sitemap ke Google Search Console; sambungkan Google Business Profile.
4. Pasang pelacakan klik (opsional).

## 3. Paket Serah Terima
- [ ] Akses repo/ file sumber (zip) & akun hosting/domain atas nama pemilik
- [ ] `docs/panduan-pemilik.md` (1 halaman) + sesi pelatihan 30 menit
- [ ] Google Sheet katalog (jika mode Sheets) dibagikan ke pemilik
- [ ] Daftar kredensial & tanggal perpanjangan domain/hosting
- [ ] Daftar konfirmasi (`daftar-konfirmasi.md`) yang sudah terisi
- [ ] Ringkasan "Hal yang bisa dan tidak bisa diubah sendiri"
- [ ] Kontak dukungan & lingkup garansi (mis. perbaikan bug 30 hari)

## 4. Template `daftar-konfirmasi.md`
| No | Pertanyaan | Jawaban pemilik | Status |
|---|---|---|---|
| 1 | Apakah ada pemeriksaan mata? Siapa pemeriksanya? | | ☐ |
| 2 | Produk & merek yang dijual | | ☐ |
| 3 | Boleh tampilkan harga? | | ☐ |
| 4 | Jangkauan & ongkir antar | | ☐ |
| 5 | Pembayaran yang diterima | | ☐ |
| 6 | Logo, tagline, sosial media | | ☐ |
| 7 | Keunggulan utama toko | | ☐ |
| 8 | Domain yang diinginkan | | ☐ |
| 9 | Izin memakai foto/ulasan pelanggan | | ☐ |
| 10 | Patokan menuju toko | | ☐ |

## 5. Pasca-Peluncuran (30 hari)
- Minggu 1: cek klik WA, perbaiki masukan pemilik.
- Minggu 2: tambah foto/produk asli, minta ulasan Google (QR).
- Minggu 4: laporan ringkas hasil → tawarkan Fase 2.
