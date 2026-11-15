import { CONFIG } from "./config.js";

const dataSourceKey = CONFIG.data.source === "sheet" ? CONFIG.data.sheetCsvUrl : CONFIG.data.jsonUrl;
const CACHE_KEY = `optik2mata-products-v1-${CONFIG.data.source}-${dataSourceKey}`;
export const DATA_ERROR_MESSAGE = "Katalog sedang dimuat ulang. Chat kami untuk info produk.";

export class DataLoadError extends Error {
  constructor(cause) {
    super(DATA_ERROR_MESSAGE);
    this.name = "DataLoadError";
    this.cause = cause;
  }
}

function readField(record, ...keys) {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null && record[key] !== "") {
      return record[key];
    }
  }
  return undefined;
}

function parseBoolean(value, fallback = false) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (value === undefined || value === null || value === "") return fallback;
  return ["ya", "yes", "true", "1", "tersedia"].includes(String(value).trim().toLowerCase());
}

function parseList(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value ?? "").split(",").map((item) => item.trim()).filter(Boolean);
}

function normalizePhoto(value) {
  const photo = String(value ?? "").trim();
  if (!photo) return "assets/img/produk/foto-segera-hadir.svg";
  if (/^https?:\/\//i.test(photo) || photo.startsWith("assets/")) return photo;
  return `assets/img/produk/${photo.replace(/^\/+/, "")}`;
}

export function normalizeProduct(record, index = 0) {
  if (!record || typeof record !== "object") throw new TypeError("Format produk tidak valid.");
  const id = String(readField(record, "id") ?? "").trim();
  const name = String(readField(record, "nama", "name") ?? "").trim();
  const category = String(readField(record, "kategori", "category") ?? "unisex").trim().toLowerCase();
  if (!id || !name) throw new TypeError("Produk harus memiliki id dan nama.");

  const rawPrice = readField(record, "harga", "price");
  const parsedPrice = rawPrice === undefined ? null : Number(String(rawPrice).replace(/[^\d.-]/g, ""));
  const photos = parseList(readField(record, "foto", "photos")).map(normalizePhoto);
  if (photos.length === 0) photos.push("assets/img/produk/foto-segera-hadir.svg");

  return {
    id,
    name,
    category,
    price: Number.isFinite(parsedPrice) ? parsedPrice : null,
    priceLabel: String(readField(record, "harga_label", "priceLabel") ?? "").trim(),
    material: String(readField(record, "bahan", "material") ?? "").trim(),
    colors: parseList(readField(record, "warna", "colors")),
    size: String(readField(record, "ukuran", "size") ?? "").trim(),
    description: String(readField(record, "deskripsi", "description") ?? "").trim().slice(0, 200),
    photos,
    badge: String(readField(record, "badge") ?? "").trim(),
    featured: parseBoolean(readField(record, "unggulan", "featured")),
    available: parseBoolean(readField(record, "tersedia", "available"), true),
    order: Number(readField(record, "urutan", "order") ?? index)
  };
}

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"') {
      if (quoted && text[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && text[index + 1] === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  row.push(cell);
  if (row.some((value) => value.trim() !== "")) rows.push(row);
  if (rows.length < 2) return [];

  const headers = rows[0].map((header, index) => (index === 0 ? header.replace(/^\uFEFF/, "") : header).trim().toLowerCase());
  return rows.slice(1).map((values) => Object.fromEntries(
    headers.map((header, index) => [header, values[index] ?? ""])
  ));
}

function readCache() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const products = JSON.parse(cached);
    return Array.isArray(products) ? products : null;
  } catch {
    return null;
  }
}

function writeCache(products) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(products));
  } catch {
    // Katalog tetap dapat digunakan bila penyimpanan sesi tidak tersedia.
  }
}

async function fetchRecords() {
  if (CONFIG.data.source === "sheet") {
    if (!CONFIG.data.sheetCsvUrl) throw new Error("URL CSV katalog belum diatur.");
    const response = await fetch(CONFIG.data.sheetCsvUrl);
    if (!response.ok) throw new Error(`CSV katalog gagal dimuat (${response.status}).`);
    return parseCsv(await response.text());
  }

  if (CONFIG.data.source !== "json") throw new Error("Sumber data katalog tidak dikenal.");
  const response = await fetch(CONFIG.data.jsonUrl);
  if (!response.ok) throw new Error(`Data produk gagal dimuat (${response.status}).`);
  const records = await response.json();
  if (!Array.isArray(records)) throw new TypeError("Data produk harus berupa daftar.");
  return records;
}

export async function loadProducts({ forceRefresh = false } = {}) {
  if (!forceRefresh) {
    const cached = readCache();
    if (cached) return cached;
  }

  try {
    const records = await fetchRecords();
    const products = records.map((record, index) => normalizeProduct(record, index));
    writeCache(products);
    return products;
  } catch (error) {
    throw new DataLoadError(error);
  }
}

export function clearProductsCache() {
  try {
    sessionStorage.removeItem(CACHE_KEY);
  } catch {
    // Tidak ada tindakan bila penyimpanan sesi tidak tersedia.
  }
}
