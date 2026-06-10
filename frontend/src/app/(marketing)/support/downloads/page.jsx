import { useState } from "react";
import { FaGlobe, FaGooglePlay, FaApple } from "react-icons/fa";
import { Lock, Gauge, Cloud, Bell, Users, RefreshCw } from "lucide-react";
import { DOWNLOAD_PLATFORMS, DOWNLOAD_FEATURES } from "../../../../data/constants";

import PageHeroBanner from "../../../../components/ui/PageHeroBanner";

function QRCode() {
  const cells = Array.from({ length: 64 }, (_, i) => {
    const seed = (i * 7 + 13) % 17;
    return seed > 8;
  });
  return (
    <div className="qr-code-container">
      <div className="qr-code-inner">
        <div className="qr-code-grid">
          {cells.map((filled, i) => (
            <div
              key={i}
              className={`qr-code-cell ${filled ? "filled" : "empty"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AppDownloadsPage() {
  const platformIcons = {
    windows: {
      large: <FaGlobe size={48} className="platform-icon" />,
      btn: <FaGlobe size={20} />,
    },
    android: {
      large: <FaGooglePlay size={48} className="platform-icon" />,
      btn: <FaGooglePlay size={20} />,
    },
    ios: {
      large: <FaApple size={48} className="platform-icon" />,
      btn: <FaApple size={20} />,
    },
  };

  return (
    <div className="downloads-page">
      <PageHeroBanner
        title="CONTROL CENTER. ANYWHERE."
        subtitle="Deploy the NV// ecosystem across all your monitoring devices. Optimized for low-latency surveillance streams and encrypted security management."
      />

      <main style={{ paddingTop: "48px" }}>

        {/* PLATFORM CARDS */}
        <section className="platforms-section">
          {/* Security Notice Box */}
          <div className="security-notice-box">
            <div className="security-notice-header">
              <span className="security-notice-dot"></span>
              <span>SYSTEM DISPATCH: SECURE DOWNLOAD VERIFIED</span>
            </div>
            <p className="security-notice-text">
              All application files, firmware packages, and web consoles in this registry have been scanned for security vulnerabilities and are certified cryptographically secure. Please ensure the SHA-256 hash matches the signature on your physical operator manual.
            </p>
          </div>

          <div className="platform-grid">
            {DOWNLOAD_PLATFORMS.map(({ id, badge, title, desc, btnLabel, meta }) => {
              const icons = platformIcons[id] || { large: null, btn: null };
              return (
                <div key={title} className="platform-card crosshair-tl crosshair-br">
                  <div className="platform-header">
                    {icons.large}
                    <span className="platform-badge">{badge}</span>
                  </div>
                  <h3 className="platform-title">{title}</h3>
                  <p className="platform-desc">{desc}</p>
                  <button className="download-btn">
                    {icons.btn}
                    {btnLabel}
                  </button>
                  <div className="platform-meta-box">
                    <span className="platform-meta-dot"></span>
                    <span className="platform-meta-text">{meta}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FEATURE ICONS */}
        <section className="features-section">
          <div className="feature-grid">
            {DOWNLOAD_FEATURES.map(({ icon, label }, idx) => (
              <div key={label} className="feature-card">
                <div className="feature-card-notch" />
                <div className="feature-icon-box">
                  {idx === 0 && <Lock size={32} />}
                  {idx === 1 && <Gauge size={32} />}
                  {idx === 2 && <Cloud size={32} />}
                  {idx === 3 && <Bell size={32} />}
                  {idx === 4 && <Users size={32} />}
                  {idx === 5 && <RefreshCw size={32} />}
                </div>
                <h3 className="feature-card-title">{label}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* QR / DEPLOY SECTION */}
        <section className="deploy-section">
          <div className="deploy-outer-box">
            <div className="hud-scanline deploy-scanline" />
            <div className="deploy-inner-box">
              {/* bg grid texture */}
              <div className="deploy-grid-bg" />
              <div className="deploy-content">
                <div className="deploy-badge">Terminal Simulation</div>
                <h2 className="deploy-title">READY TO DEPLOY?</h2>
                <p className="deploy-desc">
                  Scan the code with your mobile device to instantly pair your cameras with the NV// mobile app.
                </p>
                <QRCode />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}