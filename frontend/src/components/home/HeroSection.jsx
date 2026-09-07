import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { colors } from "../../data/constants";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";

function renderHighlightedHeading(heading) {
  const parts = heading.split(/(SURVEILLANCE)/i);
  return parts.map((part, i) =>
    part.toLowerCase() === "surveillance" ? (
      <span
        key={i}
        style={{
          color: colors.secondary,
          textShadow: `0 0 12px ${colors.secondary}`,
        }}
      >
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function HeroSection() {
  const contents = useSiteContents();
  const homeSettings = useHomepageSettings();

  const feeds = homeSettings.hero?.recordings || [
    "CAM-01: KATHMANDU HQ",
    "CAM-02: BIRATNAGAR GRID",
    "CAM-03: POKHARA LOGISTICS",
    "CAM-04: LUMBINI HUB",
    "CAM-05: JANAKPUR PERIMETER",
  ];

  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedIndex((prev) => (prev + 1) % feeds.length);
    }, 180000);
    return () => clearInterval(interval);
  }, [feeds.length]);

  const stableHeading =
    homeSettings.hero?.heading || contents.heroTitle || "ADVANCED SURVEILLANCE & SECURITY SYSTEMS";

  return (
    <section
      className="relative w-full flex flex-col justify-start md:justify-center items-center min-h-0 md:min-h-[calc(100vh-70px)] lg:min-h-[90vh] pt-0.5 pb-2 sm:py-10 md:py-24 overflow-hidden border-b border-[var(--nv-outlineVar,#434938)]/40"
      style={{ background: colors.background }}
    >
      {/* RECORDING FRAME */}
      <div className="absolute inset-[4px] sm:inset-[12px] md:inset-[20px] pointer-events-none z-[5] overflow-visible">
        {/* SCANLINE */}
        <div
          className="absolute left-0 w-full h-[3px] sm:h-[4px] z-[2]"
          style={{
            background: `linear-gradient(to right, transparent, ${colors.secondary}, transparent)`,
            boxShadow: `0 0 12px ${colors.secondary}, 0 0 24px ${colors.secondary}`,
            animation: "scanlineMove 3s linear infinite",
          }}
        />

        {/* CORNERS */}
        {[
          "top-0 left-0 border-t-2 border-l-2 sm:border-t-[3px] sm:border-l-[3px]",
          "top-0 right-0 border-t-2 border-r-2 sm:border-t-[3px] sm:border-r-[3px]",
          "bottom-0 left-0 border-b-2 border-l-2 sm:border-b-[3px] sm:border-l-[3px]",
          "bottom-0 right-0 border-b-2 border-r-2 sm:border-b-[3px] sm:border-r-[3px]",
        ].map((cls, idx) => (
          <div
            key={idx}
            className={`absolute w-[12px] h-[12px] sm:w-[32px] sm:h-[32px] md:w-[60px] md:h-[60px] ${cls}`}
            style={{ borderColor: colors.secondary }}
          />
        ))}

        {/* DYNAMIC REC TAG */}
        <div
          className="absolute top-[4px] right-[4px] sm:top-[10px] sm:right-[10px] md:top-[16px] md:right-[16px] flex items-center gap-[3px] sm:gap-[8px] text-[7px] min-[375px]:text-[8px] sm:text-[10px] md:text-[12px] font-bold tracking-[0.5px] sm:tracking-[2px] px-[4px] py-[1.5px] sm:px-[10px] sm:py-[5px] md:px-[14px] md:py-[8px] border backdrop-blur-[8px] transition-all duration-500 rounded-sm z-20"
          style={{
            background: "var(--nv-surfCont)",
            borderColor: colors.outlineVariant,
            color: colors.onSurface,
          }}
        >
          <span
            className="w-[3.5px] h-[3.5px] sm:w-[6px] sm:h-[6px] rounded-full bg-[#ff2d2d]"
            style={{ animation: "recordingPulse 1s infinite" }}
          />
          REC — {feeds[feedIndex]}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1280px] mx-auto px-2 sm:px-6 md:px-8 w-full flex flex-col lg:flex-row-reverse gap-0.5 sm:gap-5 md:gap-[60px] items-center justify-center relative z-10 pt-0 sm:pt-3">
        {/* BRAND AMBASSADOR */}
        <div className="flex justify-center items-center relative w-full lg:w-1/2">
          <div className="relative w-full max-w-[75px] min-[375px]:max-w-[85px] sm:max-w-[260px] md:max-w-none h-[58px] min-[375px]:h-[68px] sm:h-[200px] md:h-[380px] lg:h-[580px] flex justify-center items-end">
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-full bottom-[2px] sm:bottom-[20px] md:bottom-[60px] w-[55px] sm:w-[240px] md:w-[480px] h-[55px] sm:h-[240px] md:h-[480px] z-[1] blur-[12px] sm:blur-[50px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(148,218,50,0.45) 0%, rgba(148,218,50,0.14) 35%, rgba(148,218,50,0) 75%)",
              }}
            />
            <img
              src={homeSettings.hero?.image_url || contents.heroImage || "/hero_pointing_cctv.png"}
              alt="Hero"
              className="relative z-[2] w-auto max-w-full h-full object-contain object-bottom"
              style={{
                filter:
                  "drop-shadow(0 6px 18px rgba(0,0,0,0.45)) drop-shadow(0 0 16px rgba(148,218,50,0.25))",
              }}
            />
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="flex flex-col gap-0.5 sm:gap-3 md:gap-[24px] text-center lg:text-left items-center lg:items-start w-full lg:w-1/2">
          {/* STATUS BADGE */}
          <div
            className="inline-flex items-center gap-[2.5px] sm:gap-[6px] border px-[4px] py-[0.5px] sm:px-[12px] sm:py-[5px] md:px-[14px] md:py-[8px] w-fit text-[6px] min-[375px]:text-[7px] sm:text-[10px] md:text-[12px] font-bold tracking-[0.5px] sm:tracking-[1.5px] backdrop-blur-[8px]"
            style={{
              background: "var(--nv-surfCont)",
              color: colors.secondary,
              borderColor: colors.secondary,
            }}
          >
            <span
              className="w-[2.5px] h-[2.5px] sm:w-[6px] sm:h-[6px] rounded-full bg-[#ff2d2d]"
              style={{ animation: "recordingPulse 1s infinite" }}
            />
            LIVE SURVEILLANCE ACTIVE
          </div>

          {/* H1 HEADING */}
          <h1
            className="font-bold text-[13px] min-[375px]:text-[14px] sm:text-[26px] md:text-[40px] lg:text-[clamp(42px,4vw,66px)] leading-[1.1] tracking-[-0.5px] sm:tracking-[-1px]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: colors.onSurface }}
          >
            {renderHighlightedHeading(stableHeading)}
          </h1>

          {/* DESCRIPTION */}
          <div
            className="max-w-[320px] min-[375px]:max-w-[370px] sm:max-w-[480px] opacity-75 text-[8px] min-[375px]:text-[8.5px] sm:text-[13px] md:text-[15px] leading-[1.2] sm:leading-[1.6] px-1 sm:px-0 hero-description-content line-clamp-2 sm:line-clamp-none"
            style={{ color: colors.onSurfaceVariant }}
            dangerouslySetInnerHTML={{
              __html:
                homeSettings.hero?.subheading ||
                contents.heroSubtitle ||
                "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response.",
            }}
          />

          {/* BUTTONS */}
          <div className="flex flex-row flex-nowrap items-center justify-center lg:justify-start gap-1.5 min-[375px]:gap-2 sm:gap-3.5 mt-0.5 sm:mt-3 md:mt-[32px] relative z-20">
            <Link
              to={homeSettings.hero?.button_url || "/products"}
              className="nv-btn-primary nv-btn-compact text-[8px] min-[375px]:text-[9px] sm:text-xs px-2 min-[375px]:px-3 py-1 min-[375px]:py-1 sm:px-6 sm:py-2.5 text-center whitespace-nowrap"
            >
              {homeSettings.hero?.button_text || "VIEW OUR PRODUCTS"} →
            </Link>

            <button
              onClick={() => {
                const el = document.getElementById("features");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="nv-btn-secondary nv-btn-compact text-[8px] min-[375px]:text-[9px] sm:text-xs px-2 min-[375px]:px-3 py-1 min-[375px]:py-1 sm:px-6 sm:py-2.5 text-center whitespace-nowrap"
            >
              {contents.heroBtn2Text || "FEATURES"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}