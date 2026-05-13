import React, { useState } from "react";
import { colors } from "../../data/constants";

export default function ProductCard({ img, name, desc, badge }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", background: colors.surfaceContainer, padding: 16, border: `1px solid ${colors.outlineVariant}`, overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(transparent, transparent 3px, rgba(181,231,93,0.05) 4px)", opacity: 0.1, pointerEvents: "none" }} />
      <img src={img} alt={name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", marginBottom: 24, filter: hovered ? "grayscale(0%)" : "grayscale(100%)", transition: "filter 0.5s" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 600, letterSpacing: 1 }}>{name}</h4>
        {badge && <span style={{ background: colors.secondary, color: "black", fontSize: 10, fontWeight: 700, padding: "2px 8px" }}>{badge}</span>}
      </div>
      <p style={{ color: colors.onSurfaceVariant, fontSize: 14, marginBottom: 24 }}>{desc}</p>
      <button style={{
        width: "100%", padding: 12,
        background: hovered ? colors.secondary : "transparent",
        border: `1px solid ${colors.secondary}`,
        color: hovered ? "black" : colors.secondary,
        fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
        fontFamily: "'Inter', sans-serif",
      }}>ADD TO CART</button>
    </div>
  );
}