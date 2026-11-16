import { observeReveals } from "./motion.js";

const backToTop = document.querySelector("[data-back-to-top]");

if (backToTop) {
  const updateVisibility = () => {
    backToTop.hidden = window.scrollY < 480;
  };

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
}

// Tingkatkan galeri menjadi lightbox tanpa mengganggu konten saat JavaScript mati.
const galleryImages = [...document.querySelectorAll(".gallery-card img")];
if (galleryImages.length > 0 && typeof HTMLDialogElement !== "undefined") {
  const dialog = document.createElement("dialog");
  dialog.className = "gallery-lightbox";
  dialog.setAttribute("aria-label", "Pratinjau foto galeri");
  dialog.innerHTML = `
    <div class="gallery-lightbox__panel">
      <button class="btn btn-outline gallery-lightbox__close" type="button">Tutup</button>
      <button class="btn btn-outline gallery-lightbox__previous" type="button">Sebelumnya</button>
      <img class="gallery-lightbox__image" alt="">
      <button class="btn btn-outline gallery-lightbox__next" type="button">Berikutnya</button>
      <p class="gallery-lightbox__caption" aria-live="polite"></p>
    </div>`;
  document.body.append(dialog);

  const lightboxImage = dialog.querySelector(".gallery-lightbox__image");
  const lightboxCaption = dialog.querySelector(".gallery-lightbox__caption");
  const previousButton = dialog.querySelector(".gallery-lightbox__previous");
  const nextButton = dialog.querySelector(".gallery-lightbox__next");
  let activeImageIndex = 0;

  function showImage(index) {
    activeImageIndex = (index + galleryImages.length) % galleryImages.length;
    const image = galleryImages[activeImageIndex];
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.closest("figure")?.querySelector("figcaption")?.textContent || image.alt;
  }

  galleryImages.forEach((image, index) => {
    const button = document.createElement("button");
    button.className = "gallery-card__button";
    button.type = "button";
    button.setAttribute("aria-label", `Buka foto: ${image.alt}`);
    image.before(button);
    button.append(image);
    button.addEventListener("click", () => {
      showImage(index);
      dialog.showModal();
    });
  });

  dialog.querySelector(".gallery-lightbox__close").addEventListener("click", () => dialog.close());
  previousButton.addEventListener("click", () => showImage(activeImageIndex - 1));
  nextButton.addEventListener("click", () => showImage(activeImageIndex + 1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showImage(activeImageIndex - 1);
    if (event.key === "ArrowRight") showImage(activeImageIndex + 1);
  });
}
