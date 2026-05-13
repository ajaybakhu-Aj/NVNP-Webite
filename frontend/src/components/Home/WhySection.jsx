import React from "react";
import { colors, feedImages } from "../../data/constants";

export default function WhySection() {
  return (
    <section style={{ padding: "80px 0", background: colors.background, overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `1px solid ${colors.secondary}` }}>
          {feedImages.map(({ src, ch }, i) => (
            <div key={ch} style={{ position: "relative", aspectRatio: "16/9", background: "black", borderTop: i >= 2 ? `1px solid ${colors.secondary}` : "none", borderLeft: i % 2 === 1 ? `1px solid ${colors.secondary}` : "none" }}>
              <img src={src} alt={ch} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, transition: "opacity 0.2s", display: "block" }}
                onMouseEnter={e => e.currentTarget.style.opacity = 0.8}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
              />
              <div style={{ position: "absolute", top: 8, left: 8, fontSize: 10, background: "#dc2626", color: "white", padding: "0 4px" }}>REC • {ch}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>The NightVision Edge</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 700, letterSpacing: 2, lineHeight: 1.2 }}>UNCOMPROMISING VIGILANCE TECHNOLOGY</h2>
          <p style={{ color: colors.onSurfaceVariant, fontSize: 18, lineHeight: 1.6 }}>We don't just sell cameras; we deploy comprehensive security ecosystems tailored for the unique challenges of Nepal's infrastructure.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, paddingTop: 8 }}>
            {[["Weatherproof","IP67 RATED"],["24/7 Monitoring","ZERO DOWNTIME"],["Remote Access","GLOBAL LINK"],["Smart Alerts","AI DETECTION"]].map(([val,label]) => (
              <div key={label} style={{ borderLeft: `4px solid ${colors.secondary}`, paddingLeft: 16, paddingTop: 8, paddingBottom: 8 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: colors.secondary }}>{val}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 1, opacity: 0.6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}