import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllProducts } from "../../utils/productDb";
import { colors } from "../../data/constants";
import ProductCard from "./ProductCard";
import Icon from "../../utils/Icon";
import PageHeroBanner from "../ui/PageHeroBanner";


export default function CategoryProductView({
  pageTitle,
  pageDesc,
  categoryKey,
  productTypeKey,
  tagKey,
  keyFeatures = [],
  pageBodyText = "",
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State (Local to page)
  const [maxPrice, setMaxPrice] = useState(20000);
  const [selectedMemory, setSelectedMemory] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllProducts().then((data) => {
      setProductsList(data);
      setLoading(false);
    });
  }, [categoryKey, productTypeKey, tagKey]);

  // Sidebar navigation handles: clicking active item routes back to main `/products` catalog
  const handleCategoryNav = (catName) => {
    let targetPath = "/products";
    if (catName === "Wireless CCTV Cameras" && categoryKey !== "Wireless CCTV Cameras") {
      targetPath = "/products/wireless-cameras";
    } else if (catName === "IP CCTV Cameras" && categoryKey !== "IP CCTV Cameras") {
      targetPath = "/products/ip-cameras";
    } else if (catName === "Network Video Recoder (NVR)" && categoryKey !== "Network Video Recoder (NVR)") {
      targetPath = "/products/nvr";
    } else if (catName === "POE Switch" && categoryKey !== "POE Switch") {
      targetPath = "/products/poe-switch";
    }
    navigate(targetPath);
  };

  const handleProductTypeNav = (typeName) => {
    let targetPath = "/products";
    if (typeName === "Indoor CCTV Cameras" && productTypeKey !== "Indoor CCTV Cameras") {
      targetPath = "/products/indoor-cameras";
    } else if (typeName === "Outdoor CCTV Cameras" && productTypeKey !== "Outdoor CCTV Cameras") {
      targetPath = "/products/outdoor-cameras";
    } else if (typeName === "Indoor and Outdoor CCTV Cameras" && productTypeKey !== "Indoor and Outdoor CCTV Cameras") {
      targetPath = "/products/indoor-outdoor-cameras";
    } else if (typeName === "AI Cameras" && tagKey !== "ai") {
      targetPath = "/products/ai-cameras";
    }
    navigate(targetPath);
  };

  const handleMemoryNav = (e) => {
    const val = e.target.value;
    setSelectedMemory(val);
    if (val === "Hard Disk") {
      navigate("/products/hard-disk");
    } else if (val === "SD Card") {
      navigate("/products/sd-card");
    } else {
      navigate("/products");
    }
  };

  // Keep memory dropdown synced
  useEffect(() => {
    if (categoryKey === "Hard Disk") {
      setSelectedMemory("Hard Disk");
    } else if (categoryKey === "SD Card") {
      setSelectedMemory("SD Card");
    } else {
      setSelectedMemory("");
    }
  }, [categoryKey]);

  // Filter products matching this page's category/type + local price
  const filteredProducts = productsList.filter((p) => {
    // 1. Price Limit
    if (p.price > maxPrice) return false;

    // 2. Main Page Filter
    if (categoryKey && p.category !== categoryKey) return false;
    if (productTypeKey && p.productType !== productTypeKey) return false;
    if (tagKey && (!p.tags || !p.tags.includes(tagKey))) return false;

    return true;
  });

  return (
    <div className="products-page">
      {/* HERO SECTION - Unified PageHeroBanner */}
      <PageHeroBanner
        title={pageTitle.toUpperCase()}
        subtitle={pageDesc}
      />


      {/* MAIN LAYOUT */}
      <section className="products-layout" style={{ paddingTop: "24px" }}>
        {/* SIDEBAR */}
        <aside className="categories-sidebar" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          
          {/* PRICE SLIDER */}
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

          {/* CATEGORIES */}
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
                const isChecked = categoryKey === cat;
                return (
                  <label key={cat} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: isChecked ? "#fff" : "#c3c9b3", fontSize: 13, userSelect: "none" }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCategoryNav(cat)}
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

              {/* Memory Dropdown */}
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ color: "#8d937f", fontSize: 11, letterSpacing: 0.5 }}>MEMORY INTERFACE</label>
                <select
                  value={selectedMemory}
                  onChange={handleMemoryNav}
                  style={{
                    background: "#0c0d0a",
                    border: "1px solid #434938",
                    color: selectedMemory ? "#94da32" : "#fff",
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

          {/* PRODUCT TYPE (Single Select) */}
          <div style={{ border: "1px solid #434938", padding: 16, borderRadius: 4, background: "#181a15" }}>
            <h4 style={{ margin: "0 0 16px 0", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", color: "#deffa4", letterSpacing: 1 }}>
              PRODUCT TYPE
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Indoor CCTV Cameras", value: "Indoor CCTV Cameras" },
                { label: "Outdoor CCTV Cameras", value: "Outdoor CCTV Cameras" },
                { label: "Indoor and Outdoor CCTV Cameras", value: "Indoor and Outdoor CCTV Cameras" },
                { label: "AI Cameras", value: "AI Cameras" }
              ].map((type) => {
                const isChecked = productTypeKey === type.value || (type.value === "AI Cameras" && tagKey === "ai");
                return (
                  <label key={type.value} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: isChecked ? "#fff" : "#c3c9b3", fontSize: 13, userSelect: "none" }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleProductTypeNav(type.value)}
                      style={{
                        width: 16,
                        height: 16,
                        accentColor: "#94da32",
                        cursor: "pointer"
                      }}
                    />
                    {type.label}
                  </label>
                );
              })}
            </div>
          </div>

          {/* CCTV SETUP BUTTON */}
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

          {/* RESET BUTTON */}
          <button
            onClick={() => navigate("/products")}
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

        </aside>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "100px 0", color: "#94da32", flex: 1 }}>
            LOADING DYNAMIC DATA PIPELINES...
          </div>
        ) : (
          <div className="products-grid" style={{ flex: 1 }}>
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

      {/* DETAILED CATEGORY/PRODUCT TYPE BODY TEXT */}
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
              KEY SPECIFICATIONS & FEATURES
            </h2>
            
            {keyFeatures.length > 0 && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
                marginBottom: 32
              }}>
                {keyFeatures.map((feat, i) => (
                  <div key={i} style={{
                    background: "#181a15",
                    border: "1px solid #434938",
                    padding: "16px 20px",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12
                  }}>
                    <Icon name="check" size={18} style={{ color: "#94da32", flexShrink: 0 }} />
                    <span style={{ color: "#fff", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif" }}>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{
              lineHeight: 1.7,
              fontSize: 15,
              color: "#c3c9b3",
              maxWidth: 800
            }}>
              <p style={{ whiteSpace: "pre-line" }}>{pageBodyText}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
