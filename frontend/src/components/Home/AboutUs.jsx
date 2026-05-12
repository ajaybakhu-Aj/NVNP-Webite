import { useState } from "react";
import { Link } from "react-router-dom";

const tailwindConfig = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  :root {
    --color-background: #131313;
    --color-on-secondary-container: #284300;
    --color-surface-container-high: #2a2a2a;
    --color-secondary: #94da32;
    --color-primary-container: #b5e75d;
    --color-on-primary-container: #466700;
    --color-on-surface: #e5e2e1;
    --color-on-surface-variant: #c3c9b3;
    --color-surface-container-low: #1b1b1b;
    --color-surface-container-lowest: #0e0e0e;
    --color-outline-variant: #434938;
    --color-outline: #8d937f;
    --color-error: #ffb4ab;
  }
`;

const styles = `
  .scanline-overlay {
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%),
      linear-gradient(90deg, rgba(255,0,0,0.02), rgba(0,255,0,0.01), rgba(0,0,255,0.02));
    background-size: 100% 4px, 3px 100%;
    pointer-events: none;
  }
  .glow-border {
    box-shadow: 0 0 15px rgba(181, 231, 93, 0.2);
  }
  .corner-cross::before,
  .corner-cross::after {
    content: '+';
    position: absolute;
    color: #b5e75d;
    font-family: monospace;
    font-size: 14px;
  }
  .corner-cross::before { top: 8px; left: 8px; }
  .corner-cross::after { bottom: 8px; right: 8px; }
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
`;

function Icon({ name, className = "" }) {
    return (
        <span className={`material-symbols-outlined ${className}`}>{name}</span>
    );
}

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

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
                maxWidth: "1280px",
                margin: "0 auto",
                borderBottom: "1px solid #434938",
                backgroundColor: "rgba(19,19,19,0.95)",
                backdropFilter: "blur(4px)",
            }}
        >
            {/* Logo */}
            <div
                style={{
                    fontFamily: "Arial Black, sans-serif",
                    fontStyle: "italic",
                    fontSize: "30px",
                    lineHeight: "1.2",
                    letterSpacing: "2px",
                    fontWeight: 700,
                    color: "#94da32",
                }}
            >
                <span>
                    <span style={{ color: "#B5E75D" }}>N</span>
                    <span style={{ color: "#FFFFFF" }}>V</span>
                    <span style={{ color: "#B5E75D" }}>//</span>
                </span>
                <span style={{ color: "#FFFFFF" }}>NIGHTVISION™</span>
            </div>

            {/* Desktop Nav */}
            <nav
                style={{
                    display: "none",
                    gap: "24px",
                    alignItems: "center",
                }}
                className="desktop-nav"
            >
                {["CCTV CAMERAS", "ABOUT US", "CONTACT US", "DEALERSHIPS"].map(
                    (item) => (
                        <a
                            key={item}
                            href="#"
                            style={{
                                color:
                                    item === "ABOUT US" ? "#94da32" : "#c3c9b3",
                                borderBottom:
                                    item === "ABOUT US" ? "2px solid #94da32" : "none",
                                paddingBottom: item === "ABOUT US" ? "8px" : "0",
                                fontWeight: item === "ABOUT US" ? 700 : 600,
                                fontFamily: "Inter",
                                fontSize: "12px",
                                letterSpacing: "1px",
                                textDecoration: "none",
                                transition: "color 0.2s",
                            }}
                        >
                            {item}
                        </a>
                    )
                )}
            </nav>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                    className="support-btn"
                    style={{
                        display: "none",
                        fontFamily: "Inter",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        color: "#94da32",
                        border: "1px solid #94da32",
                        padding: "8px 16px",
                        background: "transparent",
                        cursor: "pointer",
                        transition: "all 0.2s",
                    }}
                >
                    SUPPORT HOTLINE
                </button>
                <Icon
                    name="shopping_cart"
                    className=""
                    style={{ color: "#94da32", cursor: "pointer", padding: "8px" }}
                />
                <Icon
                    name="account_circle"
                    className=""
                    style={{ color: "#94da32", cursor: "pointer", padding: "8px" }}
                />
                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="mobile-menu-btn"
                    style={{
                        background: "none",
                        border: "none",
                        color: "#94da32",
                        cursor: "pointer",
                        fontSize: "28px",
                        lineHeight: 1,
                    }}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {
                menuOpen && (
                    <div
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            backgroundColor: "#131313",
                            borderBottom: "1px solid #434938",
                            padding: "16px 24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            zIndex: 100,
                        }}
                    >
                        {["CCTV CAMERAS", "ABOUT US", "CONTACT US", "DEALERSHIPS"].map(
                            (item) => (
                                <Link
                                    to="/about"
                                    style={{
                                        color: colors.onSurfaceVariant,
                                        textDecoration: "none",
                                        fontFamily: "'Arial Black', sans-serif",
                                        fontWeight: 600,
                                        fontSize: 12,
                                        letterSpacing: 1,
                                    }}
                                >
                                    ABOUT US
                                </Link>
                            )
                        )}
                        <button
                            style={{
                                fontFamily: "Inter",
                                fontSize: "12px",
                                letterSpacing: "1px",
                                fontWeight: 600,
                                color: "#94da32",
                                border: "1px solid #94da32",
                                padding: "8px 16px",
                                background: "transparent",
                                cursor: "pointer",
                                alignSelf: "flex-start",
                            }}
                        >
                            SUPPORT HOTLINE
                        </button>
                    </div>
                )
            }
        </header >
    );
}

function HeroSection() {
    return (
        <section
            style={{
                position: "relative",
                width: "100%",
                height: "60vh",
                display: "flex",
                alignItems: "flex-end",
                padding: "24px",
                backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida/ADBb0uigFZm2MU_7fFkN1PGbqxTC4_zsd19WX1rPPXQ9Dq4i5EMbGW8uL59JfytFZsh1esNLU9nligJX4Uv90jKWL6D8MLXnq26q3GTMcyBfSr1_zrrXpo67IpigOrch4RSQvHkeqBk9x4VXRJLGzluFfWso-xnep3TZtUNQtmjjVkx4xUm72ROueuOlQghaRdACvRgs6p-gLEx5sf_1mpkxK_OjtZIMzVkcxp_k_5NJOEzBPjW9mg5vXhadcbQb9GP1FJGoMGX0s4cmKw')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Gradient overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to top, #131313, rgba(19,19,19,0.4), transparent)",
                }}
            />
            {/* Scanline overlay */}
            <div className="scanline-overlay" style={{ position: "absolute", inset: 0 }} />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "12px",
                    }}
                >
                    <span
                        style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#ffb4ab",
                            borderRadius: "9999px",
                            animation: "pulse 2s infinite",
                            display: "inline-block",
                        }}
                    />
                    <span
                        style={{
                            fontFamily: "Inter",
                            fontSize: "12px",
                            letterSpacing: "4px",
                            fontWeight: 600,
                            color: "#e5e2e1",
                        }}
                    >
                        LIVE_FEED // EST_2012
                    </span>
                </div>
                <h1
                    style={{
                        fontFamily: "Space Grotesk",
                        fontSize: "clamp(64px, 12vw, 120px)",
                        lineHeight: 1,
                        color: "#94da32",
                        textTransform: "uppercase",
                        fontStyle: "italic",
                        fontWeight: 700,
                        margin: 0,
                    }}
                >
                    ABOUT US
                </h1>
                <div
                    style={{
                        height: "4px",
                        width: "100%",
                        backgroundColor: "#94da32",
                        marginTop: "24px",
                    }}
                />
            </div>
        </section>
    );
}

function CompanyStory() {
    return (
        <section
            style={{
                padding: "80px 24px",
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "48px",
                alignItems: "center",
            }}
            className="story-section"
        >
            {/* Text */}
            <div className="story-text" style={{ gridColumn: "span 7" }}>
                <h2
                    style={{
                        fontFamily: "Space Grotesk",
                        fontSize: "40px",
                        lineHeight: "1.2",
                        letterSpacing: "2px",
                        fontWeight: 700,
                        color: "#94da32",
                        marginBottom: "24px",
                        textTransform: "uppercase",
                    }}
                >
                    UNCOMPROMISING VIGILANCE
                </h2>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        fontFamily: "Inter",
                        fontSize: "18px",
                        lineHeight: "1.6",
                        color: "#c3c9b3",
                        maxWidth: "672px",
                    }}
                >
                    <p style={{ margin: 0 }}>
                        Founded on the principles of technical superiority and absolute
                        reliability, NIGHTVISION™ has emerged as Nepal's premier
                        manufacturer of high-end tactical surveillance equipment. Our
                        journey began with a single mission: to eliminate the shadows where
                        security threats reside.
                    </p>
                    <p style={{ margin: 0 }}>
                        In an era where standard security systems are easily bypassed, our
                        industrial-grade optical sensors and thermal imaging matrices
                        provide a definitive advantage. We don't just record events; we
                        interpret environments through the lens of advanced AI-driven
                        detection.
                    </p>
                    <div style={{ paddingTop: "24px" }}>
                        <button
                            style={{
                                backgroundColor: "#b5e75d",
                                color: "#466700",
                                fontFamily: "Inter",
                                fontSize: "12px",
                                letterSpacing: "1px",
                                fontWeight: 600,
                                padding: "24px 48px",
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.2s",
                            }}
                        >
                            EXPLORE TECHNOLOGY
                        </button>
                    </div>
                </div>
            </div>

            {/* Image */}
            <div
                className="story-image"
                style={{
                    gridColumn: "span 5",
                    position: "relative",
                    border: "1px solid #94da32",
                    padding: "8px",
                    boxShadow: "0 0 15px rgba(181,231,93,0.2)",
                }}
            >
                <div
                    style={{
                        aspectRatio: "3/4",
                        backgroundColor: "#20201f",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src="https://lh3.googleusercontent.com/aida/ADBb0ug9YQUIw0MrZtq_29TVpL-FnrRS4-3iO3i2xoUtfnLiEZe_x1qPNnIFn8RajYtk_3kUu4Lecu7tOfey1nC1fDG_afuxXijuyUz9pN7g86X1H10jaMDlqyeOIEEiGQvC1HhjCzxAXW4rYIekvJrK-trj0VvG2TcXCFJOVjtrbWxiyOVuUZaAbzTAwLZaRmCzGd_wGeeF0B0QC1GgBSLdCKyV-GWpYAkfufJgXCH9Uxfm-BaDCmosaS_A-O9GqeSpQeUk2eXxaetlEg"
                        alt="Tactical surveillance camera"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "grayscale(1)",
                            transition: "filter 0.7s",
                        }}
                        onMouseEnter={(e) => (e.target.style.filter = "grayscale(0)")}
                        onMouseLeave={(e) => (e.target.style.filter = "grayscale(1)")}
                    />
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: "-16px",
                        left: "-16px",
                        backgroundColor: "#94da32",
                        color: "#131313",
                        fontFamily: "Inter",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        padding: "4px 16px",
                    }}
                >
                    TECH_SPEC: V3.4
                </div>
            </div>
        </section>
    );
}

function VisionMission() {
    const cards = [
        {
            icon: "auto_stories",
            label: "STRATEGIC_VISION [01]",
            title: "OUR VISION",
            text: "To define the global standard for predictive security, creating a world where surveillance isn't just a record of the past, but an active shield for the future. We envision a future of absolute transparency through technical mastery.",
        },
        {
            icon: "shield",
            label: "OPERATIONAL_MISSION [02]",
            title: "OUR MISSION",
            text: "To engineer and deploy the world's most resilient surveillance ecosystems. By fusing industrial-grade hardware with intelligent software, we empower organizations and individuals to maintain uncompromising vigilance over their assets.",
        },
    ];

    return (
        <section
            style={{
                padding: "80px 24px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
            }}
        >
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="corner-cross vm-card"
                    style={{
                        backgroundColor: "#1b1b1b",
                        border: "1px solid #434938",
                        padding: "48px",
                        position: "relative",
                        transition: "border-color 0.2s",
                        cursor: "default",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = "#94da32")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = "#434938")
                    }
                >
                    <div
                        style={{
                            marginBottom: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Icon
                            name={card.icon}
                            className=""
                            style={{ fontSize: "48px", color: "#94da32" }}
                        />
                        <span
                            style={{
                                fontFamily: "Inter",
                                fontSize: "12px",
                                letterSpacing: "1px",
                                fontWeight: 600,
                                color: "#8d937f",
                            }}
                        >
                            {card.label}
                        </span>
                    </div>
                    <h3
                        style={{
                            fontFamily: "Space Grotesk",
                            fontSize: "24px",
                            lineHeight: "1.3",
                            letterSpacing: "1px",
                            fontWeight: 600,
                            color: "#94da32",
                            marginBottom: "8px",
                        }}
                    >
                        {card.title}
                    </h3>
                    <p
                        style={{
                            fontFamily: "Inter",
                            fontSize: "16px",
                            lineHeight: "1.5",
                            color: "#c3c9b3",
                            margin: 0,
                        }}
                    >
                        {card.text}
                    </p>
                </div>
            ))}
        </section>
    );
}

function ImageBreak() {
    return (
        <section
            style={{
                width: "100%",
                height: "400px",
                position: "relative",
                overflow: "hidden",
                margin: "48px 0",
            }}
        >
            <img
                src="https://lh3.googleusercontent.com/aida/ADBb0uhV9NvalV5mRgQS5TOyr0va4SsbfHPOHr5iZvXUk2SFm-oq1xVZOcdyzx9_czyzvUBIosGUq0npg4sdVmf5eIwpDzvjMURgG_NzTJ3FkaiSYCGMtKSEGiYfbkRxQFwr_tR3rmyV2Uj53tm3byEhT3JkxvndqaZ-ewuKOvdCuVZdHEf-Zum9lvWuZjJGdeaRRwd3wGR72u1HwRHh75pzQqsxSFM-ZZ2ejFGgSUUl4Bx2pz0BPd7LIfV9Vb-Tu48aKKSvngDW8Tmk5A"
                alt="Futuristic control room"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(19,19,19,0.4)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <div
                        style={{
                            fontFamily: "Space Grotesk",
                            fontSize: "40px",
                            lineHeight: "1.2",
                            letterSpacing: "10px",
                            fontWeight: 700,
                            color: "#94da32",
                            opacity: 0.8,
                        }}
                    >
                        PRECISION. CONTROL.
                    </div>
                    <div
                        style={{
                            height: "2px",
                            width: "192px",
                            backgroundColor: "#94da32",
                            margin: "12px auto 0",
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

function Values() {
    const values = [
        {
            id: "VAL_01",
            icon: "bolt",
            title: "INNOVATION",
            text: "Constant pursuit of breakthrough technologies in optical engineering and data processing.",
        },
        {
            id: "VAL_02",
            icon: "verified",
            title: "QUALITY",
            text: "Zero-tolerance for failure. Every component is stress-tested for extreme tactical environments.",
        },
        {
            id: "VAL_03",
            icon: "handshake",
            title: "SATISFACTION",
            text: "Dedicated 24/7 technical support ensures your surveillance infrastructure never blinks.",
        },
        {
            id: "VAL_04",
            icon: "policy",
            title: "INTEGRITY",
            text: "Absolute transparency in data privacy and ethical surveillance manufacturing standards.",
        },
        {
            id: "VAL_05",
            icon: "hub",
            title: "COLLABORATION",
            text: "Seamless integration with global security networks and custom enterprise architectures.",
        },
        {
            id: "VAL_06",
            icon: "trending_up",
            title: "IMPROVEMENT",
            text: "Continuous firmware optimization and hardware iterative loops for perpetual security.",
        },
    ];

    return (
        <section style={{ padding: "80px 24px" }}>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: "48px",
                    gap: "24px",
                }}
            >
                <div style={{ maxWidth: "576px" }}>
                    <span
                        style={{
                            fontFamily: "Inter",
                            fontSize: "12px",
                            letterSpacing: "1px",
                            fontWeight: 600,
                            color: "#94da32",
                            textTransform: "uppercase",
                            display: "block",
                            marginBottom: "4px",
                        }}
                    >
                        CORE_PRINCIPLES
                    </span>
                    <h2
                        style={{
                            fontFamily: "Space Grotesk",
                            fontSize: "40px",
                            lineHeight: "1.2",
                            letterSpacing: "2px",
                            fontWeight: 700,
                            color: "#e5e2e1",
                            textTransform: "uppercase",
                            margin: 0,
                        }}
                    >
                        THE PILLARS OF NIGHTVISION
                    </h2>
                </div>
                <div
                    style={{
                        color: "#8d937f",
                        fontFamily: "Inter",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        textAlign: "right",
                    }}
                >
                    GRID_LAYOUT: 3x2
                    <br />
                    REF_ID: VALUES_MANIFESTO
                </div>
            </div>

            {/* Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    borderTop: "1px solid #434938",
                    borderLeft: "1px solid #434938",
                }}
            >
                {values.map((val) => (
                    <ValueCard key={val.id} {...val} />
                ))}
            </div>
        </section>
    );
}

function ValueCard({ id, icon, title, text }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: "24px",
                borderRight: "1px solid #434938",
                borderBottom: "1px solid #434938",
                backgroundColor: hovered ? "#2a2a2a" : "transparent",
                transition: "background-color 0.2s",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "48px",
                }}
            >
                <span
                    style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        color: "#8d937f",
                    }}
                >
                    {id}
                </span>
                <Icon
                    name={icon}
                    style={{
                        color: "#94da32",
                        transform: hovered && icon === "bolt" ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s",
                    }}
                />
            </div>
            <h4
                style={{
                    fontFamily: "Space Grotesk",
                    fontSize: "24px",
                    lineHeight: "1.3",
                    letterSpacing: "1px",
                    fontWeight: 600,
                    color: "#e5e2e1",
                    marginBottom: "8px",
                }}
            >
                {title}
            </h4>
            <p
                style={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    color: "#c3c9b3",
                    margin: 0,
                }}
            >
                {text}
            </p>
        </div>
    );
}

function CTASection() {
    return (
        <section
            style={{
                padding: "80px 24px",
                textAlign: "center",
                borderTop: "1px solid #94da32",
                marginTop: "80px",
            }}
        >
            <h2
                style={{
                    fontFamily: "Space Grotesk",
                    fontSize: "40px",
                    lineHeight: "1.2",
                    letterSpacing: "2px",
                    fontWeight: 700,
                    color: "#e5e2e1",
                    marginBottom: "24px",
                }}
            >
                READY FOR THE DARK?
            </h2>
            <p
                style={{
                    fontFamily: "Inter",
                    fontSize: "18px",
                    lineHeight: "1.6",
                    color: "#c3c9b3",
                    maxWidth: "672px",
                    margin: "0 auto 48px",
                }}
            >
                Join the network of thousands who trust NIGHTVISION™ for their most
                critical security needs.
            </p>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "24px",
                }}
            >
                <button
                    style={{
                        backgroundColor: "#b5e75d",
                        color: "#466700",
                        fontFamily: "Inter",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        padding: "24px 48px",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#94da32")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#b5e75d")}
                >
                    BECOME A DEALER
                </button>
                <button
                    style={{
                        border: "1px solid #94da32",
                        color: "#94da32",
                        fontFamily: "Inter",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        padding: "24px 48px",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "rgba(148,218,50,0.1)")
                    }
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                    CONTACT SALES
                </button>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer
            style={{
                width: "100%",
                padding: "48px 24px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "24px",
                maxWidth: "1280px",
                margin: "80px auto 0",
                borderTop: "1px solid #94da32",
                backgroundColor: "#0e0e0e",
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
                <p
                    style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        color: "#c3c9b3",
                        textTransform: "uppercase",
                    }}
                >
                    UNCOMPROMISING VIGILANCE SINCE 2020.
                </p>
            </div>

            {/* Resources */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <span
                    style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        color: "#94da32",
                        marginBottom: "4px",
                    }}
                >
                    RESOURCES
                </span>
                {["PRIVACY POLICY", "TERMS OF SERVICE"].map((item) => (
                    <a
                        key={item}
                        href="#"
                        style={{
                            fontFamily: "Inter",
                            fontSize: "16px",
                            lineHeight: "1.5",
                            letterSpacing: "2px",
                            color: "#c3c9b3",
                            textDecoration: "none",
                            textTransform: "uppercase",
                        }}
                    >
                        {item}
                    </a>
                ))}
            </nav>

            {/* Support */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <span
                    style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        color: "#94da32",
                        marginBottom: "4px",
                    }}
                >
                    SUPPORT
                </span>
                {["SUPPORT", "WARRANTY"].map((item) => (
                    <a
                        key={item}
                        href="#"
                        style={{
                            fontFamily: "Inter",
                            fontSize: "16px",
                            lineHeight: "1.5",
                            letterSpacing: "2px",
                            color: "#c3c9b3",
                            textDecoration: "none",
                            textTransform: "uppercase",
                        }}
                    >
                        {item}
                    </a>
                ))}
            </nav>

            {/* Company */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <span
                    style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        color: "#94da32",
                        marginBottom: "4px",
                    }}
                >
                    COMPANY
                </span>
                <a
                    href="#"
                    style={{
                        fontFamily: "Inter",
                        fontSize: "16px",
                        lineHeight: "1.5",
                        letterSpacing: "2px",
                        color: "#c3c9b3",
                        textDecoration: "none",
                        textTransform: "uppercase",
                    }}
                >
                    CAREERS
                </a>
                <p
                    style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        color: "#c3c9b3",
                        marginTop: "24px",
                    }}
                >
                    © 2024 NIGHTVISION SECURITY SYSTEMS. ALL RIGHTS RESERVED.
                    UNCOMPROMISING VIGILANCE.
                </p>
            </nav>
        </footer>
    );
}

export default function App() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #131313; color: #e5e2e1; font-family: Inter, sans-serif; }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        ${styles}

        /* Icon sizing */
        .material-symbols-outlined { font-size: 24px; color: #94da32; }

        /* Responsive: stack story section on mobile */
        @media (max-width: 768px) {
          .story-section {
            grid-template-columns: 1fr !important;
          }
          .story-text, .story-image {
            grid-column: span 1 !important;
          }
          .desktop-nav { display: none !important; }
          .support-btn { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .support-btn { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

            <div style={{ backgroundColor: "#131313", minHeight: "100vh" }}>
                <Header />
                <main style={{ maxWidth: "1280px", margin: "0 auto", overflow: "hidden" }}>
                    <HeroSection />
                    <CompanyStory />
                    <VisionMission />
                    <ImageBreak />
                    <Values />
                    <CTASection />
                </main>
                <Footer />
            </div>
        </>
    );
}