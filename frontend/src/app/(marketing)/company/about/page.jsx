import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../../utils/Icon";

export default function NightVisionAboutPage() {
  return (
    <>

      <div className="night-vision-container">

        <main className="main-content">

          {/* HERO */}

          <section
            className="about-hero"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop')",
            }}
          >
            <div className="scanline-overlay"></div>

            <div className="hero-content">

              

              <h1 className="hero-title">
                ABOUT <br /> NIGHTVISION
              </h1>

              <p className="hero-description">
                Nepal’s next-generation surveillance and security monitoring
                brand built for industrial security, intelligent detection,
                and uncompromising operational reliability.
              </p>

              <div className="hero-buttons">
                <Link to="/products" className="hero-btn-primary" style={{ textDecoration: "none", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                  Explore Systems
                </Link>

                <Link to="/dealership" className="hero-btn-secondary" style={{ textDecoration: "none", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                  Contact Sales
                </Link>
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
                  NIGHTVISION™ was founded in Kathmandu with one objective:
                  eliminate the blind spots where security threats survive.
                  Our systems are engineered to deliver maximum visibility,
                  predictive intelligence, and unmatched operational durability.
                </p>

                <p>
                  From AI-powered motion analysis to advanced thermal imaging,
                  we develop surveillance ecosystems that protect thousands of
                  perimeters, commercial facilities, and residential hubs across Nepal.
                </p>

                <Link to="/products" className="explore-btn" style={{ textDecoration: "none", display: "inline-block", textAlign: "center" }}>
                  Explore Our Technology
                </Link>

              </div>

              <div className="story-image-container">

                <div className="story-image-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop"
                    alt="Night Vision"
                  />
                </div>

                

              </div>

            </div>

          </section>

          {/* VISION */}

          <section className="vision-mission">

            <div className="vision-grid">

              <div className="vision-card">

                <div className="card-header">
                  <div className="card-icon-realistic">
                    <Icon name="visibility" size={48} />
                  </div>
                  
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
                  <div className="card-icon-realistic">
                    <Icon name="security" size={48} />
                  </div>
                </div>

                <h3 className="card-title">
                  OUR MISSION
                </h3>

                <p className="card-text">
                  To engineer industrial-grade surveillance ecosystems that
                  combine powerful hardware with intelligent software for
                  unmatched reliability and operational awareness.
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

              <div className="values-header" style={{ alignItems: "center" }}>

                <div className="values-title-group" style={{ flex: "1", minWidth: "280px" }}>
                  <span>OUR CORE PILLARS</span>

                  <h2 className="values-title">
                    THE PILLARS OF NIGHTVISION
                  </h2>
                </div>

                <p className="values-side" style={{ maxWidth: "420px", textTransform: "none", fontSize: "14px", color: "#c3c9b3", opacity: "0.85", textAlign: "left", lineHeight: "1.6" }}>
                  We build corporate partnership relationships on accountability, precision engineering, and the absolute trust that our operator networks will always remain protected.
                </p>

              </div>

              <div className="values-grid">

                {[
                  {
                    icon: "psychology",
                    title: "Continuous Innovation",
                    text:
                      "We invest deeply in next-generation optical engineering and neural AI algorithms to keep your perimeter steps ahead of modern security challenges.",
                  },
                  {
                    icon: "workspace_premium",
                    title: "Industrial-Grade Quality",
                    text:
                      "Every component undergoes rigorous stress-testing to guarantee reliable performance in critical security and extreme weather conditions.",
                  },
                  {
                    icon: "support_agent",
                    title: "Dedicated Assistance",
                    text:
                      "We provide reliable, direct-line operator support to ensure your security system remains fully online and vigilant at all times.",
                  },
                  {
                    icon: "verified_user",
                    title: "Ethical Integration",
                    text:
                      "Transparent privacy principles, secure encryption, and robust data protections engineered to keep your security records completely confidential.",
                  },
                  {
                    
                    icon: "hub",
                    title: "Interoperable Systems",
                    text:
                      "Our products are engineered to seamlessly connect with existing corporate networks, home automation, and global safety infrastructures.",
                  },
                  {
                    icon: "auto_graph",
                    title: "Adaptive Performance",
                    text:
                      "Continuous firmware upgrades and self-learning camera models that get smarter, faster, and more secure the longer they are deployed.",
                  },
                ].map((item) => (
                  <div className="value-card" key={item.num}>

                    <div className="value-header">
                      <span className="value-number" style={{ color: "#94da32", fontWeight: "600", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" }}>
                      </span>

                      <span className="value-icon" style={{ display: "inline-flex", padding: "8px", borderRadius: "8px", background: "rgba(148, 218, 50, 0.1)", border: "1px solid rgba(148, 218, 50, 0.2)" }}>
                        <Icon name={item.icon} size={20} />
                      </span>
                    </div>

                    <h3 className="value-title" style={{ fontSize: "18px", color: "#ffffff", fontWeight: "700", marginTop: "12px", fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.title}
                    </h3>

                    <p className="value-text" style={{ fontSize: "13px", color: "#c3c9b3", lineHeight: "1.6", marginTop: "8px", flex: "1" }}>
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </section>

          {/* NATIONWIDE DEALERS NETWORK */}

          <section className="about-dealers-section">

            <div className="about-dealers-container">

              <div className="about-dealers-header">
                <span className="about-dealers-tag">Nepal Certified Network</span>
                <h2 className="about-dealers-title">
                  OUR REPRESENTATIVE STATIONS
                </h2>
                <p className="about-dealers-desc">
                  Providing full integration and hardware services across key regions. Click on any certified partner to view their profile, inventory, and location metrics.
                </p>
              </div>

              <div className="about-dealers-grid">

                {/* Koshi (Province 1) */}
                <div className="about-province-card">
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">Koshi Province [01]</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to="/dealer/nanotek" className="about-dealer-link">
                        NanoTek Solutions <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">Biratnagar Command Station</span>
                    </div>
                  </div>
                </div>

                {/* Madhesh (Province 2) */}
                <div className="about-province-card">
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">Madhesh Province [02]</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to="/dealer/whitepearl" className="about-dealer-link">
                        White Pearl Pvt. Ltd. <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">Morang Base Hub</span>
                    </div>
                  </div>
                </div>

                {/* Bagmati (Province 3) */}
                <div className="about-province-card">
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">Bagmati Province [03]</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to="/dealer/night-vision" className="about-dealer-link">
                        Night Vision CCTV <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">Bhaktapur Secure Depot</span>
                    </div>
                  </div>
                </div>

                {/* Gandaki (Province 4) */}
                <div className="about-province-card">
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">Gandaki Province [04]</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to="/dealer/srsuppliers" className="about-dealer-link">
                        SR Suppliers <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">Pokhara Logistics Node</span>
                    </div>
                  </div>
                </div>

                {/* Karnali (Province 6) */}
                <div className="about-province-card">
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">Karnali Province [06]</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to="/dealer/axetech" className="about-dealer-link">
                        AxeTech Automation <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">Surkhet Support Node</span>
                    </div>
                  </div>
                </div>

                {/* Sudurpashchim (Province 7) */}
                <div className="about-province-card">
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">Sudurpashchim Province [07]</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to="/dealer/joshi-kyodai" className="about-dealer-link">
                        Joshi Kyodai Tech <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">Dhangadhi Command Node</span>
                    </div>
                  </div>
                </div>

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
              who trust NIGHTVISION™ for critical surveillance and security
              operations worldwide.
            </p>

            <div className="cta-buttons">

              <Link to="/apply-dealers" className="cta-btn-primary" style={{ textDecoration: "none", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                Become A Dealer
              </Link>

              <Link to="/dealership" className="cta-btn-secondary" style={{ textDecoration: "none", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                Contact Sales
              </Link>

            </div>

          </section>

        </main>

        {/* FOOTER */}

      </div>
    </>
  );
}