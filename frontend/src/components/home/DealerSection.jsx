import React from "react";
import { Link } from "react-router-dom";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";

export default function DealerSection() {
  const contents = useSiteContents();
  const homeSettings = useHomepageSettings();

  return (
    <section
      id="dealer"
      className="homepage-safe-section bg-[var(--nv-bg,#11140c)] overflow-hidden flex justify-center items-center"
      style={{
        paddingTop: "clamp(30px, 3vw, 45px)",
        paddingBottom: "clamp(45px, 4.5vw, 75px)",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 w-full box-border">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#182012] via-[#10140b] to-[#0b0e08] border border-[var(--nv-secondary,#94da32)]/30 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 px-6 sm:px-14 md:px-20 text-center shadow-2xl shadow-[rgba(0,0,0,0.5)] flex flex-col items-center">
          {/* Ambient top spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[540px] h-[180px] bg-[var(--nv-secondary,#94da32)]/10 blur-[80px] pointer-events-none" />

          {/* TACTICAL EYEBROW - OFFSET DOWNSIDE FOR SAFE TOP CLEARANCE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--nv-secondary,#94da32)]/10 border border-[var(--nv-secondary,#94da32)]/30 mt-2 sm:mt-4 mb-6 relative z-10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--nv-secondary,#94da32)] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-[var(--nv-secondary,#94da32)]">
              {homeSettings.cta?.tag || "// NATIONWIDE SURVEILLANCE ECOSYSTEM"}
            </span>
          </div>

          {/* MAIN HEADING WITH SAFE MARGIN */}
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--nv-onSurf,#ffffff)] mb-5 uppercase leading-tight relative z-10 max-w-[780px]">
            {homeSettings.cta?.heading || contents.expandNetworkTitle || "EXPAND THE NETWORK"}
          </h2>

          {/* SUBTITLE WITH SAFE MARGIN */}
          <p className="text-xs sm:text-sm md:text-base text-[var(--nv-onSurfVar,#c3c9b3)] max-w-[640px] leading-relaxed mb-8 sm:mb-10 relative z-10 font-normal">
            {homeSettings.cta?.subheading || contents.expandNetworkSubtitle || contents.expandNetworkDesc || "Join Nepal's premier surveillance ecosystem. Partner with NightVision to distribute high-tier AI cameras, thermal systems, and perimeter hardware across all 7 provinces."}
          </p>

          {/* COMPACT ACTION BUTTONS FLOATING WITH SAFE CLEARANCE */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto relative z-10 mt-2">
            <Link
              to={homeSettings.cta?.button_url || "/dealers/apply"}
              className="nv-btn-primary nv-btn-compact min-w-[210px] text-center"
            >
              {homeSettings.cta?.button_text || contents.expandNetworkBtn || "BECOME A CERTIFIED DEALER →"}
            </Link>
            <Link
              to={homeSettings.cta?.button2_url || "/contact"}
              className="nv-btn-secondary nv-btn-compact min-w-[210px] text-center"
            >
              {homeSettings.cta?.button2_text || "CONTACT PARTNER TEAM"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}