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
      text: "The mobile app integration is flawless. I can monitor my store from anywhere in the world with zero lag.",
      author: "A. SHRESTHA — RETAIL GROUP",
      role: "Enterprise Partner"
    },
    {
      text: "NightVision's 4K AI surveillance system has revolutionized security across our commercial facilities in Biratnagar. Zero downtime, crystal-clear night vision.",
      author: "PAWAN SHRESTHA — MANAGING DIRECTOR, NANO TEK",
      role: "Enterprise Partner"
    },
    {
      text: "The encrypted telemetry and instant threat detection response give our retail chain complete peace of mind. Exceptional build quality and local Nepal support.",
      author: "SANJAY DHANUSHA — SYSTEMS INTEGRATOR, WHITE PEARL",
      role: "Madhesh Logistics Lead"
    },
    {
      text: "Deployment was seamless across our Lumbini warehouse locations. NightVision cameras withstand extreme weather while delivering live 60fps streaming.",
      author: "SIDDHARTH LUMBINI — OPERATIONS HEAD, SR SUPPLIERS",
      role: "Logistics Partner"
    }
  ];

  const items = contents.testimonials && contents.testimonials.length > 0 ? contents.testimonials : defaultItems;

  // Clean quote text to avoid duplicate quotes
  const currentQuote = (items[currentIndex]?.text || "")
    .replace(/^["'\s]+|["'\s]+$/g, "");

  // Auto-slide carousel every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5500);
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
      style={{
        padding: "80px 0",
        background: "#0a0c08",
        borderTop: "1px solid rgba(148, 218, 50, 0.15)",
        borderBottom: "1px solid rgba(148, 218, 50, 0.15)",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          .testimonial-card-glass {
            background: rgba(18, 20, 15, 0.85);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(148, 218, 50, 0.35);
            border-radius: 20px;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(148, 218, 50, 0.12);
            transition: all 0.35s ease;
          }
          .testimonial-card-glass:hover {
            border-color: rgba(148, 218, 50, 0.65);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(148, 218, 50, 0.2);
          }
          .t-nav-btn {
            background: rgba(26, 29, 22, 0.9);
            border: 1px solid rgba(148, 218, 50, 0.35);
            color: #94da32;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.25s ease;
          }
          .t-nav-btn:hover {
            background: #94da32;
            color: #0a0c08;
            border-color: #94da32;
            box-shadow: 0 0 12px rgba(148, 218, 50, 0.45);
          }
          .t-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 0;
          }
          .t-dot.active {
            background: #94da32;
            width: 24px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(148, 218, 50, 0.5);
          }
        `}
      </style>

      {/* CENTERED MAIN CONTAINER */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* SECTION HEADER */}
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: 800,
            letterSpacing: "2px",
            color: "#ffffff",
            textTransform: "uppercase",
            textAlign: "center",
            margin: "0 0 40px 0",
          }}
        >
          {contents.testimonialsTitle || "TRUSTED BY LEADERS"}
        </h2>

        {/* TESTIMONIAL GLASS CARD CONTAINER */}
        <div
          className="testimonial-card-glass"
          style={{
            maxWidth: 820,
            width: "100%",
            padding: "40px 32px 32px 32px",
            boxSizing: "border-box",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* STAR RATING */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              marginBottom: 24,
            }}
          >
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="star" size={22} fill style={{ color: "#94da32" }} />
            ))}
          </div>

          {/* QUOTE TEXT */}
          <div
            style={{
              minHeight: 110,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "clamp(16px, 2.5vw, 20px)",
                fontStyle: "italic",
                lineHeight: 1.65,
                color: "#ffffff",
                fontFamily: "'Inter', sans-serif",
                margin: "0 0 24px 0",
                maxWidth: 720,
              }}
            >
              "{currentQuote}"
            </p>

            {/* AUTHOR */}
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#94da32",
              }}
            >
              — {items[currentIndex]?.author}
            </div>

            {items[currentIndex]?.role && (
              <div
                style={{
                  fontSize: 11,
                  color: "#8d937f",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginTop: 4,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {items[currentIndex]?.role}
              </div>
            )}
          </div>

          {/* CONTROLS BAR (CHEVRONS & DOTS) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 32,
              paddingTop: 20,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <button onClick={handlePrev} className="t-nav-btn" aria-label="Previous Testimonial">
              <ChevronLeft size={20} />
            </button>

            {/* DOT INDICATORS */}
            <div style={{ display: "flex", gap: 8 }}>
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`t-dot ${currentIndex === idx ? "active" : ""}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button onClick={handleNext} className="t-nav-btn" aria-label="Next Testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}