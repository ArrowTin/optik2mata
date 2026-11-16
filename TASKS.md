# TASKS.md — Daftar Task Fase 1

Status: `TODO` · `IN PROGRESS` · `DONE` · `BLOCKED`
Aturan: satu task = satu commit + satu push (lihat `AGENTS.md` bagian 4 & 6). Referensi prompt rinci: `docs/07-prompt-vibe-coding.md`.
Fase 1: T00–T15 · Fase 2 (pengembangan lanjutan, UI animasi): T16–T22.

| ID | Task | Dependensi | Referensi | Status |
|---|---|---|---|---|
| T00 | Setup repo git, remote, `.gitignore`, struktur awal & salin docs | — | AGENTS §6, docs/04 | DONE |
| T01 | Scaffold folder + `tokens.css`, `base.css`, `config.js`, font, logo & favicon | T00 | docs/02, 04; Prompt 1 | DONE |
| T02 | `components.css` + `styleguide.html` (tombol, navbar, kartu, badge, accordion, footer, WA mengambang) | T01 | docs/02; Prompt 2 | DONE |
| T03 | `whatsapp.js` + `data.js` + `products.json` (12 produk **Contoh**) | T01 | docs/03 E, 05; Prompt 4 | DONE |
| T04 | Beranda bagian atas: header, hero, strip info, layanan, cara belanja | T02 | docs/03 A; Prompt 3 | DONE |
| T05 | Beranda bagian bawah: katalog pilihan, keunggulan, proses, galeri, testimoni, FAQ, lokasi, CTA, footer | T03, T04 | docs/03 A; Prompt 3 | DONE |
| T06 | `katalog.html`: cari, filter, urut, query string, empty state | T03, T02 | docs/03 B; Prompt 5 | DONE |
| T07 | `produk.html`: galeri, spesifikasi, tombol WA, produk serupa, id tidak valid | T06 | docs/03 C; Prompt 5 | DONE |
| T08 | `404.html`, fallback error data, tombol kembali ke atas | T05 | docs/04 §6 | DONE |
| T09 | SEO: title/meta, canonical, OG, JSON-LD, robots, sitemap, webmanifest | T07 | docs/06; Prompt 6 | DONE |
| T10 | Performa & aksesibilitas: optimasi gambar, lazy-loading, skip-link, audit Lighthouse + perbaikan | T09 | docs/06; Prompt 6 | DONE |
| T11 | Polesan demo: reveal on scroll, hover, lightbox, animasi lingkaran hero (hormati reduced-motion) | T10 | docs/02 §8; Prompt 7 | DONE |
| T12 | Personalisasi data usaha asli + toggle `config.features` | T11 | docs/00; Prompt 8 | DONE |
| T13 | `README.md` proyek + `docs/panduan-pemilik.md` + `daftar-konfirmasi.md` | T12 | docs/05, 08; Prompt 8 | DONE |
| T14 | Graph Graphify pertama (bila Graphify terpasang) & QA final sesuai checklist | T13 | AGENTS §8; docs/08; Prompt 9 | DONE |
| T15 | Deploy demo ke URL sementara + QR code | T14 | docs/08 §2 | BLOCKED |

## Fase 2 — Pengembangan Lanjutan (UI Animasi)

Referensi: `docs/10-panduan-ui-animasi.md` (hanya Jalur B: vanilla, tanpa build step) dan `AGENTS.md` Bagian 7 "Aturan Gerak". Dikerjakan setelah Fase 1 (T14) selesai. T15 tetap `BLOCKED` dan tidak menghalangi Fase 2.

T11 sudah mencakup reveal bertahap, hover, lightbox, dan animasi ornamen hero. Task di bawah hanya menambah atau merapikan yang belum ada. Setiap task T17–T21 wajib menyertakan toggle di `config.features`.

| ID | Task | Dependensi | Referensi | Status |
|---|---|---|---|---|
| T16 | Fondasi gerak: salin `docs/10-panduan-ui-animasi.md`, audit animasi T11, token gerak disetujui dan ditambahkan ke `tokens.css` + `docs/02` §8, buat `motion.css`/`motion.js` bersama (satu observer, stagger `--d`, reduced-motion global) | T14 | docs/10 §1, §4.0–4.1, §7; AGENTS §7 | DONE |
| T17 | Marquee strip: chip layanan/keunggulan berjalan (tanpa merek `[?]`), jeda saat hover, salinan `aria-hidden` | T16 | docs/10 §4.2 | DONE |
| T18 | Carousel "katalog pilihan" di beranda bisa diseret (scroll-snap + pointer; sentuh dan keyboard tetap native) | T16 | docs/10 §4.3; docs/03 A | DONE |
| T19 | Mockup alur belanja beranimasi: simulasi chat WhatsApp berurutan pada "Cara belanja" (label "Contoh") | T16 | docs/10 §4.5; docs/03 A | DONE |
| T20 | Angka berhitung dari data terkonfirmasi di `config.js` (mis. rating Google Maps), format `id-ID` | T16 | docs/10 §4.4; docs/05 | DONE |
| T21 | Hover kartu produk (`@media (hover: hover)`) dan status header saat scroll | T16 | docs/10 §4.6 | IN PROGRESS |
| T22 | QA akhir Fase 2: uji semua toggle, Lighthouse, reduced-motion, 360/1280px; perbarui graph, `README.md`, dan `docs/panduan-pemilik.md` | T17–T21 | docs/06, 08; AGENTS §8, §10 | TODO |

## Kriteria Lulus Ringkas per Task
| ID | Lulus bila |
|---|---|
| T00 | `git status` bersih, remote terkonfirmasi, push awal berhasil |
| T01 | Halaman kosong memakai font & warna benar; tanpa warna hard-code |
| T02 | `styleguide.html` memuat semua komponen; fokus keyboard terlihat; tombol ≥ 48px |
| T03 | Link WA terisi pesan; data dimuat; fallback error muncul bila JSON dimatikan |
| T04 | Section tampil rapi di 360/768/1280px tanpa overflow horizontal |
| T05 | Semua section sesuai urutan docs/03; toggle `config.features` bekerja |
| T06 | Filter/cari/urut bekerja; URL dapat dibagikan; empty state ada CTA WA |
| T07 | Detail produk valid & invalid tertangani; tombol WA menyertakan nama + tautan |
| T08 | 404 & fallback berfungsi; tombol WA tersedia |
| T09 | JSON-LD valid; sitemap & robots ada; meta per halaman benar |
| T10 | Lighthouse mobile Perf ≥ 90, A11y ≥ 95, SEO ≥ 95, BP ≥ 95; beranda < 1 MB |
| T11 | Tidak lag di HP kecil; reduced-motion dihormati |
| T12 | Data usaha sama persis dengan Google Maps; tidak ada klaim `[?]` tayang |
| T13 | Pemilik dapat menambah produk hanya dengan panduan 1 halaman |
| T14 | Checklist `docs/08` lulus; konsistensi token diverifikasi |
| T15 | URL demo aktif, HTTPS, diuji di Android & iPhone |
| T16 | Token gerak disetujui dan terdokumentasi; satu observer bersama; animasi T11 tetap jalan; reduced-motion dihormati |
| T17 | Loop mulus tanpa lompatan; berhenti saat hover; reduced-motion = statis; tanpa overflow horizontal di 360px |
| T18 | Bisa diseret mouse, digeser sentuh, dan dijelajah keyboard; tidak mengganggu scroll vertikal di HP |
| T19 | Urutan chat berjalan sekali saat terlihat; konten terbaca tanpa animasi; label "Contoh" ada |
| T20 | Angka sama persis dengan data terkonfirmasi; statis saat reduced-motion; nilai akhir benar |
| T21 | Hover tidak aktif di layar sentuh; tidak ada layout shift saat header berubah |
| T22 | Semua toggle Fase 2 diuji; Lighthouse ≥ target Fase 1; QA 360/1280px lulus; graph dan dokumen pemilik diperbarui |

## Backlog (temuan di luar lingkup)
_(kosong — agent menambahkan di sini)_

## Riwayat Penyelesaian
| ID | Tanggal | Commit | Catatan |
|---|---|---|---|
| T00 | 2026-11-15 | `371ec0e`, `15882c7` | Setup lokal dan catatan progres dipush ke `origin/main`. |
| T01 | 2026-11-15 | `33447ac` | Scaffold awal, token visual, konfigurasi, dan aset brand. |
| T02 | 2026-11-15 | `5ffb695` | Komponen dan styleguide mengikuti design system. |
| T03 | 2026-11-15 | `678534a` | Modul WhatsApp, pemuatan data, dan 12 produk contoh. |
| T04 | 2026-11-15 | `411e8a4` | Header, hero, informasi cepat, layanan, dan cara belanja. |
| T05 | 2026-11-15 | `30a9b8d` | Lengkapi section bawah beranda dan integrasi katalog unggulan. |
| T06 | 2026-11-15 | `48dcb5f` | Katalog dengan pencarian, kategori, urutan, URL berbagi, dan empty/error state. |
| T07 | 2026-11-16 | `bdd4caf` | Detail produk dengan galeri, spesifikasi, WhatsApp, rekomendasi, dan state ID/error.
| T08 | 2026-11-16 | `d9c8070` | Halaman 404, fallback data dengan opsi muat ulang, dan tombol kembali ke atas. |
| T09 | 2026-11-16 | `49a57a5` | Metadata SEO, Open Graph, JSON-LD Optician, robots, sitemap, webmanifest, dan gambar OG SVG. |
| T10 | 2026-11-16 | `f689386` | Pemuatan font saat browser senggang; Lighthouse lokal memenuhi target. |
| T11 | 2026-11-16 | `3346165` | Reveal bertahap, lightbox galeri, dan animasi ornamen dengan reduced-motion. |
| T12 | 2026-11-16 | `6171743` | Verifikasi data usaha dan toggle fitur yang sudah dipersonalisasi. |
| T13 | 2026-11-16 | `0fe96bc` | README, panduan pemilik, dan daftar konfirmasi dibuat. |
| T14 | 2026-11-16 | `c4bed57` | Graph code-only diperbarui dan QA statis/responsif lokal selesai. |
| T16 | 2026-11-16 | `a237a73` | Token gerak disetujui; fondasi reveal bersama dan reduced-motion ditambahkan. |
| T17 | 2026-11-16 | `daaca7a` | Marquee chip layanan terkonfirmasi dengan toggle dan reduced-motion statis. |
| T18 | 2026-11-16 | `2f902a6` | Carousel scroll-snap dengan drag mouse, sentuh, dan fokus keyboard. |
| T19 | 2026-11-16 | `0bec419` | Mockup chat contoh tampil berurutan dan CTA memakai modul WhatsApp. |
| T20 | 2026-11-16 | `6176a75` | Rating dan jumlah ulasan dihitung dari config serta memakai format id-ID. |
