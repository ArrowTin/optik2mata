import { CONFIG } from "./config.js";
import { DataLoadError, loadProducts } from "./data.js";
import { waDelivery, waLink } from "./whatsapp.js";
import { createProductCard } from "./product-card.js";
import { observeReveals } from "./motion.js";
import "./ui.js";
import "./fonts.js";

const businessText = {
  name: CONFIG.business.name,
  shortName: CONFIG.business.shortName,
  address: CONFIG.business.address,
  addressShort: CONFIG.business.addressShort,
  plusCode: CONFIG.business.plusCode,
  phoneDisplay: CONFIG.business.phoneDisplay,
  hours: CONFIG.business.hours.all,
  ratingText: `${CONFIG.business.rating.value} di Google (${CONFIG.business.rating.count} ulasan)`
};

document.title = `${CONFIG.business.name} — Kacamata & Lensa di Sebalo`;

for (const [key, value] of Object.entries(businessText)) {
  document.querySelectorAll(`[data-business="${key}"]`).forEach((element) => {
    element.textContent = value;
  });
}

document.querySelectorAll("[data-business-map]").forEach((link) => {
  link.href = CONFIG.business.mapsUrl;
});

document.querySelectorAll("[data-business-phone-link]").forEach((link) => {
  link.href = `tel:+${CONFIG.business.phoneIntl}`;
});

document.querySelectorAll("[data-business-map-embed]").forEach((frame) => {
  frame.src = `https://maps.google.com/maps?q=${encodeURIComponent(CONFIG.business.plusCode)}&output=embed`;
});

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

document.querySelectorAll(".js-wa-link").forEach((link) => {
  link.href = waLink(link.dataset.waMessage);
});

document.querySelectorAll(".js-wa-delivery").forEach((link) => {
  link.href = waDelivery("");
});

document.querySelectorAll("[data-feature]").forEach((element) => {
  element.hidden = !CONFIG.features[element.dataset.feature];
});

async function renderFeaturedProducts() {
  const grid = document.querySelector("[data-featured-products]");
  if (!grid) return;
  const emptyState = document.querySelector("[data-featured-empty]");
  const errorState = document.querySelector("[data-product-error]");

  try {
    const products = await loadProducts();
    const featured = products
      .filter((product) => product.featured && (!CONFIG.features.hideSoldOut || product.available))
      .sort((first, second) => first.order - second.order);
    if (featured.length === 0) {
      if (emptyState) emptyState.hidden = false;
      return;
    }
    grid.replaceChildren(...featured.slice(0, 6).map(createProductCard));
    observeReveals(grid);
  } catch (error) {
    if (errorState) errorState.hidden = false;
    if (error instanceof DataLoadError) console.warn(error.message);
  }
}

renderFeaturedProducts();

document.querySelectorAll(".nav-menu").forEach((menu) => {
  const toggle = menu.querySelector(".nav-menu__toggle");
  const syncExpandedState = () => toggle?.setAttribute("aria-expanded", String(menu.open));
  const syncDesktopMenu = () => {
    menu.open = window.matchMedia("(min-width: 900px)").matches;
    syncExpandedState();
  };
  menu.addEventListener("toggle", syncExpandedState);
  window.matchMedia("(min-width: 900px)").addEventListener("change", syncDesktopMenu);
  syncDesktopMenu();
});
