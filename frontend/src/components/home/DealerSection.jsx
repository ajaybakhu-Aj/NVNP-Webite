import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../../data/constants";
import { useSiteContents } from "../../utils/cmsDb";

export default function DealerSection() {
  const contents = useSiteContents();
  const primaryBgColor = colors.secondary || "#b5e75d";

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        padding: "60px 0",
        overflow: "hidden",
        backgroundColor: primaryBgColor,
        borderTop: "1px solid rgba(0, 0, 0, 0.15)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
        boxSizing: "border-box",
      }}
    >
      <style>
        {`
          .dealer-btn-primary {
            background-color: #0c0e08;
            color: #b5e75d;
            border: 2px solid #0c0e08;
            padding: 14px 28px;
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: 12px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            border-radius: 50px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
            text-align: center;
            box-sizing: border-box;
          }
          .dealer-btn-primary:hover {
            background-color: #171c10;
            color: #ffffff;
            border-color: #0c0e08;
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.35);
          }
          .dealer-btn-secondary {
            background-color: transparent;
            color: #0c0e08;
            border: 2px solid #0c0e08;
            padding: 14px 28px;
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: 12px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            border-radius: 50px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            text-align: center;
            box-sizing: border-box;
          }
          .dealer-btn-secondary:hover {
            background-color: #0c0e08;
            color: #b5e75d;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          }

          @media (max-width: 767px) {
            .dealer-cta-container {
              flex-direction: column !important;
              width: 100% !important;
            }
            .dealer-btn-primary, .dealer-btn-secondary {
              width: 100% !important;
            }
          }
        `}
      </style>

      {/* SUBTLE WATERMARK BACKGROUND TEXT LAYER */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          overflow: "hidden",
          userSelect: "none",
          opacity: 0.08,
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(50px, 16vw, 360px)",
            letterSpacing: "-2px",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            lineHeight: 1,
            color: "#000000",
          }}
        >
          {contents.expandNetworkBgText || "DEALER"}
        </span>
      </div>

      {/* FOREGROUND CONTENT LAYER */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 20px",
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* TITLE */}
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(24px, 4.5vw, 50px)",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            color: "#0c0e08",
            margin: "0 0 14px 0",
            lineHeight: 1.15,
            textTransform: "uppercase",
          }}
        >
          {contents.expandNetworkTitle || "EXPAND THE NETWORK"}
        </h2>

        {/* SUBTITLE */}
        <p
          style={{
            maxWidth: 680,
            margin: "0 auto 30px auto",
            fontSize: "clamp(13px, 1.8vw, 16px)",
            fontWeight: 600,
            lineHeight: 1.6,
            color: "#182405",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {contents.expandNetworkSubtitle ||
            "Join Nepal's premier surveillance ecosystem. Partner with NightVision to distribute high-tier AI cameras, thermal systems, and perimeter hardware across all 7 provinces."}
        </p>

        {/* CTA BUTTONS CONTAINER */}
        <div
          className="dealer-cta-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 14,
            width: "auto",
            maxWidth: "100%",
          }}
        >
          <Link to="/dealership" className="dealer-btn-primary">
            BECOME A CERTIFIED DEALER
          </Link>
          <Link to="/contact" className="dealer-btn-secondary">
            CONTACT PARTNER TEAM
          </Link>
        </div>
      </div>
    </section>
  );
}