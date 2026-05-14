import React from 'react';
import { Link } from "react-router-dom";

export default function NightVisionAboutPage() {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .night-vision-container {
      background-color: #131313;
      color: #e5e2e1;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      line-height: 1.5;
      min-height: 100vh;
    }

    /* Header/TopAppBar */
    .header {
      position: sticky;
      top: 0;
      z-index: 50;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 16px 24px;
      max-width: 1280px;
      margin: 0 auto;
      border-bottom: 1px solid #434938;
      background-color: rgba(19, 19, 19, 0.95);
      backdrop-filter: blur(4px);
    }

    .logo {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #94da32;
    }

    .nav {
      display: none;
      gap: 24px;
      align-items: center;
    }

    @media (min-width: 768px) {
      .nav {
        display: flex;
      }
    }

    .nav a {
      color: #c3c9b3;
      text-decoration: none;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      transition: color 0.2s;
      text-transform: uppercase;
    }

    .nav a:hover {
      color: #94da32;
    }

    .nav a.active {
      color: #94da32;
      border-bottom: 2px solid #94da32;
      padding-bottom: 8px;
    }

    .nav-icons {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .icon-btn {
      background: none;
      border: none;
      color: #94da32;
      cursor: pointer;
      padding: 8px;
      font-size: 24px;
      transition: background-color 0.2s;
    }

    .icon-btn:hover {
      background-color: #2a2a2a;
    }

    .support-btn {
      display: none;
      padding: 8px 16px;
      background: none;
      border: 1px solid #94da32;
      color: #94da32;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.2s;
    }

    @media (min-width: 1024px) {
      .support-btn {
        display: block;
      }
    }

    .support-btn:hover {
      background-color: #94da32;
      color: #131313;
    }

    /* Main Content */
    .main-content {
      max-width: 1280px;
      margin: 0 auto;
      overflow: hidden;
    }

    /* Hero Section */
    .hero {
      position: relative;
      width: 100%;
      height: 60vh;
      display: flex;
      align-items: flex-end;
      padding: 24px;
      background-size: cover;
      background-position: center;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to top, #131313, rgba(19, 19, 19, 0.4), transparent);
    }

    .scanline-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
      background-size: 100% 4px, 3px 100%;
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      z-index: 10;
      width: 100%;
    }

    .live-feed {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    .pulse-dot {
      width: 12px;
      height: 12px;
      background-color: #ffb4ab;
      border-radius: 50%;
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .live-feed-text {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 4px;
      color: #e5e2e1;
      text-transform: uppercase;
    }

    .hero-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 80px;
      font-weight: 700;
      line-height: 1.1;
      color: #94da32;
      text-transform: uppercase;
      font-style: italic;
      letter-spacing: 2px;
      margin: 16px 0;
    }

    @media (min-width: 768px) {
      .hero-title {
        font-size: 120px;
      }
    }

    .hero-line {
      height: 4px;
      width: 100%;
      background-color: #94da32;
      margin-top: 24px;
    }

    /* Company Story Section */
    .story-section {
      padding: 80px 24px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 48px;
      align-items: center;
    }

    @media (min-width: 768px) {
      .story-section {
        grid-template-columns: 1fr 1fr;
      }
    }

    .story-text h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #94da32;
      margin-bottom: 24px;
      text-transform: uppercase;
    }

    .story-text p {
      font-size: 18px;
      line-height: 1.6;
      color: #c3c9b3;
      margin-bottom: 24px;
    }

    .explore-btn {
      background-color: #b5e75d;
      color: #233600;
      border: none;
      padding: 16px 80px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .explore-btn:hover {
      background-color: #94da32;
    }

    .explore-btn:active {
      transform: scale(0.95);
    }

    .story-image-container {
      position: relative;
      border: 1px solid #94da32;
      padding: 8px;
      box-shadow: 0 0 15px rgba(181, 231, 93, 0.2);
    }

    .story-image-wrapper {
      aspect-ratio: 3 / 4;
      background-color: #20201f;
      position: relative;
      overflow: hidden;
    }

    .story-image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%);
      transition: filter 0.7s;
    }

    .story-image-wrapper img:hover {
      filter: grayscale(0%);
    }

    .tech-spec-label {
      position: absolute;
      top: -16px;
      left: -16px;
      background-color: #94da32;
      color: #131313;
      padding: 4px 16px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
    }

    /* Vision & Mission Section */
    .vision-mission {
      padding: 80px 24px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }

    @media (min-width: 768px) {
      .vision-mission {
        grid-template-columns: 1fr 1fr;
      }
    }

    .vision-card, .mission-card {
      background-color: #1b1b1b;
      border: 1px solid #434938;
      padding: 48px;
      position: relative;
      transition: border-color 0.2s;
    }

    .vision-card:hover, .mission-card:hover {
      border-color: #94da32;
    }

    .vision-card::before, .vision-card::after,
    .mission-card::before, .mission-card::after {
      content: '+';
      position: absolute;
      color: #b5e75d;
      font-family: monospace;
      font-size: 14px;
    }

    .vision-card::before, .mission-card::before { 
      top: 8px; 
      left: 8px; 
    }

    .vision-card::after, .mission-card::after { 
      bottom: 8px; 
      right: 8px; 
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    .card-icon {
      font-size: 48px;
      color: #94da32;
    }

    .card-label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #8d937f;
      text-transform: uppercase;
    }

    .card-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #94da32;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .card-text {
      font-size: 16px;
      line-height: 1.5;
      color: #c3c9b3;
    }

    /* Image Break Section */
    .image-break {
      width: 100%;
      height: 400px;
      position: relative;
      overflow: hidden;
      margin: 48px 0;
    }

    .image-break img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-break::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(19, 19, 19, 0.4);
    }

    .image-break-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      text-align: center;
    }

    .image-break-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 10px;
      color: #94da32;
      opacity: 0.8;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .image-break-line {
      height: 2px;
      width: 192px;
      background-color: #94da32;
      margin: 0 auto;
    }

    /* Values Section */
    .values-section {
      padding: 80px 24px;
    }

    .values-header {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 48px;
    }

    @media (min-width: 768px) {
      .values-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }
    }

    .values-title-group span {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #94da32;
      text-transform: uppercase;
      display: block;
      margin-bottom: 4px;
    }

    .values-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .values-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0;
      border-top: 1px solid #434938;
      border-left: 1px solid #434938;
    }

    @media (min-width: 640px) {
      .values-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (min-width: 1024px) {
      .values-grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    .value-card {
      padding: 24px;
      border-right: 1px solid #434938;
      border-bottom: 1px solid #434938;
      transition: background-color 0.2s;
    }

    .value-card:hover {
      background-color: #2a2a2a;
    }

    .value-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 48px;
    }

    .value-number {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #8d937f;
      text-transform: uppercase;
    }

    .value-icon {
      font-size: 24px;
      color: #94da32;
      transition: transform 0.2s;
    }

    .value-card:hover .value-icon {
      transform: rotate(45deg);
    }

    .value-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #94da32;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .value-text {
      font-size: 16px;
      line-height: 1.5;
      color: #c3c9b3;
    }

    /* CTA Section */
    .cta-section {
      padding: 80px 24px;
      text-align: center;
      border-top: 1px solid #94da32;
      margin-top: 80px;
    }

    .cta-section h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #e5e2e1;
      margin-bottom: 24px;
      text-transform: uppercase;
    }

    .cta-text {
      font-size: 18px;
      line-height: 1.6;
      color: #c3c9b3;
      max-width: 640px;
      margin: 0 auto 48px;
    }

    .cta-buttons {
      display: flex;
      flex-direction: column;
      gap: 24px;
      justify-content: center;
    }

    @media (min-width: 640px) {
      .cta-buttons {
        flex-direction: row;
      }
    }

    .cta-btn-primary {
      background-color: #b5e75d;
      color: #233600;
      border: none;
      padding: 16px 80px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .cta-btn-primary:hover {
      background-color: #94da32;
    }

    .cta-btn-secondary {
      background: none;
      border: 1px solid #94da32;
      color: #94da32;
      padding: 16px 80px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .cta-btn-secondary:hover {
      background-color: rgba(148, 218, 50, 0.1);
    }

    /* Footer */
    .footer {
      width: 100%;
      padding: 48px 24px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      max-width: 1280px;
      margin: 0 auto;
      border-top: 1px solid #94da32;
      background-color: #0e0e0e;
      margin-top: 80px;
    }

    @media (min-width: 768px) {
      .footer {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .footer-brand {
      grid-column: span 1;
    }

    @media (min-width: 768px) {
      .footer-brand {
        grid-column: span 1;
      }
    }

    .footer-logo {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 700;
      color: #94da32;
      margin-bottom: 24px;
    }

    .footer-tagline {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      color: #c3c9b3;
      text-transform: uppercase;
    }

    .footer-nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .footer-nav-title {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #94da32;
      text-transform: uppercase;
      margin-bottom: 4px;
      font-weight: bold;
    }

    .footer-nav a {
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #c3c9b3;
      text-decoration: none;
      transition: all 0.2s;
    }

    .footer-nav a:hover {
      color: #94da32;
      text-decoration: underline;
      text-decoration-color: #94da32;
      text-decoration-thickness: 2px;
      text-underline-offset: 8px;
    }

    .footer-copyright {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      color: #c3c9b3;
      text-transform: uppercase;
      margin-top: 24px;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="night-vision-container">
        {/* Header */}
        
        <main className="main-content">
          {/* Hero Section */}
          <section className="hero" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida/ADBb0uigFZm2MU_7fFkN1PGbqxTC4_zsd19WX1rPPXQ9Dq4i5EMbGW8uL59JfytFZsh1esNLU9nligJX4Uv90jKWL6D8MLXnq26q3GTMcyBfSr1_zrrXpo67IpigOrch4RSQvHkeqBk9x4VXRJLGzluFfWso-xnep3TZtUNQtmjjVkx4xUm72ROueuOlQghaRdACvRgs6p-gLEx5sf_1mpkxK_OjtZIMzVkcxp_k_5NJOEzBPjW9mg5vXhadcbQb9GP1FJGoMGX0s4cmKw')"}}>
            <div className="scanline-overlay"></div>
            <div className="hero-content">
              <div className="live-feed">
                <span className="pulse-dot"></span>
                <span className="live-feed-text">LIVE_FEED // EST_2012</span>
              </div>
              <h1 className="hero-title">ABOUT US</h1>
              <div className="hero-line"></div>
            </div>
          </section>

          {/* Company Story Section */}
          <section className="story-section">
            <div className="story-text">
              <h2>UNCOMPROMISING VIGILANCE</h2>
              <p>Founded on the principles of technical superiority and absolute reliability, NIGHTVISION™ has emerged as Nepal's premier manufacturer of high-end tactical surveillance equipment. Our journey began with a single mission: to eliminate the shadows where security threats reside.</p>
              <p>In an era where standard security systems are easily bypassed, our industrial-grade optical sensors and thermal imaging matrices provide a definitive advantage. We don't just record events; we interpret environments through the lens of advanced AI-driven detection.</p>
              <button className="explore-btn">EXPLORE TECHNOLOGY</button>
            </div>
            <div className="story-image-container">
              <div className="story-image-wrapper">
                <img 
                  src="https://lh3.googleusercontent.com/aida/ADBb0ug9YQUIw0MrZtq_29TVpL-FnrRS4-3iO3i2xoUtfnLiEZe_x1qPNnIFn8RajYtk_3kUu4Lecu7tOfey1nC1fDG_afuxXijuyUz9pN7g86X1H10jaMDlqyeOIEEiGQvC1HhjCzxAXW4rYIekvJrK-trj0VvG2TcXCFJOVjtrbWxiyOVuUZaAbzTAwLZaRmCzGd_wGeeF0B0QC1GgBSLdCKyV-GWpYAkfufJgXCH9Uxfm-BaDCmosaS_A-O9GqeSpQeUk2eXxaetlEg"
                  alt="A high-tech tactical surveillance camera"
                />
              </div>
              <div className="tech-spec-label">TECH_SPEC: V3.4</div>
            </div>
          </section>

          {/* Vision & Mission Section */}
          <section className="vision-mission">
            <div className="vision-card">
              <div className="card-header">
                <span className="card-icon">📖</span>
                <span className="card-label">STRATEGIC_VISION [01]</span>
              </div>
              <h3 className="card-title">OUR VISION</h3>
              <p className="card-text">To define the global standard for predictive security, creating a world where surveillance isn't just a record of the past, but an active shield for the future. We envision a future of absolute transparency through technical mastery.</p>
            </div>
            <div className="mission-card">
              <div className="card-header">
                <span className="card-icon">🛡️</span>
                <span className="card-label">OPERATIONAL_MISSION [02]</span>
              </div>
              <h3 className="card-title">OUR MISSION</h3>
              <p className="card-text">To engineer and deploy the world's most resilient surveillance ecosystems. By fusing industrial-grade hardware with intelligent software, we empower organizations and individuals to maintain uncompromising vigilance over their assets.</p>
            </div>
          </section>

          {/* Image Break */}
          <section className="image-break">
            <img 
              src="https://lh3.googleusercontent.com/aida/ADBb0uhV9NvalV5mRgQS5TOyr0va4SsbfHPOHr5iZvXUk2SFm-oq1xVZOcdyzx9_czyzvUBIosGUq0npg4sdVmf5eIwpDzvjMURgG_NzTJ3FkaiSYCGMtKSEGiYfbkRxQFwr_tR3rmyV2Uj53tm3byEhT3JkxvndqaZ-ewuKOvdCuVZdHEf-Zum9lvWuZjJGdeaRRwd3wGR72u1HwRHh75pzQqsxSFM-ZZ2ejFGgSUUl4Bx2pz0BPd7LIfV9Vb-Tu48aKKSvngDW8Tmk5A"
              alt="A futuristic control room"
            />
            <div className="image-break-text">
              <div className="image-break-title">PRECISION. CONTROL.</div>
              <div className="image-break-line"></div>
            </div>
          </section>

          {/* Values Section */}
          <section className="values-section">
            <div className="values-header">
              <div className="values-title-group">
                <span>CORE_PRINCIPLES</span>
                <h2 className="values-title">THE PILLARS OF NIGHTVISION</h2>
              </div>
              <div style={{color: '#8d937f', fontSize: '12px', fontWeight: '600', textAlign: 'right'}}>
                GRID_LAYOUT: 3x2<br />REF_ID: VALUES_MANIFESTO
              </div>
            </div>

            <div className="values-grid">
              {[
                { num: '01', icon: '⚡', title: 'INNOVATION', text: 'Constant pursuit of breakthrough technologies in optical engineering and data processing.' },
                { num: '02', icon: '✓', title: 'QUALITY', text: 'Zero-tolerance for failure. Every component is stress-tested for extreme tactical environments.' },
                { num: '03', icon: '🤝', title: 'SATISFACTION', text: 'Dedicated 24/7 technical support ensures your surveillance infrastructure never blinks.' },
                { num: '04', icon: '📋', title: 'INTEGRITY', text: 'Absolute transparency in data privacy and ethical surveillance manufacturing standards.' },
                { num: '05', icon: '🔗', title: 'COLLABORATION', text: 'Seamless integration with global security networks and custom enterprise architectures.' },
                { num: '06', icon: '📈', title: 'IMPROVEMENT', text: 'Continuous firmware optimization and hardware iterative loops for perpetual security.' },
              ].map((value) => (
                <div key={value.num} className="value-card">
                  <div className="value-header">
                    <span className="value-number">VAL_{value.num}</span>
                    <span className="value-icon">{value.icon}</span>
                  </div>
                  <h4 className="value-title">{value.title}</h4>
                  <p className="value-text">{value.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <h2>READY FOR THE DARK?</h2>
            <p className="cta-text">Join the network of thousands who trust NIGHTVISION™ for their most critical security needs.</p>
            <div className="cta-buttons">
              <button className="cta-btn-primary">BECOME A DEALER</button>
              <button className="cta-btn-secondary">CONTACT SALES</button>
            </div>
          </section>
        </main>

        {/* Footer */}
        
      </div>
    </>
  );
}