# PROGRESS.md — Catatan Kemajuan

Entri terbaru di **atas**. Format entri ada di `AGENTS.md` bagian 5.

## Status Saat Ini
- Task aktif: —
- Terakhir selesai: T02
- Terblokir: —
- Pertanyaan terbuka untuk pengguna: pilihan pengelolaan artefak `graphify-out/`

## Log

### [2026-11-15 22:37] T02 — Komponen & styleguide (DONE)
- **Hasil:** menambahkan `components.css` dan `styleguide.html` berisi tombol, navbar native `<details>`, kartu layanan/produk, badge, strip info, FAQ accordion, footer, tombol WhatsApp mengambang, pembatas, dan motif dua lingkaran.
- **Verifikasi:** HTML memiliki satu `<h1>`, semua anchor dan aset lokal terhubung, tanpa inline style; komponen memakai token, tombol dan kontrol memiliki tinggi sentuh minimum 48px, fokus keyboard dan reduced motion tersedia. Pemeriksaan browser visual terkendala kegagalan GPU headless.
- **Commit:** `5ffb695` — `feat(styleguide): tambah komponen UI [T02]`.
- **Catatan/Keputusan:** grid produk 2 kolom mobile, 3 tablet, 4 desktop. Contoh tombol hanya demonstrasi dan belum menavigasi ke WhatsApp sampai T03.
- **Pertanyaan terbuka:** artefak Graphify code-only tetap lokal dan tidak disertakan dalam commit; keputusan aturan simpan/abaikan belum diterima.
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
