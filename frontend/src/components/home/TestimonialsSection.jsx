import React, { useState, useEffect } from "react";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const contents = useSiteContents();
  const homeSettings = useHomepageSettings();
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultItems = [
    {
      text: "The mobile app integration is flawless. I can monitor my store from anywhere in the world with zero lag. Outstanding build quality and rock-solid reliability.",
      author: "A. Shrestha",
      role: "Retail Group"
    },
    {
      text: "NightVision's 4K AI surveillance system has revolutionized security across our commercial facilities in Biratnagar. Zero downtime, crystal-clear night vision.",
      author: "Pawan Shrestha",
      role: "Enterprise Partner, Nano Tek"
    },
    {
      text: "Deployment was seamless across our Lumbini warehouse locations. NightVision cameras withstand extreme weather while delivering live 60fps streaming.",
      author: "Siddharth Lumbini",
      role: "Logistics Partner"
    }
  ];

  const items = (homeSettings.testimonials?.items && homeSettings.testimonials.items.length > 0)
    ? homeSettings.testimonials.items
    : (contents.testimonials && contents.testimonials.length > 0 ? contents.testimonials : defaultItems);

  // Auto-slide carousel every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <section
      id="testimonials"
      className="homepage-safe-section bg-[var(--nv-bg,#11140c)] overflow-hidden flex justify-center items-center"
      style={{
        paddingTop: "clamp(45px, 4.5vw, 75px)",
        paddingBottom: "clamp(30px, 3vw, 45px)",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 w-full box-border flex flex-col items-center justify-center">
        {/* HEADER BLOCK WITH SAFE MARGIN */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--nv-surfCont,#181a15)] border border-[var(--nv-secondary,#94da32)]/30 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--nv-secondary,#94da32)] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-[var(--nv-secondary,#94da32)]">
              {homeSettings.testimonials?.tag || "// OPERATIONAL TRUST // VERIFIED CLIENTS"}
            </span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-center text-[var(--nv-onSurf,#ffffff)] uppercase">
            {homeSettings.testimonials?.heading || contents.testimonialsTitle || "TRUSTED BY LEADERS"}
          </h2>
        </div>

        {/* CAROUSEL CARD - MATCHED WIDTH & SPACIOUS SAFE MARGINS */}
        <div
          className="w-full relative bg-gradient-to-b from-[#182012] via-[#11150c] to-[#0c0f08] border border-[var(--nv-outlineVar,#434938)]/60 py-14 sm:py-18 md:py-22 px-6 sm:px-14 md:px-20 rounded-3xl shadow-2xl shadow-[rgba(0,0,0,0.5)] transition-all box-border flex flex-col items-center text-center overflow-hidden"
        >
          {/* Ambient subtle spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[540px] h-[180px] bg-[var(--nv-secondary,#94da32)]/10 blur-[80px] pointer-events-none" />

          {/* STAR RATING */}
          <div className="flex justify-center items-center gap-2 mb-8 relative z-10">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="star" size={20} fill style={{ color: colors.secondary || "#94da32" }} />
            ))}
          </div>

          {/* TESTIMONIAL QUOTE */}
          <div className="min-h-[100px] flex flex-col justify-center items-center text-center max-w-[820px] relative z-10 px-2 sm:px-4">
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[var(--nv-onSurf,#e2e4d5)] mb-7 font-['Poppins']">
              “{(items[currentIndex]?.text || "").replace(/^["'“”\s]+|["'“”\s]+$/g, "")}”
            </p>
            
            {/* AUTHOR INFO */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="font-['Space_Grotesk'] font-bold text-xs sm:text-sm tracking-widest uppercase text-[var(--nv-secondary,#94da32)]">
                — {items[currentIndex]?.author}{items[currentIndex]?.role ? `, ${items[currentIndex]?.role.toUpperCase()}` : ""}
              </span>
            </div>
          </div>

          {/* CENTERED HARMONIOUS CONTROLS WITH SAFE TOP MARGIN */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-14 relative z-10">
            <button
              onClick={handlePrev}
              className="nv-btn-icon shrink-0"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* DOT INDICATORS IN A PILL CLUSTER */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.04] border border-[var(--nv-outlineVar,#434938)]/40">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? "bg-[var(--nv-secondary,#94da32)] w-6 shadow-sm shadow-[rgba(148,218,50,0.4)]"
                      : "w-2 bg-[var(--nv-outlineVar,#434938)] hover:bg-[var(--nv-outline,#8d937f)]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="nv-btn-icon shrink-0"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}