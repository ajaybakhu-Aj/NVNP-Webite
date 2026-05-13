import React from "react";
import { colors } from "../../data/constants";


export default function DealerSection() {
  return (
    <section style={{ position: "relative", background: colors.secondary, padding: "80px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.1, pointerEvents: "none" }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "25vw", fontWeight: 700, color: "white", lineHeight: 1 }}>DEALER</span>
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10, textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 64, fontWeight: 700, letterSpacing: -2, color: "black", marginBottom: 24 }}>EXPAND THE NETWORK</h2>
        <p style={{ color: colors.onSecondaryContainer, fontSize: 18, lineHeight: 1.6, maxWidth: 672, margin: "0 auto 48px", fontWeight: 700 }}>Join the elite force of NightVision security providers across Nepal. We provide the gear, the training, and the authority.</p>
        <button style={{ background: "black", color: colors.secondary, padding: "24px 80px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, border: "none", cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >BECOME A PARTNER</button>
      </div>
    </section>
  );
}