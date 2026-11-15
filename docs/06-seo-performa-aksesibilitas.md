# 06 — SEO Lokal, Performa & Aksesibilitas

## 1. SEO On-Page
| Halaman | `<title>` | Meta description |
|---|---|---|
| Beranda | Optik 2Mata Bengkayang — Kacamata & Lensa di Sebalo | Optik 2Mata Bengkayang di Sebalo. Kacamata, lensa & layanan optik. Buka setiap hari 08.00–21.00. Chat WhatsApp untuk tanya produk. |
| Katalog | Koleksi Frame & Kacamata — Optik 2Mata Bengkayang | Lihat koleksi frame kacamata pria, wanita, dan anak. Tanya & pesan lewat WhatsApp. |
| Produk | {nama} — Optik 2Mata Bengkayang | Dinamis dari data produk. |

- Satu `<h1>` per halaman; heading berurutan.
- URL bersih, `canonical`, `lang="id"`.
- Kata kunci alami: optik Bengkayang, kacamata Bengkayang, periksa mata Bengkayang `[?]`, optik Sebalo.
- Open Graph + Twitter Card, gambar `og-image.jpg` 1200×630.
- `robots.txt`, `sitemap.xml`, favicon, `site.webmanifest`.

## 2. Data Terstruktur (JSON-LD) — di beranda
```json
{
  "@context": "https://schema.org",
  "@type": "Optician",
  "name": "Optik 2Mata Bengkayang",
  "image": "https://DOMAIN/assets/img/brand/og-image.jpg",
  "telephone": "+6281389514572",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Bengkayang–Sanggau Ledo, Sebalo",
    "addressLocality": "Bengkayang",
    "addressRegion": "Kalimantan Barat",
    "postalCode": "79212",
    "addressCountry": "ID"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "08:00", "closes": "21:00"
  }],
  "url": "https://DOMAIN/",
  "hasMap": "https://maps.app.goo.gl/6pxQiTFackUhvsSF7"
}
```
Jangan menambahkan `aggregateRating` kecuali dapat diverifikasi dan sesuai aturan Google. Produk: `Product` schema opsional di halaman detail.

## 3. Google Business Profile (di luar kode, tapi menentukan hasil)
- Pasang URL website, samakan nama/alamat/telepon persis dengan web.
- Tambah foto, layanan, dan balas ulasan; ajak pelanggan mengulas (QR di toko).
- Tambahkan tautan WhatsApp.

## 4. Anggaran Performa
| Metrik | Target |
|---|---|
| LCP | ≤ 2,5 dtk |
| CLS | ≤ 0,1 |
| INP | ≤ 200 ms |
| Transfer awal beranda | < 1 MB |
| JS total | < 60 KB (tanpa pustaka berat) |
| CSS total | < 40 KB |

Taktik: gambar WebP + `srcset`, hero dengan `fetchpriority="high"`, gambar lain `loading="lazy"`, font `display=swap` + preconnect, peta di-*lazy* (muat saat terlihat), tanpa pustaka animasi besar, minify CSS/JS saat rilis.

## 5. Aksesibilitas (WCAG 2.1 AA)
- Kontras teks ≥ 4.5:1 (teks tombol WA: gunakan `--color-ink` di atas hijau bila perlu).
- Area sentuh ≥ 44–48px.
- Fokus keyboard terlihat; urutan tab logis; skip-link "Lewati ke konten".
- `alt` bermakna; ikon dekoratif `aria-hidden="true"`.
- Accordion native `<details>`; navbar mobile memakai `aria-expanded`.
- Hormati `prefers-reduced-motion` & `prefers-color-scheme` (Fase 1 cukup tema terang).
- Teks tidak dalam gambar.

## 6. Pelacakan (opsional, untuk bukti nilai)
Event: `click_wa` (lokasi tombol), `click_call`, `click_route`, `view_product`. Plausible/GA4. Tampilkan ke pemilik sebagai laporan bulanan sederhana.
