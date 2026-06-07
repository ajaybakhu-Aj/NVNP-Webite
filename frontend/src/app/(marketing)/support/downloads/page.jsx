import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --primary: #deffa4;
    --primary-hover: #66a100;
    --background: #11140c;
    --surface: #11140c;
    --surface-container: #1e2117;
    --surface-container-low: #1a1d14;
    --surface-container-high: #282b21;
    --surface-variant: #33362c;
    --on-surface: #e2e4d5;
    --on-surface-variant: #c3c9b3;
    --on-primary: #233600;
    --outline: #8d937f;
    --outline-variant: #434938;
  }

  body {
    background: var(--background);
    color: var(--on-surface);
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
  }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    vertical-align: middle;
  }

  .hud-scanline {
    background: repeating-linear-gradient(
      to bottom,
      rgba(118,185,0,0.03) 0px,
      rgba(118,185,0,0.03) 2px,
      transparent 2px,
      transparent 4px
    );
    pointer-events: none;
  }

  .platform-card {
    background: var(--surface);
    border: 1px solid var(--outline-variant);
    padding: 2.5rem;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease;
    flex: 1;
    min-width: 260px;
  }
  .platform-card:hover {
    transform: translateY(-4px);
    border-color: #76b900;
  }
  .platform-card:active { transform: scale(0.98); }

  .crosshair-tl::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 12px; height: 2px;
    background: #76b900;
  }
  .crosshair-tl::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 2px; height: 12px;
    background: #76b900;
  }
  .crosshair-br::before {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 12px; height: 2px;
    background: #76b900;
  }
  .crosshair-br::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 2px; height: 12px;
    background: #76b900;
  }

  .download-btn {
    width: 100%;
    background: var(--primary);
    color: var(--on-primary);
    padding: 1rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    transition: background 0.2s, transform 0.1s;
  }
  .download-btn:hover { background: #a8d43a; }
  .download-btn:active { transform: scale(0.95); }

  .feature-icon-box {
    width: 64px; height: 64px;
    background: var(--surface-container-high);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .feature-item:hover .feature-icon-box {
    background: rgba(222,255,164,0.15);
  }

  .nav-link {
    color: var(--on-surface-variant);
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    transition: color 0.2s;
  }
  .nav-link:hover { color: var(--primary); }
  .nav-link.active { color: var(--primary); font-weight: 700; border-bottom: 2px solid var(--primary); padding-bottom: 2px; }

  .footer-link {
    color: var(--on-surface-variant);
    text-decoration: none;
    font-size: 16px;
    display: inline-block;
    transition: color 0.2s, transform 0.2s;
  }
  .footer-link:hover { color: var(--primary); transform: translateX(4px); }

  .email-input {
    width: 100%;
    background: var(--background);
    border: 1px solid var(--outline-variant);
    color: var(--on-surface);
    padding: 0.5rem 0.75rem;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .email-input:focus { border-color: var(--primary); }
  .email-input::placeholder { color: var(--outline); }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .pulse-dot { animation: pulse 2s ease-in-out infinite; }

  @media (max-width: 768px) {
    .platform-grid { flex-direction: column !important; }
    .feature-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 2rem !important; }
    .footer-grid { flex-direction: column !important; gap: 2rem !important; }
    .nav-links-desktop { display: none !important; }
    .nav-icons-right { gap: 4px !important; }
    .hero-title { font-size: clamp(36px, 9vw, 72px) !important; }
  }
  @media (max-width: 480px) {
    .feature-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
`;

function QRCode() {
  const cells = Array.from({ length: 64 }, (_, i) => {
    const seed = (i * 7 + 13) % 17;
    return seed > 8;
  });
  return (
    <div style={{ display: "inline-block", padding: "16px", border: "1px solid var(--outline-variant)", background: "white" }}>
      <div style={{ width: "192px", height: "192px", background: "black", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: "160px", height: "160px",
          border: "2px solid var(--primary)",
          display: "grid", gridTemplateColumns: "repeat(8, 1fr)",
          gap: "2px", padding: "4px",
        }}>
          {cells.map((filled, i) => (
            <div key={i} style={{
              background: filled ? "#deffa4" : "transparent",
              aspectRatio: "1",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AppDownloadsPage() {
  const platforms = [
    {
      icon: "desktop_windows",
      badge: "STABLE RELEASE",
      title: "WINDOWS",
      desc: "Full enterprise suite with multi-monitor support and local DVR backup management.",
      btnIcon: "download",
      btnLabel: "Get for Desktop",
      meta: "v24.11.0 (.EXE / 420MB)",
    },
    {
      icon: "android",
      badge: "MOBILE HUD",
      title: "ANDROID",
      desc: "Real-time push notifications and biometric security lock for remote field monitoring.",
      btnIcon: "play_apps",
      btnLabel: "Google Play",
      meta: "Supports Android 10+",
    },
    {
      icon: "ios",
      badge: "TACTICAL OS",
      title: "APPLE iOS",
      desc: "Native Metal API integration for high-frame-rate surveillance playback on Retina displays.",
      btnIcon: "store",
      btnLabel: "App Store",
      meta: "Optimized for iPhone 15 Pro",
    },
  ];

  const features = [
    { icon: "security", label: "E2E Encryption" },
    { icon: "speed", label: "Low Latency" },
    { icon: "cloud_sync", label: "Cloud Backup" },
    { icon: "notifications_active", label: "AI Alerts" },
    { icon: "group", label: "Multi-User" },
    { icon: "update", label: "Auto-Updates" },
  ];

  return (
    <>
      <style>{styles}</style>

      <main style={{ paddingTop: "clamp(90px, 12vw, 128px)", paddingBottom: "6rem" }}>
        {/* HERO */}
        <section style={{
          padding: "0 clamp(16px, 4vw, 64px)",
          maxWidth: "1440px", margin: "0 auto 5rem",
          textAlign: "center",
        }}>
          <div style={{
            display: "inline-block",
            padding: "4px 16px",
            background: "var(--primary)",
            color: "var(--on-primary)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "12px", letterSpacing: "4px", fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}>
            System Interface v4.0.2
          </div>
          <h1 className="hero-title" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(40px, 8vw, 72px)",
            lineHeight: 1.1,
            letterSpacing: "4px",
            fontWeight: 700,
            marginBottom: "2rem",
            textTransform: "uppercase",
          }}>
            COMMAND CENTRE.<br />
            <span style={{ color: "var(--primary)" }}>ANYWHERE.</span>
          </h1>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "18px", lineHeight: "28px",
            color: "var(--on-surface-variant)",
            maxWidth: "42rem", margin: "0 auto",
          }}>
            Deploy the NV/// ecosystem across all your tactical units. Optimized for low-latency surveillance streams and encrypted infrastructure management.
          </p>
        </section>

        {/* PLATFORM CARDS */}
        <section style={{
          padding: "0 clamp(16px, 4vw, 64px)",
          maxWidth: "1440px", margin: "0 auto 8rem",
        }}>
          <div className="platform-grid" style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            {platforms.map(({ icon, badge, title, desc, btnIcon, btnLabel, meta }) => (
              <div key={title} className={`platform-card crosshair-tl crosshair-br`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3rem" }}>
                  <span className="material-symbols-outlined" style={{
                    fontSize: "48px", color: "var(--primary)",
                    fontVariationSettings: "'FILL' 1",
                  }}>{icon}</span>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "12px", letterSpacing: "1px", fontWeight: 600,
                    background: "rgba(67,73,56,0.3)",
                    padding: "4px 12px",
                    color: "var(--on-surface-variant)",
                    textTransform: "uppercase",
                  }}>{badge}</span>
                </div>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "40px", lineHeight: 1.2,
                  letterSpacing: "2px", fontWeight: 700,
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                }}>{title}</h3>
                <p style={{
                  color: "var(--on-surface-variant)",
                  fontSize: "16px", lineHeight: "24px",
                  marginBottom: "2rem",
                }}>{desc}</p>
                <button className="download-btn">
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{btnIcon}</span>
                  {btnLabel}
                </button>
                <div style={{
                  marginTop: "1rem",
                  textAlign: "center",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "12px", letterSpacing: "1px", fontWeight: 600,
                  color: "var(--on-surface-variant)",
                  textTransform: "uppercase",
                }}>{meta}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURE ICONS */}
        <section style={{
          padding: "5rem clamp(16px, 4vw, 64px)",
          maxWidth: "1440px", margin: "0 auto",
          borderTop: "1px solid var(--outline-variant)",
          borderBottom: "1px solid var(--outline-variant)",
          marginBottom: "5rem",
        }}>
          <div className="feature-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "3rem",
            textAlign: "center",
          }}>
            {features.map(({ icon, label }) => (
              <div key={label} className="feature-item" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <div className="feature-icon-box">
                  <span className="material-symbols-outlined" style={{ fontSize: "28px", color: "var(--primary)" }}>{icon}</span>
                </div>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "12px", letterSpacing: "1px", fontWeight: 600,
                  textTransform: "uppercase", color: "var(--on-surface-variant)",
                }}>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* QR / DEPLOY SECTION */}
        <section style={{
          padding: "0 clamp(16px, 4vw, 64px)",
          maxWidth: "1440px", margin: "0 auto 5rem",
        }}>
          <div style={{
            border: "1px solid var(--outline-variant)",
            background: "var(--surface)",
            padding: "8px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div className="hud-scanline" style={{
              position: "absolute", inset: 0, opacity: 0.2, zIndex: 0,
            }} />
            <div style={{
              background: "var(--background)",
              minHeight: "500px",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              {/* bg grid texture */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(rgba(118,185,0,0.08) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                opacity: 0.6,
              }} />
              <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem" }}>
                <div style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "12px", letterSpacing: "5px", fontWeight: 700,
                  color: "var(--primary)", textTransform: "uppercase",
                  marginBottom: "1rem",
                }}>Terminal Simulation</div>
                <h2 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(24px, 4vw, 40px)",
                  letterSpacing: "2px", fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                }}>READY TO DEPLOY?</h2>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "16px", lineHeight: "24px",
                  color: "var(--on-surface-variant)",
                  maxWidth: "28rem", margin: "0 auto 2.5rem",
                }}>
                  Scan the code with your operational device to instantly pair your infrastructure with the NV/// mobile core.
                </p>
                <QRCode />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
 