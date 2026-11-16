# 02 — Design System "Dua Lingkaran"

Sumber kebenaran visual. **Semua komponen wajib memakai token di sini.**

## 1. Konsep & Karakter
- **Ide utama:** nama "2Mata" → motif **dua lingkaran berdampingan/ tumpang tindih** (lensa kacamata). Dipakai di logo placeholder, ornamen hero, pembatas section, ikon.
- **Karakter:** bersih, terpercaya, hangat, modern. Bukan klinis dingin.
- **Nada bahasa:** ramah, sederhana, Bahasa Indonesia sehari-hari yang sopan.
- **Prinsip:** ruang putih lega · satu aksi utama per layar (WhatsApp) · foto produk seragam.

## 2. Token Warna (CSS variables)
```css
:root {
  /* Brand */
  --color-ink:        #12263A; /* teks utama, header gelap */
  --color-primary:    #0E7C86; /* teal: tombol, link, ikon */
  --color-primary-dk: #0A5C64; /* hover/active */
  --color-primary-lt: #E3F3F4; /* latar lembut */
  --color-accent:     #F2A541; /* amber: badge, highlight kecil */
  --color-wa:         #25D366; /* HANYA untuk tombol WhatsApp */
  --color-wa-dk:      #1DA851;

  /* Netral */
  --color-bg:         #F7FAFA;
  --color-surface:    #FFFFFF;
  --color-border:     #DCE6E8;
  --color-muted:      #5B6B79; /* teks sekunder (kontras ≥ 4.5:1 di atas putih) */

  /* Status */
  --color-success:    #1B8F5A;
  --color-danger:     #C0392B;
}
```
Aturan: warna aksen amber ≤ 10% area layar. Hijau WA hanya pada tombol WhatsApp.

## 3. Tipografi
| Peran | Font | Bobot | Fallback |
|---|---|---|---|
| Heading | **Plus Jakarta Sans** | 700, 800 | system-ui, sans-serif |
| Body | **Inter** | 400, 500, 600 | system-ui, sans-serif |

Muat lewat Google Fonts dengan `display=swap` (hanya bobot yang dipakai).

```css
:root {
  --font-heading: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;

  --fs-xs: 0.8125rem;  /* 13 */
  --fs-sm: 0.9375rem;  /* 15 */
  --fs-base: 1rem;     /* 16 */
  --fs-lg: 1.25rem;    /* 20 */
  --fs-xl: clamp(1.5rem, 1.2rem + 1.2vw, 2rem);      /* H2 */
  --fs-2xl: clamp(2rem, 1.4rem + 2.6vw, 3.25rem);    /* H1 */
  --lh-body: 1.6; --lh-heading: 1.2;
}
```

## 4. Spasi, Radius, Bayangan
```css
:root {
  --space-1: .25rem; --space-2: .5rem; --space-3: .75rem; --space-4: 1rem;
  --space-5: 1.5rem; --space-6: 2rem; --space-7: 3rem; --space-8: 5rem;
  --radius-sm: 8px; --radius-md: 14px; --radius-lg: 24px; --radius-pill: 999px;
  --shadow-sm: 0 1px 3px rgba(18,38,58,.08);
  --shadow-md: 0 8px 24px rgba(18,38,58,.10);
  --container: 1120px;
}
```
- Section vertikal padding: `--space-8` desktop, `--space-7` mobile.
- Container: `max-width: var(--container)`, padding samping 1rem (mobile) / 2rem (desktop).

## 5. Motif Dua Lingkaran (wajib konsisten)
- **Logo placeholder:** dua lingkaran outline teal (stroke 3px) tumpang tindih 25% + tulisan "2Mata" (Plus Jakarta Sans 800) + subteks "Optik Bengkayang".
- **Ornamen hero:** dua lingkaran besar `--color-primary-lt` di belakang foto/ilustrasi, sebagian terpotong tepi.
- **Pembatas section:** dua titik lingkaran kecil di tengah garis tipis `--color-border`.
- **Ikon:** gaya garis (stroke 1.75px, sudut membulat). Gunakan satu pustaka saja (Lucide via SVG inline).
- **Bentuk foto produk:** kartu dengan latar `--color-primary-lt`, foto produk di tengah.

## 6. Komponen
### Tombol
| Varian | Gaya | Pemakaian |
|---|---|---|
| `.btn-wa` | latar `--color-wa`, teks putih/ink (kontras), ikon WA, pill | Aksi utama: Chat WhatsApp |
| `.btn-primary` | latar `--color-primary`, teks putih | Aksi sekunder (Lihat Katalog) |
| `.btn-outline` | border primary, teks primary | Rute, Telepon |
| `.btn-ghost` | tanpa border | Tautan ringan |
Tinggi minimum 48px (area sentuh), `border-radius: var(--radius-pill)`, fokus terlihat (outline 3px primary-lt + offset).

### Kartu Produk
Rasio gambar 4:3, latar `--color-primary-lt`, nama (600), kategori kecil (muted), harga ("Mulai Rp …" atau "Tanya harga"), badge opsional (Baru/Promo, amber), tombol `.btn-wa` kecil "Tanya produk ini". Hover: naik 2px + `--shadow-md`.

### Kartu Layanan
Ikon dalam lingkaran `--color-primary-lt`, judul, 1–2 kalimat.

### Navbar
Putih, sticky, logo kiri, menu tengah/kanan, tombol WA kanan. Mobile: ikon hamburger → panel penuh.

### Tombol WA Mengambang (mobile)
Pill di kanan bawah, "Chat WhatsApp", z-index tinggi, tidak menutup konten penting (beri padding-bottom 80px di body mobile).

### Accordion FAQ, Badge, Strip Info
Konsisten dengan token di atas; accordion dengan `<details>` native.

## 7. Fotografi & Gambar
- Foto produk: latar putih/abu polos, cahaya merata, sudut sama (tampak depan 3/4). Rasio 4:3, lebar 800px, format WebP (≤ 80 KB).
- Foto toko: terang, rapi, orientasi landscape 16:9, lebar 1400px (≤ 150 KB).
- Jika belum ada foto: gunakan placeholder SVG berlabel "Foto segera hadir", **bukan** foto stok palsu.
- Semua gambar punya `alt` deskriptif, `width`/`height`, dan `loading="lazy"` (kecuali hero).

## 8. Gerak (Motion)
Halus & hemat: animasikan hanya `transform` dan `opacity`, gunakan token berikut untuk durasi dan easing, serta hormati `prefers-reduced-motion`.

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 200ms;
  --dur-base: 600ms;
}
```

Gunakan `--dur-fast` untuk umpan balik singkat dan `--dur-base` untuk reveal. Semua reveal berbagi satu `IntersectionObserver`; konten tetap terlihat saat JavaScript atau observer tidak tersedia.

## 9. Breakpoint
`≥ 640px` tablet kecil · `≥ 900px` desktop · `≥ 1200px` lebar. Mobile-first (`min-width`).

## 10. Larangan
- Tidak memakai lebih dari 2 font.
- Tidak memakai gradien mencolok / bayangan berat / animasi berlebihan.
- Tidak memakai warna di luar token.
- Tidak ada pop-up yang mengganggu.
