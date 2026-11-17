# Optik 2Mata Bengkayang — Website Fase 1 & 2

Website statis untuk profil toko, katalog contoh, dan pertanyaan melalui WhatsApp. Efek animasi Fase 2 memakai HTML, CSS, dan JavaScript vanilla tanpa proses build.

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
- `enableServiceMarquee`, `enableFeaturedCarousel`, `enableShoppingMockup`, `enableRatingCountUp`, `enableProductCardHover`, `enableHeaderScrollState`, `enableFooterMotion`: aktifkan/nonaktifkan efek Fase 2. Semua dapat dimatikan dengan nilai `false`; konten utama tetap tersedia.

Efek gerak mengikuti pengaturan `prefers-reduced-motion` perangkat. Carousel tetap dapat digunakan dengan scroll sentuh dan keyboard.

## Mengelola katalog

Sumber katalog saat ini `data/products.json`. Ubah data contoh menjadi data produk yang benar, atau tambahkan objek mengikuti skema yang sama. Setiap produk memerlukan `id`, `nama`, `kategori`, `foto`, dan `tersedia`. Isi harga serta spesifikasi hanya jika sudah dikonfirmasi. Foto lokal disimpan di `assets/img/produk/`; sesuaikan jalur `foto`.

Mode Google Sheets tersedia melalui `CONFIG.data.source = "sheet"` dan `sheetCsvUrl`. Publikasikan hanya sheet katalog yang memang boleh dibaca publik dan pertahankan JSON sebagai cadangan.

Panduan untuk pemilik ada di [`docs/panduan-pemilik.md`](docs/panduan-pemilik.md). Jawaban yang masih dibutuhkan tercatat di [`daftar-konfirmasi.md`](daftar-konfirmasi.md).

## Deploy

Demo sementara diarahkan ke `https://arrowtin.github.io/optik2mata/` melalui workflow `.github/workflows/deploy-pages.yml`. Workflow hanya mengemas HTML, aset, dan data publik ke GitHub Pages; tidak ada build command. Pengaturan Pages repo harus mengizinkan sumber GitHub Actions. Untuk situs resmi, ganti `CONFIG.siteUrl` di `assets/js/config.js` serta canonical, metadata, sitemap, dan robots setelah domain dipilih. Ikuti checklist di [`docs/08-qa-deploy-serah-terima.md`](docs/08-qa-deploy-serah-terima.md).

URL GitHub Pages hanya untuk demo. Jangan mempromosikannya sebagai domain resmi sebelum pemilik menyetujui domain, data, foto, dan konten yang digunakan.
