import React, { useState, useEffect } from "react";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";
import { useSiteContents } from "../../utils/cmsDb";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const contents = useSiteContents();
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultItems = [
    {
      text: "NightVision's 4K AI surveillance system has revolutionized security across our commercial facilities in Biratnagar. Zero downtime, crystal-clear night vision.",
      author: "Pawan Shrestha — Managing Director, Nano Tek",
      role: "Enterprise Partner"
    },
    {
      text: "The encrypted telemetry and instant threat detection response give our retail chain complete peace of mind. Exceptional build quality and local Nepal support.",
      author: "Sanjay Dhanusha — Systems Integrator, White Pearl",
      role: "Madhesh Logistics Lead"
    },
    {
      text: "Deployment was seamless across our Lumbini warehouse locations. NightVision cameras withstand extreme weather while delivering live 60fps streaming.",
      author: "Siddharth Lumbini — Operations Head, SR Suppliers",
      role: "Logistics Partner"
    }
  ];

  const items = contents.testimonials && contents.testimonials.length > 0 ? contents.testimonials : defaultItems;

  // Auto-slide carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--nv-bg,#11140c)] border-t border-b border-[#434938] w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 w-full box-border">
        {/* HEADER */}
        <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold tracking-wider text-center text-[var(--nv-onSurf,#e2e4d5)] uppercase mb-10">
          {contents.testimonialsTitle || "TRUSTED BY LEADERS"}
        </h2>

        {/* CAROUSEL CONTAINER */}
        <div className="relative max-w-[900px] mx-auto bg-[#1e2117] border border-[#94da32] p-6 sm:p-10 rounded-lg shadow-xl shadow-[rgba(148,218,50,0.1)] transition-all">
          {/* STAR RATING */}
          <div className="flex justify-center gap-1.5 color-[#94da32] mb-6">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="star" size={22} fill style={{ color: colors.secondary }} />
            ))}
          </div>

          {/* TESTIMONIAL CONTENT */}
          <div className="min-h-[140px] flex flex-col justify-center text-center">
            <p className="text-sm sm:text-base md:text-lg italic leading-relaxed text-[#e2e4d5] mb-6 font-['Poppins']">
              "{items[currentIndex]?.text}"
            </p>
            <div className="font-['Space_Grotesk'] font-bold text-xs sm:text-sm tracking-wider uppercase text-[#94da32]">
              {items[currentIndex]?.author}
            </div>
            {items[currentIndex]?.role && (
              <div className="text-[11px] text-[#c3c9b3] tracking-widest uppercase mt-1">
                {items[currentIndex]?.role}
              </div>
            )}
          </div>

          {/* CAROUSEL CONTROLS */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#434938]">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-[#434938] bg-[#181a15] text-[#94da32] hover:bg-[#94da32] hover:text-[#111] transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* DOT INDICATORS */}
            <div className="flex gap-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? "bg-[#94da32] w-6" : "bg-[#434938] hover:bg-[#8d937f]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-[#434938] bg-[#181a15] text-[#94da32] hover:bg-[#94da32] hover:text-[#111] transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}