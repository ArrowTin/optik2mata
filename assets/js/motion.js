import { CONFIG } from "./config.js";

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
  ".shopping-mockup",
  // Footer memakai pengamat yang sama hanya saat toggle-nya aktif.
  ...(CONFIG.features.enableFooterMotion ? ["[data-footer-reveal]"] : []),
  "[data-count-up]"
].join(", ");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let revealObserver;

function getRevealObserver() {
  if (!revealObserver && "IntersectionObserver" in window && !reduceMotion.matches) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.revealed = "true";
        if (entry.target.matches("[data-count-up]")) animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
  }
  return revealObserver;
}

function counterTarget(name) {
  if (name === "rating") return CONFIG.business.rating.value;
  if (name === "reviews") return CONFIG.business.rating.count;
  return null;
}

function formatCounter(name, value) {
  const options = name === "rating"
    ? { minimumFractionDigits: 1, maximumFractionDigits: 1 }
    : { maximumFractionDigits: 0 };
  return new Intl.NumberFormat("id-ID", options).format(value);
}

function animateCounter(element) {
  const name = element.dataset.countUp;
  const target = Number(element.dataset.counterTarget);
  const durationValue = getComputedStyle(document.documentElement).getPropertyValue("--dur-base").trim();
  const duration = Number.parseFloat(durationValue) * (durationValue.endsWith("s") && !durationValue.endsWith("ms") ? 1000 : 1);
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = formatCounter(name, target * progress);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function prepareCounters() {
  document.querySelectorAll("[data-count-up]").forEach((element) => {
    const name = element.dataset.countUp;
    const target = counterTarget(name);
    if (target === null) {
      element.removeAttribute("data-count-up");
      return;
    }

    const canAnimate = CONFIG.features.enableRatingCountUp &&
      !reduceMotion.matches && "IntersectionObserver" in window;
    element.textContent = formatCounter(name, canAnimate ? 0 : target);
    if (canAnimate) element.dataset.counterTarget = String(target);
    else element.removeAttribute("data-count-up");
  });
}

function initHeaderScrollState() {
  if (!CONFIG.features.enableHeaderScrollState) return;
  const header = document.querySelector(".site-header");
  if (!header) return;

  const update = () => header.toggleAttribute("data-scrolled", window.scrollY > 4);
  window.addEventListener("scroll", update, { passive: true });
  update();
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

prepareCounters();
initHeaderScrollState();
observeReveals();
