import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";
import { useSiteContents } from "../../utils/cmsDb";
import logoImg from "../../../public/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();
  const [isAdmin, setIsAdmin] = useState(false);
  const contents = useSiteContents();

  useEffect(() => {
    const checkAdmin = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed && parsed.role === "Admin") {
            setIsAdmin(true);
            return;
          }
        } catch (e) { }
      }
      setIsAdmin(false);
    };

    checkAdmin();
    window.addEventListener("storage", checkAdmin);
    return () => {
      window.removeEventListener("storage", checkAdmin);
    };
  }, []);

  return (
    <footer className="app-footer">
      <style>{`
        .footer-container {
          display: flex !important;
          flex-wrap: nowrap !important;
          justify-content: space-between !important;
          align-items: flex-start !important;
          gap: 40px !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        .footer-subscribe-brand-section {
          display: flex !important;
          flex-direction: row !important;
          justify-content: space-between !important;
          align-items: flex-start !important;
          gap: 48px !important;
          padding: 48px 24px !important;
          border-top: 1px solid #2a2e20 !important;
          border-bottom: 1px solid #2a2e20 !important;
          max-width: 1400px !important;
          margin: 0 auto !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        .footer-sub-brand-left {
          flex: 1 1 360px !important;
          min-width: 280px !important;
        }
        .footer-sub-brand-right {
          flex: 1 1 360px !important;
          min-width: 280px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;
        }
        @media (max-width: 768px) {
          .footer-container {
            flex-wrap: wrap !important;
            gap: 32px !important;
          }
          .footer-subscribe-brand-section {
            flex-direction: column !important;
            gap: 32px !important;
            align-items: stretch !important;
            padding: 32px 16px !important;
          }
        }
      `}</style>
      <div className="footer-container">
        {/* PRODUCTS CATEGORIES */}
        <div style={{ flex: "0 0 auto", minWidth: 0 }}>
          <h5 className="footer-section-title">Products</h5>
          <ul className="footer-links-list">
            <li><Link to="/products/wireless-cameras" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>Wireless CCTV Cameras</Link></li>
            <li><Link to="/products/ip-cameras" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>IP CCTV Cameras</Link></li>
            <li><Link to="/products/nvr" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>Network Video Recorder (NVR)</Link></li>
            <li><Link to="/products/poe-switch" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>POE Switch</Link></li>
            <li><Link to="/products/hard-disk" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>Hard Disk</Link></li>
            <li><Link to="/products/sd-card" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>SD Card</Link></li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div style={{ flex: "0 0 auto", minWidth: 0 }}>
          <h5 className="footer-section-title">Quick Links</h5>
          <ul className="footer-links-list">
            <li><Link to="/products" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>Products</Link></li>
            <li><Link to="/about" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>About Us</Link></li>
            <li><Link to="/contact" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>Contact Us</Link></li>
            <li><Link to="/dealership" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>Dealers</Link></li>
            <li><Link to="/blog" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>Blogs</Link></li>
            <li><Link to="/events" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>News and Events</Link></li>
          </ul>
        </div>

        {/* SUPPORT & LEGAL */}
        <div style={{ flex: "0 0 auto", minWidth: 0 }}>
          <h5 className="footer-section-title">Support & Legal</h5>
          <ul className="footer-links-list">
            <li><Link to="/support" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>Technical Support Helpline</Link></li>
            <li><Link to="/support/downloads" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>App & Software</Link></li>
            <li><Link to="/warranty" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span> Warranty</Link></li>
            <li><Link to="/privacy" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>Privacy Protocol Policy</Link></li>
            <li><Link to="/terms" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>Terms & Service</Link></li>
            <li><Link to="/apply-dealers" className="footer-link" style={{ whiteSpace: "nowrap" }}><span style={{ color: "#b5e75d", marginRight: "8px", fontWeight: 700 }}>›</span>Become a Dealer</Link></li>
          </ul>
        </div>

        {/* REACH US */}
        <div style={{ flex: "0 0 auto", minWidth: 0 }}>
          <h5 className="footer-section-title">Reach Us</h5>
          <ul className="footer-links-list" style={{ color: "var(--nv-onSurf)", fontSize: "14px", lineHeight: "1.6", gap: "16px" }}>
            <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(contents.footerAddress || "Radhe Radhe, Bhaktapur, Nepal")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ display: "flex", alignItems: "flex-start", gap: "10px", textDecoration: "none", color: "inherit", width: "100%" }}
              >
                <Icon name="location_on" size={20} style={{ color: "#b5e75d", flexShrink: 0, marginTop: "2px" }} />
                <span>{contents.footerAddress || "Radhe Radhe, Bhaktapur, Nepal"}</span>
              </a>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <a 
                href={`tel:${(contents.footerPhone || "+977-9745978217").replace(/\s+/g, "")}`}
                className="footer-link"
                style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "inherit", width: "100%" }}
              >
                <Icon name="phone" size={20} style={{ color: "#b5e75d", flexShrink: 0 }} />
                <span>{contents.footerPhone || "+977-9745978217"}</span>
              </a>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <a 
                href={`mailto:${contents.footerEmail || "info@nightvision.com.np"}`}
                className="footer-link"
                style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "inherit", width: "100%" }}
              >
                <Icon name="mail" size={20} style={{ color: "#b5e75d", flexShrink: 0 }} />
                <span style={{ wordBreak: "break-all", textTransform: "lowercase" }}>{contents.footerEmail || "info@nightvision.com.np"}</span>
              </a>
            </li>
            <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <Link 
                to="/contact"
                className="footer-link"
                style={{ display: "flex", alignItems: "flex-start", gap: "10px", textDecoration: "none", color: "inherit", width: "100%" }}
              >
                <Icon name="schedule" size={20} style={{ color: "#b5e75d", flexShrink: 0, marginTop: "2px" }} />
                <span>{contents.footerHours || "Sun - Fri: 9:00 AM - 6:00 PM"}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BRAND & NEWSLETTER SUBSCRIBE SECTION */}
      <div className="footer-subscribe-brand-section">
        {/* Left Side: Brand, Logo & Socials */}
        <div className="footer-sub-brand-left">
          <Link to="/" style={{ display: "inline-block", marginBottom: "24px" }}>
            <img
              src={logoImg}
              alt="NightVision"
              style={{ height: "48px", width: "auto" }}
            />
          </Link>
          <p style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "#94da32",
            fontFamily: "'Poppins', sans-serif",
            margin: "0 0 12px 0",
          }}>Security · Surveillance · Nepal</p>

          <p className="footer-brand-desc" style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--nv-onSurfVar)", margin: "0 0 16px 0", maxWidth: "420px" }}>
            {contents.footerBrandDesc || "Dedicated to the highest standard of surveillance technology and national security for Nepal. Security is our duty."}
          </p>

          {/* Related Brand Badges */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "8px", 
            margin: "0 0 20px 0", 
            fontFamily: "'Poppins', sans-serif",
            fontSize: "12px", 
            color: "var(--nv-onSurfVar)" 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#94da32", fontWeight: "bold" }}>[✓]</span>
              <span>ISO 9001:2015 & CE Certified Surveillance Systems</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#94da32", fontWeight: "bold" }}>[✓]</span>
              <span>Starlight Low-Light Color Vision Technology</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#94da32", fontWeight: "bold" }}>[✓]</span>
              <span>AI-Powered Active Defense & Intrusion Detection</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="footer-socials">
            {contents.socialInstagram && (
              <a href={contents.socialInstagram} target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" size={24} className="footer-social-icon" />
              </a>
            )}
            {contents.socialFacebook && (
              <a href={contents.socialFacebook} target="_blank" rel="noopener noreferrer">
                <Icon name="facebook" size={24} className="footer-social-icon" />
              </a>
            )}
            {contents.socialTiktok && (
              <a href={contents.socialTiktok} target="_blank" rel="noopener noreferrer">
                <Icon name="music_note" size={24} className="footer-social-icon" />
              </a>
            )}
            {contents.socialYoutube && (
              <a href={contents.socialYoutube} target="_blank" rel="noopener noreferrer">
                <Icon name="youtube" size={24} className="footer-social-icon" />
              </a>
            )}
            {contents.socialLinkedin && (
              <a href={contents.socialLinkedin} target="_blank" rel="noopener noreferrer">
                <Icon name="linkedin" size={24} className="footer-social-icon" />
              </a>
            )}
            {contents.socialX && (
              <a href={contents.socialX} target="_blank" rel="noopener noreferrer">
                <Icon name="x" size={24} className="footer-social-icon" />
              </a>
            )}
          </div>
        </div>

        {/* Right Side: Subscribe Form */}
        <div className="footer-sub-brand-right">
          <h6 style={{
            color: "var(--nv-onSurf)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            margin: 0,
            fontFamily: "'Poppins', sans-serif"
          }}>
            {contents.footerSubscribeTitle || "SUBSCRIBE FOR UPDATES"}
          </h6>
          <p style={{
            color: "var(--nv-onSurfVar)",
            fontSize: "13px",
            lineHeight: "1.6",
            margin: 0,
            fontFamily: "'Poppins', sans-serif"
          }}>
            Stay informed with our latest starlight surveillance firmware upgrades and security briefings in Nepal.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Subscription successful!"); e.target.reset(); }}
            style={{ display: "flex", gap: "8px", width: "100%", maxWidth: "460px", marginTop: "8px" }}
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              style={{
                flex: 1,
                background: "var(--nv-surfHi)",
                border: "1px solid var(--nv-outlineVar)",
                padding: "10px 14px",
                color: "var(--nv-onSurf)",
                fontSize: "13px",
                fontFamily: "'Poppins', sans-serif",
                outline: "none"
              }}
            />
            <button
              type="submit"
              style={{
                background: "#b5e75d",
                color: "#000",
                border: "none",
                padding: "10px 16px",
                fontWeight: 700,
                fontSize: "12px",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "'Poppins', sans-serif",
                whiteSpace: "nowrap"
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-copyright-wrapper">
        <p className="footer-copyright-text">
          © {year} NIGHTVISION SECURITY SYSTEMS. ALL RIGHTS RESERVED. UNCOMPROMISING SURVEILLANCE & SECURITY IN NEPAL.
        </p>
      </div>
    </footer>
  );
}