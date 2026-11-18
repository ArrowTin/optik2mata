import { CONFIG } from "./config.js";
import { productUrl, waProduct } from "./whatsapp.js";

export function createProductCard(product, { headingLevel = 3, priority = false } = {}) {
  const card = document.createElement("article");
  card.className = "product-card";
  if (CONFIG.features.enableProductCardHover) card.classList.add("product-card--hover-enabled");
  const imageLink = document.createElement("a");
  imageLink.className = "product-card__media";
  imageLink.href = productUrl(product);
  const image = document.createElement("img");
  image.src = product.photos[0];
  image.alt = `Foto ${product.name}`;
  image.width = 800;
  image.height = 600;
  // Dua kartu pertama tampil di layar awal; jangan ditunda agar LCP cepat.
  image.loading = priority ? "eager" : "lazy";
  if (priority) image.fetchPriority = "high";
  imageLink.append(image);
  card.append(imageLink);

  const body = document.createElement("div");
  body.className = "product-card__body";
  const title = document.createElement(`h${headingLevel}`);
  title.className = "product-card__title";
  const titleLink = document.createElement("a");
  titleLink.href = productUrl(product);
  titleLink.textContent = product.name;
  title.append(titleLink);
  body.append(title);

  if (product.badge) {
    const badge = document.createElement("span");
    badge.className = "badge product-card__badge";
    badge.textContent = product.badge;
    body.append(badge);
  }
  if (!product.available) {
    const status = document.createElement("span");
    status.className = "badge product-card__badge";
    status.textContent = "Habis";
    body.append(status);
  }
  if (CONFIG.features.showPrices && product.price !== null) {
    const price = document.createElement("p");
    price.className = "product-card__price";
    price.textContent = product.priceLabel || new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(product.price);
    body.append(price);
  }
  const category = document.createElement("p");
  category.className = "product-card__category";
  category.textContent = product.category;
  body.append(category);
  if (product.description) {
    const description = document.createElement("p");
    description.className = "product-card__description";
    description.textContent = product.description;
    body.append(description);
  }

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
  body.append(actions);
  card.append(body);
  return card;
}
