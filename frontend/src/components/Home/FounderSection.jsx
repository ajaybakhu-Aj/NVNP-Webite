import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../../data/constants";

export default function FounderSection() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: colors.surfaceContainerLow,
        borderTop: `1px solid ${colors.outlineVariant}`,
        borderBottom: `1px solid ${colors.outlineVariant}`,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",

          display: "flex",

          alignItems: "center",

          gap: "80px",

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
          <div
            style={{
              position: "absolute",

              top: -16,

              left: -16,

              width: 96,

              height: 96,

              borderTop: `2px solid ${colors.secondary}`,

              borderLeft: `2px solid ${colors.secondary}`,
            }}
          />

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR-fMv0L3rig500Ni-Aqy_inAOQOkYWFt0SK4N7sg0Qln0eypxaQbEQUccQzDObpveJrt2D5h6C1e11lVByZQk5_fcQDg0yyRBF86zgf3XZDaa7s319Xe4WgHzlF-eKG_lx72nLafgeMYNWopSh2Gz6Uqyr2GWv91WErMPapq7JoJlCn2mjMVlYlD-OkvL9Qa_zsNUqoP54O-QyO3W99yBi7-I_S1Zkhs7cgfMmN1kQUIzH7tesLUMFyVOLTEuh_0M0murXYUYOkQ"
            alt="Rozil Thapa"
            style={{
              width: "100%",

              height: "auto",

              objectFit: "cover",

              filter: "grayscale(100%) brightness(0.75)",

              borderBottom: `8px solid ${colors.secondary}`,

              display: "block",
            }}
          />

          <div
            style={{
              position: "absolute",

              bottom: 16,

              left: 16,

              background: colors.secondary,

              color: "black",

              padding: "16px",

              fontFamily: "'Space Grotesk', sans-serif",

              fontWeight: 700,

              fontSize: "clamp(14px, 2vw, 18px)",

              lineHeight: 1.2,
            }}
          >
            ROZIL THAPA
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

              fontWeight: 600,

              fontSize: 12,

              letterSpacing: 1,

              textTransform: "uppercase",

              display: "block",

              marginBottom: 16,
            }}
          >
            Our Founder's Vision
          </span>

          <blockquote
            style={{
              fontFamily: "'Space Grotesk', sans-serif",

              fontSize: "clamp(28px, 5vw, 40px)",

              fontWeight: 700,

              lineHeight: 1.2,

              fontStyle: "italic",

              marginBottom: 24,

              position: "relative",

              wordBreak: "break-word",
            }}
          >
            <span
              style={{
                position: "absolute",

                top: "-32px",

                left: "-12px",

                color: "rgba(181,231,93,0.2)",

                fontSize: "clamp(72px, 12vw, 128px)",

                fontFamily: "'Space Grotesk', sans-serif",

                lineHeight: 1,

                pointerEvents: "none",
              }}
            >
              "
            </span>

            The vision behind NV// was never just about hardware.
            It was about reclaiming safety in a world that never
            sleeps.
          </blockquote>

          <p
            style={{
              color: colors.onSurfaceVariant,

              fontSize: "clamp(16px, 2vw, 18px)",

              lineHeight: 1.6,

              marginBottom: 24,

              wordBreak: "break-word",
            }}
          >
            Founder Rozil Thapa started NightVision with a
            singular mission: to provide the people of Nepal
            with security technology that rivals the global
            elite, without compromise.
          </p>

          <Link to="/founder">
            <button
              style={{
                background: colors.primaryContainer,

                color: colors.onPrimaryContainer,

                padding: "18px 32px",

                fontFamily: "'Inter', sans-serif",

                fontWeight: 600,

                fontSize: 12,

                letterSpacing: 1,

                border: "none",

                cursor: "pointer",

                width: "100%",

                maxWidth: "320px",

                transition: "0.3s",

                boxSizing: "border-box",
              }}
            >
              READ THE FULL STORY
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}