import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../../utils/productDb";
import ProductCard from "../../../components/products/ProductCard";
import Icon from "../../../utils/Icon";
import PageHeroBanner from "../../../components/ui/PageHeroBanner";


export default function NightVision() {
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [maxPrice, setMaxPrice] = useState(20000);

  const refreshProducts = () => {
    setLoading(true);
    getAllProducts().then((data) => {
      setProductsList(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  // Handle Category navigation click
  const handleCategoryToggle = (category) => {
    let targetPath = "/products";
    if (category === "Wireless CCTV Cameras") {
      targetPath = "/products/wireless-cameras";
    } else if (category === "IP CCTV Cameras") {
      targetPath = "/products/ip-cameras";
    } else if (category === "Network Video Recoder (NVR)") {
      targetPath = "/products/nvr";
    } else if (category === "POE Switch") {
      targetPath = "/products/poe-switch";
    }
    navigate(targetPath);
  };

  // Handle Memory Dropdown selection
  const handleMemorySelect = (e) => {
    const val = e.target.value;
    if (val === "Hard Disk") {
      navigate("/products/hard-disk");
    } else if (val === "SD Card") {
      navigate("/products/sd-card");
    } else {
      navigate("/products");
    }
  };

  // Handle Product Type navigation click (Single Select)
  const handleProductTypeToggle = (type) => {
    let targetPath = "/products";
    if (type === "Indoor CCTV Cameras") {
      targetPath = "/products/indoor-cameras";
    } else if (type === "Outdoor CCTV Cameras") {
      targetPath = "/products/outdoor-cameras";
    } else if (type === "Indoor and Outdoor CCTV Cameras") {
      targetPath = "/products/indoor-outdoor-cameras";
    } else if (type === "AI Cameras") {
      targetPath = "/products/ai-cameras";
    }
    navigate(targetPath);
  };

  // Filter Logic
  const filteredProducts = productsList.filter((p) => {
    // Price Filter
    return p.price <= maxPrice;
  });

  return (
    <div className="products-page">
      {/* HERO - Unified PageHeroBanner */}
      <PageHeroBanner
        title="OUR PRODUCTS"
        subtitle="Advanced surveillance architecture engineered for uncompromising vigilance."
      />


      {/* PRODUCTS SECTION */}
      <section className="products-layout" style={{ paddingTop: "24px" }}>
        {/* SIDEBAR FILTERS */}
        <aside className="categories-sidebar" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          
          {/* PRICE SLIDER FILTER */}
          <div style={{ border: "1px solid #434938", padding: 16, borderRadius: 4, background: "#181a15" }}>
            <h4 style={{ margin: "0 0 16px 0", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", color: "#deffa4", letterSpacing: 1 }}>
              PRICE LIMIT (NPR)
            </h4>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#8d937f", fontSize: 12, marginBottom: 8 }}>
              <span>रू 0</span>
              <span style={{ color: "#94da32", fontWeight: 700 }}>Up to रू {maxPrice.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "#94da32",
                cursor: "pointer",
                background: "#0c0d0a",
                height: 6,
                borderRadius: 3
              }}
            />
            <div style={{ textAlign: "right", color: "#8d937f", fontSize: 10, marginTop: 4 }}>
              Max: रू 20,000
            </div>
          </div>

          {/* CATEGORY FILTER (Single-select checkboxes + memory dropdown) */}
          <div style={{ border: "1px solid #434938", padding: 16, borderRadius: 4, background: "#181a15" }}>
            <h4 style={{ margin: "0 0 16px 0", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", color: "#deffa4", letterSpacing: 1 }}>
              CATEGORIES
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Wireless CCTV Cameras",
                "IP CCTV Cameras",
                "Network Video Recoder (NVR)",
                "POE Switch"
              ].map((cat) => {
                return (
                  <label key={cat} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: "#c3c9b3", fontSize: 13, userSelect: "none" }}>
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => handleCategoryToggle(cat)}
                      style={{
                        width: 16,
                        height: 16,
                        accentColor: "#94da32",
                        cursor: "pointer"
                      }}
                    />
                    {cat}
                  </label>
                );
              })}

              {/* Memory Dropdown inside Categories */}
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ color: "#8d937f", fontSize: 11, letterSpacing: 0.5 }}>MEMORY INTERFACE</label>
                <select
                  value=""
                  onChange={handleMemorySelect}
                  style={{
                    background: "#0c0d0a",
                    border: "1px solid #434938",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: 4,
                    fontSize: 12,
                    cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}
                >
                  <option value="">Select Memory</option>
                  <option value="Hard Disk">Hard Disk</option>
                  <option value="SD Card">SD Card</option>
                </select>
              </div>
            </div>
          </div>

          {/* PRODUCT TYPE FILTER */}
          <div style={{ border: "1px solid #434938", padding: 16, borderRadius: 4, background: "#181a15" }}>
            <h4 style={{ margin: "0 0 16px 0", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", color: "#deffa4", letterSpacing: 1 }}>
              PRODUCT TYPE
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Indoor CCTV Cameras",
                "Outdoor CCTV Cameras",
                "Indoor and Outdoor CCTV Cameras",
                "AI Cameras"
              ].map((type) => {
                return (
                  <label key={type} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: "#c3c9b3", fontSize: 13, userSelect: "none" }}>
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => handleProductTypeToggle(type)}
                      style={{
                        width: 16,
                        height: 16,
                        accentColor: "#94da32",
                        cursor: "pointer"
                      }}
                    />
                    {type}
                  </label>
                );
              })}
            </div>
          </div>

          {/* BUILD YOUR CCTV SETUP BUTTON (Navigate to Setup Page) */}
          <div style={{
            border: "1px solid #94da32",
            padding: 16,
            borderRadius: 4,
            background: "linear-gradient(135deg, #181a15 0%, #0d0f0a 100%)",
            boxShadow: "0 0 15px rgba(148, 218, 50, 0.15)",
            textAlign: "center"
          }}>
            <h4 style={{ margin: "0 0 8px 0", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", color: "var(--nv-onSurf)", letterSpacing: 1 }}>
              CUSTOM SETUP
            </h4>
            <p style={{ color: "#8d937f", fontSize: 11, lineHeight: 1.5, marginBottom: 16 }}>
              Configure a complete camera network interactively to match your requirements.
            </p>
            <button
              onClick={() => navigate("/cctv-setup")}
              style={{
                width: "100%",
                background: "#94da32",
                color: "#111",
                border: "none",
                padding: "12px 8px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                letterSpacing: 1,
                borderRadius: 4,
                boxShadow: "0 0 10px rgba(148, 218, 50, 0.25)",
                transition: "transform 0.15s"
              }}
            >
              BUILD YOUR CCTV SETUP
            </button>
          </div>

          {/* CLEAR FILTERS */}
          {maxPrice < 20000 && (
            <button
              onClick={() => {
                setMaxPrice(20000);
              }}
              style={{
                width: "100%",
                background: "transparent",
                border: "1px dashed #ff6b6b",
                color: "#ff6b6b",
                padding: 10,
                borderRadius: 4,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 12,
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              RESET ALL FILTERS
            </button>
          )}

        </aside>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "100px 0", color: "#94da32", flex: 1, minHeight: "800px" }}>
            LOADING DYNAMIC DATA PIPELINES...
          </div>
        ) : (
          <div className="products-grid" style={{ flex: 1, minHeight: "800px" }}>
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
            {filteredProducts.length === 0 && (
              <div style={{ color: "#8d937f", textAlign: "center", padding: "80px 0", width: "100%", gridColumn: "1 / -1", border: "1px dashed #434938", borderRadius: 4, background: "#181a15" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}><Icon name="search" size={32} style={{ color: "#94da32" }} /></div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#fff", fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>
                  NO SYSTEMS MATCHING SEARCH
                </div>
                <div style={{ fontSize: 13, maxWidth: 300, margin: "0 auto" }}>
                  Try relaxing your price filters or selecting a different category.
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* SEO BODY TEXT SECTION */}
      <section style={{ maxWidth: 1280, margin: "64px auto 0 auto", padding: "0 24px 64px 24px" }}>
        <div style={{
          borderTop: "1px solid #434938",
          paddingTop: 48,
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 32
        }}>
          <div>
            <h2 style={{
              fontSize: "clamp(24px, 4vw, 32px)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 24,
              lineHeight: 1.2
            }}>
              How to Choose the Right CCTV System for Your Location
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 32,
              lineHeight: 1.7,
              fontSize: 14,
              color: "#c3c9b3"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h3 style={{ fontSize: 16, color: "var(--nv-onSurf)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                  1. Wireless CCTV Cameras vs IP CCTV Cameras
                </h3>
                <p>
                  Choosing between **Wireless CCTV Cameras** and **IP CCTV Cameras** depends on your installation constraints. Wireless models are optimized for quick setup and flexibility, ideal for residential rooms and small offices where running Ethernet cables is difficult. **IP CCTV Cameras** communicate over network lines, providing ultra-stable Gigabit streaming rates and PoE integration, preferred for robust corporate or long-distance deployments.
                </p>
                <h3 style={{ fontSize: 16, color: "var(--nv-onSurf)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                  2. Selecting Camera Resolution (Megapixels)
                </h3>
                <p>
                  High-megapixel values ensure you capture fine details, such as vehicle license plates or facial features, from a distance. A **2 MP** (1080p Full HD) camera offers a reliable budget entry point, while **4 MP** (Super/Quad HD) provides a significant upgrade in clarity. For high-security zones like entrances, cash registers, or parking lots, opt for **8 MP** (4K UHD) cameras to enable lossless digital zooming.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h3 style={{ fontSize: 16, color: "var(--nv-onSurf)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                  3. NVR and PoE Switch Networking Infrastructure
                </h3>
                <p>
                  For multi-camera networks, a **Network Video Recorder (NVR)** is the brain of your setup, aggregating video streams from all IP cameras. Connect them through a **POE (Power over Ethernet) Switch** to transmit both high-speed data and electricity over a single RJ-45 cable, simplifying cable management and reducing electrical wiring overhead.
                </p>
                <h3 style={{ fontSize: 16, color: "var(--nv-onSurf)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                  4. Determining Storage Capacity Needs (Hard Disk vs SD Card)
                </h3>
                <p>
                  Local storage ensures continuous recording even during network outages. **Hard Disk Drives (HDD)**, especially surveillance-optimized models, are deployed inside NVRs for 24/7 continuous multi-camera archiving. **SD Cards** are compact flash memories plugged directly into wireless cameras, serving as independent edge-recording stores for motion-triggered event clips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}