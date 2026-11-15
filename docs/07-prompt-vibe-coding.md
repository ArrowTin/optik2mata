# 07 — Prompt Vibe Coding (Siap Tempel)

**Cara:** jalankan berurutan. Setelah tiap langkah: buka di HP (atau DevTools 360px), cek *Acceptance*, baru lanjut. Jika hasil menyimpang, minta agent **mengoreksi sesuai dokumen**, bukan menambah gaya baru.

## Prompt 0 — Konteks Global (tempel di awal sesi)
```
Kamu membangun website Fase 1 untuk "Optik 2Mata Bengkayang" (toko optik lokal).
Baca AGENTS.md, TASKS.md, lalu SEMUA file di /docs (00–09) sebelum menulis kode. Kerjakan per task; setiap task di-commit & di-push, progres dicatat di PROGRESS.md.
Aturan keras:
- Stack: HTML + CSS + JS vanilla (ES modules), TANPA build step & TANPA framework.
- Ikuti /docs/02-design-system.md dan /docs/04-arsitektur-teknis.md secara ketat.
- Semua warna/spasi/radius lewat CSS variables (tokens.css). Dilarang warna di luar token.
- Mobile-first, Bahasa Indonesia, tema optik "Dua Lingkaran".
- Jangan mengarang merek/harga/testimoni/klaim medis. Gunakan placeholder berlabel "Contoh".
- Semua data usaha dari config.js, semua produk dari data/products.json.
Konfirmasi dengan merangkum rencana 5 poin, lalu tunggu perintah berikutnya.
```

## Prompt 1 — Scaffold & Tokens
```
Buat struktur folder sesuai 04-arsitektur-teknis.md (bagian 2). Buat tokens.css persis dari 02-design-system.md,
base.css (reset, tipografi, container, utilitas kecil), config.js sesuai contoh.
Pasang Google Fonts (Plus Jakarta Sans 700/800, Inter 400/500/600) dengan preconnect + display=swap.
Buat logo.svg "dua lingkaran + 2Mata" dan favicon.
```
**Acceptance:** halaman kosong memakai font & warna benar; tidak ada warna hard-code.

## Prompt 2 — Komponen
```
Buat components.css: tombol (.btn-wa/.btn-primary/.btn-outline/.btn-ghost), navbar sticky + menu mobile,
kartu layanan, kartu produk, badge, strip info, accordion (<details>), footer, tombol WA mengambang (mobile),
pembatas section "dua titik", ornamen dua lingkaran. Buat halaman sementara /styleguide.html yang menampilkan semua komponen.
```
**Acceptance:** styleguide lengkap, kontras OK, fokus keyboard terlihat, tinggi tombol ≥ 48px.

## Prompt 3 — Beranda
```
Bangun index.html mengikuti urutan section di 03-halaman-dan-konten.md (bagian A). Gunakan teks draf; tandai [?] sebagai
komentar HTML. Hero dengan CTA WhatsApp & Katalog, strip info, layanan, cara belanja, katalog pilihan (dari data),
keunggulan, proses, galeri (placeholder SVG berlabel), testimoni (ikuti config.features.showTestimonials), FAQ, lokasi (iframe lazy), CTA, footer.
Respect toggle di config.features (showEyeExam, showDelivery).
```
**Acceptance:** semua section tampil rapi di 360/768/1280px; tidak ada overflow horizontal; semua tombol berfungsi.

## Prompt 4 — WhatsApp & Data
```
Implementasikan whatsapp.js (waLink, waProduct, template di 03 bagian E), data.js (muat JSON atau Sheet CSV,
normalisasi sesuai skema di 05, cache sessionStorage dengan try/catch, error ramah).
Buat data/products.json berisi 12 produk CONTOH berlabel "Contoh" (campuran kategori & harga).
Ganti semua nomor WA hard-code dengan fungsi.
```
**Acceptance:** klik tombol produk membuka WA dengan pesan terisi nama+tautan; matikan JSON → muncul pesan fallback.

## Prompt 5 — Katalog & Detail Produk
```
Bangun katalog.html: pencarian, filter kategori (chip), urutkan, grid responsif, empty state dengan CTA WA, sinkron query string.
Bangun produk.html?id=: galeri, spesifikasi, tombol WA besar, produk serupa. Tangani id tidak valid.
```
**Acceptance:** filter bekerja, URL bisa dibagikan, tersedia=tidak menampilkan badge Habis.

## Prompt 6 — SEO, Performa, A11y
```
Terapkan 06-seo-performa-aksesibilitas.md: title/meta per halaman, canonical, OG, JSON-LD Optician (placeholder domain),
robots.txt, sitemap.xml, webmanifest, skip-link, alt gambar, lazy-loading, srcset bila ada.
Optimalkan gambar placeholder; pastikan total transfer beranda < 1 MB. Jalankan audit Lighthouse mobile & perbaiki temuan.
```
**Acceptance:** target di 01-PRD bagian 6 tercapai.

## Prompt 7 — Polesan "Wow" untuk Demo
```
Tambahkan polesan halus yang sesuai design system: reveal on scroll (hormati reduced-motion), hover kartu, transisi navbar,
lightbox galeri, animasi dua lingkaran lembut di hero (CSS saja). Pastikan tidak ada animasi mengganggu / lag di HP kecil.
Buat halaman 404 dan tombol "kembali ke atas".
```

## Prompt 8 — Personalisasi Demo untuk Pemilik
```
Pasang data nyata yang sudah pasti (nama, alamat, jam, telepon, rating 4,3 (9 ulasan), link Maps).
Siapkan toggle config.features sesuai jawaban pemilik. Buat README.md proyek berisi: cara edit config, cara tambah produk,
cara deploy. Buat docs/panduan-pemilik.md (1 halaman, bahasa awam) berdasarkan 05-data-dan-operasional.md.
```

## Prompt 9 — QA Final
```
Jalankan checklist di 08-qa-deploy-serah-terima.md. Laporkan hasil tiap butir (lulus/gagal) dan perbaiki yang gagal.
Cek konsistensi: tidak ada warna/font di luar token, tidak ada teks Lorem Ipsum, semua [?] terdaftar di daftar-konfirmasi.md.
```

## Prompt Perbaikan Umum (gunakan saat hasil melenceng)
```
Hasil belum sesuai 02-design-system.md: [sebutkan masalah, mis. "tombol terlalu kecil", "warna di luar token"].
Perbaiki hanya bagian itu tanpa mengubah komponen lain. Tunjukkan file & baris yang diubah.
```

## Tips Vibe Coding
- Satu prompt = satu hasil yang bisa diuji. Jangan gabung banyak langkah.
- Selalu lampirkan/mention file docs yang relevan.
- Commit git setelah tiap prompt lulus (`git commit -m "step-3 beranda"`).
- Uji di HP asli sebelum lanjut.
