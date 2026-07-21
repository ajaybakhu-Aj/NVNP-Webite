import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBlogTaxonomy } from "../../../utils/blogTaxonomy";
import Icon from "../../../utils/Icon";

/* ── Design tokens (identical to rest of the admin palette) ─────────────────── */
const C = {
  bg: "var(--nv-bg, #11140c)",
  surface: "var(--nv-surface, #11140c)",
  surfCont: "var(--nv-surfCont, #1e2117)",
  surfHi: "var(--nv-surfHi, #282b21)",
  surfHighest: "var(--nv-surfHighest, #33362c)",
  surfLow: "var(--nv-surfLow, #0c0f07)",
  onSurf: "var(--nv-onSurf, #e2e4d5)",
  onSurfVar: "var(--nv-onSurfVar, #c3c9b3)",
  primary: "var(--nv-primary, #deffa4)",
  onPrimary: "var(--nv-onPrimary, #233600)",
  secondary: "var(--nv-secondary, #94da32)",
  outline: "var(--nv-outline, #8d937f)",
  outlineVar: "var(--nv-outlineVar, #434938)",
  sg: "'Space Grotesk', sans-serif",
  pp: "'Poppins', sans-serif",
};


/* ── Tag card ────────────────────────────────────────────────────────────────── */
function TagCard({ tag, onRemove }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surfCont,
        border: `1px solid ${hovered ? C.secondary : C.outlineVar}`,
        borderRadius: 8,
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? `0 4px 20px rgba(148,218,50,0.12)` : "none",
      }}
    >
      {/* Tag info */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 8,
            background: tag.count > 0 ? "rgba(148,218,50,0.12)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${tag.count > 0 ? C.secondary : C.outlineVar}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: tag.count > 0 ? C.secondary : C.outline,
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: C.sg,
              fontSize: 14,
              fontWeight: 700,
              color: C.onSurf,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {tag.label}
          </div>
          <div style={{ fontSize: 11, color: C.onSurfVar, marginTop: 2, fontFamily: C.pp }}>
            {tag.count > 0 ? `${tag.count} article${tag.count !== 1 ? "s" : ""}` : "No articles yet"}
            {tag.custom && (
              <span
                style={{
                  marginLeft: 8,
                  background: "rgba(222,255,164,0.12)",
                  border: "1px solid rgba(222,255,164,0.3)",
                  color: C.primary,
                  padding: "1px 6px",
                  borderRadius: 4,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                CUSTOM
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <Link
          to={`/blog?tag=${encodeURIComponent(tag.label)}`}
          title="Browse articles with this tag"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 6,
            background: C.surfHi,
            border: `1px solid ${C.outlineVar}`,
            color: C.secondary,
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          <Icon name="open_in_new" size={14} />
        </Link>

        {tag.custom && (
          <button
            onClick={() => onRemove(tag.label)}
            title="Delete custom tag"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 6,
              background: "rgba(255,107,107,0.08)",
              border: "1px solid rgba(255,107,107,0.3)",
              color: "#ff6b6b",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <Icon name="delete" size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────────────────────── */
export default function BlogTagsPage() {
  const navigate = useNavigate();
  const { tags, loading, addTag, removeTag } = useBlogTaxonomy();

  const [newTag, setNewTag] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");

  const handleAddTag = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const trimmed = newTag.trim();
    if (!trimmed) {
      setError("Tag name cannot be empty.");
      return;
    }
    const ok = addTag(trimmed);
    if (!ok) {
      setError(`"${trimmed}" already exists.`);
    } else {
      setSuccess(`Tag "${trimmed}" added successfully.`);
      setNewTag("");
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const filteredTags = search
    ? tags.filter((t) => t.label.toLowerCase().includes(search.toLowerCase()))
    : tags;

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        color: C.onSurf,
        fontFamily: C.pp,
        paddingTop: 100,
        paddingBottom: 80,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #deffa4; color: #233600; }
        .tag-add-input::placeholder { color: rgba(194,201,179,0.45); }
        .tag-search-input::placeholder { color: rgba(194,201,179,0.35); }
        .tag-add-input:focus, .tag-search-input:focus { border-color: #94da32 !important; outline: none; }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(16px,4vw,48px)" }}>
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, fontSize: 12, color: C.onSurfVar, fontFamily: C.sg }}>
          <button
            onClick={() => navigate("/admin")}
            style={{ background: "none", border: "none", color: C.secondary, cursor: "pointer", fontSize: 12, fontFamily: C.sg, fontWeight: 600 }}
          >
            ADMIN
          </button>
          <span style={{ color: C.outline }}>/</span>
          <span style={{ color: C.onSurf }}>BLOG TAGS</span>
        </nav>

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 36,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: 11, letterSpacing: "2px", color: C.secondary, fontFamily: C.sg, marginBottom: 8, textTransform: "uppercase" }}>
              CONTENT TAXONOMY
            </div>
            <h1 style={{ fontFamily: C.sg, fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: C.onSurf, lineHeight: 1.2 }}>
              Blog Tags
            </h1>
            <p style={{ fontSize: 13, color: C.onSurfVar, marginTop: 8, fontFamily: C.pp }}>
              Manage tags used to classify blog articles. Tags from published posts are shown automatically.
            </p>
          </div>

          {/* Stats badge */}
          <div
            style={{
              background: C.surfCont,
              border: `1px solid ${C.outlineVar}`,
              borderRadius: 10,
              padding: "14px 22px",
              textAlign: "center",
              minWidth: 100,
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: C.sg, color: C.secondary }}>{tags.length}</div>
            <div style={{ fontSize: 10, color: C.onSurfVar, letterSpacing: "1px", textTransform: "uppercase", marginTop: 2 }}>Total Tags</div>
          </div>
        </div>

        {/* Add new tag form */}
        <div
          style={{
            background: C.surfCont,
            border: `1px solid ${C.outlineVar}`,
            borderRadius: 12,
            padding: "clamp(20px,3vw,32px)",
            marginBottom: 28,
          }}
        >
          <h2 style={{ fontFamily: C.sg, fontSize: 14, fontWeight: 700, color: C.onSurf, marginBottom: 16, letterSpacing: "1px", textTransform: "uppercase" }}>
            Add New Tag
          </h2>
          <form onSubmit={handleAddTag} style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <input
                className="tag-add-input"
                type="text"
                value={newTag}
                onChange={(e) => { setNewTag(e.target.value); setError(""); setSuccess(""); }}
                placeholder="e.g. AI Detection, Case Study, Tutorial…"
                style={{
                  width: "100%",
                  background: C.surfHi,
                  border: `1px solid ${error ? "#ff6b6b" : C.outlineVar}`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  color: C.onSurf,
                  fontSize: 14,
                  fontFamily: C.pp,
                  transition: "border-color 0.2s",
                }}
              />
              {error && (
                <div style={{ fontSize: 12, color: "#ff6b6b", marginTop: 6, fontFamily: C.pp }}>
                  {error}
                </div>
              )}
              {success && (
                <div style={{ fontSize: 12, color: C.secondary, marginTop: 6, fontFamily: C.pp }}>
                  ✓ {success}
                </div>
              )}
            </div>
            <button
              type="submit"
              style={{
                background: C.secondary,
                color: C.onPrimary,
                border: "none",
                borderRadius: 8,
                padding: "12px 24px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "1px",
                fontFamily: C.sg,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.target.style.background = C.primary; }}
              onMouseLeave={(e) => { e.target.style.background = C.secondary; }}
            >
              + ADD TAG
            </button>
          </form>
        </div>

        {/* Search / Filter */}
        <div style={{ marginBottom: 20, position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: C.outline,
              display: "flex",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            className="tag-search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter tags…"
            style={{
              width: "100%",
              background: C.surfCont,
              border: `1px solid ${C.outlineVar}`,
              borderRadius: 8,
              padding: "11px 14px 11px 42px",
              color: C.onSurf,
              fontSize: 13,
              fontFamily: C.pp,
              transition: "border-color 0.2s",
            }}
          />
        </div>

        {/* Tags grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: C.secondary, fontFamily: C.sg, fontSize: 13 }}>
            LOADING TAG REGISTRY...
          </div>
        ) : filteredTags.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px 0",
              background: C.surfCont,
              border: `1px dashed ${C.outlineVar}`,
              borderRadius: 12,
              color: C.onSurfVar,
              fontFamily: C.sg,
              fontSize: 13,
            }}
          >
            {search ? "No tags match your filter." : "No tags found. Add your first tag above."}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 12,
            }}
          >
            {filteredTags.map((tag) => (
              <TagCard key={tag.label} tag={tag} onRemove={removeTag} />
            ))}
          </div>
        )}

        {/* Info note */}
        <div
          style={{
            marginTop: 32,
            padding: "14px 18px",
            background: "rgba(148,218,50,0.05)",
            border: `1px solid rgba(148,218,50,0.15)`,
            borderRadius: 8,
            fontSize: 12,
            color: C.onSurfVar,
            fontFamily: C.pp,
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: C.secondary }}>Note:</strong> Tags derived from published blog posts cannot be deleted here — they are managed through the blog's article data.
          Only custom tags (marked as <span style={{ color: C.primary, fontWeight: 700 }}>CUSTOM</span>) can be removed from this page.
        </div>
      </div>
    </div>
  );
}
