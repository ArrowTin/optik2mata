const backToTop = document.querySelector("[data-back-to-top]");

if (backToTop) {
  const updateVisibility = () => {
    backToTop.hidden = window.scrollY < 480;
  };

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
}
