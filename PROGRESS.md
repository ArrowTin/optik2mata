# PROGRESS.md — Catatan Kemajuan

Entri terbaru di **atas**. Format entri ada di `AGENTS.md` bagian 5.

## Status Saat Ini
- Task aktif: T00 (setup lokal selesai; menunggu remote)
- Terakhir selesai: —
- Terblokir: T00 — remote Git belum dikonfigurasi; push awal belum dapat dilakukan
- Pertanyaan terbuka untuk pengguna: URL remote Git yang akan digunakan

## Log

### [2026-11-15 22:01] T00 — Setup repo (BLOCKED)
- **Hasil:** repositori Git, `.gitignore`, struktur awal, dan seluruh dokumen sudah tersedia dari kondisi awal. Branch lokal diselaraskan menjadi `main`.
- **Verifikasi:** repositori terdeteksi, status kerja bersih sebelum perubahan T00, dokumen proyek lengkap. Tidak ada remote pada `git remote -v`.
- **Commit:** `371ec0e` — `docs(repo): catat setup awal [T00]`. Push tertahan karena remote belum tersedia.
- **Catatan/Keputusan:** tidak membuat atau menebak URL remote. T00 belum memenuhi kriteria lulus karena remote dan push awal belum tersedia.
- **Pertanyaan terbuka:** URL remote Git yang akan digunakan?
- **Berikutnya:** lanjutkan T00 setelah URL remote diberikan; setelah push berhasil, mulai T01.
