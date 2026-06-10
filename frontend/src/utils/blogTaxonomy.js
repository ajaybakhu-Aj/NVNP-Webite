/**
 * blogTaxonomy.js
 * Shared utility for managing blog tags & categories.
 * Data is persisted in localStorage so user-added entries survive page reloads.
 * It merges with whatever tags/categories already exist in published blog posts.
 */

import { useState, useEffect, useCallback } from "react";
import { getAllBlogs } from "./cmsDb";

const LS_TAGS_KEY = "nv_cms_blog_tags";
const LS_CATS_KEY = "nv_cms_blog_categories";

// ── Local Storage helpers ─────────────────────────────────────────────────────

function lsGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

// ── Normalisation helper ──────────────────────────────────────────────────────

function normalise(str = "") {
  return str.trim().toLowerCase();
}

function isDuplicate(list, candidate) {
  return list.some((item) => normalise(item) === normalise(candidate));
}

// ── Raw getters (used by pages without hooks) ─────────────────────────────────

export function getStoredTags() {
  return lsGet(LS_TAGS_KEY);
}

export function getStoredCategories() {
  return lsGet(LS_CATS_KEY);
}

export function addStoredTag(tag) {
  const current = getStoredTags();
  if (!tag || isDuplicate(current, tag)) return false;
  lsSet(LS_TAGS_KEY, [...current, tag.trim()]);
  return true;
}

export function addStoredCategory(cat) {
  const current = getStoredCategories();
  if (!cat || isDuplicate(current, cat)) return false;
  lsSet(LS_CATS_KEY, [...current, cat.trim()]);
  return true;
}

export function removeStoredTag(tag) {
  const current = getStoredTags().filter((t) => t !== tag);
  lsSet(LS_TAGS_KEY, current);
}

export function removeStoredCategory(cat) {
  const current = getStoredCategories().filter((c) => c !== cat);
  lsSet(LS_CATS_KEY, current);
}

// ── React hook – useBlogTaxonomy ─────────────────────────────────────────────

/**
 * Returns merged tags/categories derived from:
 *   1. All blog posts in IndexedDB
 *   2. User-added entries in localStorage
 *
 * Each entry includes:
 *   { label: string, count: number, custom: boolean }
 */
export function useBlogTaxonomy() {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    getAllBlogs().then((blogs) => {
      // Collect tags & categories from existing blog posts
      const postTagCounts = {};
      const postCatCounts = {};

      blogs.forEach((b) => {
        if (b.tag) {
          const t = b.tag.trim();
          postTagCounts[t] = (postTagCounts[t] || 0) + 1;
        }
        if (b.category) {
          const c = b.category.trim();
          postCatCounts[c] = (postCatCounts[c] || 0) + 1;
        }
      });

      // Merge with localStorage custom entries
      const storedTags = getStoredTags();
      const storedCats = getStoredCategories();

      const allTagLabels = Array.from(
        new Set([
          ...Object.keys(postTagCounts),
          ...storedTags,
        ])
      ).sort((a, b) => a.localeCompare(b));

      const allCatLabels = Array.from(
        new Set([
          ...Object.keys(postCatCounts),
          ...storedCats,
        ])
      ).sort((a, b) => a.localeCompare(b));

      setTags(
        allTagLabels.map((label) => ({
          label,
          count: postTagCounts[label] || 0,
          custom: !postTagCounts[label] && storedTags.includes(label),
        }))
      );

      setCategories(
        allCatLabels.map((label) => ({
          label,
          count: postCatCounts[label] || 0,
          custom: !postCatCounts[label] && storedCats.includes(label),
        }))
      );

      setLoading(false);
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addTag = useCallback(
    (tag) => {
      const ok = addStoredTag(tag);
      if (ok) refresh();
      return ok;
    },
    [refresh]
  );

  const addCategory = useCallback(
    (cat) => {
      const ok = addStoredCategory(cat);
      if (ok) refresh();
      return ok;
    },
    [refresh]
  );

  const removeTag = useCallback(
    (tag) => {
      removeStoredTag(tag);
      refresh();
    },
    [refresh]
  );

  const removeCategory = useCallback(
    (cat) => {
      removeStoredCategory(cat);
      refresh();
    },
    [refresh]
  );

  return {
    tags,
    categories,
    loading,
    addTag,
    addCategory,
    removeTag,
    removeCategory,
    refresh,
  };
}
