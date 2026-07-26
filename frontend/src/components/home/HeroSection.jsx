import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { colors } from "../../data/constants";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";

function HeroSection() {
    const contents = useSiteContents();
    const homeSettings = useHomepageSettings();

    // Available feeds for REC tag randomizer
    const feeds = homeSettings.hero?.recordings || [
        "CAM-01: KATHMANDU HQ",
        "CAM-02: BIRATNAGAR GRID",
        "CAM-03: POKHARA LOGISTICS",
        "CAM-04: LUMBINI HUB",
        "CAM-05: JANAKPUR PERIMETER",
    ];

    const [feedIndex, setFeedIndex] = useState(0);

    // Randomize recording feed tag every 3 minutes (180,000 ms)
    useEffect(() => {
        const interval = setInterval(() => {
            setFeedIndex((prev) => (prev + 1) % feeds.length);
        }, 180000);
        return () => clearInterval(interval);
    }, [feeds.length]);

    // Stable fixed heading text
    const stableHeading = homeSettings.hero?.heading || contents.heroTitle || "ADVANCED SURVEILLANCE & SECURITY SYSTEMS";

    return (
        <section
            className="relative w-full flex flex-col justify-center items-center min-h-[calc(100vh-70px)] lg:min-h-[85vh] pt-8 pb-14 sm:pt-12 sm:pb-16 md:py-16 lg:py-12 overflow-hidden"
            style={{
                borderBottom: `1px solid ${colors.outlineVariant}`,
                background: colors.background,
            }}
        >
            {/* RECORDING FRAME */}
            <div className="absolute inset-[10px] md:inset-[20px] pointer-events-none z-[5] overflow-hidden">
                {/* SCANLINE */}
                <div
                    className="absolute left-0 w-full h-[4px] z-[2]"
                    style={{
                        background: `linear-gradient(to right, transparent, ${colors.secondary}, transparent)`,
                        boxShadow: `0 0 12px ${colors.secondary}, 0 0 24px ${colors.secondary}`,
                        animation: "scanlineMove 3s linear infinite",
                    }}
                />

                {/* CORNERS */}
                {[
                    { className: "top-0 left-0 border-t-[3px] border-l-[3px]" },
                    { className: "top-0 right-0 border-t-[3px] border-r-[3px]" },
                    { className: "bottom-0 left-0 border-b-[3px] border-l-[3px]" },
                    { className: "bottom-0 right-0 border-b-[3px] border-r-[3px]" },
                ].map((corner, index) => (
                    <div
                        key={index}
                        className={`absolute w-[32px] h-[32px] sm:w-[45px] sm:h-[45px] md:w-[70px] md:h-[70px] ${corner.className}`}
                        style={{ borderColor: colors.secondary }}
                    />
                ))}

                {/* DYNAMIC RANDOMIZED REC TAG */}
                <div
                    className="absolute top-[10px] right-[10px] md:top-[16px] md:right-[16px] flex items-center gap-[8px] text-[10px] md:text-[12px] font-bold tracking-[2px] px-[10px] py-[6px] md:px-[14px] md:py-[8px] border backdrop-blur-[8px] transition-all duration-500"
                    style={{ background: 'var(--nv-surfCont)', borderColor: colors.outlineVariant, color: colors.onSurface }}
                >
                    <span
                        className="w-[8px] h-[8px] rounded-full bg-[#ff2d2d]"
                        style={{ animation: "recordingPulse 1s infinite" }}
                    />
                    REC — {feeds[feedIndex]}
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col lg:flex-row-reverse gap-5 sm:gap-8 md:gap-[80px] items-center justify-center relative z-10 py-2">
                
                {/* RIGHT VISUAL (BRAND AMBASSADOR) */}
                <div className="flex justify-center items-center relative w-full lg:w-1/2">
                    <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-none h-[280px] sm:h-[360px] md:h-[520px] lg:h-[640px] flex justify-center items-end">
                        {/* GREEN HALO GLOW */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 rounded-full bottom-[20px] sm:bottom-[40px] md:bottom-[80px] w-[240px] sm:w-[360px] md:w-[600px] h-[240px] sm:h-[360px] md:h-[600px] z-[1] blur-[50px] sm:blur-[60px]"
                            style={{
                                background: "radial-gradient(circle, rgba(148,218,50,0.50) 0%, rgba(148,218,50,0.16) 35%, rgba(148,218,50,0) 75%)",
                            }}
                        />

                        {/* BRAND AMBASSADOR IMAGE */}
                        <img
                            src={homeSettings.hero?.image_url || contents.heroImage || "/hero_pointing_cctv.png"}
                            alt="Hero"
                            className="relative z-[2] w-auto max-w-full h-full object-contain object-bottom"
                            style={{
                                filter: `drop-shadow(0 15px 40px rgba(0,0,0,0.45)) drop-shadow(0 0 30px rgba(148,218,50,0.30))`,
                            }}
                        />
                    </div>
                </div>

                {/* LEFT SIDE (TEXT CONTENT) */}
                <div className="flex flex-col gap-3 sm:gap-5 md:gap-[28px] text-center lg:text-left items-center lg:items-start w-full lg:w-1/2">
                    {/* STATUS BADGE */}
                    <div
                        className="inline-flex items-center gap-[8px] border px-[12px] py-[6px] md:px-[14px] md:py-[8px] w-fit text-[10px] md:text-[12px] font-bold tracking-[2px] backdrop-blur-[8px]"
                        style={{
                            background: 'var(--nv-surfCont)',
                            color: colors.secondary,
                            borderColor: colors.secondary,
                        }}
                    >
                        <span
                            className="w-[8px] h-[8px] rounded-full bg-[#ff2d2d]"
                            style={{ animation: "recordingPulse 1s infinite" }}
                        />
                        LIVE SURVEILLANCE ACTIVE
                    </div>

                    {/* STABLE H1 HEADING */}
                    <h1
                        className="font-bold text-[26px] sm:text-[34px] md:text-[clamp(52px,6vw,78px)] leading-[1.15] tracking-[-1px] md:tracking-[-3px]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", color: colors.onSurface }}
                    >
                        {(() => {
                            const parts = stableHeading.split(/(SURVEILLANCE)/i);
                            return parts.map((part, i) => {
                                if (part.toLowerCase() === "surveillance") {
                                    return (
                                        <span
                                            key={i}
                                            style={{
                                                color: colors.secondary,
                                                textShadow: `0 0 12px ${colors.secondary}`,
                                            }}
                                        >
                                            {part}
                                        </span>
                                    );
                                }
                                return part;
                            });
                        })()}
                    </h1>

                    {/* DESCRIPTION */}
                    <div
                        className="max-w-[600px] opacity-70 text-[13px] sm:text-[14px] md:text-[16px] leading-[1.7] hero-description-content"
                        style={{ color: colors.onSurfaceVariant }}
                        dangerouslySetInnerHTML={{
                            __html: homeSettings.hero?.subheading || contents.heroSubtitle || "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response."
                        }}
                    />

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 mt-3 sm:mt-5 md:mt-[48px] relative z-20">
                        <Link
                            to={homeSettings.hero?.button_url || "/product"}
                            className="hero-btn-1 flex justify-center items-center border-none font-extrabold tracking-[2px] uppercase no-underline text-center text-[13px] md:text-[15px] w-full sm:w-auto box-border transition-all duration-300 rounded-full"
                        >
                            {homeSettings.hero?.button_text || "VIEW OUR PRODUCTS"}
                        </Link>

                        <button
                            onClick={() => {
                                const el = document.getElementById("features");
                                if (el) {
                                    el.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className="hero-btn-2 flex justify-center items-center font-extrabold tracking-[2px] uppercase cursor-pointer text-[13px] md:text-[15px] w-full sm:w-auto box-border transition-all duration-300 rounded-full"
                        >
                            {contents.heroBtn2Text || "Features"}
                        </button>
                    </div>
                </div>
            </div>

            {/* ANIMATIONS */}
            <style>
                {`
          @keyframes scanlineMove {
            0% { top: 0%; opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { top: calc(100% - 4px); opacity: 0; }
          }
          @keyframes recordingPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(0.8); }
          }
          .hero-btn-1 {
            background: ${colors.secondary};
            color: #111;
            box-shadow: 0 4px 16px rgba(148,218,50,0.25);
            padding: 14px 28px;
          }
          @media (min-width: 768px) {
            .hero-btn-1, .hero-btn-2 {
              padding: 16px 32px !important;
            }
          }
          .hero-btn-1:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 32px rgba(148,218,50,0.6);
            background: #a3eb3f;
          }
          .hero-btn-2 {
            background: rgba(148,218,50,0.05);
            color: ${colors.secondary};
            border: 2px solid ${colors.secondary};
            backdrop-filter: blur(4px);
            padding: 14px 28px;
          }
          .hero-btn-2:hover {
            background: ${colors.secondary};
            color: #111;
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 32px rgba(148,218,50,0.5);
          }
        `}
            </style>
        </section>
    );
}

export default HeroSection;