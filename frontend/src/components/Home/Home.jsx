import { useState } from "react";
import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #131313;
    color: #e5e2e1;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
  }

  ::selection { background: #94da32; color: black; }

  @keyframes scanline {
    0% {
        top: 0;
    }
    100% {
        top: 100%;
    }
}
  @keyframes scanline {
  0% {
    transform: translateY(-10%);
  }

  100% {
    transform: translateY(110vh);
  }
}

@keyframes recordingPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.4;
    transform: scale(0.85);
  }
}

.scanline-effect {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
}

.scanline-effect::before {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 6px;

  background: linear-gradient(
    to right,
    transparent,
    rgba(181, 231, 93, 0.9),
    transparent
  );

  box-shadow:
    0 0 10px rgba(181, 231, 93, 0.5),
    0 0 20px rgba(181, 231, 93, 0.2);

  animation: scanline 5s linear infinite;
}

/* Recording HUD Frame */
.recording-frame {
  position: absolute;
  inset: 20px;
  border: 1px solid rgba(181, 231, 93, 0.25);
  pointer-events: none;
  z-index: 3;
}

/* Corner borders */
.recording-frame .corner {
  position: absolute;
  width: 40px;
  height: 40px;
  border-color: #B5E75D;
  border-style: solid;
}

.recording-frame .top-left {
  top: 0;
  left: 0;
  border-width: 3px 0 0 3px;
}

.recording-frame .top-right {
  top: 0;
  right: 0;
  border-width: 3px 3px 0 0;
}

.recording-frame .bottom-left {
  bottom: 0;
  left: 0;
  border-width: 0 0 3px 3px;
}

.recording-frame .bottom-right {
  bottom: 0;
  right: 0;
  border-width: 0 3px 3px 0;
}

/* REC Indicator */
.recording-indicator {
  position: absolute;
  top: 16px;
  left: 16px;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 6px 12px;

  background: rgba(0,0,0,0.7);
  border: 1px solid rgba(181,231,93,0.3);

  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  font-family: 'Inter', sans-serif;
}

.recording-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  background: #ff2d2d;

  animation: recordingPulse 1s infinite;
}
  .grid-overlay {
    background-size: 40px 40px;
    background-image:
      linear-gradient(to right, rgba(181,231,93,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(181,231,93,0.04) 1px, transparent 1px);
  }
  .luminous-glow {
    box-shadow: 0 0 15px rgba(181,231,93,0.2);
  }
  .text-glow {
    text-shadow: 0 0 10px rgba(181,231,93,0.5);
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: flex;
    width: max-content;
    animation: marquee 30s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes spin-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  .spin-slow { animation: spin 10s linear infinite; }
  .spin-reverse { animation: spin-reverse 15s linear infinite; }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    user-select: none;
  }
  .fill-icon { font-variation-settings: 'FILL' 1; }
`;

const colors = {
  background: "#131313",
  secondary: "#94da32",
  primaryContainer: "#b5e75d",
  onPrimaryContainer: "#466700",
  onSecondaryContainer: "#284300",
  surfaceContainer: "#20201f",
  surfaceContainerHigh: "#2a2a2a",
  surfaceContainerLow: "#1b1b1b",
  surfaceContainerLowest: "#0e0e0e",
  outlineVariant: "#434938",
  onSurfaceVariant: "#c3c9b3",
  onSurface: "#e5e2e1",
};

function Icon({ name, size = 24, fill = false, style = {}, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined${fill ? " fill-icon" : ""}${className ? " " + className : ""}`}
      style={{ fontSize: size, ...style }}
    >
      {name}
    </span>
  );
}

function Header() {

  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "16px 24px",
        maxWidth: 1280,
        margin: "0 auto",
        borderBottom: "1px solid transparent",
        background: "rgba(19,19,19,0.95)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Logo */}
      <a
        href="/"
        style={{
          textDecoration: "none",
        }}
      >
        <div
          style={{
            fontFamily: "'Arial Black', sans-serif",
            fontStyle: "italic",
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <span>
            <span style={{ color: "#B5E75D" }}>N</span>
            <span style={{ color: "#FFFFFF" }}>V</span>
            <span style={{ color: "#B5E75D" }}>//</span>
          </span>

          <span style={{ color: "#FFFFFF" }}>
            NIGHTVISION™
          </span>
        </div>
      </a>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          marginLeft: "20px",
        }}
      >
        {["CCTV CAMERAS", "ABOUT US", "CONTACT US", "DEALERSHIPS"].map(
          (item, i) =>
            item === "ABOUT US" ? (
              <a
                key={item}
                href="/about"
                style={{
                  color: colors.onSurfaceVariant,
                  borderBottom: "2px solid transparent",
                  paddingBottom: "6px",
                  fontFamily: "'Arial Black', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "1px",
                  textDecoration: "none",
                  lineHeight: 1,
                }}
              >
                ABOUT US
              </a>
            ) : (
              <a
                key={item}
                href="#"
                style={{
                  color:
                    i === 0
                      ? colors.secondary
                      : colors.onSurfaceVariant,

                  borderBottom:
                    i === 0
                      ? `2px solid ${colors.secondary}`
                      : "2px solid transparent",

                  paddingBottom: "6px",

                  fontFamily: "'Arial Black', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "1px",
                  textDecoration: "none",
                  lineHeight: 1,
                }}
              >
                {item}
              </a>
            )
        )}
      </nav>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "nowrap",
        }}
      >
        <span
          style={{
            fontFamily: "'Arial Black', sans-serif",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: 1,
            color: colors.secondary,
            marginRight: 16,
            marginLeft: "20px",
            whiteSpace: "nowrap",
          }}
        >
          SUPPORT HOTLINE: +977-9745978217
        </span>

        <a
  href="/cart"
  style={{
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  }}
>
  <Icon
    name="shopping_cart"
    size={24}
    style={{
      color: colors.onSurfaceVariant,
      cursor: "pointer",
      flexShrink: 0,
    }}
  />
</a>

        {/* Account Dropdown */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setAccountOpen(!accountOpen)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon
              name="account_circle"
              size={24}
              style={{
                color: colors.onSurfaceVariant,
                flexShrink: 0,
              }}
            />
          </div>

          {accountOpen && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                width: "220px",
                background: "#20201f",
                border: "1px solid #434938",
                zIndex: 999,
              }}
            >
              {[
                "My Profile",
                "Dashboard",
                "Orders",
                "Settings",
                "Logout",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    display: "block",
                    padding: "14px",
                    color: "#c3c9b3",
                    textDecoration: "none",
                    borderBottom: "1px solid #434938",
                    fontFamily: "Inter",
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="grid-overlay" style={{
      position: "relative", minHeight: 700, height: "100vh",
      display: "flex", alignItems: "center", overflow: "hidden",
      borderBottom: `1px solid ${colors.outlineVariant}`,
    }}>
      <div className="scanline-effect" />
      <div className="recording-frame">
        <div className="corner top-left"></div>
        <div className="corner top-right"></div>
        <div className="corner bottom-left"></div>
        <div className="corner bottom-right"></div>

        <div className="recording-indicator">
          <span className="recording-dot"></span>
          REC
        </div>
      </div>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80,
        alignItems: "center", position: "relative", zIndex: 10,
      }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            color: colors.secondary, border: `1px solid ${colors.secondary}`,
            padding: "4px 12px", fontFamily: "'Inter', sans-serif",
            fontWeight: 600, fontSize: 12, letterSpacing: 1, width: "fit-content",
          }}>
            <span className="animate-pulse" style={{ width: 8, height: 8, background: "#dc2626", borderRadius: "50%", display: "inline-block" }} />
            LIVE VIGILANCE SYSTEM ACTIVE
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
            ADVANCED{" "}
            <span className="text-glow" style={{ color: colors.secondary }}>SURVEILLANCE</span>
            {" "}FOR PEACE OF MIND
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, padding: "24px 0" }}>
            <button style={{
              background: colors.primaryContainer, color: colors.onPrimaryContainer,
              padding: "24px 48px", fontFamily: "'Arial Black', sans-serif",
              fontWeight: 600, fontSize: 12, letterSpacing: 1, border: "none",
              cursor: "pointer", transition: "all 0.2s",
            }}>VIEW CCTV CAMERAS</button>
            <button style={{
              background: "transparent", border: `1px solid ${colors.secondary}`,
              color: colors.secondary, padding: "24px 48px",
              fontFamily: "'Arial Black', sans-serif", fontWeight: 600,
              fontSize: 12, letterSpacing: 1, cursor: "pointer", transition: "all 0.2s",
            }}>OUR STORY</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: `1px solid ${colors.outlineVariant}`, paddingTop: 24 }}>
            {[["6+ YEARS", "EXPERTISE"], ["50+ DEALERS", "NATIONWIDE"], ["4K RES", "ULTRA HD"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 600, letterSpacing: 1, color: colors.secondary }}>{val}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 1, fontWeight: 600, opacity: 0.6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "relative", width: 400, height: 400, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="spin-slow" style={{ position: "absolute", inset: 0, border: `1px solid rgba(181,231,93,0.2)`, borderRadius: "50%" }} />
            <div className="spin-reverse" style={{ position: "absolute", inset: 32, border: `1px solid rgba(181,231,93,0.4)`, borderRadius: "50%" }} />
            <div style={{ position: "absolute", inset: 64, border: `1px solid rgba(181,231,93,0.1)`, borderRadius: "50%" }} />
            <div className="luminous-glow" style={{
              position: "relative", zIndex: 10, padding: 24,
              background: colors.surfaceContainerHigh, border: `2px solid ${colors.secondary}`,
            }}>
              <Icon name="videocam" size={64} fill style={{ color: colors.secondary }} />
            </div>
            <div style={{
              position: "absolute", top: 0, right: 0,
              background: colors.surfaceContainer, border: `1px solid ${colors.outlineVariant}`,
              padding: 8, fontFamily: "'Inter', sans-serif", fontSize: 10,
              fontWeight: 600, letterSpacing: 1, color: colors.secondary,
            }}>
              POS_X: 27.7172° N<br />POS_Y: 85.3240° E
            </div>
            <div style={{
              position: "absolute", bottom: 40, left: 0,
              background: colors.secondary, color: "black",
              padding: 8, fontFamily: "'Inter', sans-serif",
              fontSize: 10, fontWeight: 700,
            }}>
              ENCRYPTED_STREAM_V4
            </div>
          </div>
        </div>
      </div>
      {[{ top: 16, left: 16 }, { top: 16, right: 16 }, { bottom: 16, left: 16 }, { bottom: 16, right: 16 }].map((pos, i) => (
        <div key={i} style={{ position: "absolute", color: colors.secondary, fontWeight: 700, fontSize: 20, ...pos }}>+</div>
      ))}
    </section>
  );
}

function TickerStrip() {
  const text = "NightVision™ /// CCTV Cameras Nepal /// 4K Surveillance /// Made for Nepal ///";
  return (
    <div style={{ background: colors.primaryContainer, color: colors.onPrimaryContainer, padding: "16px 0", overflow: "hidden", borderTop: `1px solid ${colors.secondary}`, borderBottom: `1px solid ${colors.secondary}` }}>
      <div className="animate-marquee" style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, textTransform: "uppercase" }}>
        {[text, text, text].map((t, i) => <span key={i} style={{ margin: "0 32px" }}>{t}</span>)}
      </div>
    </div>
  );
}

const features = [
  { icon: "wifi", title: "Wi-Fi Plug & Play", desc: "Zero-config setup for instant deployment and cloud-ready streaming." },
  { icon: "nights_stay", title: "True Night Vision", desc: "Advanced IR matrix for crystal clear visibility in total zero-lux darkness." },
  { icon: "edgesensor_high", title: "Mobile App Control", desc: "Secure remote monitoring and push alerts directly to your smartphone." },
  { icon: "encrypted", title: "Secured & Private", desc: "Military-grade AES encryption ensures your feeds remain for your eyes only." },
];

function FeaturesStrip() {
  return (
    <section style={{ padding: "80px 0", background: colors.background, borderBottom: `1px solid ${colors.outlineVariant}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
        {features.map(({ icon, title, desc }) => (
          <div key={title} style={{
            border: `1px solid ${colors.outlineVariant}`, padding: 24,
            transition: "border-color 0.2s", cursor: "default",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = colors.secondary}
            onMouseLeave={e => e.currentTarget.style.borderColor = colors.outlineVariant}
          >
            <Icon name={icon} size={40} style={{ color: colors.secondary, display: "block", marginBottom: 16 }} />
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>{title}</h3>
            <p style={{ color: colors.onSurfaceVariant, fontSize: 16, lineHeight: 1.5 }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const products = [
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKHBBETCmvmUDQXf390HXH-OlLjt2T2Z4s9EC6-TW4V9RlTL9LDydP63qLr5Py_SRLNUliBf0UA5Y_fc94gecfuM7O-rD_-QNerIsTapATapXDASP7tBaQ8zVLuYLbb_eJ8KLKnrNCKfjx_ltLHGjxoWhsuAiuZ-f_Bjnoe_VT2SjWB7x_jc2-N3cjaIzw8XoX1Oypit-7Wtn5e0Q_MqH_iZ1wu78MZV0j44LdGzyX7vOrU66BFchUdarBt8rPcdnIgQ9SHW8Uhz8", name: "Y1-Ratri Dome", desc: "Panoramic 360° coverage with ultra-sensitive low-light sensor.", badge: "TOP RATED" },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgcCRYs_yF2xy-9uwk40FL--od49NB3LnYiZrjRPPbJIDk-HYXhCfyPdl9IqOcbeSPMOZeGqoY2EuJ0OF3iV88AhVjGANMwFRSY1HXDBd6SkGXEQuXgbZNVnfAtybEyF76OIFcMWJPhc2ugW6U5te7uPO4XWXVTcORKGHGg0BtooUmr3mMud1P4WFo1p-pSxOCNFSSinCjGDS9w4xh1wik9n0yTX-MbSPlXOb6GU6vT1ZqwbNl_GJILbfTPrf4y3L5pdn3DxGT_d0", name: "T5P-Ratri Bullet", desc: "Weatherproof IP67 rating for the most extreme Himalayan environments." },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_0jwAJrQ8dajeh88POWFOl_YsHl4_Mu62DwjESmhOUmZYOQDJr6pJUK4w-8QavfC9K7od-k8mmKZ0Fda6NWkPLO9Lnapojg8vwsQaC6WxaEVAryPVn-v_mtyLDWw6C4z0RIwM28IZ1lM2Iif4NNn2CKPdl17_R7hgIXk9JCsGC0sqAWLWIq3zU7Z0P0vuFpWVfiYw76QuNs_NtDFe5IrZOJ3k2PljfAadEo8B_Z-JJVsRsqvH5bgRMW_lsYl1qli9p8jtBeZVJqU", name: "Ratri G11", desc: "AI-powered facial recognition and automated motion tracking." },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfmkbSFVJ8AlzhQZHjMM4pIiv2OYIDhHkMZsWnmMTKqm9GwRMBdIZX2nZtMt94Rn9WI1BacR8uuqTkmZl_vWiGITSLb49PmCUbbZ5M81mz2w_VyCO_KCjT7d-p9hzUHt4rvyKm4OXLTA1XrWaJUvzewFlMad6e3pebPKLMVM7HknUwJL2jt6HUAMzjyO_-JJH3L6zzV8GnKhvA1im_7ZfPFJuRx-skTuwyvbK7kLrYtRHDbm4bdy8", name: "CCTV Netra V6Z", desc: "Vari-focal lens for wide-angle monitoring or precision zooming." },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp1Xc0d9UMtUth6QS2N6GCirYIIla4mss3eq30soweXB3PpYj8E6HRJzdHMxBAAEBv63GF_ZiG-NkI3AvEGe0e16F-FMhLLk6qKCWN7LcvPEUP7DKzP7YeC3pA1dz_nRVx6s3TOp6jtm2KM5WnYLwI5gu-IpY2NLtvOLVPuqrtLASW4YQeyYy7_vvnJ3KzGD3Oj12-dTRSB4yQEpMxwXLDeEsBGZAm-X8KjGArbhWKJ8HfncIbAogSDovzMdnFW1erfKaDP_dgrjs", name: "CCTV Netra S8", desc: "Sleek minimalist design for high-end residential interiors." },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6nJ28PT7hwgDgMTnv4LwnYFRSuyv7f2dQaqjHSDFGw9xxwZJU_W3GuNkymfHqJt2__WFhPijujtvP4iyfDwVJ-1E7O1r6Ppiz9a6aCiy2bRPVAGASdO9Bc-q28Ev4KcukZlWIS_lTIdrLtFgAlJ6LaNltMGhp8b-PI8ajyxR7Y3UB5C81Hn8yiPvnvl42524i6_u5_LZ8pT0UUNybRbzERuc6VzHaYhGiXlKAhB-EhT_4t9cWj55oS_Fu08kiXYa7UJAhDxVKkps", name: "F7-Netra Indoor PT", desc: "Remote pan-tilt control with two-way audio communication." },
];

function ProductCard({ img, name, desc, badge }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", background: colors.surfaceContainer, padding: 16, border: `1px solid ${colors.outlineVariant}`, overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(transparent, transparent 3px, rgba(181,231,93,0.05) 4px)", opacity: 0.1, pointerEvents: "none" }} />
      <img src={img} alt={name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", marginBottom: 24, filter: hovered ? "grayscale(0%)" : "grayscale(100%)", transition: "filter 0.5s" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 600, letterSpacing: 1 }}>{name}</h4>
        {badge && <span style={{ background: colors.secondary, color: "black", fontSize: 10, fontWeight: 700, padding: "2px 8px" }}>{badge}</span>}
      </div>
      <p style={{ color: colors.onSurfaceVariant, fontSize: 14, marginBottom: 24 }}>{desc}</p>
      <button style={{
        width: "100%", padding: 12,
        background: hovered ? colors.secondary : "transparent",
        border: `1px solid ${colors.secondary}`,
        color: hovered ? "black" : colors.secondary,
        fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
        fontFamily: "'Inter', sans-serif",
      }}>ADD TO CART</button>
    </div>
  );
}

function ProductsSection() {
  return (
    <section style={{ padding: "80px 0", background: colors.surfaceContainerLow }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <span style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Precision Hardware</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 700, letterSpacing: 2, lineHeight: 1.2 }}>ELITE SERIES CAMERAS</h2>
          </div>
          <a href="#" style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 1, textDecoration: "underline", textUnderlineOffset: 8 }}>EXPLORE FULL CATALOG →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {products.map(p => <ProductCard key={p.name} {...p} />)}
        </div>
      </div>
    </section>
  );
}

const feedImages = [
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6m1m1Vm2BOHDpuBCfGumnRW-K7M4sTyoXuE5eow-HUvT_hUoQZnwegJR82S__R-p7h8SV8CEat9SeqsCt9ybFOjwa8rKPeyEZT27NYvwY5REi8WCVibcXJ0PN788IjJm8UFKxYZOwrHdIAHrPyKMtYzVLTTsu8yPRbQY05JaFvCe0tY4wmjAY0mmicB_sIMVPOPOGIfq2XLk6p-r1A3R9KgfAYz3fyI1q1hhJ4zJsPjYo469T3MJVYBVd_Fk-KPJHqBoR8QqdAdE", ch: "CH_01" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEMnaINAh3EswS8eCmgTgoMZ5dG6LH2RGzqbc6xCzDLCHHtzed4vU9LAYxw7vCC2h0H2VMxvJlPZCBFPBdYJhs37Bsb5ZWu_7r11ZvCJYaKscjCYzq4-8CkXPzGP8_KHUoZCb3GrE5cygV0JNRgKqIXNoI34xSvQFG0bTfoT-9kM-bjGAFOpE-XYbdY2fI2qjX9n6vDHC99rN3myr2CWiADLQV8P-C_KDGMr5Ko0TRLo2NpicV6QZBLX2T6RJ3iw7uc8syFhHpaNk", ch: "CH_02" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD7XlANExXK5XNxGmgJKJAx6CBOHKIMrd0bjnQF-TvQUrx0IgJYfOPQrX_6uYJ6asacspqbZAjeGI590bzUY6j2SxbiaFpxBrqHG-Djzd1GZzA1WGD8EnnHa9yP3VF3j0Pf_qZj8UMgkcW4tPZYcDFIsNCzBJXpf80Rx5GVK4hzs8dPCgb_LZueQVzw9GmPRPycv_p_0zgIv_0zBUIaGxQ7ZH_5u6od0zk7_ZW8yUhzfz99jJcIqbkcHHCjZd8nvSLXVVYuYbDIPI", ch: "CH_03" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDX0b4nWvqCK6KsYFNAMo-7GG5nb4ri2eUeTEneO5ssvw-QoP6IQ-M1W6JTCWJUfFHF8KeAKyE_b2ShEsthOChSrBCYU5GsCvpG0MqRe1Y0wiVE_KC2P-i5ua9FjJRF3zxGvZ2E846uGeitkiEQRK5b9IRvSW41sq2skJ8hdKnPe0NUsn69MRV3pnoL-bgEJj1OibPXwGpztM-bwW29wF_iFopoXtMuKYu-aQ3p4ePeyyy70HSM4xS2K8ruBX1nu770yRr5af5JFD4", ch: "CH_04" },
];

function WhySection() {
  return (
    <section style={{ padding: "80px 0", background: colors.background, overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `1px solid ${colors.secondary}` }}>
          {feedImages.map(({ src, ch }, i) => (
            <div key={ch} style={{ position: "relative", aspectRatio: "16/9", background: "black", borderTop: i >= 2 ? `1px solid ${colors.secondary}` : "none", borderLeft: i % 2 === 1 ? `1px solid ${colors.secondary}` : "none" }}>
              <img src={src} alt={ch} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, transition: "opacity 0.2s", display: "block" }}
                onMouseEnter={e => e.currentTarget.style.opacity = 0.8}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
              />
              <div style={{ position: "absolute", top: 8, left: 8, fontSize: 10, background: "#dc2626", color: "white", padding: "0 4px" }}>REC • {ch}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>The NightVision Edge</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 700, letterSpacing: 2, lineHeight: 1.2 }}>UNCOMPROMISING VIGILANCE TECHNOLOGY</h2>
          <p style={{ color: colors.onSurfaceVariant, fontSize: 18, lineHeight: 1.6 }}>We don't just sell cameras; we deploy comprehensive security ecosystems tailored for the unique challenges of Nepal's infrastructure.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, paddingTop: 8 }}>
            {[["Weatherproof","IP67 RATED"],["24/7 Monitoring","ZERO DOWNTIME"],["Remote Access","GLOBAL LINK"],["Smart Alerts","AI DETECTION"]].map(([val,label]) => (
              <div key={label} style={{ borderLeft: `4px solid ${colors.secondary}`, paddingLeft: 16, paddingTop: 8, paddingBottom: 8 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: colors.secondary }}>{val}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 1, opacity: 0.6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section style={{ padding: "80px 0", background: colors.surfaceContainerLow, borderTop: `1px solid ${colors.outlineVariant}`, borderBottom: `1px solid ${colors.outlineVariant}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 80 }}>
        <div style={{ width: "33%", position: "relative", flexShrink: 0 }}>
          <div style={{ position: "absolute", top: -16, left: -16, width: 96, height: 96, borderTop: `2px solid ${colors.secondary}`, borderLeft: `2px solid ${colors.secondary}` }} />
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR-fMv0L3rig500Ni-Aqy_inAOQOkYWFt0SK4N7sg0Qln0eypxaQbEQUccQzDObpveJrt2D5h6C1e11lVByZQk5_fcQDg0yyRBF86zgf3XZDaa7s319Xe4WgHzlF-eKG_lx72nLafgeMYNWopSh2Gz6Uqyr2GWv91WErMPapq7JoJlCn2mjMVlYlD-OkvL9Qa_zsNUqoP54O-QyO3W99yBi7-I_S1Zkhs7cgfMmN1kQUIzH7tesLUMFyVOLTEuh_0M0murXYUYOkQ" alt="Rozil Thapa" style={{ width: "100%", filter: "grayscale(100%) brightness(0.75)", borderBottom: `8px solid ${colors.secondary}`, display: "block" }} />
          <div style={{ position: "absolute", bottom: 16, left: 16, background: colors.secondary, color: "black", padding: 16, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>ROZIL THAPA</div>
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 16 }}>Our Founder's Vision</span>
          <blockquote style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 700, lineHeight: 1.2, fontStyle: "italic", marginBottom: 24, position: "relative" }}>
            <span style={{ position: "absolute", top: -32, left: -32, color: "rgba(181,231,93,0.2)", fontSize: 128, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>"</span>
            The vision behind NV// was never just about hardware. It was about reclaiming safety in a world that never sleeps.
          </blockquote>
          <p style={{ color: colors.onSurfaceVariant, fontSize: 18, lineHeight: 1.6, marginBottom: 24 }}>Founder Rozil Thapa started NightVision with a singular mission: to provide the people of Nepal with security technology that rivals the global elite, without compromise.</p>
          <a href="/founder">
  <button
    style={{
      background: colors.primaryContainer,
      color: colors.onPrimaryContainer,
      padding: "24px 48px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: 1,
      border: "none",
      cursor: "pointer",
    }}
  >
    READ THE FULL STORY
  </button>
</a>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { text: '"NightVision transformed our facility\'s security protocol. The Ratri Dome clarity is unparalleled even in pitch black."', author: "— S. RAJBHANSARI, INDUSTRIALIST" },
  { text: '"The mobile app integration is flawless. I can monitor my store from anywhere in the world with zero lag."', author: "— A. SHRESTHA, RETAIL GROUP" },
  { text: '"Exceptional support and robust hardware. These cameras handle the monsoon season without a single glitch."', author: "— K. TAMANG, ESTATE MANAGER" },
];

function TestimonialsSection() {
  return (
    <section style={{ padding: "80px 0", background: colors.background }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 700, letterSpacing: 2, textAlign: "center", marginBottom: 48 }}>TRUSTED BY LEADERS</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {testimonials.map(({ text, author }) => (
            <div key={author} style={{ border: `1px solid ${colors.secondary}`, padding: 24, background: colors.surfaceContainerLowest }}>
              <div style={{ display: "flex", color: colors.secondary, marginBottom: 16 }}>
                {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={24} fill style={{ color: colors.secondary }} />)}
              </div>
              <p style={{ fontStyle: "italic", marginBottom: 24, fontSize: 16, lineHeight: 1.5 }}>{text}</p>
              <div style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 1 }}>{author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DealerSection() {
  return (
    <section style={{ position: "relative", background: colors.secondary, padding: "80px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.1, pointerEvents: "none" }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "25vw", fontWeight: 700, color: "white", lineHeight: 1 }}>DEALER</span>
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10, textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 64, fontWeight: 700, letterSpacing: -2, color: "black", marginBottom: 24 }}>EXPAND THE NETWORK</h2>
        <p style={{ color: colors.onSecondaryContainer, fontSize: 18, lineHeight: 1.6, maxWidth: 672, margin: "0 auto 48px", fontWeight: 700 }}>Join the elite force of NightVision security providers across Nepal. We provide the gear, the training, and the authority.</p>
        <button style={{ background: "black", color: colors.secondary, padding: "24px 80px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, border: "none", cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >BECOME A PARTNER</button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "48px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 24, maxWidth: 1280, margin: "0 auto", background: colors.surfaceContainerLowest, borderTop: `1px solid ${colors.secondary}` }}>
      <div style={{ gridColumn: "1/2" }}>
        <div
  style={{
    fontFamily: "'Arial Black', sans-serif",
    fontStyle: "italic",
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: 1,
    marginBottom: 24,
  }}
>
  <span style={{ color: colors.secondary }}>N</span>
  <span style={{ color: "#ffffff" }}>V</span>
  <span style={{ color: colors.secondary }}>//</span>
</div>
        <p style={{ color: colors.onSurfaceVariant, fontSize: 16, lineHeight: 1.5, maxWidth: 384, marginBottom: 24 }}>Dedicated to the highest standard of surveillance technology and national security for Nepal. Vigilance is our duty.</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["public", "share", "chat"].map(icon => <Icon key={icon} name={icon} size={24} style={{ color: colors.secondary, cursor: "pointer" }} />)}
        </div>
      </div>
      <div>
        <h5 style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 24 }}>Navigation</h5>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {["Privacy Policy", "Terms of Service", "Support"].map(item => (
            <li key={item}><a href="#" style={{ color: colors.onSurfaceVariant, fontSize: 16, textTransform: "uppercase", letterSpacing: 1, textDecoration: "none" }}>{item}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h5 style={{ color: colors.secondary, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 24 }}>Corporate</h5>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {["Warranty", "Careers"].map(item => (
            <li key={item}><a href="#" style={{ color: colors.onSurfaceVariant, fontSize: 16, textTransform: "uppercase", letterSpacing: 1, textDecoration: "none" }}>{item}</a></li>
          ))}
        </ul>
      </div>
      <div style={{ gridColumn: "1/-1", paddingTop: 48, marginTop: 48, borderTop: `1px solid ${colors.outlineVariant}`, textAlign: "center" }}>
        <p style={{ color: colors.onSurfaceVariant, fontSize: 16, textTransform: "uppercase", letterSpacing: 1 }}>© 2024 NIGHTVISION SECURITY SYSTEMS. ALL RIGHTS RESERVED. UNCOMPROMISING VIGILANCE.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{styles}</style>
      <div style={{ background: colors.background, color: colors.onSurface, minHeight: "100vh" }}>
        <Header />
        <main>
          <HeroSection />
          <TickerStrip />
          <FeaturesStrip />
          <ProductsSection />
          <WhySection />
          <FounderSection />
          <TestimonialsSection />
          <DealerSection />
        </main>
        <Footer />
      </div>
    </>
  );
}