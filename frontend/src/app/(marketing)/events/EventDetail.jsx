import React from "react";
import { useParams, Link } from "react-router-dom";
import { newsEventsData } from "../../../data/newsEvents";

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

  // Find matching news/event item
  const item = newsEventsData.find((e) => e.slug === slug);

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

  // Get related items (excluding current)
  const relatedItems = newsEventsData
    .filter((e) => e.slug !== slug)
    .slice(0, 2);

  return (
    <div className="event-detail-container">
      {/* SCANLINE OVERLAY */}
      <div className="scanline-overlay"></div>

      {/* HERO BANNER */}
      <section className="event-detail-hero">
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
    </div>
  );
}
