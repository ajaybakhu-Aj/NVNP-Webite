import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../../data/constants";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";

function HeroSection() {
    const contents = useSiteContents();
    const homeSettings = useHomepageSettings();

    return (
        <section
            className="relative w-full flex flex-col justify-center items-center py-10 sm:py-14 md:py-16 lg:py-20 lg:min-h-[85vh] overflow-hidden"
            style={{
                borderBottom: `1px solid ${colors.outlineVariant}`,
                background: colors.background,
            }}
        >
            {/* RECORDING FRAME */}
            <div className="absolute inset-[10px] md:inset-[20px] pointer-events-none z-[5] overflow-hidden">
                {/* SCANLINE */}
                <div
                    className="absolute top-0 left-0 w-full h-[4px] z-[2]"
                    style={{
                        background: `linear-gradient(to right, transparent, ${colors.secondary}, transparent)`,
                        boxShadow: `0 0 12px ${colors.secondary}, 0 0 24px ${colors.secondary}`,
                        animation: "scanlineMove 2.8s linear infinite",
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
                        className={`absolute w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] ${corner.className}`}
                        style={{ borderColor: colors.secondary }}
                    />
                ))}

                {/* REC */}
                <div
                    className="absolute top-[10px] right-[10px] sm:top-[14px] sm:right-[14px] md:top-[16px] md:right-[16px] flex items-center gap-[6px] sm:gap-[8px] text-[10px] sm:text-[11px] md:text-[12px] font-bold tracking-[2px] px-[8px] py-[4px] sm:px-[12px] sm:py-[6px] md:px-[14px] md:py-[8px] border backdrop-blur-[8px] rounded-sm"
                    style={{ background: 'var(--nv-surfCont)', borderColor: colors.outlineVariant, color: colors.onSurface }}
                >
                    <span
                        className="w-[7px] h-[7px] sm:w-[8px] sm:h-[8px] rounded-full bg-[#ff2d2d]"
                        style={{ animation: "recordingPulse 1s infinite" }}
                    />
                    REC
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col lg:flex-row-reverse gap-8 sm:gap-10 md:gap-14 lg:gap-16 items-center relative z-10">
                
                {/* VISUAL IMAGE (FIRST IN DOM FOR MOBILE TOP) */}
                <div className="flex justify-center items-center relative w-full lg:w-1/2">
                    <div className="relative w-full h-[240px] sm:h-[340px] md:h-[460px] lg:h-[600px] flex justify-center items-end overflow-hidden">
                        {/* GREEN HALO GLOW */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 rounded-full bottom-[20px] sm:bottom-[40px] md:bottom-[60px] w-[220px] sm:w-[380px] md:w-[500px] h-[220px] sm:h-[380px] md:h-[500px] z-[1] blur-[50px] sm:blur-[60px]"
                            style={{
                                background: "radial-gradient(circle, rgba(148,218,50,0.50) 0%, rgba(148,218,50,0.16) 35%, rgba(148,218,50,0) 75%)",
                            }}
                        />

                        {/* BRAND AMBASSADOR IMAGE */}
                        <img
                            src={homeSettings.hero?.image_url || contents.heroImage || "/hero_pointing_cctv.png"}
                            alt="Hero"
                            className="relative z-[2] w-auto max-w-full object-contain object-bottom max-h-[230px] sm:max-h-[330px] md:max-h-[450px] lg:max-h-[660px]"
                            style={{
                                filter: `drop-shadow(0 15px 40px rgba(0,0,0,0.45)) drop-shadow(0 0 30px rgba(148,218,50,0.30))`,
                            }}
                        />
                    </div>
                </div>

                {/* TEXT CONTENT (SECOND IN DOM FOR MOBILE BOTTOM) */}
                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 text-center lg:text-left items-center lg:items-start w-full lg:w-1/2">
                    
                    {/* STATUS BADGE */}
                    <div
                        className="inline-flex items-center gap-[8px] border px-[10px] py-[5px] sm:px-[12px] sm:py-[6px] md:px-[14px] md:py-[8px] w-fit text-[10px] sm:text-[11px] md:text-[12px] font-bold tracking-[2px] backdrop-blur-[8px] rounded-sm"
                        style={{
                            background: 'var(--nv-surfCont)',
                            color: colors.secondary,
                            borderColor: colors.secondary,
                        }}
                    >
                        <span
                            className="w-[7px] h-[7px] sm:w-[8px] sm:h-[8px] rounded-full bg-[#ff2d2d]"
                            style={{ animation: "recordingPulse 1s infinite" }}
                        />
                        LIVE SURVEILLANCE ACTIVE
                    </div>

                    {/* TITLE */}
                    <h1
                        className="font-bold text-[clamp(26px,6.5vw,40px)] sm:text-[38px] md:text-[clamp(48px,5.5vw,72px)] leading-[1.1] tracking-[-1px] md:tracking-[-2px]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", color: colors.onSurface }}
                    >
                        {(() => {
                            const title = homeSettings.hero?.heading || contents.heroTitle || "ADVANCED SURVEILLANCE FOR PEACE OF MIND";
                            const parts = title.split(/(SURVEILLANCE)/i);
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
                        className="max-w-[600px] opacity-80 text-[13px] sm:text-[15px] md:text-[16px] leading-[1.7] hero-description-content"
                        style={{ color: colors.onSurfaceVariant }}
                        dangerouslySetInnerHTML={{
                            __html: homeSettings.hero?.subheading || contents.heroSubtitle || "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response."
                        }}
                    />

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 relative z-20">
                        <Link
                            to={homeSettings.hero?.button_url || "/product"}
                            className="hero-btn-1 flex justify-center items-center border-none font-extrabold tracking-[2px] uppercase no-underline text-center text-[12px] sm:text-[13px] md:text-[15px] w-full sm:w-auto box-border transition-all duration-300 rounded-full py-3.5 px-7 md:py-4 md:px-8"
                        >
                            {homeSettings.hero?.button_text || ((!contents.heroBtnText || contents.heroBtnText.toLowerCase().includes("cctv")) ? "VIEW OUR PRODUCTS" : contents.heroBtnText)}
                        </Link>

                        <button
                            onClick={() => {
                                const el = document.getElementById("features");
                                if (el) {
                                    el.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className="hero-btn-2 flex justify-center items-center font-extrabold tracking-[2px] uppercase cursor-pointer text-[12px] sm:text-[13px] md:text-[15px] w-full sm:w-auto box-border transition-all duration-300 rounded-full py-3.5 px-7 md:py-4 md:px-8"
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
            0% { transform: translateY(0); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateY(calc(100% - 4px)); opacity: 0; }
          }
          @keyframes recordingPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(0.8); }
          }
          .hero-btn-1 {
            background: ${colors.secondary};
            color: #111;
            box-shadow: 0 4px 16px rgba(148,218,50,0.2);
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