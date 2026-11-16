# PROGRESS.md — Catatan Kemajuan

Entri terbaru di **atas**. Format entri ada di `AGENTS.md` bagian 5.

## Status Saat Ini
- Task aktif: —
- Terakhir selesai: T09
- Terblokir: T10 — skor Performance 82, target minimal 90.
- Pertanyaan terbuka untuk pengguna: pilihan optimasi lanjutan atau audit ulang setelah hosting ditentukan.

## Log

### [2026-11-16 08:30] T10 — Performa & aksesibilitas (BLOCKED)
- **Hasil:** memperbaiki skip-link/target fokus, dimensi gambar logo, tinggi chip filter 48px, dan pemuatan Google Fonts non-blocking.
- **Verifikasi:** sintaks JS dan pemeriksaan statis lulus. Lighthouse mobile: Performance 82, Accessibility 100, Best Practices 100, SEO 100; transfer awal 149 KiB, LCP 1,8 dtk, TBT 680 ms. Screenshot viewport tidak tersedia karena Chrome standalone gagal GPU.
- **Commit:** 04a6100 dan menunggu hash perbaikan font.
- **Catatan/Keputusan:** pemuatan font non-blocking menurunkan render-blocking dari estimasi 870 ms menjadi 0 ms dan menaikkan Performance dari 68 ke 82. Target Performance minimal 90 belum terpenuhi. Cache/kompresi juga belum dapat dinilai pada server Python lokal.
- **Pertanyaan terbuka:** lanjut optimasi untuk mencapai Performance 90 pada audit lokal, atau tunggu pengukuran ulang di hosting target?
- **Berikutnya:** T10 setelah audit lulus; T11 menunggu T10.

### [2026-11-16 08:14] T09 — SEO teknis (DONE)
- **Hasil:** menambahkan title/description, canonical, Open Graph, Twitter Card, JSON-LD Optician, robots.txt, sitemap.xml, site.webmanifest, dan gambar OG SVG. Metadata detail produk ikut diperbarui sesuai produk yang dimuat.
- **Verifikasi:** JSON-LD dan webmanifest berhasil diparse; sitemap serta OG SVG valid XML; meta title/description/canonical/OG ditemukan pada halaman terkait; JS valid; git diff --check bersih. Graphify code-only: 57 node, 110 edge, 7 komunitas.
- **Commit:** 49a57a5 — feat(seo): lengkapi metadata dan file indeks [T09] (sudah dipush ke origin/main).
- **Catatan/Keputusan:** domain belum diberikan; URL memakai example.com sebagai placeholder dan harus diganti sebelum deploy. Tidak ada aggregateRating di schema.
- **Pertanyaan terbuka:** domain resmi untuk mengganti placeholder.
- **Berikutnya:** T10

### [2026-11-16 08:04] T08 — 404, fallback data & kembali ke atas (DONE)
- **Hasil:** menambahkan halaman 404.html, opsi muat ulang pada state katalog gagal, dan tombol kembali ke atas pada beranda/katalog/detail. Tombol memakai tautan WhatsApp dari modul bersama.
- **Verifikasi:** sintaks lima modul JS valid; semua halaman punya satu H1; halaman utama, katalog, dan detail memiliki state error ramah dengan muat ulang dan WhatsApp; git diff --check bersih. Graphify code-only menghasilkan 56 node, 108 edge, 7 komunitas. Pemeriksaan visual browser belum dilakukan.
- **Commit:** d9c8070 — feat(navigasi): tambah halaman 404 dan tombol kembali [T08] (sudah dipush ke origin/main).
- **Catatan/Keputusan:** tombol kembali ke atas tampil setelah scroll 480px; scroll halus mengikuti pengaturan reduced motion global.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T09

### [2026-11-15 23:53] T07 — Detail produk (DONE)
- **Hasil:** membuat `produk.html` dan `product.js` untuk galeri foto, spesifikasi, harga mengikuti toggle, CTA WhatsApp berisi nama/kode/tautan, produk serupa, serta state ID tidak valid dan kegagalan data. Komponen kartu dipakai ulang.
- **Verifikasi:** sintaks JS valid; struktur HTML punya satu H1 dan semua target dinamis tersedia; `git diff --check` bersih. Visual lintas viewport belum dapat dikonfirmasi dengan Chrome headless.
- **Commit:** bdd4caf — feat(produk): tambah halaman detail produk [T07] (sudah dipush ke origin/main).
- **Catatan/Keputusan:** informasi harga hanya muncul jika diaktifkan; semua foto menggunakan placeholder produk yang sudah ada.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T08

### [2026-11-15 23:50] T06 — Katalog & filter (DONE)
- **Hasil:** membuat `katalog.html` dengan cari nama/kode, filter kategori, urutan terbaru/harga, state di query string, kartu produk bersama, serta empty/error state dengan CTA WhatsApp.
- **Verifikasi:** modul `catalog.js`, `product-card.js`, `main.js` lolos pemeriksaan sintaks; 12 rekaman JSON valid; satu H1 dan kontrol/state katalog terdeteksi; `git diff --check` bersih. Graphify code-only: 43 node, 84 edge, 8 komunitas.
- **Commit:** bdd4caf — feat(produk): tambah halaman detail produk [T07] (sudah dipush ke origin/main).
- **Catatan/Keputusan:** harga tetap disembunyikan sesuai `showPrices:false`; pengurutan harga tersedia berdasarkan data contoh yang tidak ditayangkan.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T07

### [2026-11-15 23:48] T05 — Beranda bagian bawah (DONE)
- **Hasil:** menambahkan katalog unggulan dinamis, keunggulan, langkah belanja, placeholder galeri, ringkasan ulasan, FAQ bertoggle, peta/kontak, CTA, dan footer. Graphify code-only diperbarui.
- **Verifikasi:** sintaks modul JS valid; `git diff --check` bersih; graph berisi 27 node, 54 edge, 7 komunitas. Fitur FAQ testimonial/pemeriksaan/pembayaran/waktu pengerjaan mengikuti `CONFIG`. Tampilan viewport tidak dapat dinilai akurat dari Chrome headless yang melaporkan ukuran keliru.
- **Commit:** bdd4caf — feat(produk): tambah halaman detail produk [T07] (sudah dipush ke origin/main).
- **Catatan/Keputusan:** harga dan kutipan testimoni tetap tersembunyi; seluruh foto galeri masih placeholder. Produk contoh ke-5 ditandai unggulan agar enam kartu tampil.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T06

### [2026-11-15 23:38] T04 — Beranda bagian atas (DONE)
- **Hasil:** membangun header, hero, strip informasi, kartu layanan, dan cara belanja; menambahkan `main.js` dan `pages.css` untuk data CONFIG, tautan kontak, serta toggle fitur.
- **Verifikasi:** satu `<h1>`, anchor internal valid, kontak dan Maps tidak di-hard-code di HTML, pengikatan CONFIG diuji dengan mock DOM; struktur responsif satu kolom mobile dan grid pada breakpoint tablet/desktop. Chrome headless mengabaikan ukuran viewport yang diminta (DOM melaporkan 500px), jadi screenshot 360/768/1280px belum dapat dipastikan.
- **Commit:** bdd4caf — feat(produk): tambah halaman detail produk [T07] (sudah dipush ke origin/main).
- **Catatan/Keputusan:** layanan pemeriksaan mata dan servis tetap tersembunyi sesuai `config.features`; pesan antar hanya mengarahkan pelanggan untuk menanyakan jangkauan dan ongkir.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T05

### [2026-11-15 22:59] T03 — WhatsApp & data produk (DONE)
- **Hasil:** menambahkan `whatsapp.js`, `data.js`, 12 produk contoh, dan SVG placeholder foto. Menambahkan pengecualian untuk file root Graphify yang berisi jalur lokal.
- **Verifikasi:** 12 produk JSON valid dan berlabel Contoh; pemuatan dan normalisasi data lulus; pesan WhatsApp memuat nama dan URL produk; parser CSV menangani koma dalam kutip; fetch gagal menghasilkan pesan fallback. Graphify code-only menghasilkan 23 node, 37 edge, dan 3 komunitas.
- **Commit:** bdd4caf — feat(produk): tambah halaman detail produk [T07] (sudah dipush ke origin/main).
- **Catatan/Keputusan:** harga dan testimoni contoh tidak ditayangkan; `showPrices` dan `showTestimonials` tetap nonaktif. Graphify melewati berkas CSS, JSON, dan `tokens.css` (ditandai sensitif); hasil AST yang tersedia disimpan dalam repo.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T04

### [2026-11-15 22:37] T02 — Komponen & styleguide (DONE)
- **Hasil:** menambahkan `components.css` dan `styleguide.html` berisi tombol, navbar native `<details>`, kartu layanan/produk, badge, strip info, FAQ accordion, footer, tombol WhatsApp mengambang, pembatas, dan motif dua lingkaran.
- **Verifikasi:** HTML memiliki satu `<h1>`, semua anchor dan aset lokal terhubung, tanpa inline style; komponen memakai token, tombol dan kontrol memiliki tinggi sentuh minimum 48px, fokus keyboard dan reduced motion tersedia. Pemeriksaan browser visual terkendala kegagalan GPU headless.
- **Commit:** bdd4caf — feat(produk): tambah halaman detail produk [T07] (sudah dipush ke origin/main).
- **Catatan/Keputusan:** grid produk 2 kolom mobile, 3 tablet, 4 desktop. Contoh tombol hanya demonstrasi dan belum menavigasi ke WhatsApp sampai T03.
- **Pertanyaan terbuka:** kemudian diselesaikan saat T03; hasil Graphify code-only disetujui untuk disimpan di repo.
- **Berikutnya:** T03

### [2026-11-15 22:27] T01 — Scaffold & tokens (DONE)
- **Hasil:** membuat `index.html`, token dan base CSS, `CONFIG`, font Google, logo, dan favicon.
- **Verifikasi:** sintaks modul JavaScript valid; kedua SVG valid XML; HTML memiliki satu `<h1>` dan semua referensi aset lokal ditemukan; nilai warna CSS hanya berada di `tokens.css`. Pratinjau headless browser tidak berhasil karena proses GPU gagal di lingkungan ini.
- **Commit:** bdd4caf — feat(produk): tambah halaman detail produk [T07] (sudah dipush ke origin/main).
- **Catatan/Keputusan:** toggle pemeriksaan mata dan harga dimatikan karena belum dikonfirmasi; testimoni tetap tersembunyi. `graphify . --code-only` menghasilkan 2 node dan 1 edge; Graphify melewati `tokens.css` karena ditandai sensitif dan tidak mengklasifikasikan `base.css`. Artefak Graphify tidak disertakan dalam commit task.
- **Pertanyaan terbuka:** artefak `graphify-out/` disimpan di repo atau diabaikan lewat `.gitignore`?
- **Berikutnya:** T02

### [2026-11-15 22:14] T00 — Setup repo (DONE)
- **Hasil:** repo, `.gitignore`, struktur awal, dan dokumen sudah tersedia. Branch kerja `main`; remote `origin` diarahkan ke GitHub yang diberikan pengguna.
- **Verifikasi:** status Git bersih sebelum push; push awal `main` berhasil dan branch melacak `origin/main`.
- **Commit:** bdd4caf — feat(produk): tambah halaman detail produk [T07] (sudah dipush ke origin/main).
- **Catatan/Keputusan:** tidak ada file setup baru yang diperlukan karena struktur dan dokumen sudah tersedia dari kondisi awal.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T01
