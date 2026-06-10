import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSiteContents, getAllBlogs, getAllEvents } from "../../utils/cmsDb";
import { colors } from "../../data/constants";

export default function HomeBlogsSection() {
  const siteContents = useSiteContents();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllBlogs(), getAllEvents()])
      .then(([blogs, events]) => {
        const latestBlog = (blogs || [])[0];
        const latestEvent = (events || [])[0];
        const combined = [];
        if (latestBlog) combined.push({ ...latestBlog, isBlog: true });
        if (latestEvent) combined.push({ ...latestEvent, isEvent: true });
        setItems(combined);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const bannerImg = siteContents.homeBlogBanner || "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80";

  return (
    <section 
      style={{ 
        padding: "80px 0", 
        background: colors.background, 
        borderTop: `1px solid ${colors.outlineVariant}`,
        overflow: "hidden"
      }}
    >
      <div 
        style={{ 
          maxWidth: 1280, 
          margin: "0 auto", 
          padding: "0 24px", 
          boxSizing: "border-box" 
        }}
      >
        {/* Header Block */}
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <h2 
            style={{ 
              fontFamily: "'Space Grotesk', sans-serif", 
              fontSize: "clamp(28px, 5vw, 40px)", 
              fontWeight: 700, 
              letterSpacing: 2, 
              color: "#fff",
              margin: "0 0 16px 0",
              textTransform: "uppercase"
            }}
          >
            {siteContents.homeBlogTitle || "Our Blogs"}
          </h2>
          <p 
            style={{ 
              fontFamily: "'Poppins', sans-serif",
              color: colors.onSurfaceVariant, 
              fontSize: 15, 
              lineHeight: 1.7, 
              maxWidth: 720, 
              margin: "0 auto" 
            }}
          >
            {siteContents.homeBlogSubtitle || "Find out how Night Vision offers the best CCTV camera in Nepal and is transforming security in all sectors."}
          </p>
        </div>

        {/* Split Grid Content */}
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: 24 
          }}
        >
          {/* Left Column: Feature Banner Card */}
          <div 
            style={{ 
              backgroundImage: `url(${bannerImg})`, 
              backgroundSize: "cover", 
              backgroundPosition: "center", 
              borderRadius: 6, 
              border: `1px solid ${colors.outlineVariant}`, 
              minHeight: 420, 
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            {/* Dark overlay */}
            <div 
              style={{ 
                position: "absolute", 
                inset: 0, 
                background: "linear-gradient(to top, rgba(14,14,14,0.95) 20%, rgba(14,14,14,0.6) 60%, rgba(14,14,14,0.3) 100%)", 
                zIndex: 1 
              }} 
            />

            {/* Scanlines effect */}
            <div 
              style={{
                position: "absolute", 
                inset: 0,
                background: "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(148,218,50,0.02) 2px, rgba(148,218,50,0.02) 4px)",
                pointerEvents: "none",
                zIndex: 2
              }} 
            />

            {/* Content overlay */}
            <div style={{ position: "relative", zIndex: 3, padding: 32 }}>
              <div 
                style={{ 
                  color: colors.secondary, 
                  fontFamily: "'Space Grotesk', monospace", 
                  fontSize: 10, 
                  fontWeight: 700, 
                  letterSpacing: 2, 
                  marginBottom: 10,
                  textTransform: "uppercase"
                }}
              >
                [ INTEL ARCHIVES ]
              </div>
              <h3 
                style={{ 
                  fontFamily: "'Space Grotesk', sans-serif", 
                  fontSize: 22, 
                  color: "#fff", 
                  fontWeight: 700, 
                  lineHeight: 1.3, 
                  margin: "0 0 16px 0",
                  letterSpacing: 0.5
                }}
              >
                OPERATIONAL SECURITY & ANNOUNCEMENTS
              </h3>
              <p 
                style={{ 
                  fontFamily: "'Poppins', sans-serif", 
                  fontSize: 13, 
                  color: colors.onSurfaceVariant, 
                  lineHeight: 1.6, 
                  margin: "0 0 28px 0" 
                }}
              >
                Access real-time reports, field studies, product update logs, and corporate announcements.
              </p>

              {/* Navigation links */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Link 
                  to="/blog" 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: 8,
                    background: colors.secondary, 
                    color: "#111", 
                    textDecoration: "none", 
                    padding: "14px", 
                    fontWeight: 700, 
                    fontSize: 11, 
                    fontFamily: "'Space Grotesk', sans-serif", 
                    letterSpacing: 2, 
                    textTransform: "uppercase", 
                    borderRadius: 3,
                    transition: "all 0.2s"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = colors.secondary;
                  }}
                >
                  ACCESS SECURITY BLOG
                </Link>
                <Link 
                  to="/events" 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: 8,
                    background: "rgba(148, 218, 50, 0.1)", 
                    color: colors.secondary, 
                    border: `1px solid ${colors.secondary}`,
                    textDecoration: "none", 
                    padding: "14px", 
                    fontWeight: 700, 
                    fontSize: 11, 
                    fontFamily: "'Space Grotesk', sans-serif", 
                    letterSpacing: 2, 
                    textTransform: "uppercase", 
                    borderRadius: 3,
                    transition: "all 0.2s"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = colors.secondary;
                    e.currentTarget.style.color = "#111";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(148, 218, 50, 0.1)";
                    e.currentTarget.style.color = colors.secondary;
                  }}
                >
                  EXPLORE NEWS & EVENTS
                </Link>
              </div>
            </div>
          </div>

          {/* Right Columns: Blog Grid */}
          <div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
              gap: 20,
              gridColumn: "span 2"
            }}
          >
            {loading ? (
              <div 
                style={{ 
                  gridColumn: "1 / -1", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  height: 200, 
                  color: colors.secondary,
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 12,
                  letterSpacing: 1
                }}
              >
                CONNECTING DETECTOR GRID...
              </div>
            ) : items.length > 0 ? (
              items.map((item) => {
                const linkUrl = item.isBlog ? `/blog/${item.slug}` : `/events/${item.slug}`;
                const tagLabel = item.isBlog ? (item.tag || "BLOG") : (item.tag || "NEWS & EVENTS");
                const authorMeta = item.isBlog 
                  ? `${item.date} // BY ${item.author || "OPERATOR"}`
                  : `${item.date} // ${item.location || item.type.toUpperCase()}`;
                const imageSrc = item.isBlog ? item.img : item.image;

                return (
                  <Link 
                    key={item.id} 
                    to={linkUrl} 
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div 
                      style={{ 
                        background: colors.surfaceContainerLowest, 
                        border: `1px solid ${colors.outlineVariant}`, 
                        borderRadius: 6,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.3s ease",
                        overflow: "hidden",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = colors.secondary;
                        e.currentTarget.style.transform = "translateY(-4px)";
                        const img = e.currentTarget.querySelector(".blog-card-img");
                        if (img) img.style.transform = "scale(1.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = colors.outlineVariant;
                        e.currentTarget.style.transform = "translateY(0)";
                        const img = e.currentTarget.querySelector(".blog-card-img");
                        if (img) img.style.transform = "scale(1)";
                      }}
                    >
                      {/* Thumbnail */}
                      <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                        <img 
                          src={imageSrc} 
                          alt={item.title} 
                          className="blog-card-img"
                          style={{ 
                            width: "100%", 
                            height: "100%", 
                            objectFit: "cover",
                            transition: "transform 0.4s ease"
                          }} 
                        />
                        {tagLabel && (
                          <span 
                            style={{ 
                              position: "absolute", 
                              top: 12, 
                              left: 12, 
                              background: colors.secondary, 
                              color: "#111", 
                              fontSize: 9, 
                              fontWeight: 700, 
                              letterSpacing: 1, 
                              padding: "4px 8px", 
                              fontFamily: "'Space Grotesk', sans-serif",
                              textTransform: "uppercase",
                              borderRadius: 2
                            }}
                          >
                            {tagLabel}
                          </span>
                        )}
                      </div>

                      {/* Meta & Title */}
                      <div style={{ padding: 24, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <div 
                          style={{ 
                            fontSize: 10, 
                            color: colors.onSurfaceVariant, 
                            fontFamily: "'Space Grotesk', monospace", 
                            marginBottom: 8,
                            textTransform: "uppercase" 
                          }}
                        >
                          {authorMeta}
                        </div>
                        <h4 
                          style={{ 
                            fontFamily: "'Space Grotesk', sans-serif", 
                            fontSize: 16, 
                            color: "#fff", 
                            fontWeight: 700, 
                            lineHeight: 1.4, 
                            margin: "0 0 12px 0",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                          }}
                        >
                          {item.title}
                        </h4>
                        <p 
                          style={{ 
                            fontFamily: "'Poppins', sans-serif", 
                            fontSize: 13, 
                            color: colors.onSurfaceVariant, 
                            lineHeight: 1.6, 
                            margin: "0 0 20px 0",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                          }}
                        >
                          {item.excerpt}
                        </p>
                        <div 
                          style={{ 
                            marginTop: "auto", 
                            display: "flex", 
                            alignItems: "center", 
                            gap: 6, 
                            color: colors.secondary,
                            fontWeight: 700,
                            fontSize: 11,
                            fontFamily: "'Space Grotesk', sans-serif",
                            letterSpacing: 1.5,
                            textTransform: "uppercase"
                          }}
                        >
                          Read More 
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div 
                style={{ 
                  gridColumn: "1 / -1", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  height: 200, 
                  color: colors.onSurfaceVariant,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13
                }}
              >
                NO RECORD ENTRIES LOCATED IN REGISTRY.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
