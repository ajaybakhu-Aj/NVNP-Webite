import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";
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

  // Touch & Drag state
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

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

  // Items per page based on window width: Desktop (>=1024px) = 3, Tablet (768-1023px) = 2, Mobile (<768px) = 1
  const getItemsPerPage = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
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

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 40 && touchEndX.current !== 0) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <section
      style={{
        padding: "60px 0 80px",
        background: "#0a0c08",
        borderTop: "1px solid rgba(148, 218, 50, 0.15)",
        borderBottom: "1px solid rgba(148, 218, 50, 0.15)",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        boxSizing: "border-box",
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
            flex-shrink: 0;
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
            white-space: nowrap;
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
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            user-select: none;
            font-size: 14px;
            flex-shrink: 0;
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
            touch-action: pan-y;
            cursor: grab;
          }
          .carousel-track-viewport:active {
            cursor: grabbing;
          }
          .carousel-track {
            display: flex;
            gap: 24px;
            transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
            width: 100%;
          }
          .carousel-slide-item {
            flex: 0 0 calc((100% - 2 * 24px) / 3);
            box-sizing: border-box;
          }

          @media (max-width: 1023px) {
            .carousel-slide-item {
              flex: 0 0 calc((100% - 1 * 20px) / 2);
            }
            .carousel-track {
              gap: 20px;
            }
          }

          @media (max-width: 767px) {
            .carousel-slide-item {
              flex: 0 0 82%; /* Peek hint of next card on right edge */
            }
            .carousel-track {
              gap: 16px;
            }
            .category-tabs-container {
              overflow-x: auto;
              padding-bottom: 4px;
              width: 100%;
              -webkit-overflow-scrolling: touch;
            }
            .category-tabs-container::-webkit-scrollbar {
              display: none;
            }
          }
        `}
      </style>

      {/* MAIN CONTAINER */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER SECTION: CATEGORIES, TITLE, SUBTITLE & CATALOG LINK */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginBottom: 32,
          }}
        >
          {/* TOP ROW: CATEGORY PILL TABS + CATALOG LINK */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div
              className="category-tabs-container"
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
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

          {/* MAIN TITLE & ARROWS */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 280 }}>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(24px, 4vw, 38px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "1.5px",
                  lineHeight: 1.15,
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                {selectedCategory.label}
              </h2>
              <p
                style={{
                  margin: "10px 0 0 0",
                  color: "#a1a896",
                  fontSize: "clamp(13px, 1.8vw, 15px)",
                  fontFamily: "'Inter', sans-serif",
                  maxWidth: "650px",
                  lineHeight: 1.6,
                }}
              >
                Engineered for high-definition monitoring, extreme low-light clarity, and AI-driven thermal threat detection.
              </p>
            </div>

            {/* CHEVRON CONTROLS */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
        </div>

        {/* CAROUSEL TRACK VIEWPORT WITH TOUCH SWIPE LISTENERS */}
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            ref={carouselRef}
          >
            <div
              className="carousel-track"
              style={{
                transform: window?.innerWidth < 768
                  ? `translateX(-${currentIndex * 86}%)`
                  : `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
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
              marginTop: 16,
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