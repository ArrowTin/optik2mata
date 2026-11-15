# 04 — Arsitektur Teknis Fase 1

## 1. Keputusan Stack
| Aspek | Pilihan | Alasan |
|---|---|---|
| Teknologi | **HTML + CSS + JavaScript vanilla** (ES modules) | Tanpa build, cepat, mudah di-hosting & diserahkan |
| Data | `data/products.json` (+ opsi Google Sheets CSV) | Pemilik bisa edit tanpa coding |
| Ikon | Lucide (SVG inline / sprite) | Ringan, konsisten |
| Font | Google Fonts (swap) | Sesuai design system |
| Hosting | Cloudflare Pages / Netlify / hosting biasa | Gratis/murah, HTTPS otomatis |
| Peta | Embed Google Maps iframe (lazy) | Tanpa API key |
| Analitik | Plausible atau GA4 (opsional) + event klik WA | Bukti nilai ke pemilik |

> Alternatif PHP (selaras keahlian Anda) hanya jika hosting pemilik PHP & ingin admin sederhana — namun Fase 1 sengaja statis supaya cepat & aman.

## 2. Struktur Folder
```
optik2mata/
├── index.html
├── katalog.html
├── produk.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── assets/
│   ├── css/
│   │   ├── tokens.css        # variabel dari 02-design-system
│   │   ├── base.css          # reset, tipografi, layout
│   │   ├── components.css    # tombol, kartu, navbar, accordion
│   │   └── pages.css         # gaya khusus halaman
│   ├── js/
│   │   ├── config.js         # data usaha, WA, toggle section
│   │   ├── data.js           # ambil & normalisasi produk
│   │   ├── whatsapp.js       # pembuat link WA
│   │   ├── catalog.js        # filter/cari/urut
│   │   ├── product.js        # detail produk
│   │   ├── ui.js             # navbar, accordion, lightbox, reveal
│   │   └── main.js           # init per halaman
│   ├── img/
│   │   ├── brand/            # logo.svg, favicon, og-image.jpg
│   │   ├── produk/           # foto produk (webp)
│   │   └── galeri/
│   └── icons/                # sprite.svg
├── data/
│   └── products.json
└── docs/                     # file .md paket ini
```

## 3. Konfigurasi Pusat (`assets/js/config.js`)
Semua informasi usaha & toggle ada di satu tempat:
```js
export const CONFIG = {
  business: {
    name: "Optik 2Mata Bengkayang",
    shortName: "2Mata",
    tagline: "Lihat Lebih Jelas, Tampil Lebih Percaya Diri", // [?]
    address: "Jl. Bengkayang–Sanggau Ledo, Sebalo, Kec. Bengkayang, Kab. Bengkayang, Kalimantan Barat 79212",
    plusCode: "RFMR+V2 Sebalo",
    phoneDisplay: "0813-8951-4572",
    phoneIntl: "6281389514572",
    mapsUrl: "https://maps.app.goo.gl/6pxQiTFackUhvsSF7",
    hours: { all: "08.00–21.00" },
    rating: { value: 4.3, count: 9 },
    social: { instagram: "", facebook: "", tiktok: "" } // [?]
  },
  features: {
    showTestimonials: false,   // aktifkan bila ada testimoni asli
    showPrices: true,          // false → tampil "Tanya harga"
    showDelivery: true,        // [?] sesuaikan
    showEyeExam: true,         // [?] sesuaikan
    hideSoldOut: false
  },
  data: {
    source: "json",            // "json" | "sheet"
    jsonUrl: "data/products.json",
    sheetCsvUrl: ""            // URL CSV dari Google Sheets (publish to web)
  }
};
```

## 4. Modul Kunci
### 4.1 `whatsapp.js`
```js
export function waLink(text) {
  return `https://wa.me/${CONFIG.business.phoneIntl}?text=${encodeURIComponent(text)}`;
}
export function waProduct(p) { /* template produk dari 03-halaman-dan-konten.md E */ }
```
Semua tombol WA memakai fungsi ini (tidak ada nomor hard-code di HTML selain fallback).

### 4.2 `data.js`
- Ambil dari JSON atau CSV Sheets, **normalisasi** ke skema di `05`.
- Cache sederhana (`sessionStorage`, dibungkus try/catch).
- Error → tampilkan pesan ramah + tombol WA, bukan halaman kosong.

### 4.3 `catalog.js`
Filter kategori, pencarian teks (case-insensitive, abaikan spasi), urutkan harga/terbaru; sinkron dengan query string (`?cat=anak&q=...`) supaya bisa dibagikan.

### 4.4 `ui.js`
Navbar mobile, `<details>` FAQ, lightbox galeri (tanpa pustaka berat), reveal on scroll dengan `IntersectionObserver` (hormati `prefers-reduced-motion`).

## 5. Aturan Kode (untuk konsistensi vibe coding)
1. Semua warna/spasi/radius **hanya** via CSS variables dari `tokens.css`.
2. Nama kelas BEM ringan: `.card`, `.card__title`, `.card--product`.
3. HTML semantik: `header, nav, main, section, footer`, satu `h1` per halaman.
4. Tidak ada jQuery/framework/CSS framework besar. Pustaka eksternal ≤ 1 (opsional).
5. JS: ES modules, fungsi kecil, komentar singkat berbahasa Indonesia pada logika penting.
6. Tanpa inline style kecuali sangat perlu. Tanpa `!important`.
7. Semua teks tampil dari HTML/`config.js`/data; tidak tersebar acak di JS.
8. Setiap gambar: `alt`, `width`, `height`, `loading`, format WebP.
9. Semua tautan eksternal: `rel="noopener"`; WA/telepon: `target="_blank"` hanya untuk WA.
10. Aksesibilitas: fokus terlihat, label tombol jelas, kontras ≥ 4.5:1.

## 6. Penanganan Error & Fallback
| Kasus | Perilaku |
|---|---|
| JSON/Sheet gagal dimuat | Pesan: "Katalog sedang dimuat ulang. Chat kami untuk info produk." + tombol WA |
| Produk id tidak ada | Redirect ke katalog + toast |
| JS nonaktif | Konten dasar beranda tetap terbaca (progressive enhancement); katalog menampilkan tautan WA |
| Gambar gagal | Placeholder SVG |

## 7. Keamanan & Privasi
- HTTPS wajib, tanpa menyimpan data pelanggan di Fase 1.
- Tidak ada form yang mengirim data ke server; kontak lewat WA/telepon.
- Header keamanan dasar via hosting (CSP longgar untuk Google Fonts/Maps, `X-Content-Type-Options`, `Referrer-Policy`).
- Jangan menaruh kunci rahasia di repo.

## 8. Peramban yang Didukung
Chrome/Android (2 versi terakhir), Safari iOS 15+, Firefox, Edge. Uji juga HP RAM kecil.
