import { CONFIG } from "./config.js";

const DEFAULT_MESSAGE = "Halo Optik 2Mata, saya ingin bertanya tentang kacamata.";

export function waLink(message = DEFAULT_MESSAGE) {
  const phone = CONFIG.business.phoneIntl.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function productUrl(product, baseUrl = window.location.href) {
  const url = new URL("produk.html", baseUrl);
  url.searchParams.set("id", product.id);
  return url.href;
}

export function waProduct(product, url = productUrl(product)) {
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
