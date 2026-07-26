import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { colors } from "../../data/constants";
import { getAllProducts } from "../../utils/productDb";

const CATEGORY_TABS = [
  { id: "elite", label: "ELITE SERIES CAMERAS", filter: () => true },
  { id: "wifi", label: "WI-FI SERIES CAMERAS", filter: (p) => p.category === "Wireless CCTV Cameras" || p.name?.toLowerCase().includes("wi-fi") || p.productType?.toLowerCase().includes("wireless") },
  { id: "ip", label: "IP SERIES CAMERAS", filter: (p) => p.category === "IP CCTV Cameras" || p.name?.toLowerCase().includes("ip") },
];

export default function ProductsSection() {
  const [allProducts, setAllProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("elite");
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    getAllProducts().then((data) => {
      setAllProducts(data || []);
      setLoading(false);
    });
  }, []);

  const selectedCategory = CATEGORY_TABS.find((t) => t.id === activeTab) || CATEGORY_TABS[0];
  const filteredProducts = allProducts.filter(selectedCategory.filter);
  // Guarantee products list has items, fallback to all if filtered is empty
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : allProducts;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section
      style={{
        padding: "60px 0 80px",
        background: "#0d0e0b",
        borderTop: `1px solid rgba(148, 218, 50, 0.15)`,
        borderBottom: `1px solid rgba(148, 218, 50, 0.15)`,
        overflow: "hidden",
      }}
    >
      <style>
        {`
          .carousel-container {
            display: flex;
            overflow-x: auto;
            gap: 20px;
            padding: 8px 4px 24px 4px;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }
          .carousel-container::-webkit-scrollbar {
            display: none;
          }
          .carousel-card-wrapper {
            flex: 0 0 calc((100% - 4 * 20px) / 5);
            min-width: 250px;
            scroll-snap-align: start;
            transition: transform 0.3s ease;
          }
          @media (max-width: 1280px) {
            .carousel-card-wrapper {
              flex: 0 0 calc((100% - 3 * 20px) / 4);
              min-width: 250px;
            }
          }
          @media (max-width: 1024px) {
            .carousel-card-wrapper {
              flex: 0 0 calc((100% - 2 * 20px) / 3);
              min-width: 240px;
            }
          }
          @media (max-width: 768px) {
            .carousel-card-wrapper {
              flex: 0 0 calc((100% - 1 * 16px) / 2);
              min-width: 220px;
            }
          }
          @media (max-width: 480px) {
            .carousel-card-wrapper {
              flex: 0 0 85%;
              min-width: 210px;
            }
          }
          .category-pill-btn {
            background: transparent;
            border: 1px solid #94da32;
            color: #94da32;
            padding: 6px 14px;
            border-radius: 20px;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
          }
          .category-pill-btn.active {
            background: #94da32;
            color: #111;
            box-shadow: 0 0 12px rgba(148, 218, 50, 0.35);
          }
          .category-pill-btn:hover:not(.active) {
            background: rgba(148, 218, 50, 0.15);
          }
          .carousel-nav-btn {
            background: #181a15;
            border: 1px solid #94da32;
            color: #94da32;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            user-select: none;
          }
          .carousel-nav-btn:hover {
            background: #94da32;
            color: #111;
            box-shadow: 0 0 10px rgba(148, 218, 50, 0.4);
          }
        `}
      </style>

      {/* INNER ALIGNED CONTAINER */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* TOP CATEGORY PILLS BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`category-pill-btn ${activeTab === tab.id ? "active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link
            to="/products"
            className="category-pill-btn"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            EXPLORE FULL CATALOG →
          </Link>
        </div>

        {/* SECTION TITLE & SUBTITLE */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 20,
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(26px, 4vw, 38px)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: 1.5,
                lineHeight: 1.1,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              {selectedCategory.label}
            </h2>
            <p
              style={{
                margin: "10px 0 0 0",
                color: "#8d937f",
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
                maxWidth: "680px",
                lineHeight: 1.5,
              }}
            >
              Engineered for high-definition monitoring, extreme low-light clarity, and AI-driven threat detection.
            </p>
          </div>

          {/* CAROUSEL CONTROLS */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={scrollLeft}
              className="carousel-nav-btn"
              title="Scroll Left"
              aria-label="Previous Products"
            >
              ◀
            </button>
            <button
              onClick={scrollRight}
              className="carousel-nav-btn"
              title="Scroll Right"
              aria-label="Next Products"
            >
              ▶
            </button>
          </div>
        </div>

        {/* SINGLE LINE PRODUCT CAROUSEL */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "60px 0",
              color: "#94da32",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: 1,
            }}
          >
            LOADING SECURE CHANNELS...
          </div>
        ) : (
          <div className="carousel-container" ref={carouselRef}>
            {displayProducts.map((p) => (
              <div key={p.id} className="carousel-card-wrapper">
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}