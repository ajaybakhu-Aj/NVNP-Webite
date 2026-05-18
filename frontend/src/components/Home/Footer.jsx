import React from "react";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ padding: "48px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 24, maxWidth: 1280, margin: "0 auto", background: colors.surfaceContainerLowest, borderTop: `1px solid ${colors.secondary}` }}>
      <div style={{ gridColumn: "1/2" }}>
        <div
          style={{
            fontFamily: "'Arial Black', sans-serif",
            fontStyle: "italic",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 1,
            marginBottom: 24,
          }}
        >
          <span style={{ color: colors.secondary }}>N</span>
          <span style={{ color: "#ffffff" }}>V</span>
          <span style={{ color: colors.secondary }}>//</span>
          <span style={{ color: "#ffffff" }}>NIGHTVISION™</span>
        </div>
        <p style={{ color: colors.onSurfaceVariant, fontSize: 16, lineHeight: 1.5, maxWidth: 384, marginBottom: 24 }}>Dedicated to the highest standard of surveillance technology and national security for Nepal. Security is our duty.</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["public", "share", "chat"].map(icon => <Icon key={icon} name={icon} size={24} style={{ color: colors.secondary, cursor: "pointer" }} />)}
        </div>
      </div>
      <div>
        <h5 style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 24 }}>Navigation</h5>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {["Privacy Policy", "Terms of Service", "Support"].map((item) => {
   const route =
  item === "Support"
    ? "/support"
    : item === "Terms of Service"
    ? "/terms"
    : "#";

  return (
    <li key={item}>

      <Link
        to={route}
        style={{
          color: colors.onSurfaceVariant,
          fontSize: 16,
          textTransform: "uppercase",
          letterSpacing: 1,
          textDecoration: "none",
        }}
      >
        {item}
      </Link>

    </li>
  );
})}
        </ul>
      </div>
      <div>
        <h5 style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 24 }}>Corporate</h5>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {["Warranty", "Careers"].map((item) => {

  const route =
    item === "Warranty"
      ? "/warranty"
      : "#";

  return (
    <li key={item}>
      <Link
        to={route}
        style={{
          color: colors.onSurfaceVariant,
          fontSize: 16,
          textTransform: "uppercase",
          letterSpacing: 1,
          textDecoration: "none",
        }}
      >
        {item}
      </Link>
    </li>
  );
})}
        </ul>
      </div>
      <div style={{ gridColumn: "1/-1", paddingTop: 48, marginTop: 48, borderTop: `1px solid ${colors.outlineVariant}`, textAlign: "center" }}>
        <p style={{ color: colors.onSurfaceVariant, fontSize: 16, textTransform: "uppercase", letterSpacing: 1 }}>© 2024 NIGHTVISION SECURITY SYSTEMS. ALL RIGHTS RESERVED. UNCOMPROMISING Security.</p>
      </div>
    </footer>
  );
}