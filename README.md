# Optik 2Mata Bengkayang — Website Fase 1

Website statis untuk profil toko, katalog contoh, dan pertanyaan melalui WhatsApp. Dibuat dengan HTML, CSS, dan JavaScript vanilla tanpa proses build.

## Pratinjau lokal

Jalankan server statis dari folder proyek, lalu buka alamat yang ditampilkan:

```powershell
python -m http.server 8000
```

Jangan membuka `index.html` langsung dari file explorer; katalog mengambil data JSON melalui server.

## Mengubah informasi toko

Ubah nilai di [`assets/js/config.js`](assets/js/config.js), terutama `business` dan `features`. Nomor WhatsApp ditulis pada `phoneIntl` tanpa tanda `+`; tautan WhatsApp dan telepon dibuat oleh modul situs. Pastikan setiap informasi baru sudah dikonfirmasi pemilik sebelum ditayangkan.

Toggle fitur penting:

- `showPrices`: tampilkan harga produk.
- `showTestimonials`: tampilkan area testimoni; aktifkan hanya untuk kutipan asli dengan izin.
- `showDelivery`: tampilkan informasi pesan antar. Jangkauan dan ongkir perlu dikonfirmasi.
- `showEyeExam`, `showRepair`, `showTurnaroundInfo`, `showPaymentInfo`: tampilkan informasi terkait hanya setelah dikonfirmasi.
- `hideSoldOut`: sembunyikan produk yang `tersedia` bernilai `false`.

## Mengelola katalog

Sumber katalog saat ini `data/products.json`. Ubah data contoh menjadi data produk yang benar, atau tambahkan objek mengikuti skema yang sama. Setiap produk memerlukan `id`, `nama`, `kategori`, `foto`, dan `tersedia`. Isi harga serta spesifikasi hanya jika sudah dikonfirmasi. Foto lokal disimpan di `assets/img/produk/`; sesuaikan jalur `foto`.

Mode Google Sheets tersedia melalui `CONFIG.data.source = "sheet"` dan `sheetCsvUrl`. Publikasikan hanya sheet katalog yang memang boleh dibaca publik dan pertahankan JSON sebagai cadangan.

Panduan untuk pemilik ada di [`docs/panduan-pemilik.md`](docs/panduan-pemilik.md). Jawaban yang masih dibutuhkan tercatat di [`daftar-konfirmasi.md`](daftar-konfirmasi.md).

## Deploy

Situs dapat di-host sebagai file statis di Cloudflare Pages, Netlify, atau hosting web biasa; folder publik adalah root repositori dan tidak ada build command. Sebelum deploy, tetapkan domain, ganti `CONFIG.siteUrl` di `assets/js/config.js` serta URL placeholder di metadata, sitemap, dan robots. Pastikan HTTPS aktif. Ikuti checklist di [`docs/08-qa-deploy-serah-terima.md`](docs/08-qa-deploy-serah-terima.md).

Saat ini `example.com` masih placeholder. Jangan mempromosikan situs sebagai situs resmi sebelum pemilik menyetujui data, domain, foto, dan konten yang digunakan.
