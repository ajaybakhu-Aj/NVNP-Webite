import React from "react";
import Icon from "../../utils/Icon";
import { colors, features } from "../../data/constants";

export default function FeaturesStrip() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: colors.background,
        borderBottom: `1px solid ${colors.outlineVariant}`,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",

          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",

          gap: 24,

          width: "100%",

          boxSizing: "border-box",
        }}
      >
        {features.map(({ icon, title, desc }) => (
          <div
            key={title}
            style={{
              border: `1px solid ${colors.outlineVariant}`,

              padding: 24,

              transition: "border-color 0.2s",

              cursor: "default",

              width: "100%",

              boxSizing: "border-box",

              overflow: "hidden",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor =
                colors.secondary)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor =
                colors.outlineVariant)
            }
          >
            <Icon
              name={icon}
              size={40}
              style={{
                color: colors.secondary,

                display: "block",

                marginBottom: 16,

                flexShrink: 0,
              }}
            />

            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",

                fontSize: "clamp(20px, 3vw, 24px)",

                fontWeight: 600,

                letterSpacing: 1,

                marginBottom: 8,

                lineHeight: 1.3,

                wordBreak: "break-word",
              }}
            >
              {title}
            </h3>

            <p
              style={{
                color: colors.onSurfaceVariant,

                fontSize: "clamp(14px, 2vw, 16px)",

                lineHeight: 1.5,

                wordBreak: "break-word",
              }}
            >
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}