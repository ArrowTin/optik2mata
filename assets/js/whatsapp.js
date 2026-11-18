import { CONFIG } from "./config.js";

const DEFAULT_MESSAGE = "Halo Optik 2Mata, saya ingin bertanya tentang kacamata.";

export function waLink(message = DEFAULT_MESSAGE) {
  const phone = CONFIG.business.phoneIntl.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function productUrl(product) {
  const id = product?.id ?? "";
  return `produk.html?id=${encodeURIComponent(id)}`;
}

export function productAbsoluteUrl(product, baseUrl = typeof window !== "undefined" ? window.location.href : CONFIG.siteUrl) {
  const relative = productUrl(product);
  try {
    const parsed = new URL(baseUrl);
    if (!parsed.pathname.endsWith("/") && !/\.[a-zA-Z0-9]+$/.test(parsed.pathname)) {
      parsed.pathname += "/";
    }
    return new URL(relative, parsed).href;
  } catch {
    const fallbackBase = CONFIG.siteUrl.endsWith("/") ? CONFIG.siteUrl : `${CONFIG.siteUrl}/`;
    return new URL(relative, fallbackBase).href;
  }
}

export function waProduct(product, url = productAbsoluteUrl(product)) {
  const name = product.name ?? product.nama ?? "produk pilihan";
  const id = product.id ?? "";
  const message = `Halo Optik 2Mata, saya tertarik dengan ${name} (kode ${id}). Apakah tersedia? ${url}`;
  return waLink(message);
}

export function waEyeExam() {
  return waLink("Halo Optik 2Mata, saya ingin menanyakan jadwal pemeriksaan mata.");
}

export function waDelivery(location) {
  const destination = String(location ?? "").trim() || "lokasi saya";
  return waLink(`Halo Optik 2Mata, saya ingin pesan antar ke ${destination}.`);
}
