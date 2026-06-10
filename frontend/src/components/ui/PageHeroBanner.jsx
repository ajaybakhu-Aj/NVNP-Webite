import React from "react";

/**
 * PageHeroBanner — Universal page header banner matching the Products page style.
 * Green (#75b800) background strip with dark text.
 *
 * Props:
 *  - title    {string}   Page title (uppercase bold)
 *  - subtitle {string}   Optional subtitle / description
 *  - children           Optional extra content (e.g. filter chips, CTA buttons)
 */
export default function PageHeroBanner({ title, subtitle, children }) {
  return (
    <section style={{
      background: "var(--banner-bg, #94da32)",
      borderBottom: "1px solid var(--banner-bg-dark, #75b800)",
      padding: "40px 24px 36px",
      width: "100%",
      boxSizing: "border-box",
    }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
      }}>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 800,
          color: "#000000",
          fontFamily: "'Space Grotesk', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "1px",
          lineHeight: 1.1,
          margin: "0 0 8px 0",
        }}>
          {title}
        </h1>

        {subtitle && (
          <p style={{
            fontSize: 14,
            color: "#000000",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.6,
            margin: children ? "0 0 16px 0" : "0",
            maxWidth: 640,
          }}>
            {subtitle}
          </p>
        )}

        {children && (
          <div style={{ marginTop: 16 }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
