import React, { useState } from "react";
import { colors } from "../../data/constants";

export default function ProductCard({
  img,
  name,
  desc,
  badge,
}) {
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = () => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const product = {
      img,
      name,
      desc,
      badge,
    };

    existingCart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert(`${name} added to cart`);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: colors.surfaceContainer,
        padding: 16,
        border: `1px solid ${colors.outlineVariant}`,
        overflow: "hidden",
      }}
    >
      {/* SCANLINE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(transparent, transparent 3px, rgba(181,231,93,0.05) 4px)",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      />

      {/* IMAGE */}
      <img
        src={img}
        alt={name}
        style={{
          width: "100%",
          aspectRatio: "1/1",
          objectFit: "cover",
          marginBottom: 24,
          filter: hovered
            ? "grayscale(0%)"
            : "grayscale(100%)",
          transition: "filter 0.5s",
        }}
      />

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
        <h4
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 1,
            color: "#fff",
          }}
        >
          {name}
        </h4>

        {badge && (
          <span
            style={{
              background: colors.secondary,
              color: "#111",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
            }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      <p
        style={{
          color: colors.onSurfaceVariant,
          fontSize: 14,
          marginBottom: 24,
          lineHeight: 1.6,
        }}
      >
        {desc}
      </p>

      {/* BUTTON */}
      <button
        onClick={handleAddToCart}
        style={{
          width: "100%",
          padding: 12,
          background: hovered
            ? colors.secondary
            : "transparent",
          border: `1px solid ${colors.secondary}`,
          color: hovered
            ? "#111"
            : colors.secondary,
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.2s",
          fontFamily: "'Inter', sans-serif",
          letterSpacing: 1,
        }}
      >
        ADD TO CART
      </button>
    </div>
  );
}