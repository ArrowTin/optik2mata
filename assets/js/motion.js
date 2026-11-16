const revealSelector = [
  ".page-section .section-heading",
  ".service-card",
  ".product-card",
  ".process-step",
  ".gallery-card",
  ".review-summary",
  ".faq-list",
  ".location-layout",
  ".closing-cta__inner",
  ".shopping-mockup"
].join(", ");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let revealObserver;

function getRevealObserver() {
  if (!revealObserver && "IntersectionObserver" in window && !reduceMotion.matches) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.revealed = "true";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
  }
  return revealObserver;
}

// Tandai dan daftarkan elemen baru ke pengamat reveal yang sama.
export function observeReveals(root = document) {
  if (reduceMotion.matches) return;
  const observer = getRevealObserver();
  if (!observer) return;

  const elements = [];
  if (root instanceof Element && root.matches(revealSelector)) elements.push(root);
  elements.push(...root.querySelectorAll(revealSelector));
  const newElements = elements.filter((element) => element.dataset.reveal === undefined);
  applyMotionStagger(newElements);
  newElements.forEach((element) => {
    element.dataset.reveal = "";
    observer.observe(element);
  });

  if (elements.length > 0) document.documentElement.classList.add("has-reveal");
}

// Susun jeda dengan penjumlahan token agar tetap didukung browser lama.
export function applyMotionStagger(elements) {
  const delays = [
    "0ms",
    "var(--dur-fast)",
    "calc(var(--dur-fast) + var(--dur-fast))",
    "calc(var(--dur-fast) + var(--dur-fast) + var(--dur-fast))"
  ];
  elements.forEach((element, index) => {
    element.style.setProperty("--d", delays[index % delays.length]);
  });
}

observeReveals();
