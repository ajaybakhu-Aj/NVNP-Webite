import React, { useState, useEffect } from "react";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";
import { useSiteContents } from "../../utils/cmsDb";

export default function TestimonialsSection() {
  const contents = useSiteContents();

  const items = contents.testimonials || [];
  return (
    <section
      style={{
        padding: "80px 0",
        background: colors.background,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",

          width: "100%",

          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",

            fontSize: "clamp(28px, 5vw, 40px)",

            fontWeight: 700,

            letterSpacing: 2,

            textAlign: "center",

            marginBottom: 48,

            lineHeight: 1.2,

            wordBreak: "break-word",
            color: "var(--nv-onSurf)",
          }}
        >
          {contents.testimonialsTitle || "TRUSTED BY LEADERS"}
        </h2>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",

            gap: 24,

            width: "100%",
          }}
        >
          {items.map(({ text, author }, idx) => (
            <div
              key={idx}
              style={{
                border: `1px solid ${colors.secondary}`,

                padding: 24,

                background: colors.surfaceContainerLowest,

                width: "100%",

                boxSizing: "border-box",

                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",

                  flexWrap: "wrap",

                  color: colors.secondary,

                  marginBottom: 16,

                  gap: "2px",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    size={24}
                    fill
                    style={{
                      color: colors.secondary,

                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>

              <p
                style={{
                  fontStyle: "italic",

                  marginBottom: 24,

                  fontSize: "clamp(14px, 2vw, 16px)",

                  lineHeight: 1.6,

                  wordBreak: "break-word",
                  color: "var(--nv-onSurf)",
                }}
              >
                {text}
              </p>

              <div
                style={{
                  color: "var(--nv-onSurf)",

                  fontFamily: "'Inter', sans-serif",

                  fontWeight: 600,

                  fontSize: 12,

                  letterSpacing: 1,

                  wordBreak: "break-word",

                  lineHeight: 1.5,
                }}
              >
                {author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}