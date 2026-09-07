// CMS database utility: cmsDb.js
// Universal client-side IndexedDB & LocalStorage layer for NightVision CMS with Server-first synchronization.

import { useState, useEffect } from "react";
import { articles as SEED_BLOGS } from "../data/blogData";
import { newsEventsData as SEED_EVENTS } from "../data/newsEvents";
import {
  SEED_DEALERS,
  SEED_CONTACTS,
  SEED_SITE_CONTENTS,
  SEED_SETTINGS,
  SEED_GALLERY,
  SEED_TEAM_MEMBERS,
  SEED_ACTIVITIES,
  SEED_ADMIN_USERS,
  DEFAULT_HOMEPAGE_SETTINGS,
} from "../data/seedCms";
import { apiPost } from "./api";

export { DEFAULT_HOMEPAGE_SETTINGS, SEED_SITE_CONTENTS, SEED_DEALERS };

const DB_NAME = "NightVisionCMSDB";
const DB_VERSION = 5;
const STORES = {
  BLOGS: "blogs",
  EVENTS: "events",
  GALLERY: "gallery",
  DEALERS: "dealers",
  CONTACTS: "contacts",
  SETTINGS: "settings",
  ACTIVITIES: "activities",
  ADMIN_USERS: "admin_users",
  TEAM_MEMBERS: "team_members",
};

const DEFAULT_SEEDS = {
  [STORES.BLOGS]: SEED_BLOGS,
  [STORES.EVENTS]: SEED_EVENTS,
  [STORES.GALLERY]: SEED_GALLERY,
  [STORES.DEALERS]: SEED_DEALERS,
  [STORES.CONTACTS]: SEED_CONTACTS,
  [STORES.SETTINGS]: SEED_SETTINGS,
  [STORES.ACTIVITIES]: SEED_ACTIVITIES,
  [STORES.ADMIN_USERS]: SEED_ADMIN_USERS,
  [STORES.TEAM_MEMBERS]: SEED_TEAM_MEMBERS,
};

// LocalStorage helpers
function getLocal(key) {
  try {
    const data = localStorage.getItem(`nv_cms_${key}`);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function setLocal(key, data) {
  try {
    localStorage.setItem(`nv_cms_${key}`, JSON.stringify(data));
  } catch {
    // Ignore storage quota
  }
}

// In-memory fallback caches seeded from LocalStorage or constants
const memoryStores = {};
Object.entries(DEFAULT_SEEDS).forEach(([store, seeds]) => {
  const cached = getLocal(store);
  if (cached?.length) {
    const merged = [...cached];
    seeds.forEach((seed) => {
      const k = seed.id || seed.slug;
      if (k && !merged.some((m) => m.id === k || m.slug === k)) merged.push(seed);
    });
    memoryStores[store] = merged;
  } else {
    memoryStores[store] = [...seeds];
    setLocal(store, memoryStores[store]);
  }
});

let dbPromise = null;
export function initCmsDb() {
  if (dbPromise) return dbPromise;
  if (typeof window === "undefined" || !window.indexedDB) return Promise.resolve(null);

  dbPromise = new Promise((resolve) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      Object.values(STORES).forEach((name) => {
        if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, { keyPath: "id" });
      });
    };
    req.onsuccess = (e) => {
      const db = e.target.result;
      try {
        const tx = db.transaction(Object.values(STORES), "readwrite");
        Object.entries(memoryStores).forEach(([name, items]) => {
          const store = tx.objectStore(name);
          items.forEach((item) => store.put(item));
        });
      } catch {
        // Best effort sync
      }
      resolve(db);
    };
    req.onerror = () => resolve(null);
  });
  return dbPromise;
}

// Low-level IndexedDB Store helper
async function withStore(storeName, mode, callback) {
  const db = await initCmsDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      const req = callback(store);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

// Safe network fetch
async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn(`Fetch to ${url} failed, using local/IndexedDB fallback:`, e);
  }
  return null;
}

// Generic Store CRUD
async function getStoreList(storeName) {
  const data = await withStore(storeName, "readonly", (store) => store.getAll());
  return data?.length ? data : memoryStores[storeName] || [];
}

async function saveStoreItem(storeName, item) {
  if (!item.id) item.id = Date.now() + Math.floor(Math.random() * 1000);
  const idStr = String(item.id);

  const list = memoryStores[storeName] || [];
  const idx = list.findIndex((x) => String(x.id) === idStr);
  if (idx >= 0) list[idx] = item;
  else list.push(item);
  memoryStores[storeName] = list;
  setLocal(storeName, list);

  await withStore(storeName, "readwrite", (store) => store.put(item));
  return item;
}

async function deleteStoreItem(storeName, id) {
  const list = (memoryStores[storeName] || []).filter((x) => String(x.id) !== String(id));
  memoryStores[storeName] = list;
  setLocal(storeName, list);

  await withStore(storeName, "readwrite", (store) => store.delete(id));
  return true;
}

// --- BLOGS ---
export async function getAllBlogs() {
  const apiData = await safeFetch("/api/blogs/");
  return apiData?.length ? apiData : getStoreList(STORES.BLOGS);
}

export async function getBlogBySlug(slug) {
  const list = await getAllBlogs();
  return list.find((x) => x.slug === slug) || null;
}

export async function saveBlog(blog) {
  if (!blog.slug) {
    blog.slug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  const result = await apiPost("/api/blogs/save/", blog);
  await saveStoreItem(STORES.BLOGS, { ...blog, id: result?.id ?? blog.id ?? blog.slug });
  return result;
}

export async function deleteBlog(id) {
  const result = await apiPost("/api/blogs/delete/", { id });
  await deleteStoreItem(STORES.BLOGS, id);
  return result;
}

// --- EVENTS ---
export async function getAllEvents() {
  const apiData = await safeFetch("/api/events/");
  return apiData?.length ? apiData : getStoreList(STORES.EVENTS);
}

export async function getEventBySlug(slug) {
  const list = await getAllEvents();
  return list.find((x) => x.slug === slug) || null;
}

export async function saveEvent(event) {
  if (!event.slug) {
    event.slug = event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  const result = await apiPost("/api/events/save/", event);
  await saveStoreItem(STORES.EVENTS, { ...event, id: result?.id ?? event.id ?? event.slug });
  return result;
}

export async function deleteEvent(id) {
  const result = await apiPost("/api/events/delete/", { id });
  await deleteStoreItem(STORES.EVENTS, id);
  return result;
}

// --- GALLERY ---
export async function getAllGalleryItems() {
  const apiData = await safeFetch("/api/gallery/");
  return apiData?.length ? apiData : getStoreList(STORES.GALLERY);
}
export const saveGalleryItem = (item) => saveStoreItem(STORES.GALLERY, item);
export const deleteGalleryItem = (id) => deleteStoreItem(STORES.GALLERY, id);

// --- DEALERS ---
export async function getAllDealers() {
  const apiData = await safeFetch("/api/dealers/");
  if (apiData?.length) return apiData;

  const list = await getStoreList(STORES.DEALERS);
  const targetName = "Western Optics Nepal";
  return list.filter(
    (d) =>
      d.companyName?.toLowerCase() !== targetName.toLowerCase() &&
      d.name?.toLowerCase() !== targetName.toLowerCase()
  );
}

export async function saveDealer(dealer) {
  const result = await apiPost("/api/dealers/save/", dealer);
  await saveStoreItem(STORES.DEALERS, { ...dealer, id: dealer.id || result?.slug });
  return result;
}

export async function deleteDealer(id) {
  const result = await apiPost("/api/dealers/delete/", { id });
  await deleteStoreItem(STORES.DEALERS, id);
  return result;
}

// --- CONTACTS ---
export const getAllContacts = () => getStoreList(STORES.CONTACTS);
export const saveContact = (contact) => saveStoreItem(STORES.CONTACTS, contact);
export const deleteContact = (id) => deleteStoreItem(STORES.CONTACTS, id);

// --- SETTINGS & SITE CONTENTS ---
export async function getSettings() {
  const apiData = await safeFetch("/api/global-config/");
  if (apiData && Object.keys(apiData).length > 0) return apiData;
  const list = await getStoreList(STORES.SETTINGS);
  return list.find((x) => x.id === "global_config") || SEED_SETTINGS[0];
}

export async function saveSettings(settings) {
  const settingsWithId = { ...settings, id: "global_config" };
  await apiPost("/api/global-config/", settingsWithId);
  return saveStoreItem(STORES.SETTINGS, settingsWithId);
}

export async function getSiteContents() {
  const apiData = await safeFetch("/api/site-contents/");
  if (apiData && Object.keys(apiData).length > 0) {
    return { ...SEED_SITE_CONTENTS, ...apiData };
  }
  const list = await getStoreList(STORES.SETTINGS);
  const item = list.find((x) => x.id === "site_contents");
  return item ? { ...SEED_SITE_CONTENTS, ...item } : SEED_SITE_CONTENTS;
}

export async function saveSiteContents(contents) {
  const contentsWithId = { ...contents, id: "site_contents" };
  await apiPost("/api/site-contents/", contentsWithId);
  const res = await saveStoreItem(STORES.SETTINGS, contentsWithId);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("siteContentsUpdated"));
    localStorage.setItem("nv_cms_site_contents_ts", Date.now().toString());
  }
  return res;
}

export function useSiteContents() {
  const [contents, setContents] = useState(SEED_SITE_CONTENTS);

  useEffect(() => {
    let active = true;
    const load = () => {
      getSiteContents().then((res) => {
        if (active && res) setContents(res);
      });
    };
    load();
    window.addEventListener("siteContentsUpdated", load);
    window.addEventListener("storage", load);
    return () => {
      active = false;
      window.removeEventListener("siteContentsUpdated", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  return contents;
}

// --- TEAM MEMBERS ---
export const getAllTeamMembers = () => getStoreList(STORES.TEAM_MEMBERS);
export const saveTeamMember = (member) => saveStoreItem(STORES.TEAM_MEMBERS, member);
export const deleteTeamMember = (id) => deleteStoreItem(STORES.TEAM_MEMBERS, id);

// --- ACTIVITIES ---
export async function getAllActivities() {
  const list = await getStoreList(STORES.ACTIVITIES);
  return [...list].sort((a, b) => b.id - a.id);
}

export function saveActivity(message, type = "system") {
  const activity = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    message,
    type,
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
  return saveStoreItem(STORES.ACTIVITIES, activity);
}

export async function clearActivities() {
  memoryStores[STORES.ACTIVITIES] = [];
  setLocal(STORES.ACTIVITIES, []);
  await withStore(STORES.ACTIVITIES, "readwrite", (store) => store.clear());
  return true;
}

// --- ADMIN USERS ---
export const getAllAdmins = () => getStoreList(STORES.ADMIN_USERS);
export const saveAdmin = (admin) => saveStoreItem(STORES.ADMIN_USERS, admin);
export const deleteAdmin = (id) => deleteStoreItem(STORES.ADMIN_USERS, id);

export async function verifyAdminCredentials(email, password) {
  const list = await getAllAdmins();
  return list.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password) || null;
}

// --- HOMEPAGE SETTINGS ---
export async function getHomepageSettings() {
  const apiData = await safeFetch("/api/homepage-settings/");
  if (apiData && Object.keys(apiData).length > 0) {
    return { ...DEFAULT_HOMEPAGE_SETTINGS, ...apiData };
  }
  const list = await getStoreList(STORES.SETTINGS);
  const item = list.find((x) => x.id === "homepage_settings");
  return item ? { ...DEFAULT_HOMEPAGE_SETTINGS, ...item } : DEFAULT_HOMEPAGE_SETTINGS;
}

export async function saveHomepageSettings(settings) {
  const settingsWithId = { ...settings, id: "homepage_settings" };
  await apiPost("/api/homepage-settings/", settingsWithId);
  const res = await saveStoreItem(STORES.SETTINGS, settingsWithId);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("homepageSettingsUpdated"));
    localStorage.setItem("nv_cms_homepage_settings_ts", Date.now().toString());
  }
  return res;
}

export function useHomepageSettings() {
  const [settings, setSettings] = useState(DEFAULT_HOMEPAGE_SETTINGS);

  useEffect(() => {
    let active = true;
    const load = () => {
      getHomepageSettings().then((res) => {
        if (active && res) setSettings(res);
      });
    };
    load();
    window.addEventListener("homepageSettingsUpdated", load);
    window.addEventListener("storage", load);
    return () => {
      active = false;
      window.removeEventListener("homepageSettingsUpdated", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  return settings;
}

// --- RESET DATABASE ---
export async function resetCmsDatabase() {
  Object.entries(DEFAULT_SEEDS).forEach(([store, seeds]) => {
    memoryStores[store] = [...seeds];
    setLocal(store, memoryStores[store]);
  });

  const db = await initCmsDb();
  if (db) {
    const tx = db.transaction(Object.values(STORES), "readwrite");
    Object.entries(memoryStores).forEach(([name, items]) => {
      const store = tx.objectStore(name);
      store.clear();
      items.forEach((item) => store.put(item));
    });
  }
  return true;
}
