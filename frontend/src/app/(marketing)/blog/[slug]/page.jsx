import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";
import { getBlogBySlug, getAllBlogs } from "../../../../utils/cmsDb";
import Icon from "../../../../utils/Icon";

const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function BlogDetail() {
  const { slug } = useParams();
  const [zoomImage, setZoomImage] = useState(false);
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogBySlug(slug).then((blog) => {
      setItem(blog);
      if (blog) {
        getAllBlogs().then((all) => {
          const others = all.filter((e) => e.slug !== slug);
          const sameCategory = others.filter((e) => e.category === blog.category);
          setRelatedItems((sameCategory.length > 0 ? sameCategory : others).slice(0, 3));
        });
      }
      setLoading(false);
    });
  }, [slug]);

  // Removed manual DOM manipulation in favor of React Helmet Async

  if (loading) {
    return (
      <main style={{ background: "#11140c", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", color: "#94da32", fontFamily: "Space Grotesk, sans-serif" }}>
        DECRYPTING SECURE LOG FEED...
      </main>
    );
  }

  // Fallback for invalid slug
  if (!item) {
    return (
      <main className="event-not-found-container" style={{ minHeight: "80vh" }}>
        <h1 className="event-not-found-title">BLOG NOT FOUND</h1>
        <p className="event-not-found-desc">
          The requested blog article could not be found.
        </p>
        <Link to="/blog" className="event-detail-back-btn">
          <IconArrowLeft />
          <span>Return to Blogs</span>
        </Link>
      </main>
    );
  }

  return (
    <article className="event-detail-container" style={{ minHeight: "1000px" }}>
      <Helmet>
        <title>{item.title} | NIGHTVISION™ Blog</title>
        <meta name="description" content={item.excerpt || "Security intelligence news from NightVision."} />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.excerpt || ""} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* SCANLINE OVERLAY */}
      <div className="scanline-overlay"></div>

      {/* HERO BANNER - TITLE ONLY */}
      <section style={{ padding: "120px 5% 40px", background: "#0a0c07", borderBottom: "1px solid rgba(148, 218, 50, 0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 className="event-detail-main-title" style={{ position: "relative", zIndex: 2, textShadow: "none", marginTop: 0 }}>{item.title}</h1>
        </div>
      </section>

      {/* DUAL COLUMN LAYOUT */}
      <div className="event-detail-layout">
        {/* Main Content */}
        <main className="event-detail-body">
          <div style={{ marginBottom: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              background: "#94da32",
              color: "#070805",
              padding: "4px 12px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontFamily: "Space Grotesk, sans-serif",
              borderRadius: "4px",
              display: "inline-block"
            }}>{item.category || "Thermal Tech"}</span>
            <span style={{
              background: "rgba(148, 218, 50, 0.08)",
              border: "1px solid #94da32",
              color: "#94da32",
              padding: "3px 10px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "Space Grotesk, sans-serif",
              borderRadius: "4px",
              display: "inline-block"
            }}>{item.tag}</span>
          </div>

          {/* BLOG IMAGE BELOW TITLE */}
          <div style={{ marginBottom: "40px", cursor: "zoom-in", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(148, 218, 50, 0.2)" }} onClick={() => setZoomImage(true)}>
            <img 
              src={item.img} 
              alt={item.title} 
              style={{ width: "100%", height: "auto", display: "block" }} 
            />
          </div>

          {item.content.map((paragraph, index) => {
            const block = typeof paragraph === "string" ? paragraph.trim() : "";
            if (block.startsWith("<")) {
              // Sanitize CMS/WordPress-migrated HTML before injecting it —
              // strips scripts, event handlers, and javascript: URLs.
              return (
                <div
                  key={index}
                  className="blog-html-block"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block) }}
                />
              );
            }
            return (
              <p key={index} className="event-detail-paragraph">
                {paragraph}
              </p>
            );
          })}

          <Link to="/blog" className="event-detail-back-btn">
            <IconArrowLeft />
            <span>Back to Blogs</span>
          </Link>
        </main>

        {/* Sidebar Ledger */}
        <aside className="event-detail-sidebar">
          <div className="event-detail-ledger-card">
            <h3 className="event-detail-ledger-title">DETAILS</h3>

            <div className="event-detail-ledger-row">
              <span className="event-detail-ledger-label">PUBLICATION</span>
              <span className="event-detail-ledger-value" style={{ textTransform: "uppercase" }}>
                BLOG POST
              </span>
            </div>

            <div className="event-detail-ledger-row">
              <span className="event-detail-ledger-label">DATE</span>
              <span className="event-detail-ledger-value">{item.date}</span>
            </div>

            <div className="event-detail-ledger-row">
              <span className="event-detail-ledger-label">AUTHOR</span>
              <span className="event-detail-ledger-value">
                <Link 
                  to={`/author/${item.author.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                  style={{ color: "#deffa4", textDecoration: "none", fontWeight: "bold" }}
                >
                  {item.author}
                </Link>
              </span>
            </div>

            <div className="event-detail-ledger-row">
              <span className="event-detail-ledger-label">CATEGORY</span>
              <span className="event-detail-ledger-value" style={{ color: "#deffa4", fontWeight: "bold" }}>{item.category || "Thermal Tech"}</span>
            </div>

            <div className="event-detail-ledger-row">
              <span className="event-detail-ledger-label">TAG</span>
              <span className="event-detail-ledger-value" style={{ color: "#c3c9b3" }}>{item.tag}</span>
            </div>

            {item.pdf && (
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(148, 218, 50, 0.15)" }}>
                <a
                  href={item.pdf}
                  download={`${item.slug}-brief.pdf`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    background: "#94da32",
                    color: "#070805",
                    textDecoration: "none",
                    padding: "12px 16px",
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.filter = "brightness(1.1)"}
                  onMouseOut={(e) => e.currentTarget.style.filter = "brightness(1)"}
                >
                  <Icon name="download" size={18} />
                  <span>Download PDF</span>
                </a>
              </div>
            )}
          </div>

          {/* RELATED BLOGS SIDEBAR */}
          {relatedItems.length > 0 && (
            <div className="event-detail-ledger-card" style={{ marginTop: 20 }}>
              <h3 className="event-detail-ledger-title">RELATED BLOGS</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {relatedItems.map((related) => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.slug}`}
                    style={{ textDecoration: "none", display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <img
                      src={related.img}
                      alt={related.title}
                      style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px", border: "1px solid rgba(148, 218, 50, 0.2)" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ color: "#fff", fontSize: "13px", fontWeight: "600", lineHeight: "1.2", marginBottom: "4px" }}>
                        {related.title}
                      </span>
                      <span style={{ color: "#94da32", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {related.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Centered Lightbox Zoom Overlay */}
      {zoomImage && (
        <div 
          className="lightbox-overlay" 
          onClick={() => setZoomImage(false)} 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            backgroundColor: "rgba(7, 8, 5, 0.95)",
            backdropFilter: "blur(10px)",
            padding: "20px"
          }}
        >
          <div 
            className="lightbox-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: "90vw", 
              maxHeight: "90vh", 
              width: "auto",
              height: "auto",
              background: "none", 
              border: "none", 
              boxShadow: "none", 
              padding: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative"
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setZoomImage(false)}
              className="lightbox-close-btn"
              aria-label="Close Preview"
              style={{ 
                position: "absolute", 
                top: "16px", 
                right: "16px", 
                background: "rgba(17, 20, 12, 0.85)",
                border: "1px solid #94da32",
                color: "#e2e4d5",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 1000,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"
              }}
            >
              <Icon name="close" size={20} />
            </button>

            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src={item.img}
                alt=""
                style={{
                  maxWidth: "100%",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  border: "2px solid #94da32",
                  boxShadow: "0 0 25px rgba(148, 218, 50, 0.35)",
                  display: "block"
                }}
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
