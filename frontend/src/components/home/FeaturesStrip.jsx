import React from "react";
import Icon from "../../utils/Icon";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";

export default function FeaturesStrip() {
  const contents = useSiteContents();
  const homeSettings = useHomepageSettings();

  const defaultFeats = [
    {
      title: "Super Easy Setup",
      desc: "Zero-config deployment. Plug-and-play Wi-Fi hardware that synchronizes automatically in seconds without invasive conduit wiring.",
      icon: "power",
    },
    {
      title: "Advanced AI Optics",
      desc: "Integrated Neural Processing Units running on-device classification for human, vehicle, and perimeter anomaly tracking.",
      icon: "visibility",
    },
    {
      title: "Himalayan Durability",
      desc: "IP67 weatherized metal enclosures certified to operate in extreme -20°C frost to +55°C monsoon humidity environments.",
      icon: "shield",
    },
    {
      title: "Encrypted Security",
      desc: "Hardware-level AES-256 stream isolation with authenticated private mode to ensure video stream integrity.",
      icon: "lock",
    },
  ];

  const rawFeats = homeSettings.features?.items || contents.features || [];
  const feats = rawFeats.length >= 4 ? rawFeats : defaultFeats;

  return (
    <section
      id="features"
      className="homepage-safe-section bg-[var(--nv-bg,#131313)] border-b border-[var(--nv-outlineVar,#434938)]/40 overflow-hidden flex justify-center items-center"
      style={{
        paddingTop: "clamp(45px, 5vw, 85px)",
        paddingBottom: "clamp(45px, 5vw, 85px)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 w-full box-border">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--nv-surfCont,#181a15)] border border-[var(--nv-secondary,#94da32)]/30 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--nv-secondary,#94da32)] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-[var(--nv-secondary,#94da32)]">
              // SYSTEM CAPABILITIES // HARDWARE STANDARDS
            </span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--nv-onSurf,#ffffff)] uppercase max-w-[800px] leading-tight">
            {homeSettings.features?.heading || contents.featuresTitle || "ENGINEERED FOR SUPREMACY"}
          </h2>

          <p className="text-sm sm:text-base text-[var(--nv-onSurfVar,#c3c9b3)] max-w-[680px] leading-relaxed mt-3">
            {homeSettings.features?.subheading || contents.featuresSubtitle || "Advanced and reliable security solutions engineered for the dynamic challenges of Nepal's physical and digital infrastructure."}
          </p>
        </div>

        {/* 2x2 SPACIOUS BENTO GRID - BIGGER BOXES WITH AMPLE BREATHING ROOM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
          {feats.slice(0, 4).map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--nv-surfCont,#181a15)]/80 border border-[var(--nv-outlineVar,#434938)]/50 hover:border-[var(--nv-secondary,#94da32)]/60 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[rgba(148,218,50,0.09)] hover:-translate-y-1 group relative overflow-hidden min-h-[240px]"
              style={{
                paddingTop: "clamp(32px, 3.5vw, 44px)",
                paddingBottom: "clamp(32px, 3.5vw, 44px)",
                paddingLeft: "clamp(32px, 4vw, 52px)",
                paddingRight: "clamp(32px, 4vw, 52px)",
              }}
            >
              {/* Subtle ambient card glow overlay */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[var(--nv-secondary,#94da32)]/5 rounded-bl-full pointer-events-none group-hover:bg-[var(--nv-secondary,#94da32)]/10 transition-all duration-500" />

              <div>
                {/* Card Top Row: Sequence Tag & Glowing Icon Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs sm:text-sm font-mono font-bold text-[var(--nv-secondary,#94da32)] tracking-widest">
                    0{idx + 1} // CAPABILITY
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[var(--nv-secondary,#94da32)]/10 text-[var(--nv-secondary,#94da32)] flex items-center justify-center group-hover:bg-[var(--nv-secondary,#94da32)] group-hover:text-black transition-all duration-300 shadow-sm">
                    <Icon name={item.icon || "shield"} size={24} />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[var(--nv-onSurf,#ffffff)] tracking-tight group-hover:text-[var(--nv-secondary,#94da32)] transition-colors mb-3">
                  {item.title}
                </h3>

                {/* Card Description with generous line-height & breathing room */}
                <p className="text-sm sm:text-base text-[var(--nv-onSurfVar,#c3c9b3)] leading-relaxed max-w-[540px]">
                  {item.desc}
                </p>
              </div>

              {/* Card Bottom Meta Bar */}
              <div className="mt-8 pt-5 border-t border-[var(--nv-outlineVar,#434938)]/30 flex items-center justify-between text-xs font-mono text-[var(--nv-onSurfVar,#c3c9b3)] opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="tracking-wider">SYSTEM SPEC VERIFIED</span>
                <span className="text-[var(--nv-secondary,#94da32)] font-bold">● ONLINE READY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}