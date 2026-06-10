import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllDealers } from "../../../utils/cmsDb";
import Icon from "../../../utils/Icon";

// Brand Color Tokens (NIGHTVISION™ Cohesive Palette)
const C = {
  primary: "#B5E75D",      // Lime Green Accent
  primaryDk: "#76B900",
  white: "#FFFFFF",
  dark: "#131313",
  surface: "#1a1d14",      // Dark Forest Surface
  surfaceMid: "#1e2117",
  surfaceHi: "#282b21",
  outline: "#434938",
  outlineHi: "#8D937F",
  onSurface: "#e2e4d5",
  onMuted: "#c3c9b3",
  error: "#ff6b6b",
};

// Reusable Corner Marks
const CornerMarks = () => (
  <>
    {[
      { top: 0, left: 0, borderWidth: "1px 0 0 1px" },
      { top: 0, right: 0, borderWidth: "1px 1px 0 0" },
      { bottom: 0, left: 0, borderWidth: "0 0 1px 1px" },
      { bottom: 0, right: 0, borderWidth: "0 1px 1px 0" },
    ].map((s, i) => (
      <span
        key={i}
        style={{
          position: "absolute",
          width: 12,
          height: 12,
          borderColor: C.primary,
          borderStyle: "solid",
          ...s,
        }}
      />
    ))}
  </>
);

export default function DynamicDealerProfile() {
  const { slug } = useParams();
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getAllDealers().then((list) => {
      const found = list.find(
        (d) =>
          String(d.id).toLowerCase() === String(slug).toLowerCase() ||
          (d.companyName || d.name || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-") === String(slug).toLowerCase()
      );
      setDealer(found || null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ background: C.dark, minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", color: C.primary, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14 }}>
        CONNECTING SECURE UPLINK FEED...
      </div>
    );
  }

  if (!dealer) {
    return (
      <div style={{ background: C.dark, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: C.onSurface, padding: 40, fontFamily: "'Poppins', sans-serif" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.error, fontSize: 32, marginBottom: 16 }}>DEALER NOT REGISTERED</h2>
        <p style={{ color: C.onMuted, marginBottom: 24, textAlign: "center", maxWidth: 460 }}>
          The requested system node could not be resolved in the certified directory.
        </p>
        <Link to="/dealership" style={{ color: C.primary, textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", fontWeight: "bold" }}>
          ← RETURN TO DEALERS NETWORK
        </Link>
      </div>
    );
  }

  const name = dealer.companyName || dealer.name;
  const isPlatinum = dealer.isPlatinum || dealer.status === "PLATINUM PARTNER";

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: C.dark, color: C.onSurface, minHeight: "100vh", paddingTop: "80px", cursor: "default" }}>
      {/* Google Fonts Link */}
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <style>{`
        .dealer-header { padding: 48px 24px; border-bottom: 1px solid ${C.outline}; position: relative; }
        .dealer-main-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 32px; padding: 48px 24px; max-width: 1440px; margin: 0 auto; }
        .info-pill { display: inline-flex; align-items: center; border: 1px solid ${C.primary}; background: rgba(181, 231, 93, 0.08); padding: 4px 14px; margin-bottom: 24px; font-family: 'Space Grotesk', monospace; font-size: 10px; letter-spacing: 2px; color: C.primary; }
        @media (max-width: 991px) {
          .dealer-main-grid { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>

      {/* ── HERO HEADER ── */}
      <header className="dealer-header">
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: `1px solid ${C.primary}`,
            background: "rgba(181, 231, 93, 0.08)",
            padding: "4px 14px",
            marginBottom: 20,
            fontFamily: "'Space Grotesk', monospace",
            fontSize: 10,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: C.primary
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.primary, display: "inline-block" }} />
            {isPlatinum ? "PLATINUM PARTNER" : "AUTHORIZED PARTNER"}
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 11, letterSpacing: 2, color: C.outlineHi, marginBottom: 8, textTransform: "uppercase" }}>
                NV// CERTIFIED NODE DIRECTORY
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 60px)", letterSpacing: "-1px", textTransform: "uppercase", color: C.white, lineHeight: 1.0, marginBottom: 16 }}>
                {name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.onMuted }}>
                <Icon name="location_on" size={18} style={{ color: C.primary }} />
                <span style={{ fontSize: 15 }}>{dealer.location}</span>
              </div>
            </div>

            <div style={{ border: `1px solid ${C.outline}`, padding: "16px 28px", background: C.surface, borderRadius: "4px" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: 4, color: C.primary }}>NV//</div>
              <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 9, letterSpacing: 2, color: C.outlineHi, textTransform: "uppercase", marginTop: 4 }}>
                SECURE DISTRIBUTOR
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT GRID ── */}
      <main className="dealer-main-grid">
        {/* LEFT COLUMN: CONTACT CARDS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* SECURE BASE INFO */}
          <div style={{ background: C.surfaceMid, border: `1px solid ${C.outline}`, padding: 32, position: "relative", borderRadius: 4 }}>
            <CornerMarks />
            <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.primary, borderBottom: `1px solid rgba(181, 231, 93, 0.15)`, paddingBottom: 12, marginBottom: 24 }}>
              Operator Specifications
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Phone info */}
              {dealer.phone && (
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, border: `1px solid ${C.outline}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: C.primary }}>
                    <Icon name="phone" size={18} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: C.outlineHi, marginBottom: 4 }}>
                      Secure Telephone Link
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: C.white }}>{dealer.phone}</div>
                  </div>
                </div>
              )}

              {/* Email info */}
              {dealer.email && (
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, border: `1px solid ${C.outline}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: C.primary }}>
                    <Icon name="mail" size={18} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: C.outlineHi, marginBottom: 4 }}>
                      Channel Email Address
                    </div>
                    <div style={{ fontSize: 14, color: C.onMuted }}>{dealer.email}</div>
                  </div>
                </div>
              )}

              {/* Business type */}
              {dealer.businessType && (
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, border: `1px solid ${C.outline}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: C.primary }}>
                    <Icon name="settings" size={18} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: C.outlineHi, marginBottom: 4 }}>
                      Operational Profile
                    </div>
                    <div style={{ fontSize: 14, color: C.onMuted }}>{dealer.businessType}</div>
                  </div>
                </div>
              )}

              {/* Duty Hours (Simulated standard) */}
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginTop: 8 }}>
                <div style={{ width: 36, height: 36, border: `1px solid ${C.outline}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: C.primary }}>
                  <Icon name="schedule" size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: C.outlineHi, marginBottom: 8 }}>
                    Standard Duty Hours
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.outline}`, paddingBottom: 4, marginBottom: 4, fontSize: 13, color: C.onMuted }}>
                    <span>Sun – Fri</span>
                    <span style={{ color: C.primary, fontFamily: "monospace" }}>09:00 – 18:00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 4, fontSize: 13, color: C.onMuted }}>
                    <span>Saturday</span>
                    <span style={{ color: C.error, fontFamily: "monospace" }}>CLOSED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
              {dealer.phone && (
                <button
                  onClick={() => (window.location.href = `tel:${dealer.phone.replace(/\s+/g, "")}`)}
                  style={{
                    background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDk})`,
                    color: C.dark,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    height: 48,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    borderRadius: "4px"
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Icon name="phone" size={16} /> INITIATE CALL LINK</span>
                </button>
              )}
              {dealer.mapUrl && (
                <button
                  onClick={() => window.open(dealer.mapUrl, "_blank")}
                  style={{
                    background: C.surfaceHi,
                    border: `1px solid ${C.outline}`,
                    color: C.white,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 12,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    height: 48,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    borderRadius: "4px",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.outline; e.currentTarget.style.color = C.white; }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Icon name="directions" size={16} /> DIRECTIONS (GOOGLE MAPS)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL DESCRIPTIONS & MOCK SCANNER MAP */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* MOCK SCANNING RADAR MAP */}
          <div style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            overflow: "hidden",
            background: "#0d0f0a",
            border: `1px solid ${C.outline}`,
            borderRadius: 4
          }}>
            {/* Grid overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "linear-gradient(to right, rgba(181,231,93,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(181,231,93,0.05) 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }} />
            
            {/* Scanner line animation */}
            <div style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(to right, transparent, ${C.primary}, transparent)`,
              animation: "verticalScan 4s linear infinite",
              boxShadow: `0 0 10px ${C.primary}`
            }} />

            {/* Target point indicator */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <div style={{
                width: 14,
                height: 14,
                background: C.primary,
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                animation: "pinPulse 1.5s infinite ease-in-out"
              }} />
              <div style={{
                fontSize: 9,
                fontFamily: "monospace",
                color: C.primary,
                marginTop: 8,
                background: "rgba(17, 20, 12, 0.85)",
                padding: "2px 6px",
                border: `1px solid ${C.outline}`,
                letterSpacing: 1
              }}>
                TARGET_NODE_ACQUIRED
              </div>
            </div>

            {/* Signal text widget */}
            <div style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              fontFamily: "monospace",
              fontSize: 10,
              color: C.outlineHi,
              background: "rgba(17, 20, 12, 0.8)",
              padding: "4px 8px",
              border: `1px solid ${C.outline}`
            }}>
              SYS_LINK: ACTIVE // 100%
            </div>

            <style>{`
              @keyframes verticalScan {
                0% { top: 0%; }
                50% { top: 100%; }
                100% { top: 0%; }
              }
              @keyframes pinPulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.3); opacity: 0.6; }
              }
            `}</style>
          </div>

          {/* BUSINESS BRIEF */}
          <div style={{ background: C.surfaceMid, borderLeft: `3px solid ${C.primary}`, padding: 36, borderRadius: 4 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: 2, textTransform: "uppercase", color: C.white, marginBottom: 20 }}>
              Base Operations & Scope
            </h2>
            <p style={{ fontSize: 15, color: C.onMuted, lineHeight: 1.8 }}>
              {dealer.brief || `${name} is an authorized NV// NIGHTVISION™ security partner in ${dealer.location}. They offer custom site audits, specialized integration of high-resolution digital cameras, optical switches, storage systems, and post-installation support.`}
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER UPLINK BACK LINK */}
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 0 80px" }}>
        <Link to="/dealership" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 12,
          fontWeight: 700,
          color: C.primary,
          textDecoration: "none",
          letterSpacing: 2,
          border: `1px solid ${C.outline}`,
          padding: "12px 24px",
          background: C.surface,
          borderRadius: "4px",
          transition: "all 0.2s"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.background = C.surfaceHi; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.outline; e.currentTarget.style.background = C.surface; }}
        >
          ← UPLINK TO ACTIVE DIRECTORY
        </Link>
      </div>
    </div>
  );
}
