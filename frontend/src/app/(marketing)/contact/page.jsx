import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, Navigation } from 'lucide-react';
import { getSettings, useSiteContents } from '../../../utils/cmsDb';
import PageHeroBanner from '../../../components/ui/PageHeroBanner';
import ContactForm from '../../../components/contact/ContactForm';

export default function NightVisionContactPage() {
  const [settings, setSettings] = useState(null);
  const siteContents = useSiteContents();

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  return (
    <div className="nv-contact-container" style={{ background: '#0a0a0a', minHeight: '100vh', width: '100%' }}>
      {/* 1. TOP GREEN HERO BANNER (Compact & Centered) */}
      <PageHeroBanner
        title={siteContents.contactHeroTitle || "CONTACT US"}
        subtitle={siteContents.contactHeroSubtitle || "Our surveillance specialists are standing by. Connect with our team for uncompromising security solutions."}
        centered
      />

      {/* 2. TOP 3 CONTACT CARDS ROW ("CALL US", "VISIT US", "E-MAIL US") */}
      <section
        className="contact-cards-section"
        style={{
          maxWidth: 1200,
          margin: "32px auto",
          padding: "0 24px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <div className="contact-cards-grid-inner">
          {/* Card 1: Call Us */}
          <div
            className="contact-card-box"
            style={{
              background: "rgba(20, 20, 20, 0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(124, 252, 0, 0.2)",
              borderRadius: 12,
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: "rgba(124, 252, 0, 0.1)",
                border: "1px solid rgba(124, 252, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7CFC00",
                marginBottom: 16,
              }}
            >
              <Phone size={26} />
            </div>
            <h3
              style={{
                color: "#ffffff",
                fontSize: "1.1rem",
                fontWeight: 800,
                marginBottom: 4,
                fontFamily: "'Space Grotesk', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              CALL US
            </h3>
            <p
              style={{
                color: "#7CFC00",
                fontSize: "0.72rem",
                fontWeight: 700,
                marginBottom: 12,
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              24/7 HELPLINE
            </p>
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
              <a
                href={`tel:${settings?.helpline1 || "015925995"}`}
                style={{ color: "#e5e2e1", textDecoration: "none", fontSize: "0.9rem" }}
                className="hover:text-[#7CFC00] transition-colors"
              >
                {settings?.helpline1 || "01-5925995"}
              </a>
              <a
                href={`tel:${settings?.helpline2 || "+9779745978217"}`}
                style={{ color: "#e5e2e1", textDecoration: "none", fontSize: "0.9rem" }}
                className="hover:text-[#7CFC00] transition-colors"
              >
                {settings?.helpline2 || "+977-9745978217"}
              </a>
            </div>
          </div>

          {/* Card 2: Visit Us */}
          <a
            href="https://maps.app.goo.gl/WiF7jeWaksC2YRF37"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", height: "100%", display: "block" }}
          >
            <div
              className="contact-card-box"
              style={{
                background: "rgba(20, 20, 20, 0.6)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(124, 252, 0, 0.2)",
                borderRadius: 12,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "rgba(124, 252, 0, 0.1)",
                  border: "1px solid rgba(124, 252, 0, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7CFC00",
                  marginBottom: 16,
                }}
              >
                <MapPin size={26} />
              </div>
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  marginBottom: 4,
                  fontFamily: "'Space Grotesk', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                VISIT US
              </h3>
              <p
                style={{
                  color: "#7CFC00",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  marginBottom: 12,
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                HEADQUARTERS
              </p>
              <div style={{ marginTop: "auto", color: "#e5e2e1", fontSize: "0.9rem", lineHeight: 1.4 }}>
                {settings?.address || "Radhe Radhe, Bhaktapur, NEPAL"}
              </div>
            </div>
          </a>

          {/* Card 3: Email Us */}
          <div
            className="contact-card-box"
            style={{
              background: "rgba(20, 20, 20, 0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(124, 252, 0, 0.2)",
              borderRadius: 12,
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: "rgba(124, 252, 0, 0.1)",
                border: "1px solid rgba(124, 252, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7CFC00",
                marginBottom: 16,
              }}
            >
              <Mail size={26} />
            </div>
            <h3
              style={{
                color: "#ffffff",
                fontSize: "1.1rem",
                fontWeight: 800,
                marginBottom: 4,
                fontFamily: "'Space Grotesk', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              E-MAIL US
            </h3>
            <p
              style={{
                color: "#7CFC00",
                fontSize: "0.72rem",
                fontWeight: 700,
                marginBottom: 12,
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              COMMUNICATIONS
            </p>
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
              <a
                href={`mailto:${settings?.email || "info@nightvision.com.np"}`}
                style={{ color: "#e5e2e1", textDecoration: "none", fontSize: "0.9rem" }}
                className="hover:text-[#7CFC00] transition-colors"
              >
                {settings?.email || "info@nightvision.com.np"}
              </a>
              <a
                href="https://www.nightvision.com.np"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#e5e2e1", textDecoration: "none", fontSize: "0.9rem" }}
                className="hover:text-[#7CFC00] transition-colors"
              >
                www.nightvision.com.np
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOWER 2-COLUMN EQUAL-HEIGHT SECTION (MAP + FORM) */}
      <section
        className="contact-main-grid-section"
        style={{
          maxWidth: 1200,
          margin: "40px auto 60px auto",
          padding: "0 24px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <div className="contact-map-form-grid">
          {/* Left Column: Google Map Container */}
          <div
            className="contact-map-wrapper"
            style={{
              position: "relative",
              float: "none",
              top: "auto",
              left: "auto",
              width: "100%",
              height: "100%",
              minHeight: 480,
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid rgba(124, 252, 0, 0.2)",
              background: "#101010",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <iframe
              title="Night Vision CCTV Nepal"
              src={siteContents.contactMapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d516.379656973646!2d85.3979903064471!3d27.677293954618367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1902e459720b%3A0x446057850e6bebe5!2sNight%20Vision%20CCTV%20Nepal!5e1!3m2!1sen!2snp!4v1778740476919!5m2!1sen!2snp"}
              width="100%"
              height="100%"
              style={{ border: 0, position: "relative", top: "auto", left: "auto", float: "none", flex: 1, minHeight: 420, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Location info badge overlay - clean vertical block positioning */}
            <div className="absolute top-4 left-4 right-4 md:right-auto z-10 bg-black/85 backdrop-blur-md border border-[#7CFC00]/30 rounded-xl p-4 md:p-5 max-w-sm shadow-[0_0_20px_rgba(124,252,0,0.15)]">
              <div className="map-badge map-location-tag flex items-center gap-2 text-[#7CFC00] font-mono text-xs font-bold mb-1">
                <Navigation size={14} /> KATHMANDU HQ COMMAND
              </div>
              <div className="map-title text-white font-bold text-lg font-['Space_Grotesk'] mt-1 leading-snug">NightVision CCTV Nepal</div>
              <p className="text-[#c3c9b3] text-xs mt-1 leading-relaxed">Radhe Radhe, Arniko Highway, Bhaktapur</p>
            </div>
          </div>

          {/* Right Column: "SEND US A TRANSMISSION" Form */}
          <div
            className="contact-form-wrapper"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                background: "rgba(20, 20, 20, 0.6)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(124, 252, 0, 0.2)",
                borderRadius: 12,
                padding: "32px 28px",
                boxSizing: "border-box",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  marginBottom: 6,
                  fontFamily: "'Space Grotesk', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  textAlign: "center",
                }}
              >
                SEND US A TRANSMISSION
              </h2>
              <p
                style={{
                  color: "#cccccc",
                  fontSize: "0.85rem",
                  lineHeight: 1.4,
                  textAlign: "center",
                  marginBottom: 24,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Fill in your inquiry details below. Our security team will review your specs and respond within 24 hours.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESPONSIVE & FORM STYLING FALLBACK */}
      <style>{`
        .contact-cards-grid-inner {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }

        .contact-map-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: stretch !important;
        }

        .map-badge, .map-location-tag {
          position: relative !important;
          display: inline-flex !important;
          align-items: center !important;
          margin-bottom: 6px !important;
          top: auto !important;
          left: auto !important;
        }

        .map-title, .gm-style-iw h3 {
          margin-top: 4px !important;
          line-height: 1.3 !important;
          color: #ffffff !important;
        }

        /* Form Input Placeholder Contrast & Alignment */
        .contact-form input::placeholder,
        .contact-form textarea::placeholder,
        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.45) !important;
          font-size: 0.88rem !important;
          opacity: 1 !important;
        }

        .contact-form .form-input,
        .contact-form .form-select,
        .contact-form .form-textarea,
        .form-input,
        .form-select,
        .form-textarea {
          padding: 12px 16px !important;
          background: #0d0d0d !important;
          border: 1px solid rgba(124, 252, 0, 0.25) !important;
          border-radius: 8px !important;
          color: #ffffff !important;
          font-size: 0.9rem !important;
          box-sizing: border-box !important;
          width: 100% !important;
        }

        @media screen and (max-width: 1023px) {
          .contact-cards-grid-inner {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .contact-map-form-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .contact-map-wrapper {
            min-height: 380px !important;
            height: 380px !important;
          }
        }
      `}</style>
    </div>
  );
}