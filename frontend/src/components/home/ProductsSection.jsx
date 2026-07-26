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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const autoSlideTimerRef = useRef(null);

  useEffect(() => {
    getAllProducts().then((data) => {
      setAllProducts(data || []);
      setLoading(false);
    });
  }, []);

  const selectedCategory = CATEGORY_TABS.find((t) => t.id === activeTab) || CATEGORY_TABS[0];
  const filteredProducts = allProducts.filter(selectedCategory.filter);
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : allProducts;

  // Calculate items per view based on window width
  const getItemsPerPage = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, displayProducts.length - itemsPerPage);

  // Auto-Slide Logic
  useEffect(() => {
    if (isPaused || displayProducts.length <= itemsPerPage) return;

    autoSlideTimerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    }, 3500);

    return () => clearInterval(autoSlideTimerRef.current);
  }, [isPaused, maxIndex, displayProducts.length, itemsPerPage]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentIndex(0);
  };

  return (
    <section
      style={{
        padding: "70px 0 90px",
        background: "#0a0c08",
        borderTop: "1px solid rgba(148, 218, 50, 0.15)",
        borderBottom: "1px solid rgba(148, 218, 50, 0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          .category-tab-btn {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(148, 218, 50, 0.25);
            color: #a1a896;
            padding: 8px 18px;
            border-radius: 30px;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
          }
          .category-tab-btn.active {
            background: #94da32;
            color: #0a0c08;
            border-color: #94da32;
            box-shadow: 0 0 16px rgba(148, 218, 50, 0.4);
          }
          .category-tab-btn:hover:not(.active) {
            background: rgba(148, 218, 50, 0.12);
            color: #94da32;
            border-color: rgba(148, 218, 50, 0.5);
          }
          .catalog-link-btn {
            background: rgba(148, 218, 50, 0.05);
            border: 1px solid rgba(148, 218, 50, 0.4);
            color: #94da32;
            padding: 8px 18px;
            border-radius: 30px;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            backdrop-filter: blur(8px);
          }
          .catalog-link-btn:hover {
            background: #94da32;
            color: #0a0c08;
            box-shadow: 0 0 20px rgba(148, 218, 50, 0.45);
          }
          .nav-chevron-btn {
            background: rgba(20, 22, 18, 0.8);
            border: 1px solid rgba(148, 218, 50, 0.4);
            color: #94da32;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            user-select: none;
            font-size: 16px;
          }
          .nav-chevron-btn:hover {
            background: #94da32;
            color: #0a0c08;
            border-color: #94da32;
            box-shadow: 0 0 14px rgba(148, 218, 50, 0.45);
          }
          .pagination-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 0;
          }
          .pagination-dot.active {
            background: #94da32;
            width: 24px;
            border-radius: 10px;
            box-shadow: 0 0 8px rgba(148, 218, 50, 0.5);
          }

          /* CAROUSEL SLIDER WRAPPER */
          .carousel-track-viewport {
            overflow: hidden;
            width: 100%;
            position: relative;
            padding: 10px 0 20px 0;
          }
          .carousel-track {
            display: flex;
            gap: 24px;
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            width: 100%;
          }
          .carousel-slide-item {
            flex: 0 0 calc((100% - 3 * 24px) / 4);
            box-sizing: border-box;
          }

          @media (max-width: 1200px) {
            .carousel-slide-item {
              flex: 0 0 calc((100% - 2 * 20px) / 3);
            }
          }
          @media (max-width: 1024px) {
            .carousel-slide-item {
              flex: 0 0 calc((100% - 1 * 20px) / 2);
            }
          }
          @media (max-width: 768px) {
            .carousel-slide-item {
              flex: 0 0 82%;
            }
            .carousel-track {
              gap: 16px;
            }
          }
        `}
      </style>

      {/* CONTAINER ALIGNED TO MAIN SITE WIDTH */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* TOP ROW: CATEGORY PILL TABS + EXPLORE CATALOG LINK */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`category-tab-btn ${activeTab === tab.id ? "active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link to="/products" className="catalog-link-btn">
            EXPLORE FULL CATALOG <span>→</span>
          </Link>
        </div>

        {/* SECTION HEADER TITLE & NAVIGATION ARROWS */}
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
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "1.5px",
                lineHeight: 1.1,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              {selectedCategory.label}
            </h2>
            <p
              style={{
                margin: "12px 0 0 0",
                color: "#a1a896",
                fontSize: "15px",
                fontFamily: "'Inter', sans-serif",
                maxWidth: "650px",
                lineHeight: 1.6,
              }}
            >
              Engineered for high-definition monitoring, extreme low-light clarity, and AI-driven thermal threat detection.
            </p>
          </div>

          {/* SLEEK NAVIGATION ARROWS */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={handlePrev}
              className="nav-chevron-btn"
              title="Previous Slide"
              aria-label="Previous Products"
            >
              ◀
            </button>
            <button
              onClick={handleNext}
              className="nav-chevron-btn"
              title="Next Slide"
              aria-label="Next Products"
            >
              ▶
            </button>
          </div>
        </div>

        {/* CAROUSEL CONTAINER WITH MOUSE PAUSE */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "280px",
              color: "#94da32",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "2px",
              fontSize: "14px",
            }}
          >
            INITIALIZING SECURE VIDEO FEED...
          </div>
        ) : (
          <div
            className="carousel-track-viewport"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            ref={carouselRef}
          >
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {displayProducts.map((product) => (
                <div key={product.id} className="carousel-slide-item">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGINATION DOTS */}
        {!loading && displayProducts.length > itemsPerPage && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              marginTop: 20,
            }}
          >
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`pagination-dot ${currentIndex === idx ? "active" : ""}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}