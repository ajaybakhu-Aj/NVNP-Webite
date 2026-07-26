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
  const [loading, setLoading] = useState(true); l

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
      setGalleryItems(data);
      setLoading(false);
    });
  }, []);

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="gallery-page">
      <PageHeroBanner
        title={contents.galleryHeroTitle || "SURVEILLANCE MEDIA & FIELD DEPLOYMENTS"}
        subtitle={contents.galleryHeroSubtitle || "Explore installation logs, active control rooms, extreme environment thermals, and enterprise layouts deployed by NightVision across Nepal."}
      />

      {/* Main Gallery Area */}
      <main className="gallery-main">
        {/* Category Selector Tabs */}
        <div className="category-scroll-container">
          <div className="category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#94da32", width: "100%", fontFamily: "Space Grotesk, sans-serif", fontSize: "14px" }}>
            SYNCHRONIZING FEED PERIMETERS...
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="gallery-card"
              >
                {/* Corner brackets */}
                <div className="card-bracket bracket-tl" />
                <div className="card-bracket bracket-tr" />
                <div className="card-bracket bracket-bl" />
                <div className="card-bracket bracket-br" />

                <div className="card-image-wrapper">
                  <img
                    src={item.img}
                    alt=""
                    className="card-image"
                    loading="lazy"
                  />

                  {/* HUD Scan Overlay */}
                  <div className="card-hud-overlay">
                    <div className="hud-target-box" />
                    <span className="hud-coordinate-label">CAM_{item.id}_LOC</span>
                  </div>

                  <div className="card-category-tag">
                    {CATEGORIES.find(c => c.id === item.category)?.name}
                  </div>
                </div>

                <div className="card-details">
                  <h3 className="card-title" style={{ marginBottom: 0 }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#c3c9b3", width: "100%", fontFamily: "Space Grotesk, sans-serif", fontSize: "14px" }}>
            NO MEDIA LOGS RECORDED.
          </div>
        )}
      </main>

      {/* Lightbox / Preview Modal */}
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
              onClick={() => setSelectedItem(null)}
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

            <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <img
                src={selectedItem.img}
                alt=""
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  border: "2px solid #94da32",
                  boxShadow: "0 0 25px rgba(148, 218, 50, 0.35)",
                  display: "block"
                }}
              />
              <div style={{
                width: "100%",
                background: "#11140c",
                border: "2px solid #94da32",
                borderTop: "none",
                padding: "16px 20px",
                color: "#e2e4d5",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "15px",
                fontWeight: "600",
                letterSpacing: "0.5px",
                boxSizing: "border-box",
                textAlign: "center"
              }}>
                {selectedItem.title}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
