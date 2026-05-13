import React from "react";
import { colors } from "../../data/constants";

export default function TickerStrip() {
  const text = "NightVision™ /// CCTV Cameras Nepal /// 4K Surveillance /// Made for Nepal ///";
  return (
    <div style={{ background: colors.primaryContainer, color: colors.onPrimaryContainer, padding: "16px 0", overflow: "hidden", borderTop: `1px solid ${colors.secondary}`, borderBottom: `1px solid ${colors.secondary}` }}>
      <div className="animate-marquee" style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, textTransform: "uppercase" }}>
        {[text, text, text].map((t, i) => <span key={i} style={{ margin: "0 32px" }}>{t}</span>)}
      </div>
    </div>
  );
}