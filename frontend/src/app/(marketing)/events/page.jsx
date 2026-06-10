import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../../utils/cmsDb";
import PageHeroBanner from "../../../components/ui/PageHeroBanner";

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEvents().then((data) => {
      setEventsList(data);
      setLoading(false);
    });
  }, []);

  const filteredItems = eventsList.filter((item) => {
    // Tab filtering
    if (activeTab !== "all" && item.type !== activeTab) {
      return false;
    }

    // Search query filtering
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchExcerpt = item.excerpt.toLowerCase().includes(query);
      const matchTag = item.tag.toLowerCase().includes(query);
      return matchTitle || matchExcerpt || matchTag;
    }

    return true;
  });

  return (
    <div className="events-page-container">
      <PageHeroBanner
        title="NEWS & EVENTS"
        subtitle="Latest News, Events, and Updates from NightVision Security Systems."
      />

      <main className="events-main-section">

        {/* SEARCH & FILTER BAR */}
        <section className="events-search-filter-bar">
          <div className="events-tabs-scroll">
            <button
              onClick={() => setActiveTab("all")}
              className={`events-tab-btn ${activeTab === "all" ? "active" : ""}`}
            >
              All Updates
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`events-tab-btn ${activeTab === "news" ? "active" : ""}`}
            >
              News
            </button>
            <button
              onClick={() => setActiveTab("event")}
              className={`events-tab-btn ${activeTab === "event" ? "active" : ""}`}
            >
              Events
            </button>
          </div>

          <div className="events-search-wrapper">
            <span className="events-search-icon">
              <IconSearch />
            </span>
            <input
              type="text"
              placeholder="SEARCH..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="events-search-input"
            />
          </div>
        </section>

        {/* GRID OF NEWS / EVENTS */}
        {loading ? (
          <section
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#1e2117",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <p style={{ color: "#94da32", fontSize: "16px", fontFamily: "Space Grotesk" }}>
              RETRIEVING SECURITY EVENT BROADCASTING LOGS...
            </p>
          </section>
        ) : filteredItems.length > 0 ? (
          <section className="events-grid-layout">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                to={`/events/${item.slug}`}
                style={{ textDecoration: "none" }}
              >
                <article className="events-card-item">
                  {/* Decorative neon corner brackets */}
                  <div className="events-card-brackets"></div>
                  <div className="events-card-brackets-br"></div>

                  {/* Image container */}
                  <div className="events-card-img-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="events-card-img"
                    />
                    <span className="events-card-tag">{item.tag}</span>
                  </div>

                  {/* Body details */}
                  <div className="events-card-body">
                    <div className="events-card-meta">
                      {item.type === "event"
                        ? `EVENT — ${item.location}`
                        : `NEWS — BY ${item.author}`}
                    </div>
                    <h2 className="events-card-title">{item.title}</h2>
                    <p className="events-card-excerpt">{item.excerpt}</p>
                    <div className="events-card-link-action">
                      <span>Read More</span>
                      <IconArrowRight />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </section>
        ) : (
          <section
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#1e2117",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <p style={{ color: "#c3c9b3", fontSize: "16px", fontFamily: "Space Grotesk" }}>
              NO NEWS OR EVENTS MATCHING YOUR SEARCH.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
