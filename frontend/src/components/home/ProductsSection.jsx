import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { colors } from "../../data/constants";
import { getAllProducts } from "../../utils/productDb";

export default function ProductsSection() {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts().then((data) => {
      // Show first 8 products in the featured section to utilize the carousel better
      setProductsList(data.slice(0, 8));
      setLoading(false);
    });
  }, []);

  return (
    <section
      style={{
        padding: "80px 0 100px",
        background: colors.surfaceContainerLow,
      }}
    >
      <style>
        {`
          .product-carousel {
            display: flex;
            overflow-x: auto;
            gap: 24px;
            padding-bottom: 32px;
            scroll-snap-type: x mandatory;
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none;  /* Internet Explorer 10+ */
            -webkit-overflow-scrolling: touch;
          }
          .product-carousel::-webkit-scrollbar {
            display: none; /* WebKit */
          }
          .product-carousel-item {
            min-width: 300px;
            flex: 0 0 auto;
            scroll-snap-align: start;
            transition: transform 0.3s ease;
          }
          .product-carousel-item:hover {
            transform: translateY(-4px);
          }
          @media (max-width: 768px) {
            .product-carousel-item {
              min-width: 260px;
            }
          }
        `}
      </style>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "24px",
            marginBottom: "40px",
            paddingBottom: "16px",
            borderBottom: \`1px solid \${colors.outlineVariant || '#333'}\`,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: "240px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 700,
                color: colors.primary || '#94da32',
                letterSpacing: 1.5,
                lineHeight: 1.2,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              ELITE SERIES CAMERAS
            </h2>
            <p style={{
              margin: "8px 0 0 0",
              color: colors.onSurfaceVariant || '#8d937f',
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
              maxWidth: "600px",
              lineHeight: 1.6
            }}>
              Engineered for high-definition monitoring, extreme low-light clarity, and AI-driven thermal threat detection.
            </p>
          </div>

          <Link
            to="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#131313",
              background: colors.primary || '#94da32',
              padding: "10px 20px",
              borderRadius: "4px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 1,
              textDecoration: "none",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "transform 0.2s, background 0.2s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#a4f036'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = colors.primary || '#94da32'; }}
          >
            EXPLORE FULL CATALOG <span style={{ fontSize: "16px" }}>→</span>
          </Link>
        </div>

        {/* PRODUCTS CAROUSEL */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px 0", color: colors.primary || '#94da32', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1 }}>
            LOADING SECURE CHANNELS...
          </div>
        ) : (
          <div className="product-carousel">
            {productsList.map((p) => (
              <div key={p.id} className="product-carousel-item">
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}