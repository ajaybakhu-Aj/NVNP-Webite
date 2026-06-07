import React, { useState, useEffect } from "react";
import Icon from "../../../utils/Icon";

const GALLERY_ITEMS = [
  {
    id: 1,
    category: "premium-cameras",
    title: "NV-Dome Pro Zero Light Installation",
    model: "NV-DOME-900",
    location: "KTM Office Sector 1",
    resolution: "4K UHD (3840x2160)",
    status: "ACTIVE // SECURED",
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    desc: "Premium dome camera deployed in corporate perimeter, featuring dual-lens IR cut filters and AI-based human recognition algorithms."
  },
  {
    id: 2,
    category: "control-centers",
    title: "Central Control Room Grid Array",
    model: "NV-WALL-CONSOLE-v4",
    location: "Bhaktapur Operations Center",
    resolution: "Multi-Feed Matrix",
    status: "ONLINE // SYNCED",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    desc: "Video wall synchronizing 120+ active CCTV feeds across corporate office networks, utilizing real-time anomaly alerts."
  },
  {
    id: 3,
    category: "thermal-ir",
    title: "Thermal Target Acquisition Feed",
    model: "NV-THERM-x7",
    location: "Mustang High Altitude Outpost",
    resolution: "640x512 Radiometric",
    status: "OPERATIONAL",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    desc: "Long-range thermal sensor field feed capturing heat signatures at sub-zero temperatures. Active motion recognition zone enabled."
  },
  {
    id: 4,
    category: "enterprise-installations",
    title: "Wall Mount PTZ Exterior Deployment",
    model: "NV-PTZ-PREMIUM",
    location: "Industrial Sector West",
    resolution: "4K Zoom 30x",
    status: "ACTIVE // PANNING",
    img: "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=800&q=80",
    desc: "Heavy-duty outdoor PTZ camera, fully integrated into the customer's remote monitoring dashboard. High wind resistance chassis."
  },
  {
    id: 5,
    category: "control-centers",
    title: "Operations Desk Station 3",
    model: "NV-CLIENT-WORKSTATION-x9",
    location: "Lalitpur Server Hub",
    resolution: "Dual 1080p Monitor Set",
    status: "STANDBY // SECURE",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    desc: "Local administrator monitoring station with direct link to emergency fire alarms and automated security alerts."
  },
  {
    id: 6,
    category: "premium-cameras",
    title: "IR Night-Vision Sub-Assembly Setup",
    model: "NV-BULLET-750",
    location: "Biratnagar Depot Zone",
    resolution: "5MP Smart IR",
    status: "ACTIVE // ONLINE",
    img: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
    desc: "High-power infrared illuminators array on bullet chassis, designed to render pitch-black shipping containers with crisp clarity."
  },
  {
    id: 7,
    category: "enterprise-installations",
    title: "Encrypted Network Rack Integration",
    model: "NV-NET-SWITCH-24G",
    location: "Pokhara Data Hub",
    resolution: "10Gbps SFP+ Link",
    status: "SECURED // STREAMING",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    desc: "Centralized gigabit optical switches routing encrypted feeds from 40 outdoor units into the primary local storage network."
  },
  {
    id: 8,
    category: "thermal-ir",
    title: "Himalayan Ridge Patrol Sensor Calibration",
    model: "NV-THERM-x7",
    location: "Annapurna Base Perimeter",
    resolution: "1080p Upscaled IR",
    status: "ACTIVE // LIVE",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    desc: "High-altitude environmental housing test for NV-THERM line. Standardized operations maintained at temperatures below -25°C."
  },
  {
    id: 9,
    category: "premium-cameras",
    title: "Residential Gate PTZ Integration",
    model: "NV-PTZ-MINI",
    location: "Residential Zone 4",
    resolution: "4K UHD Smart Mount",
    status: "ACTIVE // SECURED",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    desc: "Mini-PTZ installation offering residential perimeter coverage. Integrates smart facial alerts and remote two-way audio."
  }
];

const CATEGORIES = [
  { id: "all", name: "All Deployments" },
  { id: "premium-cameras", name: "Premium Cameras" },
  { id: "control-centers", name: "Control Rooms" },
  { id: "thermal-ir", name: "Thermal / IR" },
  { id: "enterprise-installations", name: "Enterprise Installations" }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

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

  const filteredItems = activeCategory === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero-radial" />
        <div className="gallery-hero-scanlines" />
        
        {/* HUD Crosshairs */}
        <span className="crosshair crosshair-tl">+</span>
        <span className="crosshair crosshair-tr">+</span>
        <span className="crosshair crosshair-bl">+</span>
        <span className="crosshair crosshair-br">+</span>

        <div className="gallery-hero-content">
          <div className="status-badge">
            <span className="pulse-dot" />
            <span className="status-text">LIVE_MEDIA_ARCHIVE_ACTIVE</span>
          </div>
          <h1 className="gallery-hero-title">
            SURVEILLANCE MEDIA & FIELD DEPLOYMENTS
          </h1>
          <p className="gallery-hero-desc">
            Explore installation logs, active control rooms, extreme environment thermals, and enterprise layouts deployed by NightVision across Nepal.
          </p>
        </div>
      </section>

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
                  alt={item.title}
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
                <div className="card-meta">
                  <span className="card-model">{item.model}</span>
                  <span className="card-status">{item.status}</span>
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-location">
                  <Icon name="location_on" size={12} className="loc-icon" />
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox / Preview Modal */}
      {selectedItem && (
        <div className="lightbox-overlay" onClick={() => setSelectedItem(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="lightbox-close-btn"
              aria-label="Close Preview"
            >
              <Icon name="close" size={24} />
            </button>

            <div className="lightbox-grid">
              {/* Image Col */}
              <div className="lightbox-image-wrapper">
                <img
                  src={selectedItem.img}
                  alt={selectedItem.title}
                  className="lightbox-image"
                />
                <div className="lightbox-scanline" />
              </div>

              {/* Specs Col */}
              <div className="lightbox-specs-wrapper">
                <div className="specs-header">
                  <span className="specs-badge">LOG_MEDIA_{selectedItem.id}</span>
                  <h2 className="specs-title">{selectedItem.title}</h2>
                </div>

                <div className="specs-info-list">
                  <div className="spec-row">
                    <span className="spec-label">CAMERA MODEL</span>
                    <span className="spec-val text-primary">{selectedItem.model}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">DEPLOYMENT ZONE</span>
                    <span className="spec-val">{selectedItem.location}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">OUTPUT RESOLUTION</span>
                    <span className="spec-val">{selectedItem.resolution}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">STREAM STATUS</span>
                    <span className="spec-val status-green">{selectedItem.status}</span>
                  </div>
                </div>

                <div className="specs-desc-block">
                  <h4 className="desc-title">FIELD UPDATE SUMMARY</h4>
                  <p className="desc-text">{selectedItem.desc}</p>
                </div>

                <div className="specs-footer-actions">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="btn-back-grid"
                  >
                    RETURN TO MEDIA ARCHIVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
