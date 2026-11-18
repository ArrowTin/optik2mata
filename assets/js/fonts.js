// Font variabel: satu berkas per keluarga (bukan satu per ketebalan) agar
// browser cukup sekali memuat lalu menata ulang teks lebih sedikit.
const fontUrl = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700..800&family=Inter:wght@400..600&display=swap";

// Terapkan stylesheet segera. Berkas CSS-nya sudah di-preload di <head>,
// jadi tidak memblokir render, tetapi pertukaran font terjadi lebih awal
// sehingga tata letak teks tidak diulang di tengah pemuatan halaman.
const fontStylesheet = document.createElement("link");
fontStylesheet.rel = "stylesheet";
fontStylesheet.href = fontUrl;
document.head.append(fontStylesheet);
