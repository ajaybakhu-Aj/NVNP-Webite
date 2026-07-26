import React from "react";

/**
 * PageHeroBanner — Universal page header banner matching the Products page style.
 * Green (#7CFC00) background strip with dark text, compact dimensions, and utility bar.
 *
 * Props:
 *  - title    {string}   Page title (uppercase bold)
 *  - subtitle {string}   Optional subtitle / description
 *  - children           Optional extra content (e.g. filter chips, CTA buttons)
 */
export default function PageHeroBanner({ title, subtitle, children }) {
  return (
    <section
      className="products-banner-redesign page-hero-banner"
      style={{
        background: "#7CFC00",
        padding: "24px 20px",
        width: "100%",
        boxSizing: "border-box",
        minHeight: "auto",
        height: "auto",
      }}
    >
      <div
        className="page-hero-banner-container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <h1
          className="page-hero-banner-title"
          style={{
            color: "#000000",
            fontSize: "1.6rem",
            fontWeight: 800,
            margin: "0 0 8px 0",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            fontFamily: "'Space Grotesk', sans-serif",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="page-hero-banner-subtitle"
            style={{
              color: "#111111",
              fontSize: "0.9rem",
              lineHeight: 1.4,
              margin: children ? "0 0 20px 0" : "0",
              maxWidth: "90%",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {subtitle}
          </p>
        )}

        {children && (
          <div className="page-hero-banner-children">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
