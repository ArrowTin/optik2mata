import { CONFIG } from "./config.js";
import { DataLoadError, loadProducts } from "./data.js";
import { productUrl, waDelivery, waLink, waProduct } from "./whatsapp.js";

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

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const imageLink = document.createElement("a");
  imageLink.className = "product-card__media";
  imageLink.href = productUrl(product);
  const image = document.createElement("img");
  image.className = "product-card__image";
  image.src = product.photos[0];
  image.alt = `Foto ${product.name}`;
  image.width = 800;
  image.height = 600;
  image.loading = "lazy";
  imageLink.append(image);
  card.append(imageLink);

  const content = document.createElement("div");
  content.className = "product-card__body";
  const title = document.createElement("h3");
  title.className = "product-card__title";
  const titleLink = document.createElement("a");
  titleLink.href = productUrl(product);
  titleLink.textContent = product.name;
  title.append(titleLink);
  content.append(title);

  if (product.badge) {
    const badge = document.createElement("span");
    badge.className = "badge product-card__badge";
    badge.textContent = product.badge;
    content.append(badge);
  }
  if (!product.available) {
    const status = document.createElement("span");
    status.className = "badge product-card__badge";
    status.textContent = "Habis";
    content.append(status);
  }
  if (CONFIG.features.showPrices && product.price !== null) {
    const price = document.createElement("p");
    price.className = "product-card__price";
    price.textContent = product.priceLabel || new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(product.price);
    content.append(price);
  }
  if (product.description) {
    const description = document.createElement("p");
    description.className = "product-card__description";
    description.textContent = product.description;
    content.append(description);
  }

  const category = document.createElement("p");
  category.className = "product-card__category";
  category.textContent = product.category;
  content.append(category);

  const actions = document.createElement("div");
  actions.className = "product-card__actions";
  const detail = document.createElement("a");
  detail.className = "btn btn-outline";
  detail.href = productUrl(product);
  detail.textContent = "Lihat detail";
  actions.append(detail);
  const ask = document.createElement("a");
  ask.className = "btn btn-wa";
  ask.href = waProduct(product);
  ask.textContent = "Tanya produk";
  actions.append(ask);
  content.append(actions);
  card.append(content);
  return card;
}

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
