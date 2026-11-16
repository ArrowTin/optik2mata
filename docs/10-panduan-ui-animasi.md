# Panduan UI Penuh Animasi untuk Website

Dokumen ini merangkum cara membuat tampilan web yang hidup dan penuh animasi, terinspirasi dari pola yang terlihat di semarewards.com. Isinya sengaja dibuat agnostik stack: ada **Jalur A** (Next.js + Motion) dan **Jalur B** (HTML/PHP biasa + CSS + JS ringan). Dokumen ini juga bisa diberikan langsung ke AI coding agent sebagai konteks.

> Catatan: dugaan stack semarewards.com (Next.js, kemungkinan di Vercel) berasal dari jejak di HTML-nya. Library animasi yang tepat belum terverifikasi. Pola animasi di bawah adalah pendekatan umum yang menghasilkan efek serupa.

## Catatan Penerapan di Proyek Optik 2Mata (baca dulu)

Dokumen ini adalah **referensi pola**, bukan spesifikasi tetap. Untuk proyek Optik 2Mata Bengkayang berlaku batasan berikut (menang atas isi dokumen ini bila bertentangan):

1. **Hanya Jalur B** (HTML + CSS + JS vanilla, tanpa build step). Jalur A (Next.js + Motion, bagian 5) dan GSAP (bagian 4.7) **tidak dipakai** kecuali pengguna menyetujui.
2. **Warna, font, radius, bayangan, durasi, dan easing hanya lewat token** di `assets/css/tokens.css` (sumber kebenaran: `docs/02-design-system.md`). Nilai mentah pada contoh kode di sini (mis. `rgb(0 0 0 / 0.12)`, `cubic-bezier(...)`) hanya ilustrasi: ganti dengan token. Token gerak baru = perubahan design system, jadi **minta persetujuan** dulu.
3. **Jangan menduplikasi T11.** Reveal bertahap, hover, lightbox, dan animasi ornamen hero sudah ada. Audit dulu, lalu pakai ulang atau rapikan.
4. **Jangan menyalin konten situs referensi.** Nama rank, teks, merek, dan aset semarewards.com pada contoh hanya ilustrasi pola. Isi untuk Optik 2Mata harus berasal dari `docs/03` dan `config.js`.
5. **Konten tetap jujur:** tanpa merek, angka, testimoni, atau klaim berstatus `[?]`; angka statistik hanya dari data terkonfirmasi; mockup diberi label "Contoh".
6. **Tombol WhatsApp** tetap lewat `whatsapp.js`, tanpa nomor yang ditulis langsung.
7. Setiap fitur animasi baru punya **toggle di `config.features`**, dan `prefers-reduced-motion` wajib dihormati.

Pemetaan pola ke task: marquee T17, carousel seret T18, mockup alur belanja T19, angka berhitung T20, hover kartu T21 (lihat `TASKS.md`, Fase 2).

---

## 1. Prinsip Dasar

1. **Animasi punya tujuan**: menuntun mata, memberi umpan balik, atau menjelaskan alur. Bukan hiasan.
2. **Hanya animasikan `transform` dan `opacity`**. Properti seperti `width`, `height`, `top`, `left` memicu reflow dan membuat jank di HP kelas menengah.
3. **Durasi**: 150–250 ms untuk interaksi (hover, klik), 400–700 ms untuk elemen masuk, di atas 1 detik hanya untuk momen utama.
4. **Easing**: pakai `ease-out` untuk elemen masuk, `ease-in-out` untuk perpindahan. Hindari `linear` kecuali marquee.
5. **Hormati `prefers-reduced-motion`** (lihat bagian 7).
6. **Mobile first**: sebagian besar pengunjung Indonesia memakai HP. Uji di perangkat yang lambat.

---

## 2. Pilih Jalur

| | Jalur A: Next.js + Motion | Jalur B: HTML/PHP + CSS + JS |
|---|---|---|
| Cocok untuk | Aplikasi/portal baru, banyak interaksi | Situs PHP yang sudah ada, halaman profil/katalog |
| Animasi scroll | `whileInView` (Motion) | IntersectionObserver / GSAP ScrollTrigger |
| Drag/geser | `drag="x"` (Motion) | Scroll-snap + pointer events |
| Build tool | Node.js, `npm` | Tidak perlu |
| Hosting | Vercel/VPS Node | Hosting PHP biasa |

Kalau situsmu sudah berbasis PHP dan tidak perlu halaman yang sangat interaktif, **Jalur B sudah cukup** dan jauh lebih ringan.

---

## 3. Palet Pola Animasi

Pola yang dipakai di semarewards.com dan cara membuatnya:

| Pola | Fungsi | Jalur B | Jalur A |
|---|---|---|---|
| Scroll reveal | Elemen muncul saat di-scroll | 4.1 | 5.2 |
| Marquee logo | Logo "As featured in" berjalan terus | 4.2 | pakai CSS yang sama |
| Carousel bisa diseret | Daftar rank/produk yang digeser | 4.3 | 5.3 |
| Angka berhitung | Statistik naik dari 0 | 4.4 | pakai fungsi yang sama |
| Mockup UI beranimasi | Menjelaskan alur langkah demi langkah | 4.5 | pakai CSS yang sama |
| Kartu hover | Umpan balik saat kursor di atas kartu | 4.6 | pakai CSS yang sama |

---

## 4. Jalur B: HTML/PHP + CSS + JS Ringan

### 4.0 Token dasar (taruh di CSS utama)

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 200ms;
  --dur-base: 600ms;
}
```

### 4.1 Scroll reveal (tanpa library)

HTML:

```html
<section class="reveal">...</section>
<div class="reveal" style="--d:100ms">Kartu 1</div>
<div class="reveal" style="--d:200ms">Kartu 2</div>
```

CSS:

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--dur-base) var(--ease-out),
              transform var(--dur-base) var(--ease-out);
  transition-delay: var(--d, 0ms);
}
.reveal.is-visible { opacity: 1; transform: none; }
```

JS:

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target); // jalankan sekali saja
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
```

Variabel `--d` memberi efek **stagger** (muncul berurutan).

### 4.2 Marquee (logo berjalan)

Gandakan isi grup agar loop mulus.

```html
<div class="marquee">
  <div class="marquee__track">
    <div class="marquee__group">
      <img src="logo1.webp" alt="Logo 1" height="32">
      <img src="logo2.webp" alt="Logo 2" height="32">
    </div>
    <div class="marquee__group" aria-hidden="true">
      <img src="logo1.webp" alt="" height="32">
      <img src="logo2.webp" alt="" height="32">
    </div>
  </div>
</div>
```

```css
.marquee { overflow: hidden; }
.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}
.marquee__group { display: flex; gap: 3rem; padding-right: 3rem; }
.marquee:hover .marquee__track { animation-play-state: paused; }
@keyframes marquee { to { transform: translateX(-50%); } }
```

### 4.3 Carousel yang bisa diseret (scroll-snap + drag)

```html
<div class="drag-track">
  <article class="drag-item">Bronze</article>
  <article class="drag-item">Silver</article>
  <article class="drag-item">Gold</article>
</div>
```

```css
.drag-track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  cursor: grab;
}
.drag-track::-webkit-scrollbar { display: none; }
.drag-item { flex: 0 0 min(80%, 320px); scroll-snap-align: center; }
.drag-track.is-dragging { scroll-snap-type: none; cursor: grabbing; user-select: none; }
```

```js
const track = document.querySelector('.drag-track');
let down = false, startX = 0, startLeft = 0;

track.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'touch') return; // sentuhan sudah native
  down = true;
  startX = e.clientX;
  startLeft = track.scrollLeft;
  track.classList.add('is-dragging');
  track.setPointerCapture(e.pointerId);
});
track.addEventListener('pointermove', (e) => {
  if (!down) return;
  track.scrollLeft = startLeft - (e.clientX - startX);
});
const stop = () => { down = false; track.classList.remove('is-dragging'); };
track.addEventListener('pointerup', stop);
track.addEventListener('pointercancel', stop);
```

### 4.4 Angka berhitung

```js
function countUp(el, to, ms = 1200) {
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min((t - t0) / ms, 1);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
    el.textContent = Math.round(to * eased).toLocaleString('id-ID');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
// panggil saat elemen terlihat, misalnya dari IntersectionObserver di 4.1
// countUp(document.querySelector('#total-pengunjung'), 5000);
```

### 4.5 Mockup UI beranimasi (menjelaskan alur)

Baris-baris "aplikasi palsu" muncul berurutan untuk menjelaskan sebuah langkah.

```html
<div class="mock">
  <div class="mock-row" style="--i:0">Video 1 terdeteksi</div>
  <div class="mock-row" style="--i:1">Video 2 terdeteksi</div>
  <div class="mock-row" style="--i:2">Video 3 terdeteksi</div>
</div>
```

```css
.mock-row {
  opacity: 0;
  transform: translateY(8px);
  animation: rowIn 0.5s var(--ease-out) forwards;
  animation-delay: calc(var(--i) * 250ms);
}
@keyframes rowIn { to { opacity: 1; transform: none; } }
```

Agar animasi mulai saat terlihat, pasang animasi hanya setelah kelas `.is-visible` ditambahkan pada `.mock` (`.mock.is-visible .mock-row { animation: ... }`).

### 4.6 Kartu hover

```css
.card {
  transition: transform var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
}
@media (hover: hover) {
  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgb(0 0 0 / 0.12);
  }
}
```

### 4.7 Animasi scroll lanjutan dengan GSAP (opsional)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.gsap-reveal').forEach((el) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });
</script>
```

Pakai GSAP hanya kalau butuh timeline kompleks atau scroll-scrub. Untuk reveal biasa, bagian 4.1 sudah cukup.

---

## 5. Jalur A: Next.js + Motion

### 5.1 Setup

```bash
npx create-next-app@latest nama-proyek
cd nama-proyek
npm install motion
```

Impor yang dipakai: `import { motion } from "motion/react"`. Komponen yang memakai animasi wajib diberi `"use client"` di baris pertama.

### 5.2 Komponen `Reveal`

```tsx
"use client";
import { motion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

Pemakaian:

```tsx
<Reveal><h2>Judul</h2></Reveal>
<Reveal delay={0.1}><Card /></Reveal>
```

### 5.3 Carousel yang bisa diseret

```tsx
"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function DragCarousel({ children }: { children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    if (outer.current && inner.current) {
      setLimit(inner.current.scrollWidth - outer.current.offsetWidth);
    }
  }, []);

  return (
    <div ref={outer} className="overflow-hidden">
      <motion.div
        ref={inner}
        drag="x"
        dragConstraints={{ left: -limit, right: 0 }}
        className="flex gap-4 cursor-grab active:cursor-grabbing"
      >
        {children}
      </motion.div>
    </div>
  );
}
```

### 5.4 Hormati preferensi gerak pengguna

Bungkus aplikasi sekali di `layout.tsx` (komponen client):

```tsx
"use client";
import { MotionConfig } from "motion/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

Marquee (4.2), hover (4.6), dan mockup (4.5) cukup memakai CSS yang sama.

---

## 6. Performa

- Gambar: format **WebP**, beri atribut `width`/`height`, dan `loading="lazy"` untuk yang di bawah layar. Di Next.js pakai `next/image`.
- Video: `muted playsinline preload="metadata"`, jangan autoplay video besar di HP. Beri `poster`.
- Font: maksimal 2 keluarga font, pakai `font-display: swap`.
- `will-change: transform` hanya untuk elemen yang benar-benar beranimasi terus-menerus, jangan ditaruh di mana-mana.
- Batasi jumlah elemen yang beranimasi bersamaan di layar.
- Ukur dengan Lighthouse dan uji di HP Android kelas menengah.

---

## 7. Aksesibilitas

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal { opacity: 1; transform: none; }
}
```

- Konten penting tidak boleh hanya terlihat lewat animasi.
- Marquee: sediakan jeda saat hover dan beri `aria-hidden="true"` pada salinan kedua.
- Semua elemen interaktif harus bisa dipakai lewat keyboard dan punya fokus yang jelas.

---

## 8. Urutan Pengerjaan yang Disarankan

1. Rapikan **layout dan tipografi** dulu tanpa animasi.
2. Tambahkan **scroll reveal** (4.1 atau 5.2) di semua section.
3. Tambahkan **hover** pada kartu dan tombol.
4. Tambahkan **satu momen unggulan** (carousel seret, mockup beranimasi, atau angka berhitung). Satu saja sudah cukup berkesan.
5. Tambahkan blok `prefers-reduced-motion` (bagian 7).
6. Uji performa di HP, lalu kurangi animasi yang terasa berat.

---

## 9. Checklist Sebelum Rilis

- [ ] Semua animasi hanya memakai `transform` dan `opacity`
- [ ] Blok `prefers-reduced-motion` terpasang
- [ ] Gambar WebP dan lazy-load
- [ ] Tidak ada scroll horizontal yang tidak disengaja di HP
- [ ] Lighthouse Performance di atas 80 pada mobile
- [ ] Semua elemen interaktif bisa diakses keyboard
- [ ] Animasi tidak menutupi konten atau tombol utama

---

## 10. Template Prompt untuk AI Coding Agent

Salin, lalu isi bagian dalam tanda `<...>`:

```text
Konteks: website <nama/tujuan situs>, stack <Next.js | PHP + HTML>.
Tema visual: <warna, gaya, suasana>.

Tugas: tambahkan animasi mengikuti dokumen docs/10-panduan-ui-animasi.md.
Terapkan berurutan: (1) scroll reveal pada semua section, (2) hover pada kartu,
(3) satu momen unggulan: <carousel seret | angka berhitung | mockup beranimasi>.

Aturan:
- Hanya animasikan transform dan opacity.
- Wajib sertakan blok prefers-reduced-motion.
- Jangan menambah dependency baru kecuali disebutkan.
- Jaga kode tetap bersih dan beri komentar singkat pada bagian animasi.
- Jelaskan file mana saja yang diubah setelah selesai.
```
