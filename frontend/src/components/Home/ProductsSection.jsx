import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { colors, products } from "../../data/constants";

export default function ProductsSection() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: colors.surfaceContainerLow,
      }}
    >
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
            alignItems: "flex-end",
            gap: "24px",
            marginBottom: 48,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: "240px",
            }}
          >
            <span
              style={{
                color: colors.secondary,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: 1,
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              Precision Hardware
            </span>

            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(28px, 5vw, 40px)",
                fontWeight: 700,
                letterSpacing: 2,
                lineHeight: 1.2,
                wordBreak: "break-word",
              }}
            >
              ELITE SERIES CAMERAS
            </h2>
          </div>

          <Link
            to="/product"
            style={{
              color: colors.secondary,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: 1,
              textDecoration: "underline",
              textUnderlineOffset: 8,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            EXPLORE FULL CATALOG →
          </Link>
        </div>

        {/* PRODUCTS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            width: "100%",
          }}
        >
          {products.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}