import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { getAllProducts } from "../../utils/productDb";
import { useSiteContents } from "../../utils/cmsDb";

export default function ProductsSection() {
  const contents = useSiteContents();
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts().then((data) => {
      // Show first 6 products in the featured section
      setProductsList(data ? data.slice(0, 6) : []);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-12 md:py-20 bg-[var(--nv-surfLow,#0c0f07)] border-t border-b border-[#434938] w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 w-full box-border">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12">
          <div className="flex-1 min-w-0">
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-[var(--nv-onSurf,#e2e4d5)] uppercase break-words">
              {contents.homeProductsTitle || "ELITE SERIES CAMERAS"}
            </h2>
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
            {productsList.map((product) => (
              <ProductCard key={product.id || product.name} {...product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}