// Font variabel: satu berkas per keluarga (bukan satu per ketebalan) agar
// browser cukup sekali memuat lalu menata ulang teks lebih sedikit.
const fontUrl = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700..800&family=Inter:wght@400..600&display=swap";

// Unduh font saat browser senggang agar tidak membebani render awal.
function loadFonts() {
  const fontStylesheet = document.createElement("link");
  fontStylesheet.rel = "stylesheet";
  fontStylesheet.href = fontUrl;
  fontStylesheet.media = "print";
  fontStylesheet.addEventListener("load", () => {
    fontStylesheet.media = "all";
  }, { once: true });
  document.head.append(fontStylesheet);
}

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(loadFonts, { timeout: 3000 });
} else {
  window.setTimeout(loadFonts, 1200);
}
