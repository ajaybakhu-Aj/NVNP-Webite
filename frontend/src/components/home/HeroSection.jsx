import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";

function HeroSection() {
    const contents = useSiteContents();
    const homeSettings = useHomepageSettings();

    return (
        <section
            className="relative w-full flex flex-col justify-center items-center py-16 md:py-0 min-h-[600px] md:min-h-[75vh]"
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
                        className={`absolute w-[40px] h-[40px] md:w-[70px] md:h-[70px] ${corner.className}`}
                        style={{ borderColor: colors.secondary }}
                    />
                ))}

                {/* REC */}
                <div
                    className="absolute top-[10px] right-[10px] md:top-[16px] md:right-[16px] flex items-center gap-[8px] text-[10px] md:text-[12px] font-bold tracking-[2px] px-[10px] py-[6px] md:px-[14px] md:py-[8px] border backdrop-blur-[8px]"
                    style={{ background: 'var(--nv-surfCont)', borderColor: colors.outlineVariant, color: colors.onSurface }}
                >
                    <span
                        className="w-[8px] h-[8px] rounded-full bg-[#ff2d2d]"
                        style={{ animation: "recordingPulse 1s infinite" }}
                    />
                    REC
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-[1280px] mx-auto px-[20px] md:px-[24px] w-full flex flex-col lg:flex-row gap-[50px] md:gap-[80px] items-center relative z-10">
                {/* LEFT SIDE */}
                <div className="flex flex-col gap-[20px] md:gap-[28px] order-2 lg:order-1 text-center lg:text-left items-center lg:items-start w-full lg:w-1/2">
                    {/* STATUS */}
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

                    {/* TITLE */}
                    <h1
                        className="font-bold text-[34px] min-[480px]:text-[44px] md:text-[clamp(52px,6vw,78px)] leading-[1] tracking-[-1px] md:tracking-[-3px]"
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
                        className="max-w-[600px] opacity-70 text-[14px] md:text-[16px] leading-[1.8] hero-description-content"
                        style={{ color: colors.onSurfaceVariant }}
                        dangerouslySetInnerHTML={{
                            __html: homeSettings.hero?.subheading || contents.heroSubtitle || "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response."
                        }}
                    />

                    {/* BUTTONS */}
                    <div className="flex flex-col min-[480px]:flex-row w-full min-[480px]:w-auto gap-[20px] mt-[40px] md:mt-[48px] relative z-20">
                        <Link
                            to={homeSettings.hero?.button_url || "/product"}
                            className="hero-btn-1 flex justify-center items-center border-none font-extrabold tracking-[2px] uppercase no-underline text-center text-[13px] md:text-[15px] w-full min-[480px]:w-auto box-border transition-all duration-300 rounded-full"
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
                            className="hero-btn-2 flex justify-center items-center font-extrabold tracking-[2px] uppercase cursor-pointer text-[13px] md:text-[15px] w-full min-[480px]:w-auto box-border transition-all duration-300 rounded-full"
                        >
                            {contents.heroBtn2Text || "Features"}
                        </button>
                    </div>
                </div>

                {/* RIGHT VISUAL */}
                <div className="flex justify-center items-center relative order-1 lg:order-2 w-full lg:w-1/2">
                    <div className="relative w-full h-[360px] min-[480px]:h-[440px] md:h-[560px] lg:h-[680px] flex justify-center items-end overflow-hidden">
                        {/* GREEN HALO GLOW */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 rounded-full bottom-[40px] md:bottom-[80px] w-[280px] md:w-[600px] h-[280px] md:h-[600px] z-[1] blur-[60px]"
                            style={{
                                background: "radial-gradient(circle, rgba(148,218,50,0.50) 0%, rgba(148,218,50,0.16) 35%, rgba(148,218,50,0) 75%)",
                            }}
                        />

                        {/* BRAND AMBASSADOR IMAGE */}
                        <img
                            src={homeSettings.hero?.image_url || contents.heroImage || "/hero_pointing_cctv.png"}
                            alt="Hero"
                            className="relative z-[2] w-auto max-w-full object-contain object-bottom translate-y-[10px] md:translate-y-[20px] max-h-[320px] min-[480px]:max-h-[420px] md:max-h-[550px] lg:max-h-[760px]"
                            style={{
                                filter: `drop-shadow(0 15px 40px rgba(0,0,0,0.45)) drop-shadow(0 0 30px rgba(148,218,50,0.30))`,
                            }}
                        />

                        {/* TRUSTED LEADERSHIP CARD */}
                        <div
                            className="absolute z-[15] text-left flex flex-col items-start py-[12px] px-[16px] backdrop-blur-[12px] border border-l-[3px] top-[20px] md:top-[60px] right-[10px] md:right-[20px]"
                            style={{ background: 'var(--nv-surfCont)', borderLeftColor: colors.secondary, borderColor: colors.outlineVariant }}
                        >
                        </div>
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
            100% { transform: translateY(calc(100vh - 40px)); opacity: 0; }
          }
          @keyframes recordingPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(0.8); }
          }
          .hero-btn-1 {
            background: ${colors.secondary};
            color: #111;
            box-shadow: 0 4px 16px rgba(148,218,50,0.2);
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