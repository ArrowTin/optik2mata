# 01 — PRD & Ruang Lingkup Fase 1

## 1. Latar Belakang
Optik 2Mata Bengkayang adalah toko optik lokal (rating 4,3, buka setiap hari 08.00–21.00). Belum ada kehadiran web resmi yang menjual keunggulan toko. Fase 1 membangun **etalase digital** yang mengarahkan calon pelanggan ke WhatsApp dan ke toko.

## 2. Tujuan
| # | Tujuan | Ukuran |
|---|---|---|
| T1 | Pengunjung menghubungi toko | Klik WhatsApp, klik Rute, klik Telepon |
| T2 | Toko tampak profesional & tepercaya | Desain konsisten, info jelas, foto bagus |
| T3 | Pemilik bisa mengelola sendiri | Update produk < 3 menit tanpa coding |
| T4 | **Pemilik terkesan & membeli** | Demo jadi < 1 minggu, tampil rapi di HP pemilik |

## 3. Persona
- **Ibu Rumah Tangga / Orang Tua** — cari kacamata anak, ingin harga & proses jelas.
- **Pekerja/Pelajar** — butuh kacamata baru, cepat, bisa tanya via WA.
- **Pelanggan Lama** — cari jam buka, lokasi, kontak.
- **Pemilik Toko (pembeli produk)** — ingin tampil modern, takut ribet.

## 4. Ruang Lingkup (IN)
1. Website 1 halaman utama (landing) + halaman **Katalog** + halaman **Detail Produk**.
2. Bagian: Hero, Info Cepat, Layanan, Cara Belanja (di toko/ambil/antar), Katalog Pilihan, Keunggulan, Galeri, Testimoni, FAQ, Lokasi, Footer.
3. Katalog dengan **filter & pencarian**, data dari satu sumber (JSON / Google Sheets).
4. Tombol WhatsApp dengan **pesan otomatis terisi** (nama produk + tautan).
5. Peta tertanam + tombol Rute.
6. SEO lokal dasar + data terstruktur `Optician`.
7. Mobile-first, cepat, dapat diakses.
8. Dokumen panduan operasional untuk pemilik (1 halaman).

## 5. Di Luar Ruang Lingkup (OUT, Fase 2+)
- Login pelanggan, booking online, status pesanan, resep digital.
- Pembayaran online / keranjang belanja.
- Dashboard admin berbasis database.
- Bot WhatsApp otomatis.

> Bagian OUT adalah **materi upsell** (lihat `09-strategi-penjualan.md`).

## 4a. Asumsi & Hal yang Perlu Dikonfirmasi `[?]`
- Ada/tidaknya pemeriksaan mata (refraksi) dan siapa pemeriksanya.
- Merek & kisaran harga; boleh tampil atau "mulai dari".
- Jangkauan & biaya antar.
- Logo, tagline, akun sosial media.
- Foto toko & produk (minimal 12 foto frame).
Bila belum ada: gunakan placeholder dan data contoh berlabel jelas.

## 6. Kriteria Sukses (Definition of Done)
- [ ] Skor Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95.
- [ ] Halaman muat < 2,5 detik di jaringan 4G sedang; total transfer awal < 1 MB.
- [ ] Semua tombol WA/Telepon/Rute berfungsi di Android & iOS.
- [ ] Katalog dapat diubah hanya dengan mengedit data (tanpa menyentuh kode).
- [ ] Tampilan konsisten dengan design system di lebar 360, 768, 1280 px.
- [ ] Tidak ada teks Lorem Ipsum; semua placeholder berlabel jelas.
- [ ] Pemilik berhasil menambah 1 produk sendiri saat demo.

## 7. Risiko & Mitigasi
| Risiko | Mitigasi |
|---|---|
| Foto produk jelek/tidak ada | Template foto sederhana (latar putih, cahaya jendela) + panduan di `05` |
| Pemilik gaptek | Satu Google Sheet + video/ panduan 1 halaman |
| Data belum lengkap | Placeholder berlabel, bagian bisa disembunyikan lewat konfigurasi |
| Klaim medis berlebihan | Hindari klaim; gunakan bahasa informatif & "konsultasi langsung" |
