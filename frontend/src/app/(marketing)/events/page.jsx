import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getAllEvents, useSiteContents } from "../../../utils/cmsDb";
import PageHeroBanner from "../../../components/ui/PageHeroBanner";
import EventCard from "../../../components/events/EventCard";

export default function EventsPage() {
  const contents = useSiteContents();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEvents().then((data) => {
      setEventsList(data || []);
      setLoading(false);
    });
  }, []);

  const filteredItems = eventsList.filter((item) => {
    if (activeTab !== "all" && item.type !== activeTab) {
      return false;
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        (item.tag && item.tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="events-page-container news-page-container w-full max-w-full m-0 p-0">
      <PageHeroBanner
        className="news-hero-banner events-hero-header news-hero"
        title={contents.eventsHeroTitle || "NEWS & EVENTS"}
        subtitle={contents.eventsHeroSubtitle || "Latest News, Events, and Updates from NightVision Security Systems."}
        centered={false}
      />

      <main className="events-main-section news-main-section">
        {/* SEARCH & FILTER BAR */}
        <section className="events-search-filter-bar news-filter-bar filter-search-wrapper">
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
              <Search size={18} />
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
          <section className="events-grid-layout text-center py-16 bg-[#1e2117] rounded-lg border border-white/5">
            <p className="text-[#b5e75d] text-base font-['Space_Grotesk']">
              RETRIEVING SECURITY EVENT BROADCASTING LOGS...
            </p>
          </section>
        ) : filteredItems.length > 0 ? (
          <section className="events-grid-layout news-grid-layout">
            {filteredItems.map((item) => (
              <EventCard key={item.id} item={item} />
            ))}
          </section>
        ) : (
          <section className="events-grid-layout text-center py-16 bg-[#1e2117] rounded-lg border border-white/5">
            <p className="text-[#c3c9b3] text-base font-['Space_Grotesk']">
              NO NEWS OR EVENTS MATCHING YOUR SEARCH.
            </p>
          </section>
        )}
      </main>

      <style>{`
        /* Hero Banner Container & Background (100% Viewport Width) */
        .news-hero-banner,
        .news-header-section,
        .events-hero-header,
        .news-hero {
          width: 100% !important;
          max-width: 100% !important;
          border-radius: 0 !important;
          margin: 0 !important;
          background-color: #b5e75d !important;
          text-align: left !important;
        }

        /* Standardized Site-Wide Left Guide Line */
        .news-hero-inner,
        .news-filter-bar,
        .news-cards-grid,
        .news-page-container > div,
        .events-search-filter-bar,
        .filter-search-wrapper,
        .events-grid-layout,
        .news-grid-layout {
          max-width: 1400px !important;
          width: 100% !important;
          margin-left: auto !important;
          margin-right: auto !important;
          padding-left: 5% !important;
          padding-right: 5% !important;
          box-sizing: border-box !important;
        }

        .news-hero-inner,
        .news-hero-banner > div,
        .events-hero-header > div {
          text-align: left !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
        }

        .news-hero-banner h1,
        .events-hero-header h1,
        .news-hero h1,
        .news-hero-banner .page-hero-banner-title {
          margin-left: 0 !important;
          padding-left: 0 !important;
          color: #000000 !important;
          font-weight: 800 !important;
          font-size: 2rem !important;
          margin-bottom: 6px !important;
          text-transform: uppercase !important;
        }

        .news-hero-banner p,
        .events-hero-header p,
        .news-hero p,
        .news-hero-banner .page-hero-banner-subtitle {
          margin-left: 0 !important;
          padding-left: 0 !important;
          color: #111111 !important;
          font-weight: 600 !important;
          font-size: 0.88rem !important;
          max-width: 800px !important;
          margin: 0 !important;
          text-align: left !important;
        }

        /* Lower Filter Bar Layout */
        .events-search-filter-bar,
        .news-filter-bar,
        .filter-search-wrapper {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          margin-top: 32px !important;
          margin-bottom: 32px !important;
        }

        /* Active Filter Tab Button */
        .events-tab-btn.active {
          background-color: #b5e75d !important;
          color: #000000 !important;
          font-weight: 700 !important;
        }
      `}</style>
    </div>
  );
}
