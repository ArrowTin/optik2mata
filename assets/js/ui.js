const backToTop = document.querySelector("[data-back-to-top]");

if (backToTop) {
  const updateVisibility = () => {
    backToTop.hidden = window.scrollY < 480;
  };

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
}

// Tampilkan elemen secara halus saat masuk ke viewport.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealItems = document.querySelectorAll(
    ".page-section .section-heading, .service-card, .product-card, .process-step, .gallery-card, .review-summary, .faq-list, .location-layout, .closing-cta__inner"
  );

  if (revealItems.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.revealed = "true";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => {
      item.dataset.reveal = "";
      revealObserver.observe(item);
    });
    document.documentElement.classList.add("has-reveal");
  }
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
