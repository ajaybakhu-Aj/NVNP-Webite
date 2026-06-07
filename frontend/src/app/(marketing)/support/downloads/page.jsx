import { useState } from "react";
import { FaWindows, FaGooglePlay, FaApple } from "react-icons/fa";
import { DOWNLOAD_PLATFORMS, DOWNLOAD_FEATURES } from "../../../../data/constants";

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
      large: <FaWindows size={48} className="platform-icon" />,
      btn: <FaWindows size={20} />,
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
      <main>
        {/* HERO */}
        <section className="hero-section">
          <div className="system-badge">
            System Interface v4.0.2
          </div>
          <h1 className="hero-title">
            CONTROL CENTER.<br />
            <span className="text-primary">ANYWHERE.</span>
          </h1>
          <p className="hero-desc">
            Deploy the NV// ecosystem across all your monitoring devices. Optimized for low-latency surveillance streams and encrypted security management.
          </p>
        </section>

        {/* PLATFORM CARDS */}
        <section className="platforms-section">
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
                  <div className="platform-meta">{meta}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FEATURE ICONS */}
        <section className="features-section">
          <div className="feature-grid">
            {DOWNLOAD_FEATURES.map(({ icon, label }) => (
              <div key={label} className="feature-item">
                <div className="feature-icon-box">
                  <span className="material-symbols-outlined feature-icon">{icon}</span>
                </div>
                <span className="feature-label">{label}</span>
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
                  Scan the code with your mobile device to instantly pair your cameras with the NV/// mobile app.
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