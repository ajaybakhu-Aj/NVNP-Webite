import React, { useState, useEffect } from "react";
import { colors, feedImages } from "../../data/constants";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";

export default function WhySection() {
  const contents = useSiteContents();
  const homeSettings = useHomepageSettings();

  const whyFeats = contents.whyFeatures || [];
  return (
    <section
      style={{
        padding: "80px 0",

        background: colors.background,

        overflow: "hidden",

        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: 1280,

          margin: "0 auto",

          padding: "0 24px",

          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",

          gap: "80px",

          alignItems: "center",

          width: "100%",

          boxSizing: "border-box",
        }}
      >
        {/* CAMERA FEEDS */}
        <div
          style={{
            display: "grid",

            gridTemplateColumns: "1fr 1fr",

            border: `1px solid ${colors.secondary}`,

            width: "100%",

            overflow: "hidden",
          }}
        >
          {feedImages.map(({ src, ch }, i) => (
            <div
              key={ch}
              style={{
                position: "relative",

                aspectRatio: "16/9",

                background: "black",

                borderTop:
                  i >= 2
                    ? `1px solid ${colors.secondary}`
                    : "none",

                borderLeft:
                  i % 2 === 1
                    ? `1px solid ${colors.secondary}`
                    : "none",

                overflow: "hidden",
              }}
            >
              <img
                src={src}
                alt={ch}
                style={{
                  width: "100%",

                  height: "100%",

                  objectFit: "cover",

                  opacity: 0.5,

                  transition: "opacity 0.2s",

                  display: "block",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.opacity = 0.8)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = 0.5)
                }
              />

              <div
                style={{
                  position: "absolute",

                  top: 8,

                  left: 8,

                  fontSize: "clamp(8px, 2vw, 10px)",

                  background: "#dc2626",

                  color: "white",

                  padding: "2px 6px",

                  whiteSpace: "nowrap",

                  fontWeight: 600,
                }}
              >
                REC • {ch}
              </div>
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div
          style={{
            display: "flex",

            flexDirection: "column",

            gap: 24,

            width: "100%",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "var(--nv-text-accent)",
            }}
          >
            {contents.whyTag || "The NightVision Edge"}
          </span>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",

              fontSize: "clamp(28px, 5vw, 40px)",

              fontWeight: 700,

              letterSpacing: 2,

              lineHeight: 1.2,

              wordBreak: "break-word",
              color: "var(--nv-onSurf)",
            }}
          >
            {homeSettings.about?.heading || contents.whyTitle || "UNCOMPROMISING VIGILANCE TECHNOLOGY"}
          </h2>

          <p
            style={{
              color: colors.onSurfaceVariant,

              fontSize: "clamp(15px, 2vw, 18px)",

              lineHeight: 1.6,

              wordBreak: "break-word",
            }}
          >
            {homeSettings.about?.subheading || contents.whySubtitle || "We don't just sell cameras; we deploy comprehensive security ecosystems tailored for the unique challenges of Nepal's infrastructure."}
          </p>

          {homeSettings.about?.body_text && (
            <p
              style={{
                color: colors.onSurfaceVariant,
                fontSize: "14px",
                lineHeight: 1.6,
                opacity: 0.8,
                marginTop: -8,
                wordBreak: "break-word",
              }}
            >
              {homeSettings.about.body_text}
            </p>
          )}

          {/* FEATURES */}
          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",

              gap: 24,

              paddingTop: 8,

              width: "100%",
            }}
          >
            {whyFeats.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  borderLeft: `4px solid ${colors.secondary}`,

                  paddingLeft: 16,

                  paddingTop: 8,

                  paddingBottom: 8,

                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",

                    fontSize: "clamp(20px, 3vw, 24px)",

                    fontWeight: 700,

                    color: "var(--nv-text-accent)",

                    lineHeight: 1.3,

                    wordBreak: "break-word",
                  }}
                >
                  {feat.val}
                </div>

                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",

                    fontSize: 12,

                    fontWeight: 600,

                    letterSpacing: 1,

                    opacity: 0.6,

                    lineHeight: 1.5,

                    wordBreak: "break-word",
                  }}
                >
                  {feat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}