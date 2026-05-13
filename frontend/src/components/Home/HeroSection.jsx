import React from "react";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";

function HeroSection() {
  return (
    <section
      className="grid-overlay"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderBottom: `1px solid ${colors.outlineVariant}`,
      }}
    >
      {/* SCANLINE */}
      <div className="scanline-effect" />

      {/* RECORDING FRAME */}
      <div className="recording-frame">
        {/* CORNERS */}
        <div className="recording-corner top-left" />
        <div className="recording-corner top-right" />
        <div className="recording-corner bottom-left" />
        <div className="recording-corner bottom-right" />

        {/* REC */}
        <div className="recording-indicator">
          <span className="recording-dot" />
          REC
        </div>

        {/* BATTERY */}
        <div className="recording-battery">
          <div className="recording-battery-level" />
        </div>

        {/* CROSSHAIR */}
        <div className="recording-crosshair" />
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {/* STATUS */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: colors.secondary,
              border: `1px solid ${colors.secondary}`,
              padding: "8px 14px",
              width: "fit-content",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="recording-dot" />
            LIVE VIGILANCE SYSTEM ACTIVE
          </div>

          {/* TITLE */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(48px, 6vw, 78px)",
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: -3,
            }}
          >
            ADVANCED{" "}
            <span
              className="text-glow"
              style={{
                color: colors.secondary,
              }}
            >
              SURVEILLANCE
            </span>
            <br />
            FOR PEACE OF MIND
          </h1>

          {/* DESCRIPTION */}
          <p
            style={{
              maxWidth: 600,
              opacity: 0.7,
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            Smart AI-powered surveillance systems engineered for continuous
            monitoring, encrypted live streaming, and real-time security
            response.
          </p>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              marginTop: 12,
            }}
          >
            <button
              style={{
                background: colors.secondary,
                color: "#111",
                padding: "18px 34px",
                border: "none",
                fontWeight: 700,
                letterSpacing: 1,
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              VIEW CCTV CAMERAS
            </button>

            <button
              style={{
                background: "transparent",
                color: colors.secondary,
                padding: "18px 34px",
                border: `1px solid ${colors.secondary}`,
                fontWeight: 700,
                letterSpacing: 1,
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              OUR STORY
            </button>
          </div>

          {/* STATS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
              marginTop: 30,
              paddingTop: 24,
              borderTop: `1px solid ${colors.outlineVariant}`,
            }}
          >
            {[
              ["6+", "YEARS EXPERIENCE"],
              ["50+", "DEALERS"],
              ["4K", "ULTRA HD"],
            ].map(([value, label]) => (
              <div key={label}>
                <div
                  style={{
                    color: colors.secondary,
                    fontSize: 34,
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {value}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: 1,
                    opacity: 0.6,
                    marginTop: 6,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 460,
              height: 460,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* OUTER RING */}
            <div
              className="spin-slow"
              style={{
                position: "absolute",
                inset: 0,
                border: `1px solid rgba(181,231,93,0.15)`,
                borderRadius: "50%",
              }}
            />

            {/* MIDDLE RING */}
            <div
              className="spin-reverse"
              style={{
                position: "absolute",
                inset: 35,
                border: `1px solid rgba(181,231,93,0.35)`,
                borderRadius: "50%",
              }}
            />

            {/* INNER RING */}
            <div
              style={{
                position: "absolute",
                inset: 70,
                border: `1px solid rgba(181,231,93,0.15)`,
                borderRadius: "50%",
              }}
            />

            {/* CENTER CAMERA */}
            <div
              className="luminous-glow"
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                border: `2px solid ${colors.secondary}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(12px)",
                zIndex: 10,
              }}
            >
              <Icon
                name="videocam"
                size={70}
                fill
                style={{
                  color: colors.secondary,
                }}
              />
            </div>

            {/* LOCATION */}
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 0,
                padding: "10px 14px",
                background: "rgba(0,0,0,0.6)",
                border: `1px solid rgba(181,231,93,0.2)`,
                color: colors.secondary,
                fontSize: 11,
                letterSpacing: 1,
                lineHeight: 1.7,
              }}
            >
              POS_X: 27.7172° N
              <br />
              POS_Y: 85.3240° E
            </div>

            {/* STREAM */}
            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: 0,
                background: colors.secondary,
                color: "#111",
                padding: "10px 14px",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: 1,
              }}
            >
              ENCRYPTED_STREAM_V4
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;