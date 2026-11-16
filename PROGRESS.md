# PROGRESS.md — Catatan Kemajuan

Entri terbaru di **atas**. Format entri ada di `AGENTS.md` bagian 5.

## Status Saat Ini
- Task aktif: T20 (IN PROGRESS)
- Terakhir selesai: T19
- Terblokir: T15 — GitHub Pages belum menerbitkan URL demo (404); sumber Pages atau dukungan paket repo privat belum dapat diverifikasi.
- Pertanyaan terbuka untuk pengguna: aktifkan GitHub Pages dengan source GitHub Actions, atau tentukan hosting lain; jangan ubah visibilitas repo tanpa keputusan pemilik.

## Log

### [2026-11-16 23:20] T19 — Mockup percakapan WhatsApp (DONE)
- **Hasil:** menambahkan simulasi chat berlabel "Contoh" pada bagian Cara berbelanja. Pesan muncul berurutan ketika mockup terlihat; CTA memakai `.js-wa-link` dan `data-wa-message`, sehingga nomor/URL tetap dibuat `whatsapp.js`. Toggle `enableShoppingMockup` disediakan.
- **Verifikasi:** sintaks JS dan `git diff --check` lulus; pemeriksaan markup memastikan label, toggle, CTA WhatsApp, selector observer bersama, jeda berbasis token, dan konten statis saat reduced-motion. Graphify code-only diperbarui. Uji visual browser tidak tersedia karena headless gagal merender.
- **Commit:** `0bec419` — `feat(motion): tambah mockup chat berurutan [T19]`.
- **Catatan/Keputusan:** konten percakapan adalah simulasi dan diberi label "Contoh".
- **Pertanyaan terbuka:** —
- **Berikutnya:** T20

### [2026-11-16 23:17] T18 — Carousel katalog pilihan (DONE)
- **Hasil:** katalog pilihan beranda memakai scroll-snap, dapat diseret dengan mouse, sentuh tetap native, dan track dapat difokuskan agar bisa dijelajahi dengan keyboard. Toggle `CONFIG.features.enableFeaturedCarousel` mematikan track dengan aman.
- **Verifikasi:** sintaks modul JS dan `git diff --check` lulus; harness Node membuktikan drag mouse menggeser track, sentuh tidak ditangkap, klik setelah drag dicegah, dan track memiliki fokus keyboard. Graphify code-only diperbarui. Uji viewport visual belum tersedia akibat kegagalan render browser headless.
- **Commit:** `2f902a6` — `feat(katalog): tambah carousel produk seret [T18]`.
- **Catatan/Keputusan:** produk tetap berupa tautan native di dalam area scroll.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T19

### [2026-11-16 23:05] T17 — Marquee layanan (DONE)
- **Hasil:** menambahkan strip chip berjalan dari layanan terkonfirmasi (kacamata/frame, lensa, belanja/ambil di toko, dan pesan antar). Duplikasi loop diberi `aria-hidden`, jeda tersedia saat hover, dan fitur dapat dimatikan lewat `CONFIG.features.enableServiceMarquee`.
- **Verifikasi:** sintaks JS dan `git diff --check` lulus; struktur grup asli dan duplikat sama, chip pesan antar mengikuti toggle layanan, dan aturan reduced-motion mematikan animasi serta membungkus chip menjadi statis. Graphify code-only diperbarui. Uji visual browser tidak tersedia karena kegagalan render headless.
- **Commit:** `daaca7a` — `feat(motion): tambah marquee layanan [T17]`.
- **Catatan/Keputusan:** teks hanya memakai layanan yang sudah terkonfirmasi; tidak menambahkan merek atau klaim baru.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T18

### [2026-11-16 21:14] T16 — Fondasi gerak (DONE)
- **Hasil:** menambahkan token gerak yang disetujui, `motion.css`, dan `motion.js`; reveal T11 memakai satu observer bersama untuk elemen awal dan produk dinamis. Transisi lama yang mengubah bayangan/latar dirapikan agar gerak hanya memakai `transform` dan `opacity`.
- **Verifikasi:** `node --check` untuk modul terkait, `git diff --check`, dan harness Node untuk observer tunggal, elemen dinamis, reveal sekali, serta `prefers-reduced-motion` lulus. Graphify code-only diperbarui. Lighthouse dan screenshot browser tidak selesai karena Chrome/Firefox headless gagal merender di lingkungan ini.
- **Commit:** `a237a73` — `feat(motion): siapkan fondasi gerak bersama [T16]`.
- **Catatan/Keputusan:** token `--ease-out`, `--dur-fast`, dan `--dur-base` disetujui pengguna. Pemeriksaan browser visual tetap menjadi batasan QA.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T17

### [2026-11-16 20:22] T15 — Deploy demo dan QR (BLOCKED)
- **Hasil:** menambahkan workflow GitHub Actions yang mengemas hanya HTML, aset, dan data publik; mengarahkan metadata/sitemap ke URL demo sementara `https://arrowtin.github.io/optik2mata/`. Workflow dan perubahan URL dipush.
- **Verifikasi:** YAML workflow, sitemap, JSON, dan sintaks JS valid. URL Pages diperiksa dua kali dan tetap mengembalikan HTTP 404; metadata repo GitHub tanpa autentikasi juga mengembalikan 404. QR belum dibuat karena URL belum aktif.
- **Commit:** `46ab9d7` — chore(deploy): siapkan demo GitHub Pages [T15] (sudah dipush ke `origin/main`).
- **Catatan/Keputusan:** GitHub Pages perlu diaktifkan sebagai source GitHub Actions. Pages tersedia untuk repo publik pada GitHub Free, sedangkan repo privat memerlukan paket Pro/Team/Enterprise; status paket dan pengaturan repo ini tidak dapat dibaca dari akses yang tersedia. Visibilitas repo tidak diubah.
- **Pertanyaan terbuka:** mohon aktifkan Pages di Settings → Pages → Source: GitHub Actions, atau sebutkan hosting lain yang ingin dipakai. Jika repo privat pada paket Free, pilih hosting lain atau konfirmasi secara eksplisit bila ingin membuat repo publik.
- **Berikutnya:** setelah URL aktif, uji HTTPS/perangkat dan buat QR code.


### [2026-11-16 20:08] T14 — Graphify dan QA lokal (DONE)
- **Hasil:** Graphify code-only diperbarui; graph berisi 61 node, 116 edge, 5 komunitas. QA memeriksa lima halaman HTML (masing-masing satu H1 dan aset lokal tersedia), 12 data contoh, sintaks semua modul, token warna, placeholder yang dilarang, dan tampilan mobile dari screenshot Lighthouse.
- **Verifikasi:** pemeriksaan statis dan `git diff --check` lulus. Lighthouse A11y 100 dan Best Practices 100 pada halaman yang diaudit; tidak ada error konsol. SEO 100 pada beranda/katalog/detail; halaman 404 mendapat 66 karena sengaja `noindex`. Transfer awal di bawah 1 MB. Skor Performance berubah antar-run (67–98; salah satu run beranda 94) saat audit lokal, jadi hasil ini tidak mewakili satu skor hosting yang stabil.
- **Commit:** `c4bed57` — chore(graph): perbarui peta kode QA [T14] (sudah dipush ke `origin/main` bersama catatan QA).
- **Catatan/Keputusan:** screenshot Lighthouse pada lebar mobile menunjukkan layout beranda/katalog tanpa overflow yang terlihat. Uji HTTPS dan perangkat fisik akan dilakukan setelah URL demo aktif di T15; Chrome screenshot langsung gagal karena batasan GPU headless.
- **Pertanyaan terbuka:** pilihan hosting/domain; URL sementara GitHub Pages belum aktif; URL domain resmi belum dipilih.
- **Berikutnya:** T15


### [2026-11-16 18:21] T13 — Dokumentasi proyek dan pemilik (DONE)
- **Hasil:** menambahkan `README.md`, panduan tambah/ubah produk satu halaman, dan `daftar-konfirmasi.md` yang memisahkan data tercatat dari jawaban pemilik yang masih dibutuhkan.
- **Verifikasi:** semua file dan tautan lokal utama tersedia; `data/products.json` valid; panduan pemilik 16 baris; pencarian tidak menemukan `[?]` atau Lorem Ipsum pada halaman publik; `git diff --check` bersih.
- **Commit:** `0fe96bc` — docs(operasional): tambah panduan pemilik [T13].
- **Catatan/Keputusan:** panduan menegaskan katalog sekarang memakai contoh dan harga/spesifikasi tidak boleh diperlakukan sebagai data asli. Domain resmi masih menunggu keputusan.
- **Pertanyaan terbuka:** domain resmi untuk mengganti placeholder `example.com` sebelum deploy.
- **Berikutnya:** T14


### [2026-11-16 18:17] T12 — Personalisasi data usaha (DONE)
- **Hasil:** memeriksa konfigurasi usaha dan toggle fitur yang sudah dipasang. Data nama, alamat, Plus Code, jam, telepon, Maps, dan rating cocok dengan fakta terkonfirmasi di `docs/00-README.md`; tagline kosong, harga/testimoni/pemeriksaan mata tersembunyi, dan pesan antar mengikuti layanan Maps.
- **Verifikasi:** `CONFIG.business` dibaca melalui Node; sintaks `config.js` dan `main.js` valid; pencarian tidak menemukan `[?]` atau Lorem Ipsum pada halaman publik; `git diff --check` bersih.
- **Commit:** `6171743` — docs(progres): catat personalisasi T12.
- **Catatan/Keputusan:** tidak ada perubahan kode diperlukan karena personalisasi dan toggle sudah sesuai; domain dan akun sosial tetap kosong sampai dikonfirmasi.
- **Pertanyaan terbuka:** domain resmi untuk mengganti placeholder `example.com` sebelum deploy.
- **Berikutnya:** T13


### [2026-11-16 18:13] T11 — Polesan demo (DONE)
- **Hasil:** menambahkan reveal bertahap dengan `IntersectionObserver`, lightbox galeri yang mendukung tombol navigasi, Escape, dan klik latar, serta animasi lembut pada ornamen hero. Efek tambahan nonaktif saat `prefers-reduced-motion`; hover kartu yang sudah ada tetap digunakan.
- **Verifikasi:** `node --check assets/js/ui.js` dan pemeriksaan `git diff --check` lulus. Lighthouse mobile: Performance 94, Accessibility 100, SEO 100, Best Practices 96; LCP 1,8 dtk, TBT 260 ms, transfer awal 74 KiB. CSS memuat aturan reduced-motion untuk reveal dan ornamen. Screenshot Chrome tidak tersedia karena proses GPU headless gagal; satu audit mencatat koneksi localhost terputus saat memuat `fonts.js`.
- **Commit:** `3346165` — feat(demo): tambah reveal dan lightbox [T11] (sudah dipush ke `origin/main`).
- **Catatan/Keputusan:** lightbox memakai elemen `<dialog>` bawaan tanpa dependensi tambahan. Graphify code-only diperbarui.
- **Pertanyaan terbuka:** domain resmi untuk mengganti placeholder `example.com` sebelum deploy.
- **Berikutnya:** T12


### [2026-11-16 18:08] T10 — Performa & aksesibilitas (DONE)
- **Hasil:** pemuatan Google Fonts ditunda sampai browser senggang untuk mengurangi kerja saat render awal (`assets/js/fonts.js`). Graphify code-only diperbarui.
- **Verifikasi:** `node --check assets/js/fonts.js` dan `git diff --check` lulus. Lighthouse mobile pada server lokal yang tetap aktif: Performance 90, Accessibility 100, Best Practices 100, SEO 100; FCP 1,8 dtk, LCP 1,8 dtk, TBT 360 ms, CLS 0,001, transfer awal 149 KiB.
- **Commit:** `f689386` — perf(fonts): tunda pemuatan sampai browser senggang [T10] (sudah dipush ke `origin/main`).
- **Catatan/Keputusan:** audit pertama dengan server latar yang berhenti menghasilkan koneksi gagal dan skor yang tidak stabil; hasil di atas diambil setelah server audit dijalankan persisten. Kompresi teks dan HTTPS belum dapat dinilai pada server Python lokal.
- **Pertanyaan terbuka:** domain resmi tetap diperlukan sebelum deploy.
- **Berikutnya:** T11


### [2026-11-16 08:30] T10 — Performa & aksesibilitas (BLOCKED)
- **Hasil:** memperbaiki skip-link/target fokus, dimensi gambar logo, tinggi chip filter 48px, dan pemuatan Google Fonts non-blocking.
- **Verifikasi:** sintaks JS dan pemeriksaan statis lulus. Lighthouse mobile: Performance 82, Accessibility 100, Best Practices 100, SEO 100; transfer awal 149 KiB, LCP 1,8 dtk, TBT 680 ms. Screenshot viewport tidak tersedia karena Chrome standalone gagal GPU.
- **Commit:** 04a6100, 9feb35e — perbaikan aksesibilitas dan font sudah dipush ke origin/main.
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
