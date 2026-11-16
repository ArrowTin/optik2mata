import { CONFIG } from "./config.js";
import { loadProducts } from "./data.js";
import { createProductCard } from "./product-card.js";
import { waLink, waProduct } from "./whatsapp.js";
import "./ui.js";

document.querySelectorAll(".js-wa-link").forEach((link) => {
  link.href = waLink(link.dataset.waMessage);
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

const detail = document.querySelector("[data-product-detail]");
const statePanel = document.querySelector("[data-product-state]");
const stateTitle = document.querySelector("[data-product-state-title]");
const stateMessage = document.querySelector("[data-product-state-message]");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

function showState(title, message) {
  stateTitle.textContent = title;
  stateMessage.textContent = message;
  statePanel.hidden = false;
  detail.hidden = true;
  document.title = `${title} | ${CONFIG.business.name}`;
}

function addSpec(list, label, value) {
  if (!value || value === "-") return;
  const term = document.createElement("dt");
  term.textContent = label;
  const description = document.createElement("dd");
  description.textContent = value;
  list.append(term, description);
}

function setMainPhoto(product, index) {
  const photo = product.photos[index];
  const image = detail.querySelector("[data-product-main-image]");
  image.src = photo;
  image.alt = `Foto ${product.name}, gambar ${index + 1}`;
  detail.querySelectorAll("[data-photo-index]").forEach((button) => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.photoIndex) === index));
  });
}

try {
  if (!productId) throw new Error("missing");
  const products = await loadProducts();
  const product = products.find((item) => item.id === productId);
  if (!product) throw new Error("missing");

  detail.hidden = false;
  statePanel.hidden = true;
  document.title = `${product.name} | ${CONFIG.business.name}`;
  detail.querySelector("[data-product-name]").textContent = product.name;
  detail.querySelector("[data-product-category]").textContent = product.category;
  detail.querySelector("[data-product-description]").textContent = product.description || "Silakan tanyakan detail produk kepada toko.";

  const badge = detail.querySelector("[data-product-badge]");
  if (product.badge) {
    badge.textContent = product.badge;
    badge.hidden = false;
  }
  const price = detail.querySelector("[data-product-price]");
  if (CONFIG.features.showPrices && product.price !== null) {
    price.textContent = product.priceLabel || new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(product.price);
    price.hidden = false;
  }

  const specs = detail.querySelector("[data-product-specs]");
  addSpec(specs, "Bahan", product.material);
  addSpec(specs, "Warna", product.colors.join(", "));
  addSpec(specs, "Ukuran", product.size);
  if (!product.available) addSpec(specs, "Ketersediaan", "Habis — silakan tanyakan pilihan lain.");

  const thumbnails = detail.querySelector("[data-product-thumbnails]");
  product.photos.forEach((photo, index) => {
    const button = document.createElement("button");
    button.className = "product-detail__thumbnail";
    button.type = "button";
    button.dataset.photoIndex = String(index);
    button.setAttribute("aria-label", `Tampilkan foto ${index + 1} dari ${product.photos.length}`);
    button.setAttribute("aria-pressed", String(index === 0));
    const image = document.createElement("img");
    image.src = photo;
    image.alt = "";
    image.width = 120;
    image.height = 90;
    image.loading = "lazy";
    button.append(image);
    button.addEventListener("click", () => setMainPhoto(product, index));
    thumbnails.append(button);
  });
  setMainPhoto(product, 0);

  const ask = detail.querySelector("[data-product-wa]");
  ask.href = waProduct(product);
  const related = products
    .filter((item) => item.id !== product.id && item.category === product.category && (!CONFIG.features.hideSoldOut || item.available))
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);
  if (related.length) {
    document.querySelector("[data-related-products]").replaceChildren(...related.map((item) => createProductCard(item)));
    document.querySelector("[data-related-section]").hidden = false;
  }
} catch (error) {
  if (error.message === "missing") {
    showState("Produk tidak ditemukan", "Tautan produk tidak valid atau produk sudah tidak tersedia.");
  } else {
    showState("Katalog sedang tidak dapat dimuat", "Coba muat ulang halaman atau hubungi toko untuk menanyakan produk.");
    console.warn("Katalog produk gagal dimuat.");
  }
}
