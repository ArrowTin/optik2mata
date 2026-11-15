# PROGRESS.md — Catatan Kemajuan

Entri terbaru di **atas**. Format entri ada di `AGENTS.md` bagian 5.

## Status Saat Ini
- Task aktif: —
- Terakhir selesai: T06
- Terblokir: —
- Pertanyaan terbuka untuk pengguna: —

## Log

### [2026-11-15 23:50] T06 — Katalog & filter (DONE)
- **Hasil:** membuat `katalog.html` dengan cari nama/kode, filter kategori, urutan terbaru/harga, state di query string, kartu produk bersama, serta empty/error state dengan CTA WhatsApp.
- **Verifikasi:** modul `catalog.js`, `product-card.js`, `main.js` lolos pemeriksaan sintaks; 12 rekaman JSON valid; satu H1 dan kontrol/state katalog terdeteksi; `git diff --check` bersih. Graphify code-only: 43 node, 84 edge, 8 komunitas.
- **Commit:** `48dcb5f` — `feat(katalog): tambah cari dan filter [T06]` (sudah dipush ke `origin/main`).
- **Catatan/Keputusan:** harga tetap disembunyikan sesuai `showPrices:false`; pengurutan harga tersedia berdasarkan data contoh yang tidak ditayangkan.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T07

### [2026-11-15 23:48] T05 — Beranda bagian bawah (DONE)
- **Hasil:** menambahkan katalog unggulan dinamis, keunggulan, langkah belanja, placeholder galeri, ringkasan ulasan, FAQ bertoggle, peta/kontak, CTA, dan footer. Graphify code-only diperbarui.
- **Verifikasi:** sintaks modul JS valid; `git diff --check` bersih; graph berisi 27 node, 54 edge, 7 komunitas. Fitur FAQ testimonial/pemeriksaan/pembayaran/waktu pengerjaan mengikuti `CONFIG`. Tampilan viewport tidak dapat dinilai akurat dari Chrome headless yang melaporkan ukuran keliru.
- **Commit:** `30a9b8d` — `feat(beranda): lengkapi section bawah [T05]` (sudah dipush ke `origin/main`).
- **Catatan/Keputusan:** harga dan kutipan testimoni tetap tersembunyi; seluruh foto galeri masih placeholder. Produk contoh ke-5 ditandai unggulan agar enam kartu tampil.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T06

### [2026-11-15 23:38] T04 — Beranda bagian atas (DONE)
- **Hasil:** membangun header, hero, strip informasi, kartu layanan, dan cara belanja; menambahkan `main.js` dan `pages.css` untuk data CONFIG, tautan kontak, serta toggle fitur.
- **Verifikasi:** satu `<h1>`, anchor internal valid, kontak dan Maps tidak di-hard-code di HTML, pengikatan CONFIG diuji dengan mock DOM; struktur responsif satu kolom mobile dan grid pada breakpoint tablet/desktop. Chrome headless mengabaikan ukuran viewport yang diminta (DOM melaporkan 500px), jadi screenshot 360/768/1280px belum dapat dipastikan.
- **Commit:** `411e8a4` — `feat(beranda): bangun hero dan info toko [T04]`.
- **Catatan/Keputusan:** layanan pemeriksaan mata dan servis tetap tersembunyi sesuai `config.features`; pesan antar hanya mengarahkan pelanggan untuk menanyakan jangkauan dan ongkir.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T05

### [2026-11-15 22:59] T03 — WhatsApp & data produk (DONE)
- **Hasil:** menambahkan `whatsapp.js`, `data.js`, 12 produk contoh, dan SVG placeholder foto. Menambahkan pengecualian untuk file root Graphify yang berisi jalur lokal.
- **Verifikasi:** 12 produk JSON valid dan berlabel Contoh; pemuatan dan normalisasi data lulus; pesan WhatsApp memuat nama dan URL produk; parser CSV menangani koma dalam kutip; fetch gagal menghasilkan pesan fallback. Graphify code-only menghasilkan 23 node, 37 edge, dan 3 komunitas.
- **Commit:** `678534a` — `feat(katalog): tambah data contoh dan WhatsApp [T03]`.
- **Catatan/Keputusan:** harga dan testimoni contoh tidak ditayangkan; `showPrices` dan `showTestimonials` tetap nonaktif. Graphify melewati berkas CSS, JSON, dan `tokens.css` (ditandai sensitif); hasil AST yang tersedia disimpan dalam repo.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T04

### [2026-11-15 22:37] T02 — Komponen & styleguide (DONE)
- **Hasil:** menambahkan `components.css` dan `styleguide.html` berisi tombol, navbar native `<details>`, kartu layanan/produk, badge, strip info, FAQ accordion, footer, tombol WhatsApp mengambang, pembatas, dan motif dua lingkaran.
- **Verifikasi:** HTML memiliki satu `<h1>`, semua anchor dan aset lokal terhubung, tanpa inline style; komponen memakai token, tombol dan kontrol memiliki tinggi sentuh minimum 48px, fokus keyboard dan reduced motion tersedia. Pemeriksaan browser visual terkendala kegagalan GPU headless.
- **Commit:** `5ffb695` — `feat(styleguide): tambah komponen UI [T02]`.
- **Catatan/Keputusan:** grid produk 2 kolom mobile, 3 tablet, 4 desktop. Contoh tombol hanya demonstrasi dan belum menavigasi ke WhatsApp sampai T03.
- **Pertanyaan terbuka:** kemudian diselesaikan saat T03; hasil Graphify code-only disetujui untuk disimpan di repo.
- **Berikutnya:** T03

### [2026-11-15 22:27] T01 — Scaffold & tokens (DONE)
- **Hasil:** membuat `index.html`, token dan base CSS, `CONFIG`, font Google, logo, dan favicon.
- **Verifikasi:** sintaks modul JavaScript valid; kedua SVG valid XML; HTML memiliki satu `<h1>` dan semua referensi aset lokal ditemukan; nilai warna CSS hanya berada di `tokens.css`. Pratinjau headless browser tidak berhasil karena proses GPU gagal di lingkungan ini.
- **Commit:** `33447ac` — `feat(setup): buat scaffold awal [T01]`.
- **Catatan/Keputusan:** toggle pemeriksaan mata dan harga dimatikan karena belum dikonfirmasi; testimoni tetap tersembunyi. `graphify . --code-only` menghasilkan 2 node dan 1 edge; Graphify melewati `tokens.css` karena ditandai sensitif dan tidak mengklasifikasikan `base.css`. Artefak Graphify tidak disertakan dalam commit task.
- **Pertanyaan terbuka:** artefak `graphify-out/` disimpan di repo atau diabaikan lewat `.gitignore`?
- **Berikutnya:** T02

### [2026-11-15 22:14] T00 — Setup repo (DONE)
- **Hasil:** repo, `.gitignore`, struktur awal, dan dokumen sudah tersedia. Branch kerja `main`; remote `origin` diarahkan ke GitHub yang diberikan pengguna.
- **Verifikasi:** status Git bersih sebelum push; push awal `main` berhasil dan branch melacak `origin/main`.
- **Commit:** `371ec0e` — `docs(repo): catat setup awal [T00]`; `15882c7` — `docs(progres): catat hash lokal T00`.
- **Catatan/Keputusan:** tidak ada file setup baru yang diperlukan karena struktur dan dokumen sudah tersedia dari kondisi awal.
- **Pertanyaan terbuka:** —
- **Berikutnya:** T01
