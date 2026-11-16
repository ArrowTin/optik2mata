import { CONFIG } from "./config.js";
import { DataLoadError, loadProducts } from "./data.js";
import { createProductCard } from "./product-card.js";
import { waLink } from "./whatsapp.js";
import "./ui.js";

for (const [key, value] of Object.entries({
  name: CONFIG.business.name,
  shortName: CONFIG.business.shortName
})) {
  document.querySelectorAll(`[data-business="${key}"]`).forEach((element) => {
    element.textContent = value;
  });
}
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

const form = document.querySelector("[data-catalog-controls]");
const queryInput = form.querySelector("[name='q']");
const sortSelect = form.querySelector("[name='sort']");
const categoryButtons = [...form.querySelectorAll("[data-category]")];
const grid = document.querySelector("[data-catalog-grid]");
const emptyState = document.querySelector("[data-catalog-empty]");
const errorState = document.querySelector("[data-catalog-error]");
const count = document.querySelector("[data-catalog-count]");
const params = new URLSearchParams(window.location.search);
const validCategories = new Set(categoryButtons.map((button) => button.dataset.category));
const state = {
  query: params.get("q") ?? "",
  category: validCategories.has(params.get("category")) ? params.get("category") : "",
  sort: ["newest", "price-asc", "price-desc"].includes(params.get("sort")) ? params.get("sort") : "newest"
};
let products = [];
queryInput.value = state.query;
sortSelect.value = state.sort;

function updateAddress() {
  const next = new URL(window.location.href);
  for (const key of ["q", "category", "sort"]) next.searchParams.delete(key);
  if (state.query.trim()) next.searchParams.set("q", state.query.trim());
  if (state.category) next.searchParams.set("category", state.category);
  if (state.sort !== "newest") next.searchParams.set("sort", state.sort);
  window.history.replaceState(null, "", next);
}

function applyFilters({ updateUrl = true } = {}) {
  const query = state.query.trim().toLocaleLowerCase("id-ID");
  let visible = products.filter((product) => {
    if (CONFIG.features.hideSoldOut && !product.available) return false;
    if (state.category && product.category !== state.category) return false;
    return !query || `${product.name} ${product.id}`.toLocaleLowerCase("id-ID").includes(query);
  });

  if (state.sort === "price-asc") visible.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  else if (state.sort === "price-desc") visible.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
  else visible.sort((a, b) => a.order - b.order);

  grid.replaceChildren(...visible.map((product) => createProductCard(product, { headingLevel: 2 })));
  count.textContent = `${visible.length} produk ditampilkan`;
  emptyState.hidden = visible.length > 0;
  if (updateUrl) updateAddress();
  categoryButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.category === state.category));
  });
}

queryInput.addEventListener("input", () => {
  state.query = queryInput.value;
  applyFilters();
});
sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  applyFilters();
});
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.category = button.dataset.category;
    applyFilters();
  });
});
window.addEventListener("popstate", () => {
  const current = new URLSearchParams(window.location.search);
  state.query = current.get("q") ?? "";
  state.category = validCategories.has(current.get("category")) ? current.get("category") : "";
  state.sort = ["newest", "price-asc", "price-desc"].includes(current.get("sort")) ? current.get("sort") : "newest";
  queryInput.value = state.query;
  sortSelect.value = state.sort;
  applyFilters({ updateUrl: false });
});

try {
  products = await loadProducts();
  applyFilters({ updateUrl: false });
} catch (error) {
  grid.hidden = true;
  form.hidden = true;
  count.hidden = true;
  errorState.hidden = false;
  if (error instanceof DataLoadError) console.warn(error.message);
}
