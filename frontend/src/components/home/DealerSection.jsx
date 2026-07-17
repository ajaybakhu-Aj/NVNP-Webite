import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../../data/constants";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";

export default function DealerSection() {
  const contents = useSiteContents();
  const homeSettings = useHomepageSettings();

  return (
    <section
      style={{
        position: "relative",

        background: colors.secondary,

        padding: "80px 0",

        overflow: "hidden",

        width: "100%",
      }}
    >
      {/* BACKGROUND TEXT */}
      <div
        style={{
          position: "absolute",

          inset: 0,

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          opacity: 0.1,

          pointerEvents: "none",

          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",

            fontSize: "clamp(80px, 25vw, 320px)",

            fontWeight: 700,

            color: "white",

            lineHeight: 1,

            whiteSpace: "nowrap",

            userSelect: "none",
          }}
        >
          {contents.expandNetworkBgText || "DEALER"}
        </span>
      </div>

      {/* CONTENT */}
      <div
        style={{
          maxWidth: 1280,

          margin: "0 auto",

          padding: "0 24px",

          position: "relative",

          zIndex: 10,

          textAlign: "center",

          width: "100%",

          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",

            fontSize: "clamp(32px, 7vw, 64px)",

            fontWeight: 700,

            letterSpacing: "-2px",

            color: "black",

            marginBottom: 24,

            lineHeight: 1.1,

            wordBreak: "break-word",
          }}
        >
          {homeSettings.cta?.heading || contents.expandNetworkTitle || "EXPAND THE NETWORK"}
        </h2>

        <p
          style={{
            color: colors.onSecondaryContainer,

            fontSize: "clamp(15px, 2vw, 18px)",

            lineHeight: 1.6,

            maxWidth: 672,

            margin: "0 auto 48px",

            fontWeight: 700,

            wordBreak: "break-word",
          }}
        >
          {homeSettings.cta?.subheading || contents.expandNetworkDesc ||
            "Join the elite force of NightVision security providers across Nepal. We provide the gear, the training, and the authority."}
        </p>

        {homeSettings.cta?.body_text && (
          <p
            style={{
              color: colors.onSecondaryContainer,
              fontSize: "14px",
              lineHeight: 1.6,
              opacity: 0.8,
              maxWidth: 672,
              margin: "-32px auto 48px",
              wordBreak: "break-word",
            }}
          >
            {homeSettings.cta.body_text}
          </p>
        )}

        <Link
          to={homeSettings.cta?.button_url || "/apply-dealers"}
          style={{
            background: "black",

            color: colors.secondary,

            padding: "clamp(16px, 3vw, 24px) clamp(28px, 8vw, 80px)",

            fontFamily: "'Space Grotesk', sans-serif",

            fontWeight: 700,

            fontSize: "clamp(16px, 3vw, 24px)",

            border: "none",

            cursor: "pointer",

            transition: "transform 0.2s",

            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",

            width: "100%",

            maxWidth: "420px",

            boxSizing: "border-box",

            lineHeight: 1.2,
            textDecoration: "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          {homeSettings.cta?.button_text || contents.expandNetworkBtn || "BECOME A PARTNER"}
        </Link>
      </div>
    </section>
  );
}