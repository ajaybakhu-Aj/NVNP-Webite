import React, { useState, useEffect } from "react";
import Icon from "../../../utils/Icon";
import { getAllGalleryItems, useSiteContents } from "../../../utils/cmsDb";
import PageHeroBanner from "../../../components/ui/PageHeroBanner";

const CATEGORIES = [
  { id: "all", name: "All Deployments" },
  { id: "premium-cameras", name: "Premium Cameras" },
  { id: "control-centers", name: "Control Rooms" },
  { id: "thermal-ir", name: "Thermal / IR" },
  { id: "enterprise-installations", name: "Enterprise Installations" }
];

export default function GalleryPage() {
  const contents = useSiteContents();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Close Lightbox on Escape Key Press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    getAllGalleryItems().then((data) => {
      setGalleryItems(data || []);
      setLoading(false);
    });
  }, []);

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div
      className="gallery-page page-wrapper"
      style={{
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        padding: 0,
        background: "#0a0a0a",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* 1. HIGH IMPACT HERO BANNER */}
      <PageHeroBanner
        title={contents.galleryHeroTitle || "SURVEILLANCE MEDIA & FIELD DEPLOYMENTS"}
        subtitle={contents.galleryHeroSubtitle || "Explore installation logs, active control rooms, extreme environment thermals, and enterprise layouts deployed by NightVision across Nepal."}
      />

      {/* 2. MAIN GALLERY AREA */}
      <main
        className="gallery-main gallery-container"
        style={{
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          padding: "40px 5% 80px 5%",
          boxSizing: "border-box",
        }}
      >
        {/* Category Selector Tabs */}
        <div
          className="category-scroll-container"
          style={{
            marginBottom: "36px",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(124, 252, 0, 0.15)",
            width: "100%",
          }}
        >
          <div
            className="category-tabs"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: "8px 20px",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    fontFamily: "'Space Grotesk', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: isActive
                      ? "1px solid #7CFC00"
                      : "1px solid rgba(255, 255, 255, 0.12)",
                    background: isActive
                      ? "#7CFC00"
                      : "rgba(20, 20, 20, 0.7)",
                    color: isActive ? "#000000" : "#c3c9b3",
                    boxShadow: isActive
                      ? "0 0 16px rgba(124, 252, 0, 0.3)"
                      : "none",
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "#7CFC00",
              width: "100%",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            SYNCHRONIZING FEED PERIMETERS...
          </div>
        ) : filteredItems.length > 0 ? (
          <div
            className="gallery-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "28px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="gallery-card-item"
                style={{
                  background: "#121212",
                  border: "1px solid rgba(124, 252, 0, 0.15)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div
                  className="card-image-wrapper"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "220px",
                    overflow: "hidden",
                    background: "#080808",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title || "Gallery Deployment"}
                    className="gallery-card-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.5s ease, filter 0.3s ease",
                    }}
                    loading="lazy"
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "#7CFC00",
                      color: "#000000",
                      padding: "4px 10px",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      borderRadius: "4px",
                      zIndex: 10,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                    }}
                  >
                    {CATEGORIES.find(c => c.id === item.category)?.name || "DEPLOYMENT"}
                  </div>
                </div>

                <div
                  className="card-details"
                  style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexGrow: 1,
                    boxSizing: "border-box",
                  }}
                >
                  <h3
                    className="gallery-card-title"
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      fontFamily: "'Space Grotesk', sans-serif",
                      lineHeight: 1.35,
                      color: "#ffffff",
                      margin: 0,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.title}
                  </h3>
                  {item.desc && (
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "#aaaaaa",
                        marginTop: "8px",
                        lineHeight: 1.5,
                        fontFamily: "'Poppins', sans-serif",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "#c3c9b3",
              width: "100%",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.9rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            NO MEDIA LOGS RECORDED.
          </div>
        )}
      </main>

      {/* 3. LIGHTBOX PREVIEW MODAL */}
      {selectedItem && (
        <div
          className="lightbox-overlay"
          onClick={() => setSelectedItem(null)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: "20px",
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
              position: "relative",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="lightbox-close-btn"
              aria-label="Close Preview"
              style={{
                position: "absolute",
                top: "-18px",
                right: "-18px",
                background: "#000000",
                border: "2px solid #7CFC00",
                color: "#7CFC00",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 1000,
                boxShadow: "0 0 16px rgba(124, 252, 0, 0.4)",
              }}
            >
              <Icon name="close" size={20} />
            </button>

            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(124, 252, 0, 0.3)",
                boxShadow: "0 0 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(124, 252, 0, 0.2)",
              }}
            >
              <img
                src={selectedItem.img}
                alt={selectedItem.title || "Preview"}
                style={{
                  maxWidth: "100%",
                  maxHeight: "75vh",
                  objectFit: "contain",
                  display: "block",
                  background: "#050505",
                }}
              />
              <div
                style={{
                  width: "100%",
                  background: "#11140c",
                  borderTop: "1px solid rgba(124, 252, 0, 0.3)",
                  padding: "16px 24px",
                  color: "#ffffff",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1rem",
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                  boxSizing: "border-box",
                  textAlign: "center",
                }}
              >
                {selectedItem.title}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Hover Elevation Effects on Gallery Cards */
        .gallery-card-item:hover {
          border-color: #7CFC00 !important;
          transform: translateY(-4px) !important;
          box-shadow: 0 10px 24px rgba(124, 252, 0, 0.12) !important;
        }

        .gallery-card-item:hover .gallery-card-img {
          transform: scale(1.05) !important;
        }

        .gallery-card-item:hover .gallery-card-title {
          color: #7CFC00 !important;
        }

        @media screen and (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
