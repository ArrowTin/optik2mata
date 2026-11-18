# Optik 2Mata Bengkayang

Website profil, katalog kacamata, dan tindak lanjut pemesanan via WhatsApp untuk **Optik 2Mata Bengkayang** di Sebalo, Bengkayang, Kalimantan Barat.

Dibangun dengan HTML, CSS, dan JavaScript vanilla — tanpa framework, tanpa proses build, dan siap dihosting sebagai situs statis.

## Tentang Website

Website ini membantu calon pelanggan untuk:

- mengenal layanan Optik 2Mata Bengkayang;
- melihat koleksi frame dan kacamata;
- mencari dan memfilter produk sesuai kategori;
- menghubungi toko langsung melalui WhatsApp dengan pesan yang sudah terisi.

Semua tautan WhatsApp, telepon, dan Google Maps dibuat dari satu konfigurasi di [`assets/js/config.js`](assets/js/config.js), sehingga nomor dan alamat tidak ditulis berulang di setiap halaman.

## Halaman

| Halaman | Fungsi |
|---|---|
| [`index.html`](index.html) | Beranda: hero, layanan, cara belanja, katalog pilihan, galeri, FAQ, lokasi, dan CTA WhatsApp |
| [`katalog.html`](katalog.html) | Katalog dengan pencarian, filter kategori, pengurutan, dan URL yang bisa dibagikan |
| [`produk.html`](produk.html) | Detail produk: galeri, spesifikasi, tombol tanya via WhatsApp, dan produk serupa |
| [`404.html`](404.html) | Halaman tidak ditemukan dengan jalan kembali ke beranda |
| [`styleguide.html`](styleguide.html) | Referensi visual komponen internal |

## Fitur

- **Mobile-first dan responsif** — diuji untuk layar kecil hingga desktop, tanpa scroll horizontal.
- **Katalog data-driven** — produk dibaca dari `data/products.json`, dengan opsi sumber Google Sheets (CSV).
- **Pencarian, filter, dan urutan** — state katalog disimpan di query string sehingga tautan bisa dibagikan.
- **WhatsApp otomatis** — pesan produk berisi nama, kode, dan tautan produk; nomor hanya diatur sekali di konfigurasi.
- **Toggle fitur** — harga, testimoni, layanan antar, pemeriksaan mata, dan efek animasi dapat dinyalakan/dimatikan lewat `config.js`.
- **Animasi ringan** — reveal saat scroll, marquee layanan, carousel yang bisa diseret, mockup chat, dan angka berhitung.
- **Menghormati `prefers-reduced-motion`** — pengguna yang mematikan animasi tetap mendapat konten dan tombol yang berfungsi.
- **SEO dasar** — metadata, Open Graph, JSON-LD `Optician`, `robots.txt`, `sitemap.xml`, dan `site.webmanifest`.
- **Aksesibilitas** — skip link, HTML semantik, fokus keyboard yang terlihat, dan area sentuh minimal 48px.

## Teknologi

- **HTML5** semantik.
- **CSS3** — custom properties/token desain, flexbox, grid, scroll-snap, dan media query.
- **JavaScript ES modules** tanpa framework.
- **JSON** sebagai sumber data katalog.
- **Google Fonts** — Plus Jakarta Sans dan Inter.
- **GitHub Pages + GitHub Actions** untuk deploy statis tanpa build.
- **Graphify** untuk pemetaan kode saat pengembangan (tidak dipakai saat runtime).

Tidak ada framework, bundler, database, atau backend.

## Struktur Proyek

```text
.
├── index.html
├── katalog.html
├── produk.html
├── 404.html
├── styleguide.html
├── assets/
│   ├── css/              # token, base, komponen, halaman, motion
│   ├── js/               # config, data, whatsapp, halaman, komponen, motion
│   └── img/              # logo, favicon, placeholder
├── data/
│   └── products.json
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

## Menjalankan Secara Lokal

Jangan membuka `index.html` langsung dari file explorer karena katalog mengambil data JSON melalui HTTP.

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Mengubah Data Toko

- **Informasi usaha, nomor WhatsApp, jam buka, rating, dan toggle fitur:** [`assets/js/config.js`](assets/js/config.js).
- **Produk:** [`data/products.json`](data/products.json).
- **Nomor WhatsApp:** tulis pada `phoneIntl` tanpa tanda `+`; tautan dibuat otomatis oleh [`assets/js/whatsapp.js`](assets/js/whatsapp.js).

## Deploy

Repositori ini disiapkan untuk GitHub Pages melalui [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). Workflow hanya mengemas file publik (HTML, `assets/`, dan `data/`) ke folder `dist` tanpa proses build.

## Developer

**TinDev**

## Dukungan

Kalau website ini bermanfaat, Anda bisa mendukung pengembangan selanjutnya melalui PayPal:

[![Donasi via PayPal](https://img.shields.io/badge/Donasi-PayPal-00457C?logo=paypal&logoColor=white)](https://www.paypal.com/paypalme/andrianustinas)

Atau langsung: <https://www.paypal.com/paypalme/andrianustinas>

## Catatan

- Foto produk dan galeri saat ini memakai foto stok Unsplash sebagai ilustrasi. Ganti dengan foto asli toko sebelum dipublikasikan sebagai konten resmi.
- Data produk pada `products.json` masih berupa data contoh; harga disembunyikan hingga dikonfirmasi pemilik.
- Dokumen internal proyek (perencanaan, design system, dan panduan operasional) disimpan lokal dan tidak disertakan di repositori publik.
