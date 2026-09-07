// Database utility: productDb.js
// Client-side IndexedDB database layer for NightVision products with LocalStorage & Memory fallback.

import { apiPost } from "./api";
import { SEED_PRODUCTS } from "../data/seedProducts";

const DB_NAME = "NightVisionDB";
const DB_VERSION = 1;
const STORE_NAME = "products";

function getLocalStorageProducts() {
  try {
    const data = localStorage.getItem("nv_products");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setLocalStorageProducts(products) {
  try {
    localStorage.setItem("nv_products", JSON.stringify(products));
  } catch {
    // Ignore storage quota errors
  }
}

let memoryStore = (() => {
  const local = getLocalStorageProducts();
  if (local && local.length > 0) return local;
  setLocalStorageProducts(SEED_PRODUCTS);
  return [...SEED_PRODUCTS];
})();

let dbPromise = null;

export function initDb() {
  if (dbPromise) return dbPromise;
  if (typeof window === "undefined" || !window.indexedDB) return Promise.resolve(null);

  dbPromise = new Promise((resolve) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    req.onsuccess = (e) => {
      const db = e.target.result;
      try {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        SEED_PRODUCTS.forEach((p) => store.put(p));
      } catch {
        // Best effort sync
      }
      resolve(db);
    };
    req.onerror = () => resolve(null);
  });
  return dbPromise;
}

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn(`Fetch to ${url} failed, using local fallback:`, e);
  }
  return null;
}

async function withStore(mode, callback) {
  const db = await initDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, mode);
      const store = tx.objectStore(STORE_NAME);
      const req = callback(store);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

// Get all products
export async function getAllProducts() {
  const apiData = await safeFetch("/api/products/");
  if (apiData?.length) return apiData;

  const dbData = await withStore("readonly", (store) => store.getAll());
  return dbData?.length ? dbData : memoryStore;
}

// Get product by ID or Slug
export async function getProductById(id) {
  const apiData = await safeFetch("/api/products/");
  if (apiData?.length) {
    const found = apiData.find((p) => p.id === id || p.slug === id);
    if (found) return found;
  }

  const dbData = await withStore("readonly", (store) => store.get(id));
  if (dbData) return dbData;

  return memoryStore.find((p) => p.id === id || p.slug === id) || null;
}

// Add or update a product
export async function addProduct(product) {
  const completeProduct = {
    code: `NV-CAM-${Math.floor(100 + Math.random() * 900)}`,
    badge: "NEW ARRIVAL",
    status: "IN STOCK",
    thumbs: [product.img],
    colors: product.colors || [{ name: "Standard", hex: "#777777" }],
    specs: product.specs || [
      { icon: "hd", label: "FULL HD" },
      { icon: "wifi", label: "WI-FI ENABLED" },
      { icon: "security", label: "SECURE" },
    ],
    specTable: product.specTable || [],
    ...product,
  };

  const result = await apiPost("/api/products/save/", completeProduct);
  if (result?.id) completeProduct.id = result.id;

  const idx = memoryStore.findIndex((p) => p.id === completeProduct.id);
  if (idx >= 0) memoryStore[idx] = completeProduct;
  else memoryStore.push(completeProduct);

  setLocalStorageProducts(memoryStore);
  await withStore("readwrite", (store) => store.put(completeProduct));
  return completeProduct;
}

// Delete product
export async function deleteProduct(id) {
  await apiPost("/api/products/delete/", { id });
  memoryStore = memoryStore.filter((p) => p.id !== id);
  setLocalStorageProducts(memoryStore);
  await withStore("readwrite", (store) => store.delete(id));
  return true;
}

// Reset database back to default seed list
export async function resetDatabase() {
  memoryStore = [...SEED_PRODUCTS];
  setLocalStorageProducts(memoryStore);
  await withStore("readwrite", (store) => {
    store.clear();
    SEED_PRODUCTS.forEach((p) => store.put(p));
    return store.getAll();
  });
  return true;
}
