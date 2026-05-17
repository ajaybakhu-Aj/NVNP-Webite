import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";

function HeroSection() {
    return (
        <section
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                borderBottom: `1px solid ${colors.outlineVariant}`,
                background: "#131313",
            }}
        >
            {/* RECORDING FRAME */}
            <div
                style={{
                    position: "absolute",
                    inset: 20,
                    pointerEvents: "none",
                    zIndex: 5,
                    overflow: "hidden",
                }}
            >
                {/* SCANLINE */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: 4,
                        background: `linear-gradient(
              to right,
              transparent,
              ${colors.secondary},
              transparent
            )`,
                        boxShadow: `
              0 0 12px ${colors.secondary},
              0 0 24px ${colors.secondary}
            `,
                        animation: "scanlineMove 2.8s linear infinite",
                        zIndex: 2,
                    }}
                />

                {/* TOP LEFT */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 70,
                        height: 70,
                        borderTop: `3px solid ${colors.secondary}`,
                        borderLeft: `3px solid ${colors.secondary}`,
                    }}
                />

                {/* TOP RIGHT */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 70,
                        height: 70,
                        borderTop: `3px solid ${colors.secondary}`,
                        borderRight: `3px solid ${colors.secondary}`,
                    }}
                />

                {/* BOTTOM LEFT */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: 70,
                        height: 70,
                        borderBottom: `3px solid ${colors.secondary}`,
                        borderLeft: `3px solid ${colors.secondary}`,
                    }}
                />

                {/* BOTTOM RIGHT */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 70,
                        height: 70,
                        borderBottom: `3px solid ${colors.secondary}`,
                        borderRight: `3px solid ${colors.secondary}`,
                    }}
                />

                {/* REC */}
                <div
                    style={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: 2,
                        padding: "8px 14px",
                        background: "rgba(0,0,0,0.6)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(8px)",
                        fontFamily: "'Space Grotesk', sans-serif",
                    }}
                >
                    <span
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#ff2d2d",
                            animation: "recordingPulse 1s infinite",
                            boxShadow: "0 0 12px #ff2d2d",
                        }}
                    />

                    REC
                </div>
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
                        <span
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: "#ff2d2d",
                                animation: "recordingPulse 1s infinite",
                            }}
                        />

                        LIVE SURVEILLANCE SYSTEM ACTIVE
                    </div>

                    {/* TITLE */}
                    <h1
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "clamp(48px, 6vw, 78px)",
                            lineHeight: 1,
                            fontWeight: 700,
                            letterSpacing: -3,
                            color: "#fff",
                        }}
                    >
                        ADVANCED{" "}
                        <span
                            style={{
                                color: colors.secondary,
                                textShadow: `0 0 12px ${colors.secondary}`,
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
                            color: "#ccc",
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
                        <Link
                            to="/product"
                            style={{
                                background: colors.secondary,
                                color: "#111",
                                padding: "18px 34px",
                                border: "none",
                                fontWeight: 700,
                                letterSpacing: 1,
                                cursor: "pointer",
                                textDecoration: "none",
                                display: "inline-block",
                            }}
                        >
                            VIEW CCTV CAMERAS
                        </Link>

                        <button
                            style={{
                                background: "transparent",
                                color: colors.secondary,
                                padding: "18px 34px",
                                border: `1px solid ${colors.secondary}`,
                                fontWeight: 700,
                                letterSpacing: 1,
                                cursor: "pointer",
                            }}
                        >
                            OUR STORY
                        </button>
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
                            style={{
                                position: "absolute",
                                inset: 0,
                                border: `1px solid rgba(181,231,93,0.15)`,
                                borderRadius: "50%",
                                animation: "spin 10s linear infinite",
                            }}
                        />

                        {/* MIDDLE RING */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 35,
                                border: `1px solid rgba(181,231,93,0.35)`,
                                borderRadius: "50%",
                                animation: "spinReverse 15s linear infinite",
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
                                boxShadow: `0 0 15px ${colors.secondary}`,
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
                    </div>
                </div>
            </div>

            {/* ANIMATIONS */}
            <style>
                {`
          @keyframes scanlineMove {
            0% {
              transform: translateY(0);
              opacity: 0;
            }

            5% {
              opacity: 1;
            }

            95% {
              opacity: 1;
            }

            100% {
              transform: translateY(calc(100vh - 40px));
              opacity: 0;
            }
          }

          @keyframes recordingPulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }

            50% {
              opacity: 0.3;
              transform: scale(0.8);
            }
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @keyframes spinReverse {
            from {
              transform: rotate(360deg);
            }

            to {
              transform: rotate(0deg);
            }
          }
        `}
            </style>
        </section>
    );
}

export default HeroSection;