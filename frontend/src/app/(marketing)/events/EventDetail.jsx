import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventBySlug, getAllEvents } from "../../../utils/cmsDb";
import Icon from "../../../utils/Icon";

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

export default function EventDetail() {
  const { slug } = useParams();
  const [zoomImage, setZoomImage] = useState(false);
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getEventBySlug(slug).then((evt) => {
      setItem(evt);
      if (evt) {
        getAllEvents().then((all) => {
          setRelatedItems(all.filter((e) => e.slug !== slug).slice(0, 2));
        });
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ background: "#11140c", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", color: "#94da32", fontFamily: "Space Grotesk, sans-serif" }}>
        DECRYPTING SECURE SIGNAL TRANSMISSION...
      </div>
    );
  }

  // Fallback for invalid slug
  if (!item) {
    return (
      <div className="event-not-found-container">
        <h1 className="event-not-found-title">EVENT NOT FOUND</h1>
        <p className="event-not-found-desc">
          The requested page or news event could not be found.
        </p>
        <Link to="/events" className="event-detail-back-btn">
          <IconArrowLeft />
          <span>Return to News & Events</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="event-detail-container">
      {/* SCANLINE OVERLAY */}
      <div className="scanline-overlay"></div>

      {/* HERO BANNER */}
      <section className="event-detail-hero" style={{ cursor: "zoom-in" }} onClick={() => setZoomImage(true)}>
        <div className="event-detail-hero-bg">
          <img
            src={item.image}
            alt={item.title}
            className="event-detail-hero-img"
          />
        </div>
        <div className="event-detail-hero-overlay"></div>
        <div className="event-detail-hero-content">
          <span className="event-detail-tag-badge">{item.tag}</span>
          <h1 className="event-detail-main-title">{item.title}</h1>
        </div>
      </section>

      {/* DUAL COLUMN LAYOUT */}
      <div className="event-detail-layout">
        {/* Main Content */}
        <main className="event-detail-body">
          {item.content.map((paragraph, index) => (
            <p key={index} className="event-detail-paragraph">
              {paragraph}
            </p>
          ))}

          <Link to="/events" className="event-detail-back-btn">
            <IconArrowLeft />
            <span>Back to News & Events</span>
          </Link>
        </main>

        {/* Sidebar Ledger */}
        <aside className="event-detail-sidebar">
          <div className="event-detail-ledger-card">
            <h3 className="event-detail-ledger-title">DETAILS</h3>

            <div className="event-detail-ledger-row">
              <span className="event-detail-ledger-label">TYPE</span>
              <span className="event-detail-ledger-value" style={{ textTransform: "uppercase" }}>
                {item.type}
              </span>
            </div>

            <div className="event-detail-ledger-row">
              <span className="event-detail-ledger-label">RELEASE DATE</span>
              <span className="event-detail-ledger-value">{item.date}</span>
            </div>

            {item.type === "event" ? (
              <div className="event-detail-ledger-row">
                <span className="event-detail-ledger-label">LOCATION</span>
                <span className="event-detail-ledger-value">{item.location}</span>
              </div>
            ) : (
              <div className="event-detail-ledger-row">
                <span className="event-detail-ledger-label">AUTHOR</span>
                <span className="event-detail-ledger-value">{item.author}</span>
              </div>
            )}

            {item.metaDetails &&
              item.metaDetails.map((meta, index) => (
                <div className="event-detail-ledger-row" key={index}>
                   <span className="event-detail-ledger-label">{meta.label}</span>
                  <span className="event-detail-ledger-value">{meta.value}</span>
                </div>
              ))}

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
        </aside>
      </div>

      {/* RELATED INTELLIGENCE */}
      {relatedItems.length > 0 && (
        <section className="event-detail-related-section">
          <h2 className="event-detail-related-heading">RELATED NEWS & EVENTS</h2>
          <div className="events-grid-layout" style={{ marginBottom: 0 }}>
            {relatedItems.map((related) => (
              <Link
                key={related.id}
                to={`/events/${related.slug}`}
                style={{ textDecoration: "none" }}
              >
                <article className="events-card-item">
                  <div className="events-card-brackets"></div>
                  <div className="events-card-brackets-br"></div>
                  <div className="events-card-img-container">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="events-card-img"
                    />
                    <span className="events-card-tag">{related.tag}</span>
                  </div>
                  <div className="events-card-body">
                    <div className="events-card-meta">
                      {related.type === "event"
                        ? `EVENT — ${related.location}`
                        : `NEWS — BY ${related.author}`}
                    </div>
                    <h3 className="events-card-title">{related.title}</h3>
                    <div className="events-card-link-action">
                      <span>Read More</span>
                      <IconArrowRight />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

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
                src={item.image}
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
    </div>
  );
}
