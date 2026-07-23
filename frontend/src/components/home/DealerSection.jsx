import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../../data/constants";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";

export default function DealerSection() {
  const contents = useSiteContents();
  const homeSettings = useHomepageSettings();

  return (
    <section
      className="relative w-full py-16 md:py-24 overflow-hidden border-t border-b border-[#434938]"
      style={{
        background: colors.secondary || "#94da32",
      }}
    >
      {/* HIGH VISIBILITY BACKGROUND WATERMARK TEXT */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        style={{ opacity: 0.28 }}
      >
        <span
          className="font-['Space_Grotesk'] font-extrabold text-[clamp(90px,25vw,340px)] tracking-tighter uppercase whitespace-nowrap leading-none"
          style={{
            color: "#000000",
            WebkitTextStroke: "2px rgba(0,0,0,0.5)",
          }}
        >
          {contents.expandNetworkBgText || "DEALER"}
        </span>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center w-full box-border">
        <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] mb-4 leading-tight uppercase">
          {contents.expandNetworkTitle || "EXPAND THE NETWORK"}
        </h2>

        <p className="max-w-[640px] mx-auto text-sm sm:text-base md:text-lg font-medium text-[#1a2300] mb-8 leading-relaxed">
          {contents.expandNetworkSubtitle || "Join Nepal's premier surveillance ecosystem. Partner with NightVision to distribute high-tier AI cameras, thermal systems, and perimeter hardware across all 7 provinces."}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/dealership"
            className="w-full sm:w-auto px-8 py-4 bg-[#111111] text-[#94da32] font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full no-underline hover:bg-[#233600] hover:text-[#ffffff] transition-all shadow-lg shadow-[rgba(0,0,0,0.3)] text-center"
          >
            BECOME A CERTIFIED DEALER
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#111111] text-[#111111] font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full no-underline hover:bg-[#111111] hover:text-[#94da32] transition-all text-center"
          >
            CONTACT PARTNER TEAM
          </Link>
        </div>
      </div>
    </section>
  );
}