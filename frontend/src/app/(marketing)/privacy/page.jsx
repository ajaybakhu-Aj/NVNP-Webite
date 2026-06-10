import { useState, useEffect, useRef } from "react";
import { useSiteContents } from "../../../utils/cmsDb";
import PageHeroBanner from "../../../components/ui/PageHeroBanner";

const C = {
  bg: "#000000",
  surface: "#131313",
  surfaceLow: "#1b1b1b",
  surfaceLowest: "#0e0e0e",
  surfaceContainer: "#20201f",
  secondary: "#94da32",
  secondaryLight: "#b5e75d",
  onBg: "#e5e2e1",
  onSurfaceVariant: "#c3c9b3",
  outline: "#8d937f",
  outlineVariant: "#434938",
};

const navSections = [
  { id: "intro", num: "01", label: "INTRODUCTION" },
  { id: "data", num: "02", label: "DATA COLLECTION" },
  { id: "protocols", num: "03", label: "SURVEILLANCE PROTOCOLS" },
  { id: "cookies", num: "04", label: "COOKIES" },
  { id: "rights", num: "05", label: "YOUR RIGHTS" },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function SectionHeading({ num, title }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 28 }}>
      <span style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(28px,5vw,40px)", fontWeight: 700, color: C.secondary, opacity: 0.5 }}>{num}</span>
      <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(22px,4vw,36px)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>{title}</h2>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const siteContents = useSiteContents();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + 140;
      for (const s of navSections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) setActiveSection(s.id);
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: C.bg, color: C.onBg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#000;}
        ::-webkit-scrollbar-thumb{background:${C.outlineVariant};}
        a{color:inherit;text-decoration:none;}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(0.75)}}
        @keyframes scanH{0%{top:-3px}100%{top:100%}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        .nav-link{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${C.onSurfaceVariant};text-decoration:none;transition:color 0.2s;}
        .nav-link:hover{color:${C.secondary};}
        .sidebar-link{display:block;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;padding:7px 0 7px 16px;color:${C.onSurfaceVariant};text-decoration:none;border-left:2px solid transparent;transition:all 0.2s;}
        .sidebar-link:hover{color:${C.secondary};border-left-color:${C.secondary};}
        .sidebar-link.active{color:${C.secondary};border-left-color:${C.secondary};}
        .footer-link{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${C.onSurfaceVariant};display:block;padding:4px 0;transition:color 0.2s;}
        .footer-link:hover{color:${C.secondary};}
        .mob-item{display:block;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:1px;text-transform:uppercase;padding:13px 20px;color:${C.onSurfaceVariant};border-bottom:1px solid ${C.outlineVariant};transition:background 0.15s,color 0.15s;}
        .mob-item:hover{background:${C.surfaceLow};color:${C.secondary};}
        @media(max-width:767px){
          .hide-mob{display:none!important;}
          .show-mob{display:flex!important;}
          .grid-2col{grid-template-columns:1fr!important;}
          .content-layout{grid-template-columns:1fr!important;gap:28px!important;}
          .proto-grid{grid-template-columns:1fr!important;gap:20px!important;}
          .inquiry-layout{flex-direction:column!important;}
          .footer-cols{grid-template-columns:1fr 1fr!important;}
          .hero-pad{padding:48px 20px 40px!important;}
          .section-pad{padding:32px 20px 48px!important;}
        }
      `}</style>



      {/* Header */}

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div style={{
          position: "fixed", top: 58, left: 0, right: 0, zIndex: 49,
          background: C.surfaceLowest, borderBottom: `1px solid ${C.outlineVariant}`,
          animation: "slideDown 0.2s ease",
        }}>
          {["CCTV CAMERAS", "ABOUT US", "CONTACT US", "DEALERSHIPS"].map(l => (
            <a key={l} className="mob-item" onClick={() => setMobileMenuOpen(false)}>{l}</a>
          ))}
        </div>
      )}

      <PageHeroBanner
        title={siteContents.privacyHeroTitle || "PRIVACY POLICY"}
        subtitle="Our commitment to protecting your data with uncompromising security standards across all NightVision systems."
      />

      <div>
        {/* Main Content */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 80px", borderLeft: `1px solid rgba(67,73,56,0.3)`, borderRight: `1px solid rgba(67,73,56,0.3)` }} className="section-pad">
          <div className="content-layout" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 56 }}>

            {/* Sidebar */}
            <aside className="hide-mob">
              <nav style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 2 }}>
                {navSections.map(s => (
                  <a key={s.id} href={`#${s.id}`} className={`sidebar-link${activeSection === s.id ? " active" : ""}`}>
                    {s.num}. {s.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Mobile pill nav */}
            <div className="show-mob" style={{ display: "none", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
              {navSections.map(s => (
                <a key={s.id} href={`#${s.id}`} style={{
                  fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 1,
                  textTransform: "uppercase", padding: "6px 10px", textDecoration: "none",
                  background: activeSection === s.id ? C.secondary : C.surfaceLow,
                  color: activeSection === s.id ? "#131313" : C.onSurfaceVariant,
                  border: `1px solid ${activeSection === s.id ? C.secondary : C.outlineVariant}`,
                  transition: "all 0.2s",
                }}>{s.num}. {s.label}</a>
              ))}
            </div>

            {/* Article */}
            <article style={{ display: "flex", flexDirection: "column", gap: 64 }}>

              {/* 01 Introduction */}
              <FadeIn>
                <section id="intro" style={{ scrollMarginTop: 80 }}>
                  <SectionHeading num="01" title="Introduction" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 680 }}>
                    <p style={{ fontSize: 15, lineHeight: 1.8, color: C.onSurfaceVariant, whiteSpace: "pre-wrap" }}>
                      {siteContents.privacyIntroContent || "At NV// NIGHTVISION™, compromising on security is not an option. Our Privacy Policy outlines the rigid technical standards we employ to protect the data captured by our surveillance ecosystems across Nepal.\n\nWe operate with uncompromising vigilance, ensuring that your personal and environmental data is handled with the highest level of industrial-grade security protocols."}
                    </p>
                  </div>
                </section>
              </FadeIn>

              {/* 02 Data Collection */}
              <FadeIn delay={0.05}>
                <section id="data" style={{ scrollMarginTop: 80 }}>
                  <SectionHeading num="02" title="Data Collection" />
                  <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {[
                      {
                        icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
                        title: "Surveillance Metadata",
                        body: "Timestamps, camera ID, geographic coordinates, and device health status used for maintaining system integrity and uptime monitoring.",
                      },
                      {
                        icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
                        title: "User Account Data",
                        body: "Encrypted credentials, dealer association codes, and verified contact information for secure administrative access to NIGHTVISION™ hubs.",
                      },
                    ].map((item, i) => (
                      <div key={i} style={{ padding: 24, background: C.surfaceLow, border: `1px solid ${C.outlineVariant}`, position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: 10, right: 12, opacity: 0.15, color: C.onSurfaceVariant }}>{item.icon}</div>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: C.secondary, fontWeight: 700, marginBottom: 12 }}>{item.title}</div>
                        <p style={{ fontSize: 13, color: C.onSurfaceVariant, lineHeight: 1.7 }}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>

              {/* 03 Surveillance Protocols */}
              <FadeIn delay={0.05}>
                <section id="protocols" style={{ scrollMarginTop: 80 }}>
                  <SectionHeading num="03" title="Surveillance Protocols" />
                  <div style={{ position: "relative", padding: 28, border: `2px solid ${C.secondary}`, background: C.surfaceLow, overflow: "hidden" }}>
                    {/* inner scanlines */}
                    <div style={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none", background: "linear-gradient(rgba(181,231,93,0.02) 50%, transparent 50%)", backgroundSize: "100% 4px" }} />
                    <div style={{ position: "relative", zIndex: 2 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.secondary} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 16, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.secondary }}>
                          Surveillance Data Management
                        </h3>
                      </div>

                      <div className="proto-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
                        {[
                          { code: "A1", text: "All video feeds are encrypted at the edge before cloud transmission using AES-256 standards." },
                          { code: "B1", text: "Data retention periods are user-defined, defaulting to 30 days unless specified for high-security archival." },
                          { code: "A2", text: "Access logs are strictly audited and accessible only via dual-factor hardware authentication." },
                          { code: "B2", text: "Facial recognition metadata is processed locally and never stored in plain-text format on central servers." },
                        ].map((item, i) => (
                          <div key={i} style={{ display: "flex", gap: 14 }}>
                            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 13, fontWeight: 700, color: C.secondary, flexShrink: 0 }}>{item.code}</span>
                            <p style={{ fontSize: 14, color: C.onSurfaceVariant, lineHeight: 1.7 }}>{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </FadeIn>

              {/* 04 Cookies */}
              <FadeIn delay={0.05}>
                <section id="cookies" style={{ scrollMarginTop: 80 }}>
                  <SectionHeading num="04" title="Cookies" />
                  <div style={{ fontSize: 15, lineHeight: 1.8, color: C.onSurfaceVariant, maxWidth: 680, marginBottom: 20 }}>
                    NV// NIGHTVISION™ uses strictly necessary cookies to maintain secure authenticated sessions on our digital platforms. No third-party tracking or advertising cookies are deployed across our infrastructure.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { type: "Session Token", purpose: "Maintains authenticated dealer/admin session state across requests." },
                      { type: "CSRF Guard", purpose: "Prevents cross-site request forgery on all form submissions." },
                      { type: "Preference Store", purpose: "Saves user-defined display and dashboard configuration settings." },
                    ].map((row, i) => (
                      <div key={i} style={{ display: "flex", gap: 0, border: `1px solid ${C.outlineVariant}`, overflow: "hidden" }}>
                        <div style={{ width: 180, flexShrink: 0, background: C.surfaceLow, padding: "12px 16px", fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: 1.5, color: C.secondary, textTransform: "uppercase", fontWeight: 700, display: "flex", alignItems: "center" }}>{row.type}</div>
                        <div style={{ flex: 1, padding: "12px 16px", fontSize: 13, color: C.onSurfaceVariant, lineHeight: 1.5, borderLeft: `1px solid ${C.outlineVariant}` }}>{row.purpose}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>

              {/* 05 Your Rights */}
              <FadeIn delay={0.05}>
                <section id="rights" style={{ scrollMarginTop: 80 }}>
                  <SectionHeading num="05" title="Your Rights" />
                  <div style={{ fontSize: 15, lineHeight: 1.8, color: C.onSurfaceVariant, maxWidth: 680, marginBottom: 24 }}>
                    Under the Individual Privacy Act, 2075 (2018) of Nepal, you retain full rights to access, correct, and request deletion of any personal data collected by NV// surveillance systems.
                  </div>
                  <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {[
                      { label: "Right to Access", desc: "Request a full export of all data associated with your account or registered hardware." },
                      { label: "Right to Erasure", desc: "Request permanent deletion of your personal data from all NV// systems within 30 days." },
                      { label: "Right to Rectification", desc: "Correct inaccurate personal data stored in our encrypted databases." },
                      { label: "Right to Object", desc: "Opt out of specific data processing activities beyond core system operation." },
                    ].map((item, i) => (
                      <div key={i} style={{ padding: 18, background: C.surfaceLow, border: `1px solid ${C.outlineVariant}` }}>
                        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: C.secondary, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>{item.label}</div>
                        <p style={{ fontSize: 13, color: C.onSurfaceVariant, lineHeight: 1.65 }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>

              {/* Privacy Inquiries */}
              <FadeIn delay={0.05}>
                <section id="inquiry" style={{ paddingTop: 32, borderTop: `1px solid ${C.outlineVariant}`, scrollMarginTop: 80 }}>
                  <div className="inquiry-layout" style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 22, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>PRIVACY INQUIRIES</h2>
                      <p style={{ fontSize: 14, color: C.onSurfaceVariant, lineHeight: 1.75, maxWidth: 400 }}>
                        For matters regarding data deletion, access requests, or compliance inquiries within the Nepal jurisdiction, contact our Security Operations Center.
                      </p>
                    </div>
                    <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "16px 18px", background: C.secondary, color: "#131313",
                        fontFamily: "'JetBrains Mono'", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
                        flexWrap: "wrap", gap: 8,
                      }}>
                        <span>SOC EMAIL</span>
                        <span>PRIVACY@NV-SECURE.NP</span>
                      </div>
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "16px 18px", border: `1px solid ${C.secondary}`, color: C.secondary,
                        fontFamily: "'JetBrains Mono'", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
                        flexWrap: "wrap", gap: 8,
                      }}>
                        <span>SECURITY HOTLINE</span>
                        <span>+977 1-4XXXXXX</span>
                      </div>
                    </div>
                  </div>
                </section>
              </FadeIn>

            </article>
          </div>
        </section>
      </div>

      {/* Footer */}
    </div>
  );
}