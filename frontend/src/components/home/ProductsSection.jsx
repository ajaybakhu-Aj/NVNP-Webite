import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { getAllProducts } from "../../utils/productDb";
import { useSiteContents } from "../../utils/cmsDb";

export default function ProductsSection() {
  const contents = useSiteContents();
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ELITE");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts().then((data) => {
      setAllProducts(data || []);
      setLoading(false);
    });
  }, []);

  const categories = [
    {
      id: "ELITE",
      name: "ELITE SERIES CAMERAS",
      subtext: "Engineered for high-definition monitoring, extreme low-light clarity, and AI-driven thermal threat detection.",
      filterFn: (p) => !p.category || p.category.includes("Dome") || p.category.includes("Bullet") || p.category.includes("Elite")
    },
    {
      id: "WIFI",
      name: "WI-FI SERIES CAMERAS",
      subtext: "Wireless smart surveillance featuring continuous 4K streaming, 2-way audio, and instant mobile alerts.",
      filterFn: (p) => p.category?.toLowerCase().includes("wifi") || p.name?.toLowerCase().includes("wifi") || p.category?.includes("Smart")
    },
    {
      id: "IP",
      name: "IP SERIES CAMERAS",
      subtext: "Industrial-grade IP network cameras with PoE integration, encrypted telemetry, and ultra long-range night vision.",
      filterFn: (p) => p.category?.toLowerCase().includes("ip") || p.name?.toLowerCase().includes("ip") || p.category?.includes("NVR")
    }
  ];

  const currentCat = categories.find((c) => c.id === activeCategory) || categories[0];

  const filteredProducts = allProducts.filter(currentCat.filterFn).slice(0, 6);
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : allProducts.slice(0, 6);

  return (
    <section className="py-12 md:py-20 bg-[var(--nv-surfLow,#0c0f07)] border-t border-b border-[#434938] w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 w-full box-border">
        {/* CATEGORY TABS */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6 border-b border-[#434938] scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all rounded-full shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#94da32] text-[#111111] shadow-lg shadow-[rgba(148,218,50,0.25)]"
                  : "bg-[#1e2117] text-[#c3c9b3] hover:bg-[#282b21] border border-[#434938]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* HEADER & SUBTEXT */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
          <div className="flex-1 min-w-0">
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-[var(--nv-onSurf,#e2e4d5)] uppercase break-words mb-2">
              {currentCat.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#c3c9b3] max-w-[680px] leading-relaxed">
              {currentCat.subtext}
            </p>
          </div>

          <Link
            to="/products"
            className="text-[#94da32] font-semibold text-xs sm:text-sm tracking-wider underline underline-offset-8 hover:text-[#deffa4] transition-colors whitespace-nowrap shrink-0"
          >
            {contents.homeProductsLinkText || "EXPLORE FULL CATALOG →"}
          </Link>
        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="flex justify-center py-12 text-[#94da32] font-mono">
            LOADING SECURE CHANNELS...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full box-border">
            {displayProducts.map((product) => (
              <ProductCard key={product.id || product.name} {...product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}