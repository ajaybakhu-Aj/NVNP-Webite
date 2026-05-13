import React from "react";
import Icon from "../../utils/Icon";
import { colors, testimonials } from "../../data/constants";

export default function TestimonialsSection() {
  return (
    <section style={{ padding: "80px 0", background: colors.background }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 700, letterSpacing: 2, textAlign: "center", marginBottom: 48 }}>TRUSTED BY LEADERS</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {testimonials.map(({ text, author }) => (
            <div key={author} style={{ border: `1px solid ${colors.secondary}`, padding: 24, background: colors.surfaceContainerLowest }}>
              <div style={{ display: "flex", color: colors.secondary, marginBottom: 16 }}>
                {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={24} fill style={{ color: colors.secondary }} />)}
              </div>
              <p style={{ fontStyle: "italic", marginBottom: 24, fontSize: 16, lineHeight: 1.5 }}>{text}</p>
              <div style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 1 }}>{author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}