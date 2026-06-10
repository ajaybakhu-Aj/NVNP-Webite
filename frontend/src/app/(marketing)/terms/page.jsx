import { useState, useEffect, useRef } from "react";
import { useSiteContents } from "../../../utils/cmsDb";
import PageHeroBanner from "../../../components/ui/PageHeroBanner";

const C = {
  bg: "#000000",
  surface: "#131313",
  surfaceLow: "#1b1b1b",
  surfaceLowest: "#0e0e0e",
  surfaceHigh: "#2a2a2a",
  surfaceContainer: "#20201f",
  secondary: "#94da32",
  secondaryLight: "#b5e75d",
  onBg: "#e5e2e1",
  onSurfaceVariant: "#c3c9b3",
  outline: "#8d937f",
  outlineVariant: "#434938",
  error: "#ffb4ab",
};

const scanlineStyle = {
  position: "fixed", inset: 0, zIndex: 10, pointerEvents: "none",
  background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.08) 50%)",
  backgroundSize: "100% 4px",
};

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
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

const sections = [
  { id: "acceptance", num: "01", label: "Acceptance" },
  { id: "usage", num: "02", label: "Product Usage" },
  { id: "property", num: "03", label: "Intel. Property" },
  { id: "privacy", num: "04", label: "Privacy Policy" },
  { id: "liability", num: "05", label: "Liability" },
  { id: "governing", num: "06", label: "Governing Law" },
];

function NavLink({ item, active, onClick }) {
  return (
    <a
      href={`#${item.id}`}
      onClick={onClick}
      style={{
        display: "block",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: active ? C.secondary : C.onSurfaceVariant,
        padding: "6px 0",
        textDecoration: "none",
        borderLeft: active ? `2px solid ${C.secondary}` : "2px solid transparent",
        paddingLeft: 12,
        transition: "all 0.2s",
      }}
    >
      {item.num}. {item.label}
    </a>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("acceptance");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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
      const scrollY = window.scrollY + 120;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollY) setActiveSection(s.id);
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: C.bg, color: C.onBg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(0.8)} }
        @keyframes scanH { 0%{top:-4px} 100%{top:100%} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.outlineVariant}; }
        a { color: inherit; text-decoration: none; }
        .nav-a { font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:${C.onSurfaceVariant}; text-decoration:none; transition:color 0.2s; }
        .nav-a:hover { color:${C.secondary}; }
        .btn-green { background:${C.secondary}; color:#131313; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:2px; text-transform:uppercase; font-weight:700; padding:12px 24px; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:6px; transition:background 0.2s; }
        .btn-green:hover { background:${C.secondaryLight}; }
        .footer-link { font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:${C.onSurfaceVariant}; display:block; padding:4px 0; transition:color 0.2s; }
        .footer-link:hover { color:${C.secondary}; }
        .mob-nav-item { display:block; font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; padding:12px 16px; color:${C.onSurfaceVariant}; border-bottom:1px solid ${C.outlineVariant}; transition:color 0.15s,background 0.15s; text-decoration:none; }
        .mob-nav-item:hover { color:${C.secondary}; background:${C.surfaceLow}; }
        @media(max-width:767px){
          .hide-mobile{display:none!important;}
          .show-mobile{display:flex!important;}
          .grid-2{grid-template-columns:1fr!important;}
          .content-grid{grid-template-columns:1fr!important; gap:32px!important;}
          .hero-title{font-size:clamp(32px,8vw,56px)!important;}
          .section-spacing{padding:40px 20px!important;}
          .footer-grid{grid-template-columns:1fr 1fr!important;}
        }
      `}</style>

      {/* Header */}
      

      {/* Mobile nav dropdown */}
      {mobileNavOpen && (
        <div style={{ position: "fixed", top: 58, left: 0, right: 0, zIndex: 49, background: C.surfaceLowest, borderBottom: `1px solid ${C.outlineVariant}`, animation: "fadeIn 0.2s ease" }}>
          {["CCTV CAMERAS", "ABOUT US", "CONTACT US", "TERMS OF SERVICE"].map(l => (
            <a key={l} className="mob-nav-item" onClick={() => setMobileNavOpen(false)}
              style={{ color: l === "TERMS OF SERVICE" ? C.secondary : C.onSurfaceVariant }}>{l}</a>
          ))}
        </div>
      )}

      <PageHeroBanner
        title={siteContents.termsHeroTitle || "TERMS OF SERVICE"}
        subtitle="Legally binding agreement governing your use of NightVision surveillance solutions, digital platforms, and hardware distribution networks."
      />

      <main>
        {/* Content */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px" }} className="section-spacing">
          <div className="content-grid" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 56 }}>

            {/* Sidebar */}
            <aside className="hide-mobile" style={{ position: "relative" }}>
              <nav style={{ position: "sticky", top: 90, borderLeft: `1px solid ${C.outlineVariant}`, paddingLeft: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 3, color: C.secondary, textTransform: "uppercase", marginBottom: 12, paddingLeft: 14 }}>
                  NAVIGATION
                </div>
                {sections.map(s => (
                  <NavLink key={s.id} item={s} active={activeSection === s.id} />
                ))}
              </nav>
            </aside>

            {/* Mobile TOC */}
            <div className="show-mobile" style={{ display: "none", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              {sections.map(s => (
                <a key={s.id} href={`#${s.id}`} style={{
                  fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: 1, textTransform: "uppercase",
                  color: activeSection === s.id ? "#131313" : C.onSurfaceVariant,
                  background: activeSection === s.id ? C.secondary : C.surfaceLow,
                  border: `1px solid ${activeSection === s.id ? C.secondary : C.outlineVariant}`,
                  padding: "6px 10px", textDecoration: "none", transition: "all 0.2s",
                }}>{s.num}. {s.label}</a>
              ))}
            </div>

            {/* Body */}
            <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

              {/* Intro */}
              <FadeIn>
                <div style={{ background: C.surfaceLow, padding: 28, border: `1px solid ${C.outlineVariant}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: 2, color: C.outline, textTransform: "uppercase", marginBottom: 12 }}>
                    {siteContents.termsIntroRevision || "LAST REVISION: OCTOBER 24, 2023"}
                  </div>
                  <p style={{ fontSize: 16, lineHeight: 1.75, color: C.onBg, whiteSpace: "pre-wrap" }}>
                    {siteContents.termsIntroContent || "These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and NV// NIGHTVISION™ SECURITY SYSTEMS. By accessing our surveillance solutions, digital platforms, or hardware distribution networks, you acknowledge that you have read, understood, and agreed to be bound by all of these terms."}
                  </p>
                </div>
              </FadeIn>

              {/* 01 Acceptance */}
              <FadeIn id="acceptance">
                <section id="acceptance" style={{ scrollMarginTop: 90 }}>
                  <SectionHeader num="01" title="Acceptance of Terms" />
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: C.onSurfaceVariant }}>
                    The use of our website and services is subject to your acceptance of and compliance with these terms. These terms apply to all visitors, users, and others who access or use the Service. NV// NIGHTVISION™ reserves the right, in its sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason.
                  </p>
                </section>
              </FadeIn>

              {/* 02 Usage */}
              <FadeIn id="usage">
                <section id="usage" style={{ scrollMarginTop: 90 }}>
                  <SectionHeader num="02" title="Use of Products" />
                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {[
                      { title: "Hardware Deployment", body: "CCTV and surveillance hardware must be installed in accordance with technical specifications and local privacy regulations. NV// is not responsible for unauthorized or illegal deployment." },
                      { title: "Operational Compliance", body: "Users are prohibited from modifying firmwares or attempting to decrypt proprietary signal streams without express written consent from NV// technical division." },
                    ].map((item, i) => (
                      <div key={i} style={{ padding: 20, border: `1px solid ${C.outlineVariant}`, background: C.surfaceLowest }}>
                        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: 2, color: C.secondary, textTransform: "uppercase", marginBottom: 10 }}>{item.title}</div>
                        <p style={{ fontSize: 14, color: C.onSurfaceVariant, lineHeight: 1.65 }}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>

              {/* 03 IP */}
              <FadeIn>
                <section id="property" style={{ scrollMarginTop: 90 }}>
                  <SectionHeader num="03" title="Intellectual Property" />
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: C.onSurfaceVariant, marginBottom: 20 }}>
                    The Service and its original content, features, and functionality are and will remain the exclusive property of NV// NIGHTVISION™ and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of NV// NIGHTVISION™. This includes but is not limited to the "NV//" signature and "NIGHTVISION™" branding.
                  </p>
                  <div style={{ border: `1px solid rgba(148,218,50,0.3)`, padding: 18, background: "rgba(148,218,50,0.04)" }}>
                    <p style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: C.secondary, letterSpacing: 1, fontStyle: "italic" }}>
                      "PROPRIETARY TECHNOLOGY PROTECTED BY INTERNATIONAL PATENTS AND REGISTERED COPYRIGHTS."
                    </p>
                  </div>
                </section>
              </FadeIn>

              {/* 04 Privacy */}
              <FadeIn>
                <section id="privacy" style={{ scrollMarginTop: 90, padding: 28, background: C.surfaceContainer, borderLeft: `4px solid ${C.secondary}` }}>
                  <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 20, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
                    Privacy Policy Reference
                  </h2>
                  <p style={{ fontSize: 15, color: C.onSurfaceVariant, lineHeight: 1.7, marginBottom: 20 }}>
                    Your use of our services is also governed by our Privacy Policy, which details our data collection and surveillance log management protocols.
                  </p>
                  <button className="btn-green">
                    VIEW PRIVACY POLICY
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </section>
              </FadeIn>

              {/* 05 Liability */}
              <FadeIn>
                <section id="liability" style={{ scrollMarginTop: 90 }}>
                  <SectionHeader num="05" title="Limitation of Liability" />
                  <p style={{ fontSize: 15, lineHeight: 1.85, color: C.onSurfaceVariant }}>
                    In no event shall NV// NIGHTVISION™, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
                  </p>
                </section>
              </FadeIn>

              {/* 06 Governing */}
              <FadeIn>
                <section id="governing" style={{ scrollMarginTop: 90 }}>
                  <SectionHeader num="06" title="Governing Law" />
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: C.onSurfaceVariant }}>
                    These Terms shall be governed and construed in accordance with the laws of Nepal, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                  </p>
                </section>
              </FadeIn>

              {/* Legal Inquiries */}
              <FadeIn>
                <div style={{ border: `1px solid ${C.outlineVariant}`, padding: 36, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 12, right: 16, opacity: 0.12 }}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={C.outline} strokeWidth="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "'JetBrains Mono'", fontSize: 13, letterSpacing: 2, color: C.secondary, textTransform: "uppercase", marginBottom: 12 }}>
                    LEGAL INQUIRIES
                  </h3>
                  <p style={{ fontSize: 15, color: C.onSurfaceVariant, lineHeight: 1.7, marginBottom: 24, maxWidth: 500 }}>
                    If you have any questions about these Terms, please contact our legal department via the secure support hotline or encrypted mailing address.
                  </p>
                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {[
                      { label: "Email", value: "legal@nightvision-systems.com" },
                      { label: "Support Hotline", value: "+977 (01) 555-SECURITY" },
                    ].map((item, i) => (
                      <div key={i} style={{ padding: 18, border: `1px solid ${C.outlineVariant}`, background: C.surfaceLow }}>
                        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: C.secondary, textTransform: "uppercase", marginBottom: 6 }}>{item.label}</div>
                        <div style={{ fontSize: 14, color: C.onBg }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      
    </div>
  );
}

function SectionHeader({ num, title }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
        <span style={{ fontFamily: "'Space Grotesk'", fontSize: 22, fontWeight: 700, color: C.secondary }}>{num}.</span>
        <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 20, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.onBg }}>{title}</h2>
      </div>
      <div style={{ height: 1, background: C.outlineVariant, width: "100%" }} />
    </div>
  );
}