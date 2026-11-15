# Paket Dokumen Teknis — Optik 2Mata Bengkayang (Fase 1)

Paket ini adalah **panduan eksekusi vibe coding** untuk membangun website Fase 1 (Profil + Katalog + Pesan via WhatsApp) Optik 2Mata Bengkayang.

## Tujuan Utama
1. Menghasilkan website **demo yang meyakinkan** sehingga pemilik toko mau membeli.
2. Konsisten (satu design system), sesuai tema optik, menarik, **bersih**.
3. **Mudah dioperasikan** pemilik: cukup edit satu Google Sheet / satu file, tanpa coding.

## Isi Paket (urutan baca & kerja)
| No | File | Fungsi |
|---|---|---|
| 00 | `00-README.md` | Ringkasan & cara pakai |
| — | `../AGENTS.md`, `../TASKS.md`, `../PROGRESS.md` | Aturan agent, task, progres |
| 01 | `01-PRD-ruang-lingkup.md` | Tujuan, ruang lingkup, kriteria sukses |
| 02 | `02-design-system.md` | Warna, font, komponen, gaya visual (sumber kebenaran desain) |
| 03 | `03-halaman-dan-konten.md` | Struktur tiap halaman + draf teks Indonesia |
| 04 | `04-arsitektur-teknis.md` | Stack, struktur folder, aturan kode |
| 05 | `05-data-dan-operasional.md` | Skema data produk & cara pemilik mengelola |
| 06 | `06-seo-performa-aksesibilitas.md` | SEO lokal, kecepatan, a11y |
| 07 | `07-prompt-vibe-coding.md` | Urutan prompt siap tempel ke AI coding agent |
| 08 | `08-qa-deploy-serah-terima.md` | Uji, deploy, serah terima |
| 09 | `09-strategi-penjualan.md` | Cara demo, paket, skrip presentasi ke pemilik |

## Struktur Paket
```
optik2mata-fase1/
├── AGENTS.md      ← aturan kerja agent (dibaca otomatis oleh banyak agent)
├── TASKS.md       ← daftar task T00–T15 + status
├── PROGRESS.md    ← catatan kemajuan
├── .gitignore
└── docs/          ← file 00–09 (dokumen ini)
```

## Cara Pakai dengan AI Coding Agent
1. Taruh seluruh isi paket ini di root repositori proyek (`AGENTS.md`, `TASKS.md`, `PROGRESS.md` di root; dokumen di `/docs`).
2. Beri agent instruksi: *"Baca AGENTS.md lalu semua file di /docs. Kerjakan TASKS.md berurutan mulai T00; tiap task di-commit dan di-push."*
3. Agent mengikuti `AGENTS.md`: satu task = satu commit + push, progres dicatat di `PROGRESS.md`.
4. Prompt rinci per langkah tersedia di `07-prompt-vibe-coding.md` bila ingin mengarahkan manual; uji setiap langkah di HP sebelum lanjut.
4. Tandai `[?]` = data yang belum dikonfirmasi; gunakan placeholder, jangan mengarang fakta.

## Fakta Usaha (sudah pasti, dari Google Maps)
| Item | Isi |
|---|---|
| Nama | Optik 2Mata Bengkayang |
| Alamat | Jl. Bengkayang–Sanggau Ledo, Sebalo, Kec. Bengkayang, Kab. Bengkayang, Kalimantan Barat 79212 |
| Plus code | RFMR+V2 Sebalo |
| Jam buka | Setiap hari 08.00–21.00 |
| Telepon/WA | 0813-8951-4572 (format WA: `6281389514572`) |
| Rating Google | 4,3 dari 9 ulasan |
| Layanan di Google | Belanja di toko, Ambil di toko, Pesan antar |
| Link Maps | https://maps.app.goo.gl/6pxQiTFackUhvsSF7 |

## Aturan Emas Proyek
- **Jangan mengarang** merek, harga, testimoni, sertifikasi, atau klaim medis. Pakai placeholder bertanda `[?]` / data contoh yang jelas berlabel "Contoh".
- **Satu design system**, tidak ada gaya baru di luar `02-design-system.md`.
- **Mobile-first**, tombol WhatsApp selalu mudah dijangkau.
- **Tanpa build step** & tanpa backend di Fase 1 → murah, cepat, mudah dirawat.
