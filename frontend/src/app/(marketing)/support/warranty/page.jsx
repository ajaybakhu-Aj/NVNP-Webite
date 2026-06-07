import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const colors = {
    bg: "#131313",
    surface: "#1b1b1b",
    surfaceHigh: "#2a2a2a",
    surfaceHighest: "#353535",
    secondary: "#94da32",
    secondaryBright: "#aff74e",
    primaryFixed: "#c0f367",
    onBg: "#e5e2e1",
    onSurfaceVariant: "#c3c9b3",
    outline: "#8d937f",
    outlineVariant: "#434938",
    error: "#ffb4ab",
};

const scanlineStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 10,
    pointerEvents: "none",
    background:
        "linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.1) 50%), linear-gradient(90deg, rgba(255,0,0,0.03), rgba(0,255,0,0.01), rgba(0,0,255,0.03))",
    backgroundSize: "100% 2px, 3px 100%",
};

function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
    const [ref, visible] = useInView();
    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
                ...style,
            }}
        >
            {children}
        </div>
    );
}

function PulsingDot() {
    return (
        <span
            style={{
                display: "inline-block",
                width: 8,
                height: 8,
                background: "#ff3b3b",
                borderRadius: "50%",
                animation: "pulse 1.5s ease-in-out infinite",
                boxShadow: "0 0 6px rgba(255,59,59,0.7)",
            }}
        />
    );
}

function CornerBrackets({ color = colors.secondary, size = 8 }) {
    const s = { position: "absolute", width: size, height: size };
    const b = "1px solid " + color;
    return (
        <>
            <span style={{ ...s, top: -1, left: -1, borderTop: b, borderLeft: b }} />
            <span style={{ ...s, top: -1, right: -1, borderTop: b, borderRight: b }} />
            <span style={{ ...s, bottom: -1, left: -1, borderBottom: b, borderLeft: b }} />
            <span style={{ ...s, bottom: -1, right: -1, borderBottom: b, borderRight: b }} />
        </>
    );
}

export default function App() {
    const [serial, setSerial] = useState("");
    const [verifyState, setVerifyState] = useState(null); // null | 'valid' | 'invalid'
    const [cartCount] = useState(2);
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        setTimeout(() => setHeroLoaded(true), 100);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function handleVerify() {
        if (!serial.trim()) return;
        setVerifyState(serial.length === 16 ? "valid" : "invalid");
    }

    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    return (
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: colors.bg, color: colors.onBg, minHeight: "100vh", position: "relative" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100% { opacity:1; transform: scale(1); } 50% { opacity:.4; transform: scale(0.85); } }
        @keyframes glitch {
          0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px,0); }
          20% { clip-path: inset(92% 0 1% 0); transform: translate(1px,0); }
          40% { clip-path: inset(43% 0 1% 0); transform: translate(-1px,0); }
          60% { clip-path: inset(25% 0 58% 0); transform: translate(2px,0); }
          80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px,0); }
          100% { clip-path: inset(58% 0 43% 0); transform: translate(0px,0); }
        }
        @keyframes scanH { 0% { top: -4px; } 100% { top: 100%; } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .nav-link { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${colors.onSurfaceVariant}; text-decoration: none; transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: ${colors.secondary}; }
        .nav-link.active { color: ${colors.secondary}; border-bottom: 2px solid ${colors.secondary}; padding-bottom: 2px; }
        .btn-primary { background: ${colors.secondary}; color: "#131313"; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; padding: 14px 32px; border: none; cursor: pointer; transition: background 0.2s, transform 0.1s; }
        .btn-primary:hover { background: ${colors.primaryFixed}; }
        .btn-primary:active { transform: scale(0.98); }
        .btn-outline { background: transparent; color: ${colors.secondary}; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; padding: 14px 32px; border: 1px solid ${colors.secondary}; cursor: pointer; transition: background 0.2s; }
        .btn-outline:hover { background: rgba(148,218,50,0.1); }
        .coverage-card { background: ${colors.surface}; border: 1px solid ${colors.outlineVariant}; padding: 32px; transition: border-color 0.3s; }
        .coverage-card:hover { border-color: ${colors.secondary}; }
        .step-card { background: ${colors.surface}; flex: 1; padding: 32px; border-right: 1px solid ${colors.outlineVariant}; display: flex; flex-direction: column; gap: 16px; transition: background 0.2s; cursor: default; }
        .step-card:last-child { border-right: none; }
        .step-card:hover { background: ${colors.surfaceHigh}; }
        input[type=text] { background: ${colors.bg}; border: 1px solid ${colors.outlineVariant}; color: ${colors.onBg}; font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 1px; padding: 14px 16px 14px 44px; width: 100%; outline: none; transition: border-color 0.2s; }
        input[type=text]:focus { border-color: ${colors.secondary}; }
        input[type=text]::placeholder { color: ${colors.outlineVariant}; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${colors.bg}; } ::-webkit-scrollbar-thumb { background: ${colors.outlineVariant}; }
        a { color: inherit; text-decoration: none; }
        .footer-link { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${colors.onSurfaceVariant}; transition: color 0.2s; cursor: pointer; }
        .footer-link:hover { color: ${colors.secondary}; }

        @media (max-width: 767px) {
            .btn-primary, .btn-outline {
                padding: 12px 20px;
                font-size: 10px;
                letter-spacing: 1px;
            }
            input[type=text] {
                font-size: 12px;
                padding: 12px 16px 12px 40px;
            }
            .step-card {
                border-right: none;
                border-bottom: 1px solid ${colors.outlineVariant};
                padding: 24px;
            }
            .step-card:last-child {
                border-bottom: none;
            }
        }
      `}</style>

            {/* Scanline overlay */}
            <div style={scanlineStyle} />

            {/* Header */}


            <main style={{ position: "relative" }}>

                {/* Hero */}
                <section style={{
                    position: "relative", 
                    overflow: "hidden",
                    padding: isMobile ? "60px 20px 60px" : isTablet ? "80px 30px 80px" : "100px 32px 80px", 
                    borderBottom: `1px solid ${colors.outlineVariant}`,
                    minHeight: isMobile ? "auto" : "520px",
                }}>
                    {/* BG image */}
                    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${colors.bg} 20%, transparent 80%)`, zIndex: 1 }} />
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAsWqi7mOfZinZloeVK7bABjdrvaSo8ReutefSSHNtFzmkBVb5gKv2eRnkK0Zg_xnXgqVasj2hKnB3nVQ8g5jx9UQ7KgNlt0YWQyIA4gsxww16R1o5U2GtC66U5ub0xCd5u8WD9sLs5MJQ1ik2IWb26FNVwMXR2810anpFienZfLUPqajNfBU6FMtOmXLOPoZC-oLRGL1UwequU_q5aN7aDrDOqC58rU9iY_qP1cS-6dnbeZ-MhjpKH3aEp1BmY-XOehPr8YHtXf8"
                            alt="Surveillance command center"
                            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) brightness(0.35)", opacity: 0.5 }}
                        />
                    </div>

                    {/* Animated scan line */}
                    <div style={{
                        position: "absolute", left: 0, right: 0, height: 2, zIndex: 2,
                        background: `linear-gradient(90deg, transparent, ${colors.secondary}40, transparent)`,
                        animation: "scanH 4s linear infinite",
                    }} />

                    <div style={{ position: "relative", zIndex: 3, maxWidth: isMobile ? "100%" : "900px" }}>
                        <div style={{
                            display: "inline-flex", 
                            alignItems: "center", 
                            gap: 8,
                            background: `rgba(148,218,50,0.1)`, 
                            border: `1px solid ${colors.secondary}`,
                            color: colors.secondary, 
                            padding: isMobile ? "5px 12px" : "6px 14px",
                            fontFamily: "'JetBrains Mono'", 
                            fontSize: isMobile ? "9px" : "11px", 
                            letterSpacing: 3,
                            textTransform: "uppercase", 
                            marginBottom: 24,
                            opacity: heroLoaded ? 1 : 0, 
                            transition: "opacity 0.6s ease 0.2s",
                        }}>
                            <PulsingDot /> SYSTEM STATUS: PROTECTED
                        </div>

                        <h1 style={{
                            fontFamily: "'Space Grotesk'", 
                            fontSize: isMobile ? "clamp(28px, 8vw, 48px)" : isTablet ? "clamp(40px, 6vw, 60px)" : "clamp(36px, 6vw, 72px)",
                            fontWeight: 700, 
                            lineHeight: 1.05, 
                            textTransform: "uppercase",
                            letterSpacing: isMobile ? "1px" : "2px", 
                            marginBottom: 24,
                            opacity: heroLoaded ? 1 : 0, 
                            transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
                            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
                        }}>
                            UNCOMPROMISING<br />PROTECTION:{" "}
                            <span style={{ color: colors.secondary }}>WARRANTY<br />POLICY.</span>
                        </h1>

                        <p style={{
                            fontFamily: "'Space Grotesk'", 
                            fontSize: isMobile ? "14px" : isTablet ? "15px" : "16px", 
                            color: colors.onSurfaceVariant,
                            lineHeight: 1.7, 
                            maxWidth: 560, 
                            marginBottom: 36,
                            opacity: heroLoaded ? 1 : 0, 
                            transition: "opacity 0.7s ease 0.5s",
                        }}>
                            Every NV/// unit is forged for endurance. Our 1-Year 'Ironclad' Warranty ensures your perimeter remains secure without failure. In the rare event of a technical issue, we deploy immediate hardware restoration.
                        </p>

                        <div style={{
                            display: "flex", 
                            gap: 16, 
                            flexWrap: "wrap",
                            opacity: heroLoaded ? 1 : 0, 
                            transition: "opacity 0.7s ease 0.7s",
                            flexDirection: isMobile ? "column" : "row",
                        }}>
                            <button className="btn-primary" style={{ color: "#131313", width: isMobile ? "100%" : "auto" }}>DOWNLOAD POLICY PDF</button>
                            <Link to="/support" style={{ width: isMobile ? "100%" : "auto" }}>
                                <button className="btn-outline" style={{ width: "100%" }}>
                                    CONTACT SUPPORT
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Serial Verification */}
                <section style={{ 
                    padding: isMobile ? "30px 20px" : isTablet ? "35px 30px" : "40px 32px", 
                    background: "#0e0e0e", 
                    borderBottom: `1px solid ${colors.outlineVariant}` 
                }}>
                    <FadeIn>
                        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                            <div style={{
                                position: "relative",
                                display: isMobile ? "grid" : "grid", 
                                gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", 
                                gap: isMobile ? "16px" : "24px", 
                                alignItems: isMobile ? "stretch" : "center",
                                background: colors.surface, 
                                border: `1px solid ${colors.outlineVariant}`,
                                padding: isMobile ? "20px 16px" : isTablet ? "24px 28px" : "28px 32px",
                            }}>
                                <CornerBrackets />
                                <div>
                                    <div style={{ 
                                        fontFamily: "'JetBrains Mono'", 
                                        fontSize: isMobile ? "9px" : "10px", 
                                        letterSpacing: 3, 
                                        color: colors.secondary, 
                                        textTransform: "uppercase", 
                                        marginBottom: 6 
                                    }}>
                                        Serial Authentication
                                    </div>
                                    <h3 style={{ 
                                        fontFamily: "'Space Grotesk'", 
                                        fontSize: isMobile ? "18px" : "22px", 
                                        fontWeight: 700, 
                                        textTransform: "uppercase", 
                                        letterSpacing: 1 
                                    }}>
                                        VERIFY YOUR UNIT
                                    </h3>
                                </div>
                                <div style={{ 
                                    display: "flex", 
                                    gap: 0,
                                    gridColumn: isMobile ? "1 / -1" : "auto",
                                    flexDirection: isMobile ? "column" : "row",
                                }}>
                                    <div style={{ flex: 1, position: "relative" }}>
                                        <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.outline} strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                                        <input
                                            type="text"
                                            placeholder="ENTER 16-DIGIT NV-SERIAL NUMBER..."
                                            value={serial}
                                            onChange={e => { setSerial(e.target.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 16)); setVerifyState(null); }}
                                            maxLength={16}
                                        />
                                    </div>
                                    <button 
                                        className="btn-primary" 
                                        style={{ 
                                            color: "#131313", 
                                            padding: isMobile ? "12px 16px" : "14px 28px",
                                            width: isMobile ? "100%" : "auto",
                                            fontSize: isMobile ? "10px" : "11px",
                                        }} 
                                        onClick={handleVerify}
                                    >
                                        VERIFY
                                    </button>
                                </div>
                                {verifyState && (
                                    <div style={{
                                        gridColumn: "1 / -1",
                                        fontFamily: "'JetBrains Mono'", 
                                        fontSize: isMobile ? "11px" : "12px", 
                                        letterSpacing: 1,
                                        color: verifyState === "valid" ? colors.secondary : colors.error,
                                        padding: "10px 0 0",
                                    }}>
                                        {verifyState === "valid"
                                            ? "✓ UNIT VERIFIED — WARRANTY ACTIVE. COVERAGE EXPIRES: 2025-12-31"
                                            : "✗ INVALID SERIAL — Please enter a valid 16-character NV serial number."}
                                    </div>
                                )}
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* Coverage Protocols */}
                <section style={{ 
                    padding: isMobile ? "60px 20px" : isTablet ? "70px 30px" : "80px 32px" 
                }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                        <FadeIn>
                            <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "56px" }}>
                                <h2 style={{ 
                                    fontFamily: "'Space Grotesk'", 
                                    fontSize: isMobile ? "28px" : isTablet ? "32px" : "40px", 
                                    fontWeight: 700, 
                                    textTransform: "uppercase", 
                                    letterSpacing: isMobile ? "1px" : "2px", 
                                    marginBottom: 12 
                                }}>
                                    COVERAGE PROTOCOLS
                                </h2>
                                <div style={{ width: 80, height: 3, background: colors.secondary, margin: "0 auto" }} />
                            </div>
                        </FadeIn>

                        <div style={{ 
                            display: "grid", 
                            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
                            gap: isMobile ? "24px" : "32px" 
                        }}>
                            {/* Covered */}
                            <FadeIn delay={0.1}>
                                <div style={{
                                    background: colors.surface, 
                                    border: `1px solid ${colors.secondary}`,
                                    padding: isMobile ? "24px" : "36px", 
                                    position: "relative", 
                                    overflow: "hidden",
                                    boxShadow: `0 0 20px rgba(148,218,50,0.15)`,
                                }}>
                                    <div style={{ 
                                        position: "absolute", 
                                        top: 12, 
                                        right: 12, 
                                        fontFamily: "'JetBrains Mono'", 
                                        fontSize: 9, 
                                        color: colors.secondary, 
                                        opacity: 0.15, 
                                        letterSpacing: 2 
                                    }}>LVL_01_PROT</div>
                                    <div style={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        gap: 10, 
                                        marginBottom: 28 
                                    }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.secondary} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                        <h3 style={{ 
                                            fontFamily: "'JetBrains Mono'", 
                                            fontSize: isMobile ? "12px" : "13px", 
                                            fontWeight: 700, 
                                            letterSpacing: 2, 
                                            color: colors.secondary, 
                                            textTransform: "uppercase" 
                                        }}>
                                            IRONCLAD COVERAGE
                                        </h3>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                        {[
                                            { title: "Mechanical Failure", desc: "Internal gear housing and PTZ motor malfunctions under normal use." },
                                            { title: "Sensor Degradation", desc: "Premature pixel death or thermal sensor calibration drift." },
                                            { title: "Circuit Integrity", desc: "Processor failure or firmware corruption resulting from hardware flaws." },
                                        ].map((item, i) => (
                                            <div key={i} style={{ 
                                                display: "flex", 
                                                gap: 14, 
                                                alignItems: "flex-start", 
                                                paddingBottom: 20, 
                                                borderBottom: i < 2 ? `1px solid ${colors.outlineVariant}` : "none" 
                                            }}>
                                                <svg style={{ flexShrink: 0, marginTop: 2 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.secondary} strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                                <div>
                                                    <div style={{ 
                                                        fontFamily: "'JetBrains Mono'", 
                                                        fontSize: isMobile ? "10px" : "11px", 
                                                        letterSpacing: 1.5, 
                                                        fontWeight: 700, 
                                                        textTransform: "uppercase", 
                                                        marginBottom: 4 
                                                    }}>{item.title}</div>
                                                    <div style={{ 
                                                        fontFamily: "'Space Grotesk'", 
                                                        fontSize: isMobile ? "13px" : "14px", 
                                                        color: colors.onSurfaceVariant, 
                                                        lineHeight: 1.5 
                                                    }}>{item.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Void */}
                            <FadeIn delay={0.2}>
                                <div style={{ 
                                    background: "#181818", 
                                    border: `1px solid ${colors.outlineVariant}`, 
                                    padding: isMobile ? "24px" : "36px", 
                                    position: "relative", 
                                    overflow: "hidden" 
                                }}>
                                    <div style={{ 
                                        position: "absolute", 
                                        top: 12, 
                                        right: 12, 
                                        fontFamily: "'JetBrains Mono'", 
                                        fontSize: 9, 
                                        color: colors.outline, 
                                        opacity: 0.15, 
                                        letterSpacing: 2 
                                    }}>X_VOID_POLICY</div>
                                    <div style={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        gap: 10, 
                                        marginBottom: 28 
                                    }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.error} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></svg>
                                        <h3 style={{ 
                                            fontFamily: "'JetBrains Mono'", 
                                            fontSize: isMobile ? "12px" : "13px", 
                                            fontWeight: 700, 
                                            letterSpacing: 2, 
                                            textTransform: "uppercase" 
                                        }}>
                                            VOID CONDITIONS
                                        </h3>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                        {[
                                            { title: "Kinetic Damage", desc: "Smashed lenses, casing trauma, or intentional physical destruction." },
                                            { title: "Unauthorized Access", desc: "Broken factory seals or third-party hardware modifications." },
                                            { title: "Grid Surge", desc: "Damage resulting from non-compliant power supplies or lightning." },
                                        ].map((item, i) => (
                                            <div key={i} style={{ 
                                                display: "flex", 
                                                gap: 14, 
                                                alignItems: "flex-start", 
                                                paddingBottom: 20, 
                                                borderBottom: i < 2 ? `1px solid ${colors.outlineVariant}` : "none", 
                                                opacity: 0.75 
                                            }}>
                                                <svg style={{ flexShrink: 0, marginTop: 2 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.outline} strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                                                <div>
                                                    <div style={{ 
                                                        fontFamily: "'JetBrains Mono'", 
                                                        fontSize: isMobile ? "10px" : "11px", 
                                                        letterSpacing: 1.5, 
                                                        fontWeight: 700, 
                                                        textTransform: "uppercase", 
                                                        marginBottom: 4, 
                                                        color: colors.onSurfaceVariant 
                                                    }}>{item.title}</div>
                                                    <div style={{ 
                                                        fontFamily: "'Space Grotesk'", 
                                                        fontSize: isMobile ? "13px" : "14px", 
                                                        color: colors.onSurfaceVariant, 
                                                        lineHeight: 1.5, 
                                                        opacity: 0.7 
                                                    }}>{item.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Claim Process */}
                <section style={{ 
                    padding: isMobile ? "60px 20px" : isTablet ? "70px 30px" : "80px 32px", 
                    background: colors.surface, 
                    borderTop: `1px solid ${colors.outlineVariant}`, 
                    borderBottom: `1px solid ${colors.outlineVariant}` 
                }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                        <FadeIn>
                            <div style={{ 
                                display: "flex", 
                                justifyContent: "space-between", 
                                alignItems: isMobile ? "flex-start" : "flex-end", 
                                marginBottom: isMobile ? "32px" : "48px",
                                flexDirection: isMobile ? "column" : "row",
                                gap: isMobile ? "16px" : "0",
                            }}>
                                <div>
                                    <div style={{ 
                                        fontFamily: "'JetBrains Mono'", 
                                        fontSize: isMobile ? "9px" : "10px", 
                                        letterSpacing: 4, 
                                        color: colors.secondary, 
                                        textTransform: "uppercase", 
                                        marginBottom: 6 
                                    }}>
                                        Process Details
                                    </div>
                                    <h2 style={{ 
                                        fontFamily: "'Space Grotesk'", 
                                        fontSize: isMobile ? "28px" : isTablet ? "32px" : "40px", 
                                        fontWeight: 700, 
                                        textTransform: "uppercase", 
                                        letterSpacing: isMobile ? "1px" : "2px" 
                                    }}>
                                        WARRANTY CLAIM PROCESS
                                    </h2>
                                </div>
                                <div style={{ 
                                    fontFamily: "'JetBrains Mono'", 
                                    fontSize: isMobile ? "9px" : "10px", 
                                    letterSpacing: 2, 
                                    color: colors.onSurfaceVariant, 
                                    textTransform: "uppercase", 
                                    paddingBottom: isMobile ? "0" : "8px" 
                                }}>
                                    EST. RESOLUTION: 48-72 HOURS
                                </div>
                            </div>
                        </FadeIn>

                        <div style={{ 
                            display: "flex", 
                            border: `1px solid ${colors.outlineVariant}`,
                            flexDirection: isMobile ? "column" : "row",
                        }}>
                            {[
                                {
                                    num: "01",
                                    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.secondary} strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="1" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>,
                                    title: "VERIFY SERIAL",
                                    desc: "Locate the laser-etched 16-digit ID on the underside of your hardware or via the system dashboard.",
                                },
                                {
                                    num: "02",
                                    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.secondary} strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>,
                                    title: "SUBMIT LOG",
                                    desc: "Export system diagnostic logs and attach high-resolution imagery of the hardware status.",
                                },
                                {
                                    num: "03",
                                    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.secondary} strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
                                    title: "DEPLOY SUPPORT",
                                    desc: "Our technical response team validates the claim and ships a replacement unit or dispatches technical support.",
                                },
                            ].map((step, i) => (
                                <FadeIn key={i} delay={i * 0.15} style={{ 
                                    flex: 1, 
                                    borderRight: isMobile ? "none" : (i < 2 ? `1px solid ${colors.outlineVariant}` : "none"),
                                    borderBottom: isMobile && i < 2 ? `1px solid ${colors.outlineVariant}` : "none",
                                }}>
                                    <div className="step-card">
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <span style={{ 
                                                fontFamily: "'Space Grotesk'", 
                                                fontSize: isMobile ? "40px" : "52px", 
                                                fontWeight: 700, 
                                                color: colors.outlineVariant, 
                                                lineHeight: 1 
                                            }}>{step.num}</span>
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h4 style={{ 
                                                fontFamily: "'JetBrains Mono'", 
                                                fontSize: isMobile ? "12px" : "13px", 
                                                fontWeight: 700, 
                                                letterSpacing: 2, 
                                                textTransform: "uppercase", 
                                                marginBottom: 10 
                                            }}>{step.title}</h4>
                                            <p style={{ 
                                                fontFamily: "'Space Grotesk'", 
                                                fontSize: isMobile ? "13px" : "14px", 
                                                color: colors.onSurfaceVariant, 
                                                lineHeight: 1.6 
                                            }}>{step.desc}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Side labels */}
                <div style={{ 
                    position: "absolute", 
                    left: 8, 
                    top: "50%", 
                    transform: "translateY(-50%) rotate(-90deg)", 
                    transformOrigin: "left center", 
                    fontFamily: "'JetBrains Mono'", 
                    fontSize: isMobile ? "7px" : "9px", 
                    letterSpacing: 10, 
                    color: colors.secondary, 
                    opacity: isMobile ? 0.08 : 0.15, 
                    whiteSpace: "nowrap", 
                    pointerEvents: "none" 
                }}>AUTH_WARRANTY_V2.0</div>
                <div style={{ 
                    position: "absolute", 
                    right: 8, 
                    top: "50%", 
                    transform: "translateY(-50%) rotate(90deg)", 
                    transformOrigin: "right center", 
                    fontFamily: "'JetBrains Mono'", 
                    fontSize: isMobile ? "7px" : "9px", 
                    letterSpacing: 10, 
                    color: colors.secondary, 
                    opacity: isMobile ? 0.08 : 0.15, 
                    whiteSpace: "nowrap", 
                    pointerEvents: "none" 
                }}>SECURE_ENCRYPTION_ACTIVE</div>
            </main>

            {/* Footer */}

        </div>
    );
}