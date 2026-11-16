# Panduan Pemilik: Memperbarui Katalog

Katalog saat ini memakai data contoh. Sebelum tampil sebagai katalog asli, gantilah dengan informasi produk yang sudah dipastikan.

## Menambah atau mengubah produk

1. Siapkan nama produk, kategori, ketersediaan, dan foto. Harga, bahan, warna, ukuran, serta deskripsi boleh dikosongkan jika belum diketahui.
2. Buka file `data/products.json` atau kirim data dan foto kepada pengelola situs jika Anda tidak mengedit file sendiri.
3. Salin satu objek produk sebagai pola. Beri `id` unik tanpa spasi, misalnya `fr-013`; isi `nama`, `kategori`, `foto`, dan `tersedia`.
4. Simpan file. Untuk menampilkan produk di beranda, isi `unggulan` dengan `true`. Atur urutan dengan angka pada `urutan`.
5. Jika produk habis, ubah `tersedia` menjadi `false`. Tampilannya mengikuti pengaturan situs.
6. Periksa situs setelah katalog dimuat ulang. Jika ada masalah, kembalikan salinan data sebelumnya atau hubungi pengelola.

Kategori yang didukung: `pria`, `wanita`, `anak`, `unisex`, `kacamata-hitam`, dan `aksesori`.

## Foto produk

Gunakan foto milik toko atau foto yang izinnya sudah jelas. Ambil dengan latar polos dan cahaya merata. Minta pengelola mengoptimalkan gambar menjadi WebP sebelum ditambahkan. Jangan memakai foto pelanggan tanpa izin.

## Informasi toko dan layanan

Perubahan nama, alamat, jam, nomor, tautan Maps, harga, layanan, atau toggle katalog dikerjakan melalui `assets/js/config.js`. Minta bantuan pengelola situs untuk perubahan ini. Informasi pemeriksaan mata, servis, pembayaran, jangkauan antar, dan testimoni hanya boleh ditampilkan setelah dikonfirmasi.

Efek tambahan dapat dimatikan pengelola melalui toggle `enableServiceMarquee`, `enableFeaturedCarousel`, `enableShoppingMockup`, `enableRatingCountUp`, `enableProductCardHover`, dan `enableHeaderScrollState` pada `CONFIG.features`. Pengaturan `prefers-reduced-motion` perangkat otomatis membuat efek bergerak menjadi statis.

## Cara melihat pratinjau

Pengelola dapat menjalankan server lokal dari folder situs dengan `python -m http.server 8000`, lalu membuka `http://localhost:8000`. Jangan membuka file HTML langsung karena katalog memerlukan server.
