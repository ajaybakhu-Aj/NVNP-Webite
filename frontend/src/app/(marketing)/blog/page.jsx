import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllBlogs } from "../../../utils/cmsDb";
import { useBlogTaxonomy } from "../../../utils/blogTaxonomy";
import PageHeroBanner from "../../../components/ui/PageHeroBanner";

/* ─── DESIGN TOKENS ─────────────────────────────── */
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



/* ─── ICON COMPONENTS ───────────────────────────── */
const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconCart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const IconPerson = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconChevLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconRss = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" fill="currentColor" />
  </svg>
);
const IconTerminal = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
const IconHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="5" r="2" /><circle cx="19" cy="19" r="2" /><circle cx="5" cy="19" r="2" />
    <line x1="12" y1="9" x2="19" y2="7" /><line x1="12" y1="9" x2="5" y2="7" />
    <line x1="12" y1="15" x2="19" y2="17" /><line x1="12" y1="15" x2="5" y2="17" />
  </svg>
);
const IconChevR = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ─── ARTICLE CARD ───────────────────────────────── */
function ArticleCard({ article }) {
  const [hovered, setHovered] = useState(false);
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surfCont,
        border: `1px solid ${hovered ? C.primary : "transparent"}`,
        display: "flex",
        flexDirection: "column",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
        <img
          src={article.img}
          alt={article.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
            filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
          }}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div style={{ padding: "28px 28px 24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{
            background: C.primary,
            color: C.onPrimary,
            padding: "3px 10px",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontFamily: C.pp,
            borderRadius: "2px"
          }}>{article.category || "Thermal Tech"}</span>
          <span style={{
            background: C.surfHi,
            color: C.onSurfVar,
            border: `1px solid ${C.outlineVar}`,
            padding: "2px 8px",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontFamily: C.pp,
            borderRadius: "2px"
          }}>{article.tag}</span>
        </div>

        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase",
          color: C.onSurfVar, opacity: 0.65, marginBottom: 12, fontFamily: C.pp,
        }}>
          {article.date} — By <Link 
            to={`/author/${article.author.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
            onClick={(e) => e.stopPropagation()}
            style={{ color: C.secondary, textDecoration: "none", fontWeight: "bold", transition: "color 0.2s" }}
            onMouseEnter={(e) => { e.target.style.color = C.primary; }}
            onMouseLeave={(e) => { e.target.style.color = C.secondary; }}
          >
            {article.author}
          </Link>
        </div>

        <h3 style={{
          fontFamily: C.pp,
          fontSize: "clamp(16px, 1.6vw, 18px)",
          fontWeight: 600,
          lineHeight: 1.4,
          color: hovered ? C.primary : C.onSurf,
          marginBottom: 12,
          transition: "color 0.2s",
        }}>{article.title}</h3>

        <p style={{
          fontSize: 14,
          lineHeight: "22px",
          color: C.onSurfVar,
          marginBottom: 24,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          fontFamily: C.pp,
        }}>{article.excerpt}</p>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: hovered ? 12 : 6, transition: "gap 0.3s" }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "2px",
            textTransform: "uppercase", color: C.secondary, fontFamily: C.pp,
          }}>Read Full Article</span>
          <span style={{ color: C.secondary, display: "flex" }}><IconArrow /></span>
        </div>
      </div>
    </article>
  );
}

/* ─── NEWSLETTER CARD ─────────────────────────────── */
function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleJoin = () => {
    if (email && email.includes("@")) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus(null), 3000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus(null), 2000);
    }
  };

  return (
    <div style={{
      background: C.primary,
      padding: "clamp(24px,3vw,40px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      overflow: "hidden",
      minHeight: 320,
    }}>
      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(35,54,0,0.04) 2px, rgba(35,54,0,0.04) 4px)",
        pointerEvents: "none",
      }} />
      {/* BG icon */}
      <div style={{
        position: "absolute", bottom: 12, right: 16, opacity: 0.18,
        color: C.onPrimary, userSelect: "none",
      }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{
          fontFamily: C.sg,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: C.onPrimary,
          marginBottom: 12,
          lineHeight: 1.2,
        }}>Subscribe to Updates</h3>
        <p style={{
          fontSize: 13,
          lineHeight: "20px",
          color: C.onPrimary,
          opacity: 0.8,
          marginBottom: 24,
          fontFamily: C.pp,
        }}>
          Receive weekly technical bulletins and priority alerts on new hardware releases.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL ADDRESS"
            style={{
              background: "rgba(0,0,0,0.2)",
              border: "none",
              borderBottom: `1px solid ${status === "error" ? "#ff6b6b" : C.onPrimary}`,
              color: C.onPrimary,
              padding: "12px 0",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              outline: "none",
              fontFamily: C.pp,
              transition: "border-color 0.2s",
            }}
          />
          <button
            onClick={handleJoin}
            className="nvbtn"
            style={{
              background: C.onPrimary,
              color: C.primary,
              padding: "14px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              fontFamily: C.pp,
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "scale(0.98)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; }}
          >
            {status === "success" ? "Subscribed ✓" : "Subscribe"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────── */
export default function NightWatchBlog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePage, setActivePage] = useState(1);
  const [articlesList, setArticlesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tags: allTags, categories: allCategories } = useBlogTaxonomy();

  // Read active filters from URL params
  const activeCategory = searchParams.get("category") || "";
  const activeTag = searchParams.get("tag") || "";

  useEffect(() => {
    getAllBlogs().then((data) => {
      setArticlesList(data);
      setLoading(false);
    });
  }, []);

  // Build dynamic filter lists from taxonomy hook
  const categoryLabels = ["All Articles", ...allCategories.map((c) => c.label)];
  const tagLabels = ["All Tags", ...allTags.map((t) => t.label)];

  const setFilter = (type, value) => {
    const params = new URLSearchParams(searchParams);
    if (type === "category") {
      if (!value || value === "All Articles") {
        params.delete("category");
      } else {
        params.set("category", value);
      }
    }
    if (type === "tag") {
      if (!value || value === "All Tags") {
        params.delete("tag");
      } else {
        params.set("tag", value);
      }
    }
    setSearchParams(params, { replace: true });
    setActivePage(1);
  };

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
    setActivePage(1);
  };

  const filteredArticles = articlesList.filter((article) => {
    const matchCategory = !activeCategory || (article.category || "").toLowerCase() === activeCategory.toLowerCase();
    const matchTag = !activeTag || (article.tag || "").toLowerCase() === activeTag.toLowerCase();
    return matchCategory && matchTag;
  });

  const hasActiveFilter = !!activeCategory || !!activeTag;

  // Pagination logic
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  const currentArticles = filteredArticles.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE
  );

  return (
    <div style={{ background: C.bg, color: C.onSurf, fontFamily: C.pp, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:#deffa4;color:#233600;}
        body{cursor:crosshair;}
        .nvbtn:hover{background:#33362c !important;}
        .nvlink:hover{color:#deffa4 !important;}
        .nvicon:hover{color:#deffa4 !important;}
        .nvpage:hover{background:#b5e75d !important;color:#233600 !important;}
        .footlink:hover{color:#94da32 !important;transform:translateX(4px);}
        body::before{
          content:'';position:fixed;inset:0;pointer-events:none;z-index:40;
          background:repeating-linear-gradient(to bottom,transparent,transparent 2px,rgba(181,231,93,0.03) 2px,rgba(181,231,93,0.03) 4px);
          opacity:0.5;
        }
        @media(max-width:768px){
          .desktop-nav{display:none !important;}
          .hamburger-btn{display:flex !important;}
          .blog-grid{grid-template-columns:1fr !important;}
          .hero-section{padding-top:100px !important;}
          .footer-grid{grid-template-columns:1fr 1fr !important;}
          .footer-bottom{flex-direction:column !important;text-align:center !important;gap:12px !important;}
          .blog-filter-row{flex-direction:column !important;}
        }
        @media(min-width:769px) and (max-width:1024px){
          .blog-grid{grid-template-columns:1fr 1fr !important;}
          .footer-grid{grid-template-columns:1fr 1fr !important;}
        }
        @media(min-width:1025px){
          .blog-grid{grid-template-columns:1fr 1fr 1fr !important;}
        }
        @media(max-width:480px){
          .footer-grid{grid-template-columns:1fr !important;}
          .cat-scroll{overflow-x:auto;}
          .cat-scroll::-webkit-scrollbar{display:none;}
        }
        input::placeholder{color:rgba(194,201,179,0.5);}
      `}</style>

      <PageHeroBanner
        title="RESOURCES & INSIGHTS"
        subtitle="Expert insights, technical guides, and the latest surveillance intelligence from NightVision Security Systems."
      />

      {/* ── MAIN ── */}
      <main className="hero-section" style={{ paddingTop: 40, paddingBottom: 80, maxWidth: 1440, margin: "0 auto", padding: "40px clamp(16px,4vw,64px) 80px" }}>

        {/* ── Category filter row ── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.onSurfVar, marginBottom: 10, fontFamily: C.sg }}>CATEGORY</div>
          <div className="cat-scroll" style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: 8,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            paddingBottom: 4,
          }}>
            {categoryLabels.map((cat) => {
              const isActive = cat === "All Articles" ? !activeCategory : activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter("category", cat)}
                  style={{
                    background: isActive ? C.primary : C.surfHi,
                    color: isActive ? C.onPrimary : C.onSurf,
                    padding: "8px 20px",
                    fontSize: 11, fontWeight: 600, letterSpacing: "1.5px",
                    textTransform: "uppercase", border: "none", cursor: "pointer",
                    fontFamily: C.pp, transition: "all 0.2s",
                    whiteSpace: "nowrap", flexShrink: 0,
                    borderRadius: 4,
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.target.style.background = C.surfHighest; }}
                  onMouseLeave={(e) => { if (!isActive) e.target.style.background = C.surfHi; }}
                >{cat}</button>
              );
            })}
          </div>
        </div>

        {/* ── Tag filter row ── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.onSurfVar, marginBottom: 10, fontFamily: C.sg }}>TAG</div>
          <div className="cat-scroll" style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: 8,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            paddingBottom: 4,
          }}>
            {tagLabels.map((tag) => {
              const isActive = tag === "All Tags" ? !activeTag : activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setFilter("tag", tag)}
                  style={{
                    background: isActive ? C.secondary : C.surfHi,
                    color: isActive ? C.onPrimary : C.onSurf,
                    padding: "6px 16px",
                    fontSize: 10, fontWeight: 600, letterSpacing: "1px",
                    textTransform: "uppercase", border: `1px solid ${isActive ? C.secondary : C.outlineVar}`, cursor: "pointer",
                    fontFamily: C.pp, transition: "all 0.2s",
                    whiteSpace: "nowrap", flexShrink: 0,
                    borderRadius: 4,
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.target.style.background = C.surfHighest; }}
                  onMouseLeave={(e) => { if (!isActive) e.target.style.background = C.surfHi; }}
                >{tag}</button>
              );
            })}
          </div>
        </div>


        {/* Divider */}
        <div style={{ borderBottom: `1px solid ${C.outlineVar}`, marginBottom: 36 }} />

        {/* Blog Grid */}
        <div className="blog-grid" style={{ display: "grid", gap: 24 }}>
          {loading ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "48px 0", color: C.secondary, fontFamily: C.pp, fontSize: 14 }}>
              CONNECTING TO SECURITY LOG ARCHIVES...
            </div>
          ) : currentArticles.length > 0 ? (
            currentArticles.map((article) => (
              <Link key={article.id} to={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
                <ArticleCard article={article} />
              </Link>
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "48px 0", color: C.onSurfVar, fontFamily: C.pp, fontSize: 14 }}>
              NO ARTICLES FOUND MATCHING THE SELECTED FILTERS.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav style={{ marginTop: 64, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
            <button
              className="nvpage"
              onClick={() => setActivePage(p => Math.max(1, p - 1))}
              disabled={activePage === 1}
              style={{
                width: 44, height: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: C.surfCont,
                color: activePage === 1 ? C.outlineVar : C.onSurf,
                border: `1px solid ${C.outlineVar}`,
                cursor: activePage === 1 ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              <IconChevLeft />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isActive = page === activePage;
              return (
                <button
                  key={page}
                  className="nvpage"
                  onClick={() => setActivePage(page)}
                  style={{
                    width: 44, height: 44,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: isActive ? C.primary : C.surfCont,
                    color: isActive ? C.onPrimary : C.onSurf,
                    border: `1px solid ${C.outlineVar}`,
                    cursor: "pointer",
                    fontFamily: C.pp, fontSize: 14, fontWeight: isActive ? 700 : 400,
                    transition: "all 0.2s",
                  }}
                >
                  {page}
                </button>
              );
            })}

            <button
              className="nvpage"
              onClick={() => setActivePage(p => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              style={{
                width: 44, height: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: C.surfCont,
                color: activePage === totalPages ? C.outlineVar : C.onSurf,
                border: `1px solid ${C.outlineVar}`,
                cursor: activePage === totalPages ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              <IconChevRight />
            </button>
          </nav>
        )}
      </main>

    </div>
  );
}