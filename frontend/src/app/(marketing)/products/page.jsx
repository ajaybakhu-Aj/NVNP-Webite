import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../../utils/productDb";
import ProductCard from "../../../components/products/ProductCard";
import Icon from "../../../utils/Icon";
import PageHeroBanner from "../../../components/ui/PageHeroBanner";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";


import ProductFilterSidebar from "../../../components/products/ProductFilterSidebar";

export default function NightVision() {
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [maxPrice, setMaxPrice] = useState(20000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
      <Breadcrumbs />
      {/* HERO - Unified PageHeroBanner */}
      <PageHeroBanner
        title="OUR PRODUCTS"
        subtitle="Advanced surveillance architecture engineered for uncompromising vigilance."
      />


      {/* PRODUCTS SECTION */}
      <section className="products-layout">
        {/* MOBILE / TABLET FILTER ACTION BAR */}
        <div className="mobile-filter-bar">
          <button
            className="mobile-filter-toggle-btn"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <Icon name="sliders" size={16} />
            <span>FILTER</span>
            {maxPrice < 20000 && <span className="filter-badge">1</span>}
          </button>
          <div className="mobile-product-count">
            {filteredProducts.length} Systems
          </div>
        </div>

        {/* MOBILE OFF-CANVAS FILTER DRAWER */}
        {isMobileFilterOpen && (
          <>
            <div
              className="mobile-filter-backdrop"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="mobile-filter-drawer">
              <div className="mobile-filter-drawer-header">
                <div className="drawer-title">
                  <Icon name="sliders" size={16} style={{ color: "#deffa4" }} />
                  <span>FILTER OPTIONS</span>
                  {maxPrice < 20000 && <span className="filter-badge">1</span>}
                </div>
                <button
                  className="drawer-close-btn"
                  onClick={() => setIsMobileFilterOpen(false)}
                  aria-label="Close filters"
                >
                  <Icon name="x" size={20} />
                </button>
              </div>

              <div className="mobile-filter-drawer-body">
                <ProductFilterSidebar
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  handleCategoryNav={handleCategoryToggle}
                  handleProductTypeNav={handleProductTypeToggle}
                  handleMemoryNav={handleMemorySelect}
                  resetFilters={() => setMaxPrice(20000)}
                />
              </div>

              <div className="mobile-filter-drawer-footer">
                <button
                  className="apply-filters-btn"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  APPLY FILTERS ({filteredProducts.length})
                </button>
                {maxPrice < 20000 && (
                  <button
                    className="reset-filters-btn"
                    onClick={() => {
                      setMaxPrice(20000);
                      setIsMobileFilterOpen(false);
                    }}
                  >
                    RESET
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="categories-sidebar">
          <ProductFilterSidebar
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            handleCategoryNav={handleCategoryToggle}
            handleProductTypeNav={handleProductTypeToggle}
            handleMemoryNav={handleMemorySelect}
            resetFilters={() => setMaxPrice(20000)}
          />
        </aside>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px 0", color: "#94da32", flex: 1 }}>
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