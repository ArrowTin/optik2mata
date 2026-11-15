import { CONFIG } from "./config.js";
import { waDelivery, waLink } from "./whatsapp.js";

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

document.title = CONFIG.business.name;

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

document.querySelectorAll(".js-wa-link").forEach((link) => {
  link.href = waLink(link.dataset.waMessage);
});

document.querySelectorAll(".js-wa-delivery").forEach((link) => {
  link.href = waDelivery("");
});

document.querySelectorAll("[data-feature]").forEach((element) => {
  element.hidden = !CONFIG.features[element.dataset.feature];
});

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
