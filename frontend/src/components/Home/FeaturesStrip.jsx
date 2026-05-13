import React from "react";
import Icon from "../../utils/Icon";
import { colors, features } from "../../data/constants";

export default function FeaturesStrip() {
  return (
    <section style={{ padding: "80px 0", background: colors.background, borderBottom: `1px solid ${colors.outlineVariant}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
        {features.map(({ icon, title, desc }) => (
          <div key={title} style={{
            border: `1px solid ${colors.outlineVariant}`, padding: 24,
            transition: "border-color 0.2s", cursor: "default",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = colors.secondary}
            onMouseLeave={e => e.currentTarget.style.borderColor = colors.outlineVariant}
          >
            <Icon name={icon} size={40} style={{ color: colors.secondary, display: "block", marginBottom: 16 }} />
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>{title}</h3>
            <p style={{ color: colors.onSurfaceVariant, fontSize: 16, lineHeight: 1.5 }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}