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
    <div className="events-page-container">
      <PageHeroBanner
        title={contents.eventsHeroTitle || "NEWS & EVENTS"}
        subtitle={contents.eventsHeroSubtitle || "Latest News, Events, and Updates from NightVision Security Systems."}
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
          <section className="text-center py-16 bg-[#1e2117] rounded-lg border border-white/5">
            <p className="text-[#94da32] text-base font-['Space_Grotesk']">
              RETRIEVING SECURITY EVENT BROADCASTING LOGS...
            </p>
          </section>
        ) : filteredItems.length > 0 ? (
          <section className="events-grid-layout">
            {filteredItems.map((item) => (
              <EventCard key={item.id} item={item} />
            ))}
          </section>
        ) : (
          <section className="text-center py-16 bg-[#1e2117] rounded-lg border border-white/5">
            <p className="text-[#c3c9b3] text-base font-['Space_Grotesk']">
              NO NEWS OR EVENTS MATCHING YOUR SEARCH.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
