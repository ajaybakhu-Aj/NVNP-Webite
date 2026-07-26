import React from "react";

/**
 * PageHeroBanner — Universal page header banner matching the Products page style.
 * Green (#7CFC00) background strip with dark text, compact dimensions, and tight content wrapping.
 *
 * Props:
 *  - title    {string}   Page title (uppercase bold)
 *  - subtitle {string}   Optional subtitle / description
 *  - centered {boolean}  Optional boolean to center title & subtitle text
 *  - children           Optional extra content (e.g. filter button)
 */
export default function PageHeroBanner({ title, subtitle, centered = false, children }) {
  return (
    <section
      className="products-banner-redesign page-hero-banner products-banner products-hero-banner page-title-section hero-banner shop-header"
      style={{
        backgroundColor: "var(--primary-color, #7CFC00)",
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: 0,
        paddingRight: 0,
        width: "100%",
        boxSizing: "border-box",
        minHeight: 0,
        height: "auto",
        maxHeight: "fit-content",
        alignSelf: "flex-start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className="page-hero-banner-container hero-banner-inner"
        style={{
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          paddingLeft: 24,
          paddingRight: 24,
          boxSizing: "border-box",
          textAlign: centered ? "center" : "left",
          display: "flex",
          flexDirection: "column",
          alignItems: centered ? "center" : "flex-start",
        }}
      >
        <h1
          className="page-hero-banner-title"
          style={{
            color: "#000000",
            fontSize: "1.6rem",
            fontWeight: 800,
            marginTop: 0,
            marginBottom: "6px",
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
              fontSize: "0.85rem",
              lineHeight: 1.4,
              marginTop: 0,
              marginBottom: children ? "16px" : "0px",
              maxWidth: centered ? "800px" : "90%",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {subtitle}
          </p>
        )}

        {children && (
          <div
            className="page-hero-banner-children"
            style={{
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
