import React from "react";
import { Link } from "react-router-dom";

export default function NightVisionAboutPage() {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html,
    body {
      overflow-x: hidden;
      scroll-behavior: smooth;
      background: #131313;
    }

    body {
      font-family: 'Inter', sans-serif;
    }

    .night-vision-container {
      width: 100%;
      min-height: 100vh;
      background: #131313;
      color: #e5e2e1;
      overflow-x: hidden;
    }

    .main-content {
      width: 100%;
    }

    /* HERO */

    .hero {
      position: relative;
      min-height: 100vh;
      width: 100%;
      display: flex;
      align-items: flex-end;
      padding: 60px;
      background-size: cover;
      background-position: center;
      overflow: hidden;
    }

    .hero::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(19, 19, 19, 0.98),
        rgba(19, 19, 19, 0.5),
        rgba(19, 19, 19, 0.1)
      );
      z-index: 1;
    }

    .scanline-overlay {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(
          rgba(18,16,16,0) 50%,
          rgba(0,0,0,0.15) 50%
        ),
        linear-gradient(
          90deg,
          rgba(255,0,0,0.03),
          rgba(0,255,0,0.02),
          rgba(0,0,255,0.03)
        );
      background-size: 100% 4px, 3px 100%;
      pointer-events: none;
      z-index: 2;
    }

    .hero-content {
      position: relative;
      z-index: 3;
      width: 100%;
      max-width: 1200px;
    }

    .live-feed {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .pulse-dot {
      width: 12px;
      height: 12px;
      background: #ff5b5b;
      border-radius: 50%;
      animation: pulse 1s infinite;
      flex-shrink: 0;
    }

    @keyframes pulse {
      0%,100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }

    .live-feed-text {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #e5e2e1;
    }

    .hero-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(42px, 11vw, 140px);
      line-height: 0.95;
      font-weight: 700;
      color: #94da32;
      text-transform: uppercase;
      margin-bottom: 20px;
      letter-spacing: 3px;
      font-style: italic;
      word-break: break-word;
    }

    .hero-description {
      max-width: 720px;
      color: #d0d0d0;
      font-size: clamp(15px, 2vw, 20px);
      line-height: 1.8;
      margin-bottom: 35px;
    }

    .hero-buttons {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }

    .hero-btn-primary,
    .hero-btn-secondary {
      padding: 16px 38px;
      border: none;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      transition: 0.3s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .hero-btn-primary {
      background: #b5e75d;
      color: #131313;
    }

    .hero-btn-primary:hover {
      background: #94da32;
      transform: translateY(-2px);
    }

    .hero-btn-secondary {
      border: 1px solid #94da32;
      color: #94da32;
      background: transparent;
    }

    .hero-btn-secondary:hover {
      background: rgba(148,218,50,0.1);
    }

    /* STORY */

    .story-section {
      width: 100%;
      padding: 100px 24px;
    }

    .story-grid {
      max-width: 1400px;
      margin: auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 60px;
      align-items: center;
    }

    .story-text h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(28px, 5vw, 52px);
      color: #94da32;
      margin-bottom: 24px;
      line-height: 1.1;
      text-transform: uppercase;
    }

    .story-text p {
      font-size: clamp(15px, 2vw, 18px);
      line-height: 1.9;
      color: #c3c9b3;
      margin-bottom: 24px;
    }

    .explore-btn {
      padding: 16px 42px;
      background: #b5e75d;
      color: #131313;
      border: none;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      transition: 0.3s;
    }

    .explore-btn:hover {
      background: #94da32;
    }

    .story-image-container {
      position: relative;
      border: 1px solid #94da32;
      padding: 8px;
      width: 100%;
    }

    .story-image-wrapper {
      overflow: hidden;
      aspect-ratio: 3/4;
    }

    .story-image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%);
      transition: 0.6s;
    }

    .story-image-wrapper img:hover {
      transform: scale(1.05);
      filter: grayscale(0%);
    }

    .tech-spec-label {
      position: absolute;
      top: -14px;
      left: -14px;
      background: #94da32;
      color: #131313;
      padding: 5px 14px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
    }

    /* VISION */

    .vision-mission {
      padding: 40px 24px 100px;
    }

    .vision-grid {
      max-width: 1400px;
      margin: auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }

    .vision-card,
    .mission-card {
      background: #1b1b1b;
      border: 1px solid #434938;
      padding: 48px;
      transition: 0.3s;
    }

    .vision-card:hover,
    .mission-card:hover {
      border-color: #94da32;
      transform: translateY(-5px);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 24px;
    }

    .card-icon {
      font-size: 52px;
    }

    .card-label {
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #8d937f;
      text-align: right;
    }

    .card-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(24px, 3vw, 34px);
      color: #94da32;
      margin-bottom: 16px;
    }

    .card-text {
      color: #c3c9b3;
      line-height: 1.9;
      font-size: 16px;
    }

    /* IMAGE BREAK */

    .image-break {
      position: relative;
      width: 100%;
      height: 500px;
      overflow: hidden;
    }

    .image-break img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-break::after {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(19,19,19,0.5);
    }

    .image-break-text {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
    }

    .image-break-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(24px, 7vw, 58px);
      color: #94da32;
      letter-spacing: 10px;
      margin-bottom: 18px;
      word-break: break-word;
    }

    .image-break-line {
      width: 200px;
      height: 2px;
      background: #94da32;
      max-width: 90%;
    }

    /* VALUES */

    .values-section {
      padding: 100px 24px;
    }

    .values-container {
      max-width: 1400px;
      margin: auto;
    }

    .values-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 50px;
    }

    .values-title-group span {
      color: #94da32;
      font-size: 12px;
      letter-spacing: 2px;
      font-weight: 700;
    }

    .values-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(28px, 5vw, 50px);
      line-height: 1.2;
      margin-top: 8px;
    }

    .values-side {
      color: #8d937f;
      font-size: 12px;
      line-height: 1.8;
      text-align: right;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border-top: 1px solid #434938;
      border-left: 1px solid #434938;
    }

    .value-card {
      padding: 36px;
      border-right: 1px solid #434938;
      border-bottom: 1px solid #434938;
      transition: 0.3s;
    }

    .value-card:hover {
      background: #1d1d1d;
    }

    .value-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 45px;
    }

    .value-number {
      color: #8d937f;
      font-size: 12px;
      letter-spacing: 1px;
    }

    .value-icon {
      font-size: 24px;
      color: #94da32;
    }

    .value-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      color: #94da32;
      margin-bottom: 12px;
    }

    .value-text {
      color: #c3c9b3;
      line-height: 1.8;
      font-size: 15px;
    }

    /* CTA */

    .cta-section {
      padding: 100px 24px;
      text-align: center;
      border-top: 1px solid #434938;
    }

    .cta-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(32px, 6vw, 62px);
      margin-bottom: 20px;
    }

    .cta-text {
      max-width: 760px;
      margin: auto;
      color: #c3c9b3;
      line-height: 1.9;
      font-size: clamp(15px, 2vw, 20px);
      margin-bottom: 40px;
    }

    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .cta-btn-primary,
    .cta-btn-secondary {
      padding: 16px 42px;
      font-size: 12px;
      letter-spacing: 2px;
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer;
      transition: 0.3s;
    }

    .cta-btn-primary {
      background: #b5e75d;
      color: #131313;
      border: none;
    }

    .cta-btn-primary:hover {
      background: #94da32;
    }

    .cta-btn-secondary {
      background: transparent;
      border: 1px solid #94da32;
      color: #94da32;
    }

    .cta-btn-secondary:hover {
      background: rgba(148,218,50,0.08);
    }

    /* FOOTER */

    .footer {
      background: #0d0d0d;
      border-top: 1px solid #434938;
      padding: 60px 24px;
    }

    .footer-grid {
      max-width: 1400px;
      margin: auto;
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr;
      gap: 40px;
    }

    .footer-logo {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 28px;
      color: #94da32;
      margin-bottom: 18px;
    }

    .footer-tagline {
      color: #c3c9b3;
      line-height: 1.8;
      max-width: 320px;
    }

    .footer-nav-title {
      color: #94da32;
      font-size: 12px;
      letter-spacing: 2px;
      margin-bottom: 18px;
      font-weight: 700;
    }

    .footer-nav {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-nav a {
      color: #c3c9b3;
      text-decoration: none;
      transition: 0.3s;
      font-size: 15px;
    }

    .footer-nav a:hover {
      color: #94da32;
    }

    .footer-bottom {
      max-width: 1400px;
      margin: 50px auto 0;
      padding-top: 30px;
      border-top: 1px solid #2d2d2d;
      text-align: center;
      color: #8d937f;
      font-size: 13px;
    }

    /* RESPONSIVE */

    @media (max-width: 1100px) {

      .story-grid,
      .vision-grid {
        grid-template-columns: 1fr;
      }

      .values-grid {
        grid-template-columns: repeat(2,1fr);
      }

      .footer-grid {
        grid-template-columns: repeat(2,1fr);
      }
    }

    @media (max-width: 768px) {

      .hero {
        min-height: 90vh;
        padding: 30px 20px;
        align-items: center;
      }

      .hero-buttons,
      .cta-buttons {
        flex-direction: column;
        width: 100%;
      }

      .hero-btn-primary,
      .hero-btn-secondary,
      .cta-btn-primary,
      .cta-btn-secondary,
      .explore-btn {
        width: 100%;
      }

      .story-section,
      .values-section,
      .cta-section {
        padding: 70px 20px;
      }

      .vision-card,
      .mission-card {
        padding: 32px;
      }

      .image-break {
        height: 320px;
      }

      .values-grid {
        grid-template-columns: 1fr;
      }

      .footer-grid {
        grid-template-columns: 1fr;
      }

      .values-side {
        text-align: left;
      }
    }

    @media (max-width: 480px) {

      .hero {
        min-height: 85vh;
        padding: 20px 16px;
      }

      .live-feed-text {
        font-size: 10px;
        letter-spacing: 2px;
      }

      .story-section,
      .vision-mission,
      .values-section,
      .cta-section,
      .footer {
        padding-left: 16px;
        padding-right: 16px;
      }

      .vision-card,
      .mission-card,
      .value-card {
        padding: 24px;
      }

      .card-icon {
        font-size: 38px;
      }

      .image-break {
        height: 240px;
      }

      .image-break-title {
        letter-spacing: 4px;
      }

      .footer-logo {
        font-size: 24px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="night-vision-container">

        <main className="main-content">

          {/* HERO */}

          <section
            className="hero"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop')",
            }}
          >
            <div className="scanline-overlay"></div>

            <div className="hero-content">

              <div className="live-feed">
                <span className="pulse-dot"></span>
                <span className="live-feed-text">
                  LIVE_FEED // EST_2012
                </span>
              </div>

              <h1 className="hero-title">
                ABOUT <br /> NIGHTVISION
              </h1>

              <p className="hero-description">
                Nepal’s next-generation surveillance and tactical monitoring
                brand built for industrial security, intelligent detection,
                and uncompromising operational reliability.
              </p>

              <div className="hero-buttons">
                <button className="hero-btn-primary">
                  Explore Technology
                </button>

                <button className="hero-btn-secondary">
                  Contact Sales
                </button>
              </div>

            </div>
          </section>

          {/* STORY */}

          <section className="story-section">

            <div className="story-grid">

              <div className="story-text">

                <h2>
                  UNCOMPROMISING
                  <br />
                  VIGILANCE
                </h2>

                <p>
                  NIGHTVISION™ was founded with one objective:
                  eliminate the blind spots where threats survive.
                  Our systems are engineered to deliver maximum visibility,
                  predictive intelligence, and unmatched operational durability.
                </p>

                <p>
                  From AI-powered motion analysis to advanced thermal imaging,
                  we develop surveillance ecosystems capable of functioning
                  in extreme tactical conditions with absolute precision.
                </p>

                <button className="explore-btn">
                  Explore Technology
                </button>

              </div>

              <div className="story-image-container">

                <div className="story-image-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop"
                    alt="Night Vision"
                  />
                </div>

                <div className="tech-spec-label">
                  TECH_SPEC : V3.4
                </div>

              </div>

            </div>

          </section>

          {/* VISION */}

          <section className="vision-mission">

            <div className="vision-grid">

              <div className="vision-card">

                <div className="card-header">
                  <span className="card-icon">📖</span>
                  <span className="card-label">
                    STRATEGIC_VISION [01]
                  </span>
                </div>

                <h3 className="card-title">
                  OUR VISION
                </h3>

                <p className="card-text">
                  To redefine global surveillance standards through intelligent,
                  predictive security systems that actively prevent threats
                  before they happen.
                </p>

              </div>

              <div className="mission-card">

                <div className="card-header">
                  <span className="card-icon">🛡️</span>
                  <span className="card-label">
                    OPERATIONAL_MISSION [02]
                  </span>
                </div>

                <h3 className="card-title">
                  OUR MISSION
                </h3>

                <p className="card-text">
                  To engineer industrial-grade surveillance ecosystems that
                  combine powerful hardware with intelligent software for
                  unmatched reliability and tactical awareness.
                </p>

              </div>

            </div>

          </section>

          {/* IMAGE BREAK */}

          <section className="image-break">

            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
              alt="Control Room"
            />

            <div className="image-break-text">
              <div className="image-break-title">
                PRECISION. CONTROL.
              </div>

              <div className="image-break-line"></div>
            </div>

          </section>

          {/* VALUES */}

          <section className="values-section">

            <div className="values-container">

              <div className="values-header">

                <div className="values-title-group">
                  <span>CORE_PRINCIPLES</span>

                  <h2 className="values-title">
                    THE PILLARS OF NIGHTVISION
                  </h2>
                </div>

                <div className="values-side">
                  GRID_LAYOUT : 3x2 <br />
                  REF_ID : VALUES_MANIFESTO
                </div>

              </div>

              <div className="values-grid">

                {[
                  {
                    num: "01",
                    icon: "⚡",
                    title: "Innovation",
                    text:
                      "Relentless pursuit of breakthrough technologies in AI surveillance and optical engineering.",
                  },
                  {
                    num: "02",
                    icon: "✓",
                    title: "Quality",
                    text:
                      "Every component is stress-tested to operate in high-risk tactical environments.",
                  },
                  {
                    num: "03",
                    icon: "🤝",
                    title: "Support",
                    text:
                      "24/7 technical assistance ensuring uninterrupted operational performance.",
                  },
                  {
                    num: "04",
                    icon: "📋",
                    title: "Integrity",
                    text:
                      "Transparent privacy policies and ethical manufacturing standards.",
                  },
                  {
                    num: "05",
                    icon: "🔗",
                    title: "Integration",
                    text:
                      "Seamless compatibility with enterprise security infrastructures worldwide.",
                  },
                  {
                    num: "06",
                    icon: "📈",
                    title: "Improvement",
                    text:
                      "Continuous optimization through firmware updates and AI learning systems.",
                  },
                ].map((item) => (
                  <div className="value-card" key={item.num}>

                    <div className="value-header">
                      <span className="value-number">
                        VAL_{item.num}
                      </span>

                      <span className="value-icon">
                        {item.icon}
                      </span>
                    </div>

                    <h3 className="value-title">
                      {item.title}
                    </h3>

                    <p className="value-text">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </section>

          {/* CTA */}

          <section className="cta-section">

            <h2 className="cta-title">
              READY FOR THE DARK?
            </h2>

            <p className="cta-text">
              Join the growing network of organizations and professionals
              who trust NIGHTVISION™ for critical surveillance and tactical
              security operations worldwide.
            </p>

            <div className="cta-buttons">

              <button className="cta-btn-primary">
                Become A Dealer
              </button>

              <button className="cta-btn-secondary">
                Contact Sales
              </button>

            </div>

          </section>

        </main>

        {/* FOOTER */}

      </div>
    </>
  );
}