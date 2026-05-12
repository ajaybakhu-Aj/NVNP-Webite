import { useState } from "react";
import { Link } from "react-router-dom";

/* ─── Global Styles ─────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background-color: #131313;
    color: #e5e2e1;
    font-family: 'Inter', sans-serif;
  }

  ::selection {
    background-color: #b5e75d;
    color: #466700;
  }

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
  }

  .scanline-overlay {
    background:
      linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.1) 50%),
      linear-gradient(90deg, rgba(255,0,0,0.03), rgba(0,255,0,0.01), rgba(0,0,255,0.03));
    background-size: 100% 3px, 3px 100%;
    pointer-events: none;
  }

  .glow-border {
    box-shadow: 0 0 15px rgba(181, 231, 93, 0.3);
  }

  .corner-crosshair::before,
  .corner-crosshair::after {
    content: '+';
    position: absolute;
    color: #8d937f;
    font-family: monospace;
    font-size: 14px;
  }
  .corner-top-right::after  { top: 8px; right: 8px; }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  /* ── Responsive overrides ── */
  @media (max-width: 767px) {
    .bio-grid      { grid-template-columns: 1fr !important; }
    .portrait-col  { position: static !important; }
    .highlights-grid { grid-template-columns: 1fr !important; }
    .cta-buttons   { flex-direction: column !important; align-items: center !important; }
    .footer-grid   { grid-template-columns: 1fr !important; }
    .desktop-nav   { display: none !important; }
    .mobile-menu-btn { display: block !important; }
  }
  @media (min-width: 768px) {
    .desktop-nav     { display: flex !important; }
    .mobile-menu-btn { display: none !important; }
  }
`;

/* ─── Colour / spacing tokens ───────────────────────────────── */
const C = {
    bg: "#131313",
    surface: "#20201f",
    surfaceLow: "#1b1b1b",
    surfaceLowest: "#0e0e0e",
    surfaceHigh: "#2a2a2a",
    secondary: "#94da32",
    secondaryContainer: "#75b800",
    primaryContainer: "#b5e75d",
    onPrimaryContainer: "#466700",
    onSurface: "#e5e2e1",
    onSurfaceVariant: "#c3c9b3",
    outline: "#8d937f",
    outlineVariant: "#434938",
};

const T = {
    displayXl: { fontFamily: "Space Grotesk", fontSize: "64px", lineHeight: "1.1", letterSpacing: "4px", fontWeight: 700 },
    headlineLg: { fontFamily: "Space Grotesk", fontSize: "40px", lineHeight: "1.2", letterSpacing: "2px", fontWeight: 700 },
    headlineMd: { fontFamily: "Space Grotesk", fontSize: "24px", lineHeight: "1.3", letterSpacing: "1px", fontWeight: 600 },
    bodyLg: { fontFamily: "Inter", fontSize: "18px", lineHeight: "1.6", letterSpacing: "0px", fontWeight: 400 },
    bodyMd: { fontFamily: "Inter", fontSize: "16px", lineHeight: "1.5", letterSpacing: "0px", fontWeight: 400 },
    labelSm: { fontFamily: "Inter", fontSize: "12px", lineHeight: "1.2", letterSpacing: "1px", fontWeight: 600 },
};

/* ─── Helper: Material icon ──────────────────────────────────── */
function Icon({ name, style = {} }) {
    return (
        <span className="material-symbols-outlined" style={{ color: C.secondary, ...style }}>
            {name}
        </span>
    );
}

/* ─── Header ─────────────────────────────────────────────────── */
function Header() {
    const [open, setOpen] = useState(false);
    const navLinks = ["CCTV CAMERAS", "ABOUT US", "CONTACT US", "DEALERSHIPS"];

    return (
        <header
            style={{
                position: "sticky", top: 0, zIndex: 50,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                width: "100%", maxWidth: "1280px", margin: "0 auto",
                padding: "16px 24px",
                borderBottom: `1px solid ${C.outlineVariant}`,
                backgroundColor: "rgba(19,19,19,0.95)",
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

            {/* Desktop nav */}
            <nav className="desktop-nav" style={{ alignItems: "center", gap: "24px" }}>
                {navLinks.map((item) => (
                    <a
                        key={item}
                        href="#"
                        style={{
                            ...T.labelSm,
                            color: item === "ABOUT US" ? C.secondary : C.onSurfaceVariant,
                            borderBottom: item === "ABOUT US" ? `2px solid ${C.secondary}` : "none",
                            paddingBottom: item === "ABOUT US" ? "8px" : "0",
                            fontWeight: item === "ABOUT US" ? 700 : 600,
                            textDecoration: "none",
                            transition: "color 0.2s",
                        }}
                    >
                        {item}
                    </a>
                ))}
            </nav>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                    style={{
                        ...T.labelSm,
                        backgroundColor: C.primaryContainer,
                        color: C.onPrimaryContainer,
                        padding: "8px 16px",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.secondaryContainer)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.primaryContainer)}
                >
                    SUPPORT HOTLINE
                </button>
                <Icon name="shopping_cart" />
                <Icon name="account_circle" />

                {/* Hamburger */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setOpen(!open)}
                    style={{ background: "none", border: "none", color: C.secondary, fontSize: "26px", cursor: "pointer" }}
                >
                    {open ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile dropdown */}
            {open && (
                <div
                    style={{
                        position: "absolute", top: "100%", left: 0, right: 0,
                        backgroundColor: C.bg,
                        borderBottom: `1px solid ${C.outlineVariant}`,
                        padding: "16px 24px",
                        display: "flex", flexDirection: "column", gap: "16px",
                        zIndex: 100,
                    }}
                >
                    {navLinks.map((item) => (
                        <a
                            key={item}
                            href="#"
                            style={{
                                ...T.labelSm,
                                color: item === "ABOUT US" ? C.secondary : C.onSurfaceVariant,
                                textDecoration: "none",
                            }}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
    return (
        <section
            style={{
                position: "relative",
                height: "60vh",
                display: "flex",
                alignItems: "flex-end",
                paddingBottom: "80px",
                padding: "0 24px 80px",
                maxWidth: "1280px",
                margin: "0 auto",
            }}
        >
            {/* BG image */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <img
                    src="https://lh3.googleusercontent.com/aida/ADBb0uigFZm2MU_7fFkN1PGbqxTC4_zsd19WX1rPPXQ9Dq4i5EMbGW8uL59JfytFZsh1esNLU9nligJX4Uv90jKWL6D8MLXnq26q3GTMcyBfSr1_zrrXpo67IpigOrch4RSQvHkeqBk9x4VXRJLGzluFfWso-xnep3TZtUNQtmjjVkx4xUm72ROueuOlQghaRdACvRgs6p-gLEx5sf_1mpkxK_OjtZIMzVkcxp_k_5NJOEzBPjW9mg5vXhadcbQb9GP1FJGoMGX0s4cmKw"
                    alt="Surveillance command center"
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)", opacity: 0.4 }}
                />
                <div
                    style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, #131313, rgba(19,19,19,0.6), transparent)",
                    }}
                />
            </div>

            {/* Text */}
            <div style={{ position: "relative", zIndex: 20, maxWidth: "768px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <span
                        style={{
                            width: "12px", height: "12px",
                            backgroundColor: "#dc2626",
                            borderRadius: "9999px",
                            display: "inline-block",
                            animation: "pulse 2s infinite",
                        }}
                    />
                    <span style={{ ...T.labelSm, letterSpacing: "0.2em", color: C.secondary }}>
                        ARCHIVE_FOUNDER_BIO // 001
                    </span>
                </div>

                <h1
                    style={{
                        ...T.displayXl,
                        color: C.primaryContainer,
                        textTransform: "uppercase",
                        lineHeight: 1,
                        marginBottom: "16px",
                        fontSize: "clamp(36px, 6vw, 64px)",
                    }}
                >
                    Rozil Thapa: The Vision Behind NightVision
                </h1>
                <p style={{ ...T.bodyLg, color: C.onSurfaceVariant, maxWidth: "576px" }}>
                    Architect of Nepal's most resilient security infrastructure. An uncompromising pursuit of technical dominance.
                </p>
            </div>
        </section>
    );
}

/* ─── Portrait card ──────────────────────────────────────────── */
function Portrait() {
    return (
        <div
            className="portrait-col"
            style={{ position: "sticky", top: "128px", height: "fit-content" }}
        >
            <div
                className="glow-border"
                style={{ position: "relative", border: `2px solid ${C.secondary}`, padding: "8px" }}
            >
                {/* Corner decorators */}
                {[
                    { top: "-4px", left: "-4px", borderTop: `2px solid ${C.secondary}`, borderLeft: `2px solid ${C.secondary}` },
                    { bottom: "-4px", right: "-4px", borderBottom: `2px solid ${C.secondary}`, borderRight: `2px solid ${C.secondary}` },
                ].map((s, i) => (
                    <div key={i} style={{ position: "absolute", width: "24px", height: "24px", ...s }} />
                ))}

                <img
                    src="https://lh3.googleusercontent.com/aida/ADBb0uiGsiUA8BUnPz5W1BtC1A_ddnZ32Idm7Lriupd_f9XBElLTooQIq8LxpmwvL2YNhOlnIM6fajbQO37s87483wAxAmFOSFmTKe1pazPPbbgd3GXXHcrOZ_FmxNDfw6K-hg-lOOEJbFQlrv8bng4iKNBuk3CmrTpr5TWqbqgmdqqkC3E0ukVn0vtWSWzkkeMXd6jGuf93ojASN3zONE-bZ3YSRayYWo69aKBJR-yvpokSdWgCPFbDyYKkXdgIqnB5dfIG_MoXHnoS"
                    alt="Rozil Thapa — Founder"
                    style={{
                        width: "100%",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        filter: "grayscale(1) brightness(0.75) contrast(1.25)",
                        display: "block",
                    }}
                />

                {/* ID card */}
                <div
                    style={{
                        marginTop: "16px",
                        backgroundColor: C.surface,
                        padding: "16px",
                        border: `1px solid ${C.outlineVariant}`,
                    }}
                >
                    {[
                        { label: "IDENTIFICATION:", value: "R_THAPA_NV_01" },
                        { label: "CLEARANCE:", value: "FOUNDER / CEO" },
                    ].map(({ label, value }) => (
                        <div
                            key={label}
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}
                        >
                            <span style={{ ...T.labelSm, color: C.secondary }}>{label}</span>
                            <span style={{ ...T.labelSm, color: C.onSurface }}>{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─── Bio section with left border ──────────────────────────── */
function BioBlock({ number, title, children }) {
    return (
        <div style={{ position: "relative", paddingLeft: "24px", borderLeft: `1px solid ${C.outlineVariant}` }}>
            <h2
                style={{
                    ...T.headlineLg,
                    color: C.secondary,
                    textTransform: "uppercase",
                    marginBottom: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                }}
            >
                <span style={{ ...T.bodyMd, color: C.outlineVariant, fontFamily: "monospace" }}>{number}.</span>
                {title}
            </h2>
            <div style={{ maxWidth: "672px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {children}
            </div>
        </div>
    );
}

/* ─── Starting-the-brand box ─────────────────────────────────── */
function StartingBrand() {
    return (
        <div
            style={{
                position: "relative",
                border: `1px solid ${C.outlineVariant}`,
                backgroundColor: C.surfaceLow,
                padding: "24px",
                overflow: "hidden",
            }}
        >
            {/* Watermark */}
            <div
                style={{
                    position: "absolute", top: 0, right: 0,
                    padding: "16px",
                    fontFamily: "monospace",
                    color: "rgba(67,73,56,0.3)",
                    fontSize: "100px",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            >
                EST.2018
            </div>

            <h2 style={{ ...T.headlineLg, color: C.primaryContainer, textTransform: "uppercase", marginBottom: "24px" }}>
                Starting the Brand
            </h2>

            <div style={{ maxWidth: "672px", display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 10 }}>
                <p style={{ ...T.bodyLg, color: C.onSurface }}>
                    NightVision wasn't founded in a boardroom; it was born in a garage immediately following high school
                    graduation. With limited capital but unlimited resolve, Rozil Thapa identified a critical gap in the
                    Nepali market: the lack of high-fidelity, industrial-grade security solutions designed for local terrains.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "32px" }}>
                    {[
                        { value: "01", label: "Initial Prototype Built", accent: true },
                        { value: "24/7", label: "Development Cycle", accent: false },
                    ].map(({ value, label, accent }) => (
                        <div
                            key={label}
                            style={{
                                border: `1px solid ${accent ? C.secondary : C.outlineVariant}`,
                                padding: "16px",
                                backgroundColor: C.bg,
                            }}
                        >
                            <span style={{ ...T.headlineLg, color: accent ? C.secondary : C.onSurfaceVariant, display: "block", marginBottom: "4px" }}>
                                {value}
                            </span>
                            <span style={{ ...T.labelSm, color: C.onSurfaceVariant, textTransform: "uppercase", letterSpacing: "2px" }}>
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─── Highlight card ─────────────────────────────────────────── */
function HighlightCard({ icon, title, text }) {
    return (
        <div
            className="corner-crosshair corner-top-right"
            style={{
                backgroundColor: C.surfaceHigh,
                padding: "24px",
                border: `1px solid ${C.outlineVariant}`,
                position: "relative",
            }}
        >
            <Icon name={icon} style={{ marginBottom: "8px", display: "block" }} />
            <h3 style={{ ...T.headlineMd, color: C.onSurface, marginBottom: "8px" }}>{title}</h3>
            <p style={{ ...T.bodyMd, color: C.onSurfaceVariant }}>{text}</p>
        </div>
    );
}

/* ─── Biography content column ───────────────────────────────── */
function BiographyContent() {
    const highlights = [
        { icon: "rocket_launch", title: "Post-School Launch", text: "Founded NightVision immediately after high school, bypassing traditional corporate paths to lead through innovation." },
        { icon: "verified", title: "6+ Years Experience", text: "Over half a decade of hands-on deployment in some of Nepal's most challenging environmental conditions." },
        { icon: "precision_manufacturing", title: "R&D Leadership", text: "Personally oversees the research and development of all NV-Series optical sensors and firmware protocols." },
        { icon: "groups", title: "Strategic Partnerships", text: "Developed a nationwide network of authorized dealerships, ensuring technical support is never more than an hour away." },
        { icon: "security", title: "Patented Encryption", text: "Architected the proprietary end-to-end encryption used in all NightVision cloud and local storage systems." },
        { icon: "public", title: "Regional Expansion", text: "Led the expansion of the brand into critical infrastructure projects across the Himalayas." },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>

            {/* 01 Early Life */}
            <BioBlock number="01" title="Early Life">
                <p style={{ ...T.bodyLg, color: C.onSurface }}>
                    Born and raised in the heart of Kathmandu, Rozil Thapa's early fascination with mechanics and electronics
                    wasn't just a hobby—it was a precursor to a security revolution. In an environment where reliability was
                    often a luxury, he sought to build systems that never failed.
                </p>
                <p style={{ ...T.bodyMd, color: C.onSurfaceVariant }}>
                    His childhood was defined by a relentless curiosity for how things worked, often dismantling and reassembling
                    household gadgets to understand their internal logic. This technical foundation would later become the
                    bedrock of NightVision's engineering philosophy.
                </p>
            </BioBlock>

            {/* 02 Education */}
            <BioBlock number="02" title="Education">
                <p style={{ ...T.bodyLg, color: C.onSurface }}>
                    While academic institutions provided the framework, Thapa's true education occurred in the field. Balancing
                    formal studies with rigorous self-taught engineering, he mastered the complexities of digital surveillance
                    before he had even turned twenty.
                </p>
                <p style={{ ...T.bodyMd, color: C.onSurfaceVariant }}>
                    Focusing on network architecture and optical precision, his educational journey was unconventional, prioritizing
                    real-world application over theoretical abstractions. He emerged not just with a degree, but with a blueprint
                    for a safer nation.
                </p>
            </BioBlock>

            {/* Starting the Brand */}
            <StartingBrand />

            {/* 03 Market Dominance */}
            <BioBlock number="03" title="Market Dominance">
                <p style={{ ...T.bodyLg, color: C.onSurface }}>
                    Within six years, NightVision transitioned from a startup to the gold standard of security in Nepal. Thapa's
                    insistence on "Uncompromising Vigilance" resonated with high-end clients, government bodies, and industrial
                    sectors alike.
                </p>
                <img
                    src="https://lh3.googleusercontent.com/aida/ADBb0ug9YQUIw0MrZtq_29TVpL-FnrRS4-3iO3i2xoUtfnLiEZe_x1qPNnIFn8RajYtk_3kUu4Lecu7tOfey1nC1fDG_afuxXijuyUz9pN7g86X1H10jaMDlqyeOIEEiGQvC1HhjCzxAXW4rYIekvJrK-trj0VvG2TcXCFJOVjtrbWxiyOVuUZaAbzTAwLZaRmCzGd_wGeeF0B0QC1GgBSLdCKyV-GWpYAkfufJgXCH9Uxfm-BaDCmosaS_A-O9GqeSpQeUk2eXxaetlEg"
                    alt="NightVision corporate building"
                    style={{
                        width: "100%", height: "256px", objectFit: "cover",
                        border: `1px solid ${C.outlineVariant}`,
                        filter: "grayscale(1)",
                        transition: "filter 0.7s",
                        marginTop: "24px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0)")}
                    onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(1)")}
                />
            </BioBlock>

            {/* Key Highlights */}
            <div>
                <h2 style={{ ...T.headlineLg, color: C.secondary, textTransform: "uppercase", marginBottom: "24px" }}>
                    Key Highlights
                </h2>
                <div
                    className="highlights-grid"
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
                >
                    {highlights.map((h) => <HighlightCard key={h.title} {...h} />)}
                </div>
            </div>

            {/* 04 Brand Vision */}
            <BioBlock number="04" title="Brand Vision">
                <p style={{ ...T.bodyLg, color: C.onSurface, fontStyle: "italic" }}>
                    "Security is not a product; it is a state of mind achieved through technical absolute. My vision for
                    NightVision is to create an ecosystem where the presence of our tech is invisible, but its protection
                    is invincible."
                </p>
                <p style={{ ...T.bodyMd, color: C.onSurfaceVariant }}>
                    Looking forward, Rozil Thapa aims to integrate advanced AI-driven predictive analytics into every CCTV
                    node, transforming passive monitoring into active threat prevention. The future of NightVision is not
                    just seeing the dark, but predicting what it hides.
                </p>
                <img
                    src="https://lh3.googleusercontent.com/aida/ADBb0uhFVruSlJhZ5q-sF8CoXAilTa0DbK8uG-4sf3f4cpUJsFuLNX3etF96ADT1UNmyuTuuJJTAVn4JPrUlNFDZt9xkUjNOaYf07xOE23xXpdgNxYTpTDkoXxMnvfQl_5jtL2ZclokCg18NynmRL3LwcqH5dgcnubOAPzSN7_Wmsj1wL7UqcbVy6U_7Snk7bUo4x_eCcpEGWTkQnkl6cD5H1Sla2en4IKIA1dWJFJWeERaVCKF_AciL8ixQPWy-N5f1jEqv-lJdXw"
                    alt="City grid vision"
                    style={{
                        width: "100%", height: "320px", objectFit: "cover",
                        border: `1px solid ${C.outlineVariant}`,
                        filter: "grayscale(1) brightness(0.5)",
                    }}
                />
            </BioBlock>

        </div>
    );
}

/* ─── CTA ────────────────────────────────────────────────────── */
function CTA() {
    return (
        <section
            style={{
                backgroundColor: C.surfaceLowest,
                padding: "80px 24px",
                borderTop: `1px solid ${C.secondary}`,
                borderBottom: `1px solid ${C.secondary}`,
                position: "relative",
            }}
        >
            {/* Dot pattern */}
            <div
                style={{
                    position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none",
                    backgroundImage: `radial-gradient(${C.secondary} 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                }}
            />

            <div
                style={{
                    maxWidth: "1280px", margin: "0 auto",
                    textAlign: "center", position: "relative", zIndex: 20,
                }}
            >
                <h2 style={{ ...T.headlineLg, color: C.secondary, textTransform: "uppercase", marginBottom: "24px" }}>
                    Ready to secure your perimeter?
                </h2>

                <div className="cta-buttons" style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
                    {[
                        { label: "Consult with our team", filled: true },
                        { label: "Explore Products", filled: false },
                    ].map(({ label, filled }) => (
                        <button
                            key={label}
                            style={{
                                ...T.labelSm,
                                padding: "16px 80px",
                                textTransform: "uppercase",
                                letterSpacing: "2px",
                                cursor: "pointer",
                                border: `1px solid ${C.secondary}`,
                                backgroundColor: filled ? C.secondary : "transparent",
                                color: filled ? C.bg : C.secondary,
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = filled ? C.secondaryContainer : "rgba(148,218,50,0.1)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = filled ? C.secondary : "transparent";
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
    const nav = [
        { heading: "Navigation", links: ["Privacy Policy", "Terms of Service", "Warranty"] },
        { heading: "Connect", links: ["Support", "Careers", "Dealer Portal"] },
    ];

    return (
        <footer
            className="footer-grid"
            style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                gap: "24px",
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "48px 24px",
                borderTop: `1px solid ${C.secondary}`,
                backgroundColor: C.surfaceLowest,
            }}
        >
            {/* Brand */}
            <div>
                <div
                    style={{
                        fontFamily: "Arial Black, sans-serif",
                        fontStyle: "italic",
                        fontSize: "24px",
                        lineHeight: "1.3",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        marginBottom: "24px",
                    }}
                >
                    <span style={{ color: "#94da32" }}>N</span>
                    <span style={{ color: "#ffffff" }}>V</span>
                    <span style={{ color: "#94da32" }}>//</span>
                </div>
                <p style={{ ...T.bodyMd, color: C.onSurfaceVariant, maxWidth: "384px", marginBottom: "24px" }}>
                    ESTABLISHED 2018. KATHMANDU, NEPAL. UNCOMPROMISING VIGILANCE FOR A COMPLEX WORLD.
                </p>
                <div style={{ ...T.labelSm, color: C.secondary, textTransform: "uppercase", letterSpacing: "0.2em" }}>
                    © 2024 NIGHTVISION SECURITY SYSTEMS. ALL RIGHTS RESERVED.
                </div>
            </div>

            {nav.map(({ heading, links }) => (
                <nav key={heading} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <h4 style={{ ...T.labelSm, color: C.secondary, textTransform: "uppercase", marginBottom: "16px", letterSpacing: "2px" }}>
                        {heading}
                    </h4>
                    {links.map((link) => (
                        <a
                            key={link}
                            href="#"
                            style={{
                                ...T.bodyMd,
                                color: C.onSurfaceVariant,
                                textDecoration: "none",
                                textTransform: "uppercase",
                                letterSpacing: "2px",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = C.secondary)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = C.onSurfaceVariant)}
                        >
                            {link}
                        </a>
                    ))}
                </nav>
            ))}
        </footer>
    );
}

/* ─── Root ───────────────────────────────────────────────────── */
export default function App() {
    return (
        <>
            <style>{globalStyles}</style>

            <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
                <Header />

                <main style={{ position: "relative", overflow: "hidden" }}>
                    {/* Scanline overlay */}
                    <div
                        className="scanline-overlay"
                        style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}
                    />

                    <Hero />

                    {/* Biography grid */}
                    <section
                        className="bio-grid"
                        style={{
                            padding: "48px 24px",
                            maxWidth: "1280px",
                            margin: "0 auto",
                            display: "grid",
                            gridTemplateColumns: "4fr 8fr",
                            gap: "48px",
                            position: "relative",
                        }}
                    >
                        <Portrait />
                        <BiographyContent />
                    </section>

                    <CTA />
                </main>

                <Footer />
            </div>
        </>
    );
}