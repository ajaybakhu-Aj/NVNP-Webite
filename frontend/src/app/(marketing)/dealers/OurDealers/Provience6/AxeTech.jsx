import { useState, useEffect, useRef } from "react";

// ─── Brand Tokens (NIGHTVISION™ Guidelines) ───────────────────────────────────
const C = {
    primary: "#B5E75D",
    primaryDk: "#76B900",
    white: "#FFFFFF",
    offWhite: "#FFFFF0",
    dark: "#1C1C1C",
    black: "#000000",
    bg: "#11140C",
    surface: "#1A1D14",
    surfaceMid: "#1E2117",
    surfaceHi: "#282B21",
    outline: "#434938",
    outlineHi: "#8D937F",
    onSurface: "#E2E4D5",
    onMuted: "#C3C9B3",
    error: "#FF6B6B",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const DEALER = {
    id: "axe-tech",
    name: "AXE-Tech",
    zone: "Zone 6 | Kohalpur",
    badge: "VERIFIED DEALER",
    address: ["Kohalpur, Banke, Nepal",],
    city: "Kohalpur 456001, Nepal",
    lat: "28.1986° N",
    lng: "81.6911° E",
    phone: ["+9779802575215"],
    whatsapp: ["+9779802575215"],
    hours: [
        { day: "Sun – Fri", time: "09:00 – 18:00", open: true },
        { day: "Saturday", time: "CLOSED", open: false },
    ],
    about: [
        "AXE-Tech has been the cornerstone of security infrastructure in Banke for over a decade. As an authorized NV// NIGHTVISION™ partner, they specialize in the deployment of high-tier surveillance systems for both commercial and residential sectors.",
        "Their team of certified engineers provides end-to-end solutions, from site security assessment to precision hardware installation and 24/7 maintenance support. AXE-Tech is recognized for maintaining the highest technical standards in the region, ensuring that every deployment meets the rigorous NV// certification benchmarks.",
    ],
    stats: [
        { value: "12+", label: "Years Active" },
        { value: "500+", label: "Deployments" },
        { value: "98%", label: "Satisfaction" },
    ],

    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjTKoOcv5OMUCUjjkYVhLl14iTuFXtzp8MpDTdHUiO9Ve3KTxYwF88e8iwaGrhyQS93RGPez0xn5w7VZDe25EfCU-kqM70U16NSNzEh4EqBZn-btgpd8ZKhQOKYJlg4xhTecBZAJOcuUcd6NUdRnxT-7Ka7zS4_3x4qrA1jqOIQPnZ8W2VMpNuoDHhfDoGHpCpX_4EB5zHQhSsXdvxC5tTqt0tArTlIqH17mMbidfKC5h3qM_vrLn1d86G3ZIkkwexVhqP0rLahik",
};

const NEARBY = [
    {
        id: "suraksha",
        name: "Suraksha Solutions",
        zone: "Zone 1 | Kathmandu",
        loc: "Lazimpat, Kathmandu",
    },
    {
        id: "core",
        name: "Core Systems Ltd.",
        zone: "Zone 3 | Bhaktapur",
        loc: "Suryabinayak, Bhaktapur",
    },
    {
        id: "neo",
        name: "Neo Security Hub",
        zone: "Zone 1 | Kathmandu",
        loc: "Putalisadak, Kathmandu",
    },
];

// ─── Inline Icon SVGs ────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = C.primary }) => {
    const icons = {
        phone: (
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
        ),
        location: (
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        ),
        clock: (
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z" />
        ),
        chat: (
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        ),
        route: (
            <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
        ),
        verified: (
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        ),
        arrow: (
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
        ),
        back: (
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        ),
        plus: (
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        ),
        minus: (
            <path d="M19 13H5v-2h14v2z" />
        ),
    };
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "inline-block", verticalAlign: "middle" }}
        >
            {icons[name]}
        </svg>
    );
};

// ─── Reusable Corner-Mark Decoration ─────────────────────────────────────────
const CornerMarks = ({ color = C.primary, size = 14 }) => (
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
                    width: size,
                    height: size,
                    borderColor: color,
                    borderStyle: "solid",
                    ...s,
                }}
            />
        ))}
    </>
);

// ─── Scanline Overlay ─────────────────────────────────────────────────────────
const Scanlines = ({ opacity = 0.06 }) => (
    <div
        style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            background: `repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(181,231,93,${opacity}) 2px,rgba(181,231,93,${opacity}) 4px)`,
        }}
    />
);

// ─── Blinking Dot ─────────────────────────────────────────────────────────────
const BlinkDot = () => {
    const [on, setOn] = useState(true);
    useEffect(() => {
        const t = setInterval(() => setOn((v) => !v), 800);
        return () => clearInterval(t);
    }, []);
    return (
        <span
            style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: 0,
                background: on ? C.primary : "transparent",
                border: `1px solid ${C.primary}`,
                marginRight: 8,
                transition: "background 0.1s",
            }}
        />
    );
};

// ─── Map Section ──────────────────────────────────────────────────────────────
const MapSection = ({ img }) => {
    const [zoom, setZoom] = useState(1);
    const [pos, setPos] = useState({ x: 50, y: 50 });
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        setPos({ x, y });
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/10",
                overflow: "hidden",
                background: C.surfaceHi,
                
                border: `1px solid ${C.outline}`,
            }}
        >
            <img
                src={img}
                alt="Map Location"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(60%) brightness(0.5) hue-rotate(50deg) saturate(2)",
                    transform: `scale(${zoom}) translate(${(50 - pos.x) * 0.05}px, ${(50 - pos.y) * 0.05}px)`,
                    transition: "transform 0.4s ease",
                    transformOrigin: "center",
                }}
            />
            {/* Green tint overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(181,231,93,0.05)",
                    mixBlendMode: "screen",
                    pointerEvents: "none",
                }}
            />
            {/* Grid lines */}
            <svg
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    opacity: 0.15,
                }}
            >
                {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((p) => (
                    <g key={p}>
                        <line
                            x1={`${p}%`}
                            y1="0"
                            x2={`${p}%`}
                            y2="100%"
                            stroke={C.primary}
                            strokeWidth="0.5"
                            strokeDasharray="4 8"
                        />
                        <line
                            x1="0"
                            y1={`${p}%`}
                            x2="100%"
                            y2={`${p}%`}
                            stroke={C.primary}
                            strokeWidth="0.5"
                            strokeDasharray="4 8"
                        />
                    </g>
                ))}
            </svg>
            {/* Pin */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: 16,
                        height: 16,
                        background: C.primary,
                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                        animation: "pinPulse 2s ease-in-out infinite",
                    }}
                />
                <div style={{ width: 2, height: 20, background: `linear-gradient(${C.primary}, transparent)` }} />
            </div>
            {/* Ping rings */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -55%)",
                    pointerEvents: "none",
                }}
            >
                {[0, 400, 800].map((delay) => (
                    <div
                        key={delay}
                        style={{
                            position: "absolute",
                            border: `1px solid ${C.primary}`,
                            borderRadius: "50%",
                            animation: `mapPing 2s ${delay}ms ease-out infinite`,
                            width: 60,
                            height: 60,
                            top: -30,
                            left: -30,
                            opacity: 0.4,
                        }}
                    />
                ))}
            </div>

            {/* Zoom controls */}
            <div style={{ position: "absolute", top: 12, right: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                    { icon: "plus", fn: () => setZoom((z) => Math.min(2, z + 0.2)) },
                    { icon: "minus", fn: () => setZoom((z) => Math.max(1, z - 0.2)) },
                ].map((b) => (
                    <button
                        key={b.icon}
                        onClick={b.fn}
                        style={{
                            width: 36,
                            height: 36,
                            background: "rgba(17, 20, 12, 0.85)",
                            border: `1px solid ${C.outline}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            
                            transition: "border-color 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.primary)}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.outline)}
                    >
                        <Icon name={b.icon} size={16} color={C.primary} />
                    </button>
                ))}
            </div>
            <style>{`
        @keyframes mapPing { 0%{transform:scale(0);opacity:0.6} 100%{transform:scale(3);opacity:0} }
        @keyframes pinPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(0.85)} }
      `}</style>
        </div>
    );
};

// ─── Main Axe-Tech component ──────────────────────────────────────────────────
export default function AxeTech() {
    const [toastMsg, setToastMsg] = useState(null);

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 2800);
    };

    const containerStyle = {
        fontFamily: "'Poppins', sans-serif",
        background: C.bg,
        color: C.onSurface,
        minHeight: "100vh",
        position: "relative",
        
        paddingTop: "64px", // To account for global sticky header
    };

    return (
        <div style={containerStyle}>
            {/* Google Fonts */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Poppins:wght@300;400;500;600;700&display=swap"
            />
            <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px }
        ::-webkit-scrollbar-track { background: ${C.bg} }
        ::-webkit-scrollbar-thumb { background: ${C.outlineHi} }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-20px) } to { opacity: 1; transform: translateX(0) } }
        .fade-up { animation: fadeUp 0.5s ease forwards }
        .fade-up-1 { animation: fadeUp 0.5s 0.1s ease both }
        .fade-up-2 { animation: fadeUp 0.5s 0.2s ease both }
        .fade-up-3 { animation: fadeUp 0.5s 0.3s ease both }
        .fade-up-4 { animation: fadeUp 0.5s 0.4s ease both }
        .slide-in { animation: slideIn 0.5s ease both }

        .dealer-header {
            padding: 56px 24px 48px;
        }
        .dealer-main-grid {
            display: grid;
            grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
            gap: 32px;
            padding: 48px 24px;
        }
        .dealer-nearby-section {
            padding: 64px 24px;
        }
        .nearby-dealers-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 991px) {
            .dealer-header {
                padding: 40px 24px;
            }
            .dealer-main-grid {
                grid-template-columns: 1fr;
                gap: 24px;
                padding: 32px 24px;
            }
            .dealer-nearby-section {
                padding: 48px 24px;
            }
            .nearby-dealers-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 767px) {
            .nearby-dealers-grid {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 576px) {
            .dealer-header {
                padding: 32px 16px;
            }
            .dealer-main-grid {
                padding: 24px 16px;
                gap: 20px;
            }
            .dealer-nearby-section {
                padding: 32px 16px;
            }
        }
      `}</style>

            {/* ── HERO HEADER ── */}
            <header
                className="dealer-header fade-up"
                style={{
                    position: "relative",
                    borderBottom: `1px solid ${C.outline}`,
                    overflow: "hidden",
                }}
            >
                <Scanlines opacity={0.04} />
                <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
                    {/* Badge */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            border: `1px solid ${C.primary}`,
                            background: "rgba(181, 231, 93, 0.08)",
                            padding: "4px 14px",
                            marginBottom: 24,
                            fontFamily: "'Space Grotesk', monospace",
                            fontSize: 10,
                            letterSpacing: 3,
                            textTransform: "uppercase",
                            color: C.primary,
                        }}
                        className="slide-in"
                    >
                        <BlinkDot />
                        {DEALER.badge}
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
                        <div>
                            <div
                                style={{
                                    fontFamily: "'Space Grotesk', monospace",
                                    fontSize: 11,
                                    letterSpacing: 3,
                                    textTransform: "uppercase",
                                    color: C.outlineHi,
                                    marginBottom: 8,
                                }}
                            >
                                {DEALER.zone}
                            </div>
                            <h1
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "clamp(36px, 5vw, 72px)",
                                    letterSpacing: "-1px",
                                    textTransform: "uppercase",
                                    color: C.onSurface,
                                    lineHeight: 1.0,
                                    marginBottom: 16,
                                }}
                            >
                                {DEALER.name}
                            </h1>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.onMuted }}>
                                <Icon name="location" size={18} color={C.outlineHi} />
                                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16 }}>{DEALER.address}</span>
                            </div>
                        </div>
                        {/* NV logo badge */}
                        <div
                            style={{
                                border: `1px solid ${C.outline}`,
                                padding: "16px 28px",
                                background: C.surface,
                                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
                            }}
                        >
                            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: 6, color: C.primary }}>NV//</div>
                            <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 9, letterSpacing: 3, color: C.outlineHi, textTransform: "uppercase", marginTop: 4 }}>
                                AUTHORIZED DEALER
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── MAIN GRID ── */}
            <main
                className="dealer-main-grid"
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                }}
            >
                {/* LEFT COLUMN */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* Contact Card */}
                    <div
                        style={{
                            background: C.surfaceMid,
                            border: `1px solid ${C.outline}`,
                            padding: 32,
                            position: "relative",
                        }}
                        className="fade-up-1"
                    >
                        <CornerMarks />
                        <div
                            style={{
                                fontFamily: "'Space Grotesk', monospace",
                                fontSize: 10,
                                letterSpacing: 3,
                                textTransform: "uppercase",
                                color: C.primary,
                                borderBottom: `1px solid rgba(181, 231, 93, 0.15)`,
                                paddingBottom: 16,
                                marginBottom: 28,
                            }}
                        >
                            Operator Information
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                            {/* Phone */}
                            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        border: `1px solid ${C.outline}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon name="phone" size={18} />
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontFamily: "'Space Grotesk', monospace",
                                            fontSize: 9,
                                            letterSpacing: 2,
                                            textTransform: "uppercase",
                                            color: C.outlineHi,
                                            marginBottom: 6,
                                        }}
                                    >
                                        Secure Line
                                    </div>
                                    {DEALER.phone.map((p) => (
                                        <div
                                            key={p}
                                            style={{
                                                fontFamily: "'Poppins', sans-serif",
                                                fontSize: 15,
                                                fontWeight: 500,
                                                color: C.onSurface,
                                                lineHeight: 1.8,
                                            }}
                                        >
                                            {p}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Address */}
                            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        border: `1px solid ${C.outline}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon name="location" size={18} />
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontFamily: "'Space Grotesk', monospace",
                                            fontSize: 9,
                                            letterSpacing: 2,
                                            textTransform: "uppercase",
                                            color: C.outlineHi,
                                            marginBottom: 6,
                                        }}
                                    >
                                        Operational Base
                                    </div>
                                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: C.onMuted, lineHeight: 1.7 }}>
                                        {DEALER.address}
                                        <br />
                                        {DEALER.city}
                                    </div>
                                </div>
                            </div>
                            {/* Hours */}
                            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        border: `1px solid ${C.outline}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon name="clock" size={18} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontFamily: "'Space Grotesk', monospace",
                                            fontSize: 9,
                                            letterSpacing: 2,
                                            textTransform: "uppercase",
                                            color: C.outlineHi,
                                            marginBottom: 8,
                                        }}
                                    >
                                        Duty Hours
                                    </div>
                                    {DEALER.hours.map((h) => (
                                        <div
                                            key={h.day}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                borderBottom: `1px solid ${C.outline}`,
                                                paddingBottom: 6,
                                                marginBottom: 6,
                                            }}
                                        >
                                            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: C.onMuted }}>
                                                {h.day}
                                            </span>
                                            <span
                                                style={{
                                                    fontFamily: "'Space Grotesk', monospace",
                                                    fontSize: 12,
                                                    color: h.open ? C.primary : C.error,
                                                    letterSpacing: 1,
                                                }}
                                            >
                                                {h.time}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                            <button
                                onClick={() => (window.location.href = `tel:${DEALER.phone[0].replace(/\s+/g, "")}`)}
                                style={{
                                    background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDk})`,
                                    color: C.black,
                                    fontFamily: "'Space Grotesk', monospace",
                                    fontWeight: 700,
                                    fontSize: 12,
                                    letterSpacing: 3,
                                    textTransform: "uppercase",
                                    height: 52,
                                    border: "none",
                                    
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 10,
                                    transition: "filter 0.2s",
                                    boxShadow: "0 0 20px rgba(181, 231, 93, 0.25)",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
                                onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
                            >
                                <Icon name="phone" size={18} color={C.black} /> INITIATE CALL
                            </button>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                {[
                                    { icon: "chat", label: "WhatsApp" },
                                    { icon: "route", label: "Route" },
                                ].map((b) => (
                                    <button
                                        key={b.label}
                                        onClick={() => {
                                            if (b.label === "WhatsApp") {
                                                const cleanNum = DEALER.whatsapp[0].replace(/[^0-9]/g, "");
                                                window.open(
                                                    `https://wa.me/${cleanNum}?text=Hello%20${encodeURIComponent(DEALER.name)}`,
                                                    "_blank"
                                                );
                                            } else {
                                                window.open(
                                                    `https://maps.google.com/?q=${encodeURIComponent(DEALER.address[0])}`,
                                                    "_blank"
                                                );
                                            }
                                        }}
                                        style={{
                                            background: C.surfaceHi,
                                            border: `1px solid ${C.outline}`,
                                            color: C.onSurface,
                                            fontFamily: "'Space Grotesk', monospace",
                                            fontSize: 11,
                                            letterSpacing: 2,
                                            textTransform: "uppercase",
                                            height: 48,
                                            
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 8,
                                            transition: "all 0.15s",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = C.primary;
                                            e.currentTarget.style.color = C.primary;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = C.outline;
                                            e.currentTarget.style.color = C.onSurface;
                                        }}
                                    >
                                        <Icon name={b.icon} size={16} color="currentColor" /> {b.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Inventory Profile */}

                </div>

                {/* RIGHT COLUMN */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* Map */}
                    <div className="fade-up-1">
                        <MapSection img={DEALER.img} />
                    </div>

                    {/* About Card */}
                    <div style={{ background: C.surfaceMid, borderLeft: `3px solid ${C.primary}`, padding: 36 }} className="fade-up-2">
                        <h2
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 700,
                                fontSize: 24,
                                letterSpacing: 3,
                                textTransform: "uppercase",
                                color: C.onSurface,
                                marginBottom: 20,
                            }}
                        >
                            About {DEALER.name}
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {DEALER.about.map((p, i) => (
                                <p
                                    key={i}
                                    style={{
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: 14,
                                        lineHeight: 1.85,
                                        color: C.onMuted,
                                    }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>
                        {/* Stats */}
                        <div style={{ marginTop: 32, paddingTop: 28, borderTop: `1px solid ${C.outline}`, display: "flex", gap: 40 }}>
                            {DEALER.stats.map((s) => (
                                <div key={s.label}>
                                    <div
                                        style={{
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            fontWeight: 700,
                                            fontSize: 36,
                                            color: C.primary,
                                            letterSpacing: -1,
                                        }}
                                    >
                                        {s.value}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: "'Space Grotesk', monospace",
                                            fontSize: 9,
                                            letterSpacing: 2,
                                            textTransform: "uppercase",
                                            color: C.outlineHi,
                                            marginTop: 4,
                                        }}
                                    >
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* ── NEARBY DEALERS ── */}
            <section
                className="dealer-nearby-section"
                style={{ background: C.surface, borderTop: `1px solid ${C.outline}` }}
            >
                <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "end",
                            justifyContent: "space-between",
                            marginBottom: 40,
                            flexWrap: "wrap",
                            gap: 16,
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontFamily: "'Space Grotesk', monospace",
                                    fontSize: 10,
                                    letterSpacing: 4,
                                    textTransform: "uppercase",
                                    color: C.primary,
                                    marginBottom: 8,
                                }}
                            >
                                Network Expansion
                            </div>
                            <h2
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 700,
                                    fontSize: 32,
                                    letterSpacing: 3,
                                    textTransform: "uppercase",
                                    color: C.onSurface,
                                }}
                            >
                                Nearby Certified Partners
                            </h2>
                        </div>
                        <a
                            href="#"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                color: C.primary,
                                fontFamily: "'Space Grotesk', monospace",
                                fontSize: 11,
                                letterSpacing: 2,
                                textTransform: "uppercase",
                                textDecoration: "none",
                            }}
                        >
                            VIEW NETWORK MAP <Icon name="arrow" size={14} color={C.primary} />
                        </a>
                    </div>
                    <div className="nearby-dealers-grid" style={{ gap: 20 }}>
                        {NEARBY.map((d, i) => (
                            <DealerCard
                                key={d.id}
                                dealer={d}
                                delay={i * 100}
                                onViewIntel={() => showToast(`Opening ${d.name} profile...`)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TOAST ── */}
            {toastMsg && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 32,
                        right: 32,
                        background: C.surfaceHi,
                        border: `1px solid ${C.primary}`,
                        padding: "14px 24px",
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: 11,
                        letterSpacing: 1.5,
                        color: C.primary,
                        textTransform: "uppercase",
                        zIndex: 9999,
                        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
                        animation: "fadeUp 0.3s ease",
                    }}
                >
                    {toastMsg}
                </div>
            )}
        </div>
    );
}

// ─── DealerCard sub-component ─────────────────────────────────────────────────
function DealerCard({ dealer, delay, onViewIntel }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: C.bg,
                border: `1px solid ${hovered ? C.primary : C.outline}`,
                padding: 28,
                transition: "border-color 0.2s, transform 0.2s",
                transform: hovered ? "translateY(-3px)" : "none",
                
                animation: `fadeUp 0.5s ${delay}ms ease both`,
            }}
        >
            <div
                style={{
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: 9,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: hovered ? C.primary : C.outlineHi,
                    marginBottom: 6,
                    transition: "color 0.2s",
                }}
            >
                {dealer.zone}
            </div>
            <h4
                style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: hovered ? C.primary : C.onSurface,
                    marginBottom: 16,
                    transition: "color 0.2s",
                }}
            >
                {dealer.name}
            </h4>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.onMuted, marginBottom: 24 }}>
                <Icon name="location" size={14} color={C.outlineHi} />
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13 }}>{dealer.loc}</span>
            </div>
            <button
                onClick={onViewIntel}
                style={{
                    width: "100%",
                    padding: "12px 0",
                    border: `1px solid ${hovered ? C.primary : C.outline}`,
                    background: hovered ? C.primary : "transparent",
                    color: hovered ? C.black : C.onMuted,
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: 10,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                }}
            >
                VIEW INTEL {hovered && <Icon name="arrow" size={12} color={C.black} />}
            </button>
        </div>
    );
}
