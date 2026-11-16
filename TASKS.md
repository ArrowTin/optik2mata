# TASKS.md — Daftar Task Fase 1

Status: `TODO` · `IN PROGRESS` · `DONE` · `BLOCKED`
Aturan: satu task = satu commit + satu push (lihat `AGENTS.md` bagian 4 & 6). Referensi prompt rinci: `docs/07-prompt-vibe-coding.md`.

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
| T11 | Polesan demo: reveal on scroll, hover, lightbox, animasi lingkaran hero (hormati reduced-motion) | T10 | docs/02 §8; Prompt 7 | TODO |
| T12 | Personalisasi data usaha asli + toggle `config.features` | T11 | docs/00; Prompt 8 | TODO |
| T13 | `README.md` proyek + `docs/panduan-pemilik.md` + `daftar-konfirmasi.md` | T12 | docs/05, 08; Prompt 8 | TODO |
| T14 | Graph Graphify pertama (bila Graphify terpasang) & QA final sesuai checklist | T13 | AGENTS §8; docs/08; Prompt 9 | TODO |
| T15 | Deploy demo ke URL sementara + QR code | T14 | docs/08 §2 | TODO |

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
