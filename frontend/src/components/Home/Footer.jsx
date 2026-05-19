import React from "react";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "48px 24px",

        display: "grid",

        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",

        gap: 32,

        maxWidth: 1280,

        margin: "0 auto",

        background: colors.surfaceContainerLowest,

        borderTop: `1px solid ${colors.secondary}`,

        width: "100%",

        boxSizing: "border-box",

        overflow: "hidden",
      }}
    >
      {/* BRAND */}
      <div
        style={{
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontFamily: "'Arial Black', sans-serif",

            fontStyle: "italic",

            fontSize: "clamp(20px, 4vw, 24px)",

            fontWeight: 600,

            letterSpacing: 1,

            marginBottom: 24,

            lineHeight: 1.2,

            wordBreak: "break-word",
          }}
        >
          <span style={{ color: colors.secondary }}>
            N
          </span>

          <span style={{ color: "#ffffff" }}>
            V
          </span>

          <span style={{ color: colors.secondary }}>
            //
          </span>

          <span style={{ color: "#ffffff" }}>
            NIGHTVISION™
          </span>
        </div>

        <p
          style={{
            color: colors.onSurfaceVariant,

            fontSize: "clamp(14px, 2vw, 16px)",

            lineHeight: 1.7,

            maxWidth: 384,

            marginBottom: 24,

            wordBreak: "break-word",
          }}
        >
          Dedicated to the highest standard of
          surveillance technology and national
          security for Nepal. Security is our duty.
        </p>

        <div
          style={{
            display: "flex",

            gap: 24,

            flexWrap: "wrap",
          }}
        >
          {["public", "share", "chat"].map(
            (icon) => (
              <Icon
                key={icon}
                name={icon}
                size={24}
                style={{
                  color: colors.secondary,

                  cursor: "pointer",

                  flexShrink: 0,
                }}
              />
            )
          )}
        </div>
      </div>

      {/* NAVIGATION */}
      <div
        style={{
          minWidth: 0,
        }}
      >
        <h5
          style={{
            color: colors.secondary,

            fontFamily: "'Inter', sans-serif",

            fontWeight: 600,

            fontSize: 12,

            letterSpacing: 1,

            textTransform: "uppercase",

            marginBottom: 24,
          }}
        >
          Navigation
        </h5>

        <ul
          style={{
            listStyle: "none",

            display: "flex",

            flexDirection: "column",

            gap: 12,
          }}
        >
          {[
            "Privacy Policy",
            "Terms of Service",
            "Support",
          ].map((item) => {
            const route =
              item === "Support"
                ? "/support"
                : item === "Terms of Service"
                ? "/terms"
                : "#";

            return (
              <li key={item}>
                <Link
                  to={route}
                  style={{
                    color: colors.onSurfaceVariant,

                    fontSize: "clamp(14px, 2vw, 16px)",

                    textTransform: "uppercase",

                    letterSpacing: 1,

                    textDecoration: "none",

                    lineHeight: 1.6,

                    wordBreak: "break-word",
                  }}
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* CORPORATE */}
      <div
        style={{
          minWidth: 0,
        }}
      >
        <h5
          style={{
            color: colors.secondary,

            fontFamily: "'Inter', sans-serif",

            fontWeight: 600,

            fontSize: 12,

            letterSpacing: 1,

            textTransform: "uppercase",

            marginBottom: 24,
          }}
        >
          Corporate
        </h5>

        <ul
          style={{
            listStyle: "none",

            display: "flex",

            flexDirection: "column",

            gap: 12,
          }}
        >
          {["Warranty", "Careers"].map((item) => {
            const route =
              item === "Warranty"
                ? "/warranty"
                : "#";

            return (
              <li key={item}>
                <Link
                  to={route}
                  style={{
                    color: colors.onSurfaceVariant,

                    fontSize: "clamp(14px, 2vw, 16px)",

                    textTransform: "uppercase",

                    letterSpacing: 1,

                    textDecoration: "none",

                    lineHeight: 1.6,

                    wordBreak: "break-word",
                  }}
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* COPYRIGHT */}
      <div
        style={{
          gridColumn: "1/-1",

          paddingTop: 40,

          marginTop: 20,

          borderTop: `1px solid ${colors.outlineVariant}`,

          textAlign: "center",

          width: "100%",
        }}
      >
        <p
          style={{
            color: colors.onSurfaceVariant,

            fontSize: "clamp(11px, 2vw, 16px)",

            textTransform: "uppercase",

            letterSpacing: 1,

            lineHeight: 1.7,

            wordBreak: "break-word",
          }}
        >
          © 2024 NIGHTVISION SECURITY SYSTEMS.
          ALL RIGHTS RESERVED. UNCOMPROMISING
          SECURITY.
        </p>
      </div>
    </footer>
  );
}