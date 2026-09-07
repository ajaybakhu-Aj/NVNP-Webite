import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { colors } from "../../data/constants";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";

export default function FounderSection() {
  const contents = useSiteContents();
  const homeSettings = useHomepageSettings();

  const founderImg = homeSettings.founder?.image_url || contents.homeFounderImg || "/founder.jpg";
  const displayImg = (founderImg && !founderImg.includes("googleusercontent.com")) ? founderImg : "/founder.jpg";

  return (
    <section
      id="founder"
      className="homepage-safe-section bg-[var(--nv-surfLow,#0c0f07)] border-b border-[var(--nv-outlineVar,#434938)]/40 overflow-hidden flex justify-center items-center"
      style={{
        paddingTop: "clamp(45px, 5vw, 85px)",
        paddingBottom: "clamp(45px, 5vw, 85px)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center w-full box-border">
        {/* IMAGE SECTION */}
        <div className="relative w-full max-w-[480px] mx-auto lg:mx-0 rounded-xl overflow-hidden border border-[var(--nv-outlineVar,#434938)] shadow-xl shadow-[rgba(0,0,0,0.25)]">
          <img
            src={displayImg}
            alt={homeSettings.founder?.name || contents.homeFounderName || "Rozil Thapa"}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              filter: "grayscale(100%) brightness(0.85)",
              borderBottom: `6px solid ${colors.secondary}`,
              display: "block",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              background: colors.secondary,
              color: "black",
              padding: "12px 20px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(13px, 1.8vw, 16px)",
              lineHeight: 1.2,
              borderRadius: "4px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {homeSettings.founder?.name || contents.homeFounderName || "ROZIL THAPA"}
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--nv-secondary,#94da32)] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-[var(--nv-secondary,#94da32)]">
              {homeSettings.founder?.tag || contents.homeFounderTag || "// LEADERSHIP // FOUNDER'S DIRECTIVE"}
            </span>
          </div>

          <blockquote
            style={{
              fontFamily: "'Space Grotesk', sans-serif",

              fontSize: "clamp(28px, 5vw, 40px)",

              fontWeight: 700,

              lineHeight: 1.2,

              fontStyle: "italic",

              marginBottom: 24,

              position: "relative",

              wordBreak: "break-word",
              color: "var(--nv-onSurf)",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "-24px",
                left: "-8px",
                color: "rgba(148, 218, 50, 0.08)",
                fontSize: "clamp(56px, 8vw, 96px)",
                fontFamily: "Georgia, serif",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              “
            </span>

            {homeSettings.founder?.quote || contents.homeFounderQuote || "The vision behind NV// was never just about hardware. It was about reclaiming safety in a world that never sleeps."}
          </blockquote>

          <p
            style={{
              color: colors.onSurfaceVariant,

              fontSize: "clamp(16px, 2vw, 18px)",

              lineHeight: 1.6,

              marginBottom: 24,

              wordBreak: "break-word",
            }}
          >
            {homeSettings.founder?.description || contents.homeFounderDesc || "Founder Rozil Thapa started NightVision with a singular mission: to provide the people of Nepal with security technology that rivals the global elite, without compromise."}
          </p>

          <Link to={homeSettings.founder?.button_url || "/founder"} className="nv-btn-primary w-full sm:w-auto">
            {homeSettings.founder?.button_text || "READ THE FULL STORY →"}
          </Link>
        </div>
      </div>
    </section>
  );
}