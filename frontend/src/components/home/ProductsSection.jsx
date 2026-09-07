import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { getAllProducts } from "../../utils/productDb";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function ProductsSection() {
  const contents = useSiteContents();
  const homeSettings = useHomepageSettings();
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ELITE");
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    getAllProducts().then((data) => {
      setAllProducts(data || []);
      setLoading(false);
    });
  }, []);

  const categories = [
    {
      id: "ELITE",
      name: homeSettings.products?.heading || "ELITE SERIES CAMERAS",
      badge: "Commercial / AI Grade",
      subtext: homeSettings.products?.subheading || "Engineered for high-definition monitoring, extreme low-light clarity, and AI-driven thermal threat detection.",
      filterFn: (p) => !p.category || p.category.includes("Dome") || p.category.includes("Bullet") || p.category.includes("Elite")
    },
    {
      id: "WIFI",
      name: "WI-FI SERIES CAMERAS",
      badge: "Smart Plug & Play",
      subtext: "Wireless smart surveillance featuring continuous 4K streaming, 2-way audio, and instant mobile alerts.",
      filterFn: (p) => p.category?.toLowerCase().includes("wifi") || p.name?.toLowerCase().includes("wifi") || p.category?.includes("Smart")
    },
    {
      id: "IP",
      name: "IP SERIES CAMERAS",
      badge: "Enterprise PoE Networks",
      subtext: "Industrial-grade IP network cameras with PoE integration, encrypted telemetry, and ultra long-range night vision.",
      filterFn: (p) => p.category?.toLowerCase().includes("ip") || p.name?.toLowerCase().includes("ip") || p.category?.includes("NVR")
    }
  ];

  const currentCat = categories.find((c) => c.id === activeCategory) || categories[0];

  const filteredProducts = allProducts.filter(currentCat.filterFn);
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : allProducts;

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeCategory, displayProducts.length]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollDistance = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollDistance : scrollDistance,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="products"
      className="homepage-safe-section bg-[var(--nv-surfLow,#0c0f07)] border-b border-[var(--nv-outlineVar,#434938)]/40 overflow-hidden flex flex-col justify-center items-center"
      style={{
        paddingTop: "clamp(45px, 5vw, 85px)",
        paddingBottom: "clamp(45px, 5vw, 85px)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 w-full box-border">
        
        {/* SEGMENTED TAB SWITCHER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[var(--nv-outlineVar,#434938)]/40 w-full">
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
            <div className="inline-flex items-center gap-2.5 p-2 bg-[var(--nv-surfCont,#181a15)] border border-[var(--nv-outlineVar,#434938)] rounded-2xl sm:rounded-full min-w-max">
              {categories.map((cat) => {
                const count = allProducts.filter(cat.filterFn).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all rounded-full shrink-0 cursor-pointer flex items-center gap-2.5 ${
                      activeCategory === cat.id
                        ? "bg-[var(--nv-secondary,#94da32)] text-[#111111] shadow-md shadow-[rgba(148,218,50,0.3)]"
                        : "bg-transparent text-[var(--nv-onSurfVar,#c3c9b3)] hover:text-[var(--nv-onSurf,#ffffff)] hover:bg-white/5"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {count > 0 && (
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        activeCategory === cat.id ? "bg-black/20 text-black font-bold" : "bg-white/10 text-[var(--nv-onSurfVar,#c3c9b3)]"
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <Link
            to={homeSettings.products?.button_url || "/products"}
            className="hidden lg:inline-flex nv-btn-secondary nv-btn-compact shrink-0"
          >
            {homeSettings.products?.button_text || contents.homeProductsLinkText || "EXPLORE FULL CATALOG →"}
          </Link>
        </div>

        {/* HEADER & SCROLL CONTROLS */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10 sm:mb-14 w-full">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[var(--nv-secondary,#94da32)] animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-[var(--nv-secondary,#94da32)]">
                {currentCat.badge}
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--nv-onSurf,#e2e4d5)] uppercase break-words leading-tight">
              {currentCat.name}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[var(--nv-onSurfVar,#c3c9b3)] max-w-[700px] leading-relaxed mt-2">
              {currentCat.subtext}
            </p>
          </div>

          {/* RIGHT SIDE ACTIONS: ARROW CONTROLS & MOBILE LINK */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0">
            <Link
              to="/products"
              className="lg:hidden inline-flex items-center gap-1.5 text-xs font-bold text-[var(--nv-secondary,#94da32)] uppercase tracking-wider hover:underline"
            >
              <span>Full Catalog</span>
              <ArrowRight size={14} />
            </Link>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                className={`nv-btn-icon ${
                  !canScrollLeft ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                className={`nv-btn-icon ${
                  !canScrollRight ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* SINGLE-LINE HORIZONTAL SCROLL CAROUSEL */}
        {loading ? (
          <div className="flex justify-center py-20 text-[var(--nv-secondary,#94da32)] font-mono text-sm tracking-widest uppercase">
            LOADING SECURE CHANNELS...
          </div>
        ) : (
          <div className="relative w-full">
            {/* Subtle edge shadows to indicate scrollability */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-[var(--nv-surfLow,#0c0f07)] to-transparent" />
            )}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-[var(--nv-surfLow,#0c0f07)] to-transparent" />
            )}

            <div
              ref={scrollContainerRef}
              onScroll={checkScrollability}
              className="flex gap-6 sm:gap-7 overflow-x-auto scroll-smooth no-scrollbar py-4 px-1 snap-x snap-mandatory items-stretch"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {displayProducts.map((product) => (
                <div
                  key={product.id || product.name}
                  className="w-[270px] sm:w-[290px] md:w-[310px] shrink-0 snap-start flex flex-col"
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>

            {/* SUBTLE SCROLL CUE */}
            <div className="flex items-center justify-between pt-6 mt-2 text-[11px] font-mono text-[var(--nv-onSurfVar,#c3c9b3)] opacity-60">
              <span>{displayProducts.length} PRODUCTS SHOWN</span>
              <span>SCROLL HORIZONTALLY FOR MORE →</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}