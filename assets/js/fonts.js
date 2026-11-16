const fontUrl = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600&display=swap";
const fontStylesheet = document.createElement("link");

// Unduh font setelah dokumen diparse agar tidak menghambat render awal.
fontStylesheet.rel = "stylesheet";
fontStylesheet.href = fontUrl;
fontStylesheet.media = "print";
fontStylesheet.addEventListener("load", () => {
  fontStylesheet.media = "all";
}, { once: true });
document.head.append(fontStylesheet);
