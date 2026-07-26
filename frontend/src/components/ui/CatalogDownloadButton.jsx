import React from "react";
import Icon from "../../utils/Icon";
import { useSiteContents } from "../../utils/cmsDb";

export default function CatalogDownloadButton({
  product = null,
  categoryName = "",
  variant = "header", // 'header' | 'banner' | 'pdp' | 'button' | 'pdp_sticky'
  customUrl = "",
  customSize = "",
  customTitle = "",
  className = "",
  style = {}
}) {
  const siteContents = useSiteContents();

  // Dynamic PDF resolution logic with 3-tier fallback hierarchy
  const globalPdf = siteContents?.globalCatalogPdf || "/assets/guides/nightvision-full-catalog.pdf";
  const globalSize = siteContents?.globalCatalogSize || "4.2 MB";
  const globalTitle = siteContents?.globalCatalogTitle || "NightVision™ 2026 Master Security Catalog";

  let pdfUrl = customUrl || (product?.catalogPdf || product?.guidePdf) || globalPdf;
  let pdfSize = customSize || (product?.catalogSize) || globalSize;
  let pdfTitle = customTitle || (product ? `${product.name} Datasheet` : (categoryName ? `${categoryName} Catalog` : globalTitle));

  const handleDownload = (e) => {
    // If external URL or local PDF asset, open directly in new tab or trigger download
    if (!pdfUrl) return;
    try {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("download", pdfUrl.split("/").pop() || "nightvision-catalog.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      window.open(pdfUrl, "_blank");
    }
  };

  // 1. HEADER VARIANT
  if (variant === "header") {
    return (
      <button
        onClick={handleDownload}
        type="button"
        title="Download NightVision Security Catalog (PDF)"
        className={`catalog-header-btn ${className}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          background: "rgba(181, 231, 93, 0.06)",
          border: "1px solid rgba(181, 231, 93, 0.4)",
          borderRadius: "20px",
          color: "#b5e75d",
          fontSize: "11px",
          fontWeight: "700",
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: "0.5px",
          cursor: "pointer",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 12px rgba(181, 231, 93, 0.1)",
          ...style
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(181, 231, 93, 0.16)";
          e.currentTarget.style.borderColor = "#b5e75d";
          e.currentTarget.style.boxShadow = "0 0 18px rgba(181, 231, 93, 0.35)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(181, 231, 93, 0.06)";
          e.currentTarget.style.borderColor = "rgba(181, 231, 93, 0.4)";
          e.currentTarget.style.boxShadow = "0 0 12px rgba(181, 231, 93, 0.1)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#b5e75d",
            color: "#11140c",
            borderRadius: "4px",
            padding: "2px 4px",
            fontSize: "9px",
            fontWeight: "800"
          }}
        >
          PDF
        </div>
        <span style={{ whiteSpace: "nowrap" }}>CATALOG</span>
        <span
          style={{
            fontSize: "9px",
            opacity: 0.75,
            background: "rgba(255, 255, 255, 0.1)",
            padding: "1px 5px",
            borderRadius: "10px",
            marginLeft: "2px"
          }}
        >
          {pdfSize}
        </span>
        <Icon name="download" size={14} style={{ color: "#b5e75d" }} />
      </button>
    );
  }

  // 2. BANNER VARIANT (For Category Pages / Archives)
  if (variant === "banner") {
    return (
      <div
        className={`catalog-banner-card ${className}`}
        style={{
          background: "linear-gradient(135deg, rgba(20, 24, 15, 0.95) 0%, rgba(12, 15, 8, 0.98) 100%)",
          border: "1px solid rgba(181, 231, 93, 0.25)",
          borderRadius: "16px",
          padding: "24px 28px",
          margin: "24px 0 32px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          position: "relative",
          overflow: "hidden",
          ...style
        }}
      >
        {/* Subtle Background Glow Accent */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(181, 231, 93, 0.08) 0%, rgba(0,0,0,0) 70%)",
            pointerEvents: "none"
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "20px", minWidth: "280px", flex: "1" }}>
          {/* PDF Icon Badge */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(181, 231, 93, 0.1)",
              border: "1px solid rgba(181, 231, 93, 0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#b5e75d",
              flexShrink: 0
            }}
          >
            <Icon name="picture_as_pdf" size={26} />
            <span style={{ fontSize: "9px", fontWeight: "800", marginTop: "2px", letterSpacing: "0.5px" }}>
              PDF
            </span>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "800",
                  letterSpacing: "1.5px",
                  color: "#b5e75d",
                  textTransform: "uppercase",
                  fontFamily: "'Space Grotesk', sans-serif"
                }}
              >
                TECHNICAL CATALOGUE
              </span>
              <span
                style={{
                  fontSize: "10px",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "#c3c9b3",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontWeight: "600"
                }}
              >
                {pdfSize}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "18px",
                fontWeight: "700",
                color: "#e2e4d5",
                marginTop: "4px",
                marginBottom: "4px",
                letterSpacing: "-0.3px"
              }}
            >
              {pdfTitle}
            </h3>
            <p style={{ fontSize: "12px", color: "#a1a894", margin: 0, lineHeight: "1.5" }}>
              Download complete spec sheets, wiring diagrams, and architecture blueprints.
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          type="button"
          style={{
            background: "#b5e75d",
            color: "#11140c",
            border: "none",
            borderRadius: "10px",
            padding: "12px 24px",
            fontSize: "12px",
            fontWeight: "800",
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "1px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 4px 16px rgba(181, 231, 93, 0.3)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(181, 231, 93, 0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(181, 231, 93, 0.3)";
          }}
        >
          <Icon name="download" size={16} />
          <span>DOWNLOAD CATALOG</span>
        </button>
      </div>
    );
  }

  // 3. PDP VARIANT (Product Detail Page Technical Block)
  if (variant === "pdp") {
    return (
      <div
        className={`catalog-pdp-card ${className}`}
        style={{
          background: "rgba(25, 29, 20, 0.8)",
          border: "1px solid rgba(181, 231, 93, 0.3)",
          borderRadius: "14px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginTop: "20px",
          marginBottom: "20px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
          ...style
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "rgba(181, 231, 93, 0.12)",
              border: "1px solid rgba(181, 231, 93, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b5e75d",
              flexShrink: 0
            }}
          >
            <Icon name="description" size={22} />
          </div>
          <div>
            <div style={{ fontSize: "9px", fontWeight: "800", letterSpacing: "1.5px", color: "#b5e75d" }}>
              OFFICIAL DATASHEET & CATALOG
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "14px",
                fontWeight: "700",
                color: "#e2e4d5",
                marginTop: "2px"
              }}
            >
              {pdfTitle}
            </div>
            <div style={{ fontSize: "11px", color: "#9da490", marginTop: "2px" }}>
              PDF Document • <strong style={{ color: "#b5e75d" }}>{pdfSize}</strong>
            </div>
          </div>
        </div>

        <button
          onClick={handleDownload}
          type="button"
          style={{
            background: "rgba(181, 231, 93, 0.12)",
            color: "#b5e75d",
            border: "1px solid #b5e75d",
            borderRadius: "8px",
            padding: "10px 18px",
            fontSize: "11px",
            fontWeight: "700",
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "1px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#b5e75d";
            e.currentTarget.style.color = "#11140c";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(181, 231, 93, 0.12)";
            e.currentTarget.style.color = "#b5e75d";
          }}
        >
          <Icon name="file_download" size={16} />
          <span>DOWNLOAD PDF</span>
        </button>
      </div>
    );
  }

  // 4. BUTTON VARIANT (Clean standalone button)
  return (
    <button
      onClick={handleDownload}
      type="button"
      className={`catalog-standalone-btn ${className}`}
      style={{
        background: "rgba(181, 231, 93, 0.1)",
        color: "#b5e75d",
        border: "1px solid rgba(181, 231, 93, 0.4)",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "11px",
        fontWeight: "700",
        fontFamily: "'Space Grotesk', sans-serif",
        letterSpacing: "1px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.2s ease",
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(181, 231, 93, 0.2)";
        e.currentTarget.style.borderColor = "#b5e75d";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(181, 231, 93, 0.1)";
        e.currentTarget.style.borderColor = "rgba(181, 231, 93, 0.4)";
      }}
    >
      <Icon name="picture_as_pdf" size={16} />
      <span>{pdfTitle}</span>
      <span style={{ fontSize: "10px", opacity: 0.7 }}>({pdfSize})</span>
    </button>
  );
}
