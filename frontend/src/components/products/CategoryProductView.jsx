import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllProducts } from "../../utils/productDb";
import { colors } from "../../data/constants";
import ProductCard from "./ProductCard";
import Icon from "../../utils/Icon";
import PageHeroBanner from "../ui/PageHeroBanner";
import CatalogDownloadButton from "../ui/CatalogDownloadButton";
import Breadcrumbs from "../ui/Breadcrumbs";
import ProductFilterSidebar from "./ProductFilterSidebar";

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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
      <Breadcrumbs categoryName={pageTitle} />
      {/* HERO SECTION - Unified PageHeroBanner */}
      <PageHeroBanner
        title={pageTitle.toUpperCase()}
        subtitle={pageDesc}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Filter Button */}
          <button
            className="filter-trigger-btn"
            onClick={() => setIsMobileFilterOpen(true)}
            style={{
              background: "#0d0d0d",
              color: "#ffffff",
              border: "1px solid rgba(0,0,0,0.25)",
              padding: "8px 18px",
              borderRadius: "20px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              cursor: "pointer"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b5e75d" strokeWidth="2.5">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            FILTER
            {(maxPrice < 20000 || categoryKey || productTypeKey || tagKey) && (
              <span className="filter-badge" style={{ background: "#b5e75d", color: "#000", fontSize: "11px", fontWeight: 800, borderRadius: "10px", padding: "1px 7px", marginLeft: "4px" }}>
                {(maxPrice < 20000 ? 1 : 0) + (categoryKey ? 1 : 0) + (productTypeKey ? 1 : 0) + (tagKey ? 1 : 0)}
              </span>
            )}
          </button>
          <CatalogDownloadButton variant="header" categoryName={pageTitle} style={{ background: "#11140c", color: "#b5e75d", borderColor: "#11140c" }} />
        </div>
      </PageHeroBanner>

      {/* MAIN LAYOUT */}
      <section className="products-layout">
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
                  <Icon name="sliders" size={16} style={{ color: "#b5e75d" }} />
                  <span>FILTER OPTIONS</span>
                  {(maxPrice < 20000 || categoryKey || productTypeKey || tagKey) && (
                    <span className="filter-badge">
                      {(maxPrice < 20000 ? 1 : 0) + (categoryKey ? 1 : 0) + (productTypeKey ? 1 : 0) + (tagKey ? 1 : 0)}
                    </span>
                  )}
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
                  categoryKey={categoryKey}
                  productTypeKey={productTypeKey}
                  tagKey={tagKey}
                  selectedMemory={selectedMemory}
                  handleCategoryNav={handleCategoryNav}
                  handleProductTypeNav={handleProductTypeNav}
                  handleMemoryNav={handleMemoryNav}
                  resetFilters={() => {
                    setMaxPrice(20000);
                    navigate("/products");
                  }}
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

        {/* DESKTOP SIDEBAR */}
        <aside className="categories-sidebar">
          <ProductFilterSidebar
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            categoryKey={categoryKey}
            productTypeKey={productTypeKey}
            tagKey={tagKey}
            selectedMemory={selectedMemory}
            handleCategoryNav={handleCategoryNav}
            handleProductTypeNav={handleProductTypeNav}
            handleMemoryNav={handleMemoryNav}
            resetFilters={() => {
              setMaxPrice(20000);
              navigate("/products");
            }}
          />
        </aside>

        {/* PRODUCTS COLUMN */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "100px 0", color: "#b5e75d", flex: 1 }}>
            LOADING DYNAMIC DATA PIPELINES...
          </div>
        ) : (
          <div className="products-container" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* DOWNLOAD CATALOG BANNER */}
            <CatalogDownloadButton variant="banner" categoryName={pageTitle} style={{ margin: "0 0 8px 0" }} />

            <div className="products-grid">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
              {filteredProducts.length === 0 && (
              <div style={{ color: "#8d937f", textAlign: "center", padding: "80px 0", width: "100%", gridColumn: "1 / -1", border: "1px dashed #434938", borderRadius: 4, background: "#181a15" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}><Icon name="search" size={32} style={{ color: "#b5e75d" }} /></div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#fff", fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>
                  NO SYSTEMS MATCHING SEARCH
                </div>
                <div style={{ fontSize: 13, maxWidth: 300, margin: "0 auto" }}>
                  Try relaxing your price filters or selecting a different category.
                </div>
              </div>
            )}
            </div>
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
                    <Icon name="check" size={18} style={{ color: "#b5e75d", flexShrink: 0 }} />
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
