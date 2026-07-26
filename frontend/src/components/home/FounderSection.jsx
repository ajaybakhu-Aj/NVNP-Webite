import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { colors } from "../../data/constants";
import { useSiteContents } from "../../utils/cmsDb";

export default function FounderSection() {
  const contents = useSiteContents();
  return (
    <section
      className="about-ceo-section ceo-message-container"
      style={{
        paddingTop: "60px",
        paddingBottom: "60px",
        background: colors.surfaceContainerLow,
        borderTop: `1px solid ${colors.outlineVariant}`,
        borderBottom: `1px solid ${colors.outlineVariant}`,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        className="about-ceo-inner ceo-message-inner"
        style={{
          maxWidth: 1400,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "5%",
          paddingRight: "5%",
          display: "flex",
          alignItems: "center",
          gap: "60px",
          flexWrap: "wrap",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* IMAGE SECTION */}
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            position: "relative",
            flexShrink: 0,
            margin: "0 auto",
          }}
        >
          <img
            src={(!contents.homeFounderImg || contents.homeFounderImg.includes("googleusercontent.com")) ? "/founder.jpg" : contents.homeFounderImg}
            alt={contents.homeFounderName || "Rozil Thapa"}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              filter: "grayscale(100%) brightness(0.75)",
              borderBottom: `8px solid ${colors.secondary}`,
              display: "block",
              borderRadius: "4px",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              background: colors.secondary,
              color: "black",
              padding: "12px 20px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(14px, 2vw, 18px)",
              lineHeight: 1.2,
              borderRadius: "2px",
            }}
          >
            {contents.homeFounderName || "ROZIL THAPA"}
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div
          style={{
            flex: 1,
            minWidth: "280px",
            width: "100%",
          }}
        >
          <span
            style={{
              color: colors.secondary,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 16,
            }}
          >
            {contents.homeFounderTag || "Our Founder's Vision"}
          </span>

          <blockquote
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(26px, 4.5vw, 38px)",
              fontWeight: 700,
              lineHeight: 1.25,
              fontStyle: "italic",
              marginBottom: 24,
              position: "relative",
              wordBreak: "break-word",
              color: "var(--nv-onSurf, #e5e2e1)",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "-28px",
                left: "-12px",
                color: "rgba(181,231,93,0.2)",
                fontSize: "clamp(64px, 10vw, 110px)",
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 1,
                pointerEvents: "none",
              }}
            >
              "
            </span>

            {contents.homeFounderQuote || "The vision behind NV// was never just about hardware. It was about reclaiming safety in a world that never sleeps."}
          </blockquote>

          <p
            style={{
              color: colors.onSurfaceVariant,
              fontSize: "clamp(15px, 1.8vw, 17px)",
              lineHeight: 1.65,
              marginBottom: 28,
              wordBreak: "break-word",
            }}
          >
            {contents.homeFounderDesc || "Founder Rozil Thapa started NightVision with a singular mission: to provide the people of Nepal with security technology that rivals the global elite, without compromise."}
          </p>

          <Link to="/founder" className="no-underline inline-block w-full sm:w-auto">
            <button
              className="hero-btn-1 flex items-center justify-center gap-2 uppercase cursor-pointer w-full sm:w-auto transition-all duration-300 rounded-full"
              style={{
                backgroundColor: "#0d0d0d",
                color: "#b5e75d",
                border: "1px solid #0d0d0d",
                padding: "12px 28px",
                borderRadius: "30px",
                fontWeight: 800,
                fontSize: "0.88rem",
                letterSpacing: "0.05em",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
              }}
            >
              READ THE FULL STORY →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}