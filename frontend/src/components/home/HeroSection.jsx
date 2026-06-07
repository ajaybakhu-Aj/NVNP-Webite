import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";

function HeroSection() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isTablet = screenWidth <= 1024;
    const isMobile = screenWidth <= 768;
    const isSmallMobile = screenWidth <= 480;

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
                paddingTop: isMobile ? "100px" : "0",
                paddingBottom: isMobile ? "60px" : "0",
            }}
        >

            {/* RECORDING FRAME */}
            <div
                style={{
                    position: "absolute",
                    inset: isMobile ? 10 : 20,
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

                {/* CORNERS */}
                {[
                    {
                        top: 0,
                        left: 0,
                        borderTop: `3px solid ${colors.secondary}`,
                        borderLeft: `3px solid ${colors.secondary}`,
                    },
                    {
                        top: 0,
                        right: 0,
                        borderTop: `3px solid ${colors.secondary}`,
                        borderRight: `3px solid ${colors.secondary}`,
                    },
                    {
                        bottom: 0,
                        left: 0,
                        borderBottom: `3px solid ${colors.secondary}`,
                        borderLeft: `3px solid ${colors.secondary}`,
                    },
                    {
                        bottom: 0,
                        right: 0,
                        borderBottom: `3px solid ${colors.secondary}`,
                        borderRight: `3px solid ${colors.secondary}`,
                    },
                ].map((corner, index) => (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            width: isMobile ? 40 : 70,
                            height: isMobile ? 40 : 70,
                            ...corner,
                        }}
                    />
                ))}

                {/* REC */}
                <div
                    style={{
                        position: "absolute",
                        top: isMobile ? 10 : 16,
                        right: isMobile ? 10 : 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#fff",
                        fontSize: isMobile ? 10 : 12,
                        fontWeight: 700,
                        letterSpacing: 2,
                        padding: isMobile ? "6px 10px" : "8px 14px",
                        background: "rgba(0,0,0,0.6)",
                        border: "1px solid rgba(255,255,255,0.08)",
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

                    REC
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    padding: isMobile ? "0 20px" : "0 24px",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
                    gap: isMobile ? 50 : 80,
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
                        gap: isMobile ? 20 : 28,
                        order: isTablet ? 2 : 1,
                        textAlign: isTablet ? "center" : "left",
                        alignItems: isTablet ? "center" : "flex-start",
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
                            padding: isMobile ? "6px 12px" : "8px 14px",
                            width: "fit-content",
                            fontSize: isMobile ? 10 : 12,
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

                        LIVE SURVEILLANCE ACTIVE
                    </div>

                    {/* TITLE */}
                    <h1
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: isSmallMobile
                                ? "34px"
                                : isMobile
                                ? "44px"
                                : "clamp(52px, 6vw, 78px)",
                            lineHeight: 1,
                            fontWeight: 700,
                            letterSpacing: isMobile ? -1 : -3,
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
                            fontSize: isMobile ? 14 : 16,
                            lineHeight: 1.8,
                            color: "#ccc",
                        }}
                    >
                        Smart AI-powered surveillance systems engineered for
                        continuous monitoring, encrypted live streaming, and
                        real-time security response.
                    </p>

                    {/* BUTTONS */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: isSmallMobile ? "column" : "row",
                            width: isSmallMobile ? "100%" : "auto",
                            gap: 16,
                            marginTop: 8,
                        }}
                    >
                        <Link
                            to="/product"
                            style={{
                                background: colors.secondary,
                                color: "#111",
                                padding: isMobile
                                    ? "16px 22px"
                                    : "18px 34px",
                                border: "none",
                                fontWeight: 700,
                                letterSpacing: 1,
                                textDecoration: "none",
                                textAlign: "center",
                                fontSize: isMobile ? 13 : 14,
                                width: isSmallMobile ? "100%" : "auto",
                                boxSizing: "border-box",
                            }}
                        >
                            VIEW CCTV CAMERAS
                        </Link>

                        <button
                            onClick={() => {
                                const el = document.getElementById("features");
                                if (el) {
                                    el.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            style={{
                                background: "transparent",
                                color: colors.secondary,
                                padding: isMobile
                                    ? "16px 22px"
                                    : "18px 34px",
                                border: `1px solid ${colors.secondary}`,
                                fontWeight: 700,
                                letterSpacing: 1,
                                cursor: "pointer",
                                fontSize: isMobile ? 13 : 14,
                                width: isSmallMobile ? "100%" : "auto",
                            }}
                        >
                            Features
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
                        order: isTablet ? 1 : 2,
                    }}
                >
                    <div
                        style={{
                            width: isSmallMobile
                                ? 260
                                : isMobile
                                ? 320
                                : isTablet
                                ? 400
                                : 460,
                            height: isSmallMobile
                                ? 260
                                : isMobile
                                ? 320
                                : isTablet
                                ? 400
                                : 460,
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
                                inset: isMobile ? 25 : 35,
                                border: `1px solid rgba(181,231,93,0.35)`,
                                borderRadius: "50%",
                                animation:
                                    "spinReverse 15s linear infinite",
                            }}
                        />

                        {/* INNER RING */}
                        <div
                            style={{
                                position: "absolute",
                                inset: isMobile ? 50 : 70,
                                border: `1px solid rgba(181,231,93,0.15)`,
                                borderRadius: "50%",
                            }}
                        />

                        {/* CAMERA */}
                        <div
                            style={{
                                width: isSmallMobile
                                    ? 90
                                    : isMobile
                                    ? 110
                                    : 140,
                                height: isSmallMobile
                                    ? 90
                                    : isMobile
                                    ? 110
                                    : 140,
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
                                size={
                                    isSmallMobile
                                        ? 40
                                        : isMobile
                                        ? 50
                                        : 70
                                }
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