import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

/* ─── THEME TOKENS ─────────────────────────────────────────────────────────── */
const colors = {
  background: "#131313",
  surface: "#131313",
  surfaceContainerLowest: "#0e0e0e",
  surfaceContainerLow: "#1b1b1b",
  surfaceContainer: "#20201f",
  surfaceContainerHigh: "#2a2a2a",
  surfaceContainerHighest: "#353535",
  surfaceBright: "#393939",
  surfaceVariant: "#353535",
  surfaceDim: "#131313",
  onBackground: "#e5e2e1",
  onSurface: "#e5e2e1",
  onSurfaceVariant: "#c3c9b3",
  outlineVariant: "#434938",
  outline: "#8d937f",
  primary: "#deffa4",
  primaryFixed: "#c0f367",
  primaryFixedDim: "#a5d64e",
  primaryContainer: "#b5e75d",
  onPrimary: "#233600",
  onPrimaryContainer: "#466700",
  onPrimaryFixed: "#131f00",
  onPrimaryFixedVariant: "#354e00",
  inversePrimary: "#476800",
  secondary: "#94da32",
  secondaryFixed: "#aff74e",
  secondaryFixedDim: "#94da32",
  secondaryContainer: "#75b800",
  onSecondary: "#203700",
  onSecondaryContainer: "#284300",
  onSecondaryFixed: "#102000",
  onSecondaryFixedVariant: "#304f00",
  tertiary: "#f4f4e5",
  tertiaryFixed: "#e3e3d5",
  tertiaryFixedDim: "#c7c7ba",
  tertiaryContainer: "#d7d8ca",
  onTertiary: "#2f3128",
  onTertiaryContainer: "#5c5e53",
  onTertiaryFixed: "#1b1c14",
  onTertiaryFixedVariant: "#46483d",
  error: "#ffb4ab",
  errorContainer: "#93000a",
  onError: "#690005",
  onErrorContainer: "#ffdad6",
  inverseSurface: "#e5e2e1",
  inverseOnSurface: "#313030",
  surfaceTint: "#a5d64e",
};

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────────── */
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${colors.background};
    color: ${colors.onBackground};
    font-family: 'Inter', sans-serif;
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
    -webkit-font-feature-settings: 'liga';
    font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  .scanline-overlay { position: relative; }
  .scanline-overlay::after {
    content: "";
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background:
      linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.1) 50%),
      linear-gradient(90deg, rgba(255,0,0,0.02), rgba(0,255,0,0.01), rgba(0,0,255,0.02));
    background-size: 100% 4px, 3px 100%;
    pointer-events: none;
    z-index: 10;
  }

  .luminous-border { box-shadow: 0 0 15px rgba(181,231,93,0.2); }

  @keyframes ping {
    75%, 100% { transform: scale(2); opacity: 0; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .animate-ping { animation: ping 1s cubic-bezier(0,0,0.2,1) infinite; }
  .animate-pulse { animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
`;

/* ─── ICON COMPONENT ──────────────────────────────────────────────────────── */
const Icon = ({ name, size = 24, style = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: size, lineHeight: 1, ...style }}
  >
    {name}
  </span>
);

/* ─── TOP APP BAR ─────────────────────────────────────────────────────────── */
function TopAppBar() {
  const links = ["CCTV CAMERAS", "ABOUT US", "CONTACT US", "DEALERSHIPS"];
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
        borderBottom: `1px solid ${colors.outlineVariant}`,
        background: `${colors.background}f2`,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-1px",
          color: colors.secondary,
        }}
      >
        NV/// NIGHTVISION™
      </span>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", gap: 48 }}>
        {links.map((link) => {
          const active = link === "CONTACT US";
          return (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "1px",
                color: active ? colors.secondary : colors.onSurfaceVariant,
                textDecoration: "none",
                borderBottom: active ? `2px solid ${colors.secondary}` : "none",
                paddingBottom: active ? 8 : 0,
                transition: "color 0.2s",
              }}
            >
              {link}
            </a>
          );
        })}
      </nav>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            background: colors.surfaceContainerHigh,
            color: colors.secondary,
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "1px",
            border: `1px solid ${colors.outlineVariant}`,
          }}
        >
          SUPPORT HOTLINE: 1800-NV-SECURE
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {["shopping_cart", "account_circle"].map((icon) => (
            <button
              key={icon}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: colors.onSurfaceVariant,
                padding: 0,
                display: "flex",
              }}
            >
              <Icon name={icon} size={24} />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ─── HERO SECTION ────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      className="scanline-overlay"
      style={{
        position: "relative",
        height: "40vh",
        minHeight: 300,
        background: colors.primaryContainer,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* BG image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src="https://lh3.googleusercontent.com/aida/ADBb0uigFZm2MU_7fFkN1PGbqxTC4_zsd19WX1rPPXQ9Dq4i5EMbGW8uL59JfytFZsh1esNLU9nligJX4Uv90jKWL6D8MLXnq26q3GTMcyBfSr1_zrrXpo67IpigOrch4RSQvHkeqBk9x4VXRJLGzluFfWso-xnep3TZtUNQtmjjVkx4xUm72ROueuOlQghaRdACvRgs6p-gLEx5sf_1mpkxK_OjtZIMzVkcxp_k_5NJOEzBPjW9mg5vXhadcbQb9GP1FJGoMGX0s4cmKw"
          alt="Tactical surveillance shot"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.2,
            filter: "grayscale(100%)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 20, textAlign: "center", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          <span
            className="animate-pulse"
            style={{
              width: 12,
              height: 12,
              background: "#dc2626",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "1px",
              color: colors.onPrimaryContainer,
            }}
          >
            LIVE_CONNECTION_ESTABLISHED
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(40px, 8vw, 64px)",
            fontWeight: 700,
            letterSpacing: "4px",
            color: colors.onPrimaryContainer,
            textTransform: "uppercase",
          }}
        >
          CONTACT US
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            lineHeight: 1.6,
            color: colors.onPrimaryContainer,
            maxWidth: 600,
            margin: "16px auto 0",
            opacity: 0.8,
          }}
        >
          OUR SURVEILLANCE SPECIALISTS ARE STANDING BY. CONNECT WITH THE COMMAND CENTER FOR UNCOMPROMISING SECURITY SOLUTIONS.
        </p>
      </div>

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          color: colors.onPrimaryContainer,
          fontFamily: "monospace",
          fontSize: 10,
          opacity: 0.5,
        }}
      >
        LAT: 27.7172° N<br />LON: 85.3240° E
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 32,
          right: 32,
          color: colors.onPrimaryContainer,
          fontFamily: "monospace",
          fontSize: 10,
          opacity: 0.5,
          textAlign: "right",
        }}
      >
        NV_SIGNAL_STRENGTH: 99.8%<br />SECURE_ENCRYPTION: ACTIVE
      </div>
    </section>
  );
}

/* ─── CONTACT CARDS SECTION ───────────────────────────────────────────────── */
function ContactCard({ icon, title, subtitle, lines, featured = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={featured ? "luminous-border" : ""}
      style={{
        background: colors.surfaceContainerLow,
        border: `1px solid ${featured || hovered ? colors.secondary : colors.outlineVariant}`,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        transition: "border-color 0.2s",
        flex: 1,
      }}
    >
      {/* Corner + marks */}
      {!featured && (
        <>
          <span style={{ position: "absolute", top: 8, left: 8, color: colors.secondary, opacity: 0.5, fontSize: 14 }}>+</span>
          <span style={{ position: "absolute", bottom: 8, right: 8, color: colors.secondary, opacity: 0.5, fontSize: 14 }}>+</span>
        </>
      )}

      {/* Icon box */}
      <div
        style={{
          width: 64,
          height: 64,
          background: featured || hovered ? colors.secondary : colors.background,
          color: featured || hovered ? colors.background : colors.secondary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${colors.secondary}`,
          marginBottom: 24,
          transition: "all 0.2s",
        }}
      >
        <Icon name={icon} size={32} />
      </div>

      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "1px",
          color: colors.secondary,
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 16,
          color: colors.onSurfaceVariant,
          marginBottom: 16,
          textTransform: "uppercase",
        }}
      >
        {subtitle}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "1px",
              color: colors.onSurface,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactCardsSection() {
  return (
    <section
      style={{
        padding: "80px 24px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24,
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <ContactCard
        icon="call"
        title="CALL US"
        subtitle="24/7 TECHNICAL COMMAND LINE"
        lines={["+977 1 4420000", "1800-NV-SECURE"]}
      />
      <ContactCard
        icon="location_on"
        title="VISIT US"
        subtitle="HEADQUARTERS & SHOWROOM"
        lines={["NV TOWER, DURBAR MARG", "KATHMANDU, NEPAL 44600"]}
        featured
      />
      <ContactCard
        icon="mail"
        title="E-MAIL US"
        subtitle="ENCRYPTED COMMUNICATIONS"
        lines={["INTEL@NIGHTVISION.NP", "SUPPORT@NIGHTVISION.NP"]}
      />
    </section>
  );
}

/* ─── MAP SECTION ─────────────────────────────────────────────────────────── */
function MapSection() {
  return (
    <section style={{ padding: "0 24px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <div
        className="scanline-overlay"
        style={{
          position: "relative",
          width: "100%",
          height: 500,
          border: `1px solid ${colors.secondary}`,
          background: colors.surfaceContainer,
          overflow: "hidden",
        }}
      >
        {/* Map image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida/ADBb0uhFVruSlJhZ5q-sF8CoXAilTa0DbK8uG-4sf3f4cpUJsFuLNX3etF96ADT1UNmyuTuuJJTAVn4JPrUlNFDZt9xkUjNOaYf07xOE23xXpdgNxYTpTDkoXxMnvfQl_5jtL2ZclokCg18NynmRL3LwcqH5dgcnubOAPzSN7_Wmsj1wL7UqcbVy6U_7Snk7bUo4x_eCcpEGWTkQnkl6cD5H1Sla2en4IKIA1dWJFZBHVJWeERaVCKF_AciL8ixQPWy-N5f1jEqv-lJdXw"
            alt="Satellite map of Kathmandu"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.4,
              filter: "grayscale(100%) sepia(100%) brightness(50%)",
            }}
          />
        </div>

        {/* Map Pin */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              className="animate-ping"
              style={{
                position: "absolute",
                width: 80,
                height: 80,
                background: `${colors.secondary}33`,
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                width: 24,
                height: 24,
                background: colors.secondary,
                borderRadius: "50%",
                border: `4px solid ${colors.background}`,
                zIndex: 30,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -48,
                background: colors.secondary,
                color: colors.background,
                padding: "4px 16px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "1px",
                whiteSpace: "nowrap",
              }}
            >
              NV/// HQ_LOCATION
            </div>
          </div>
        </div>

        {/* Coordinates box */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            padding: 16,
            border: `1px solid ${colors.outlineVariant}`,
            background: `${colors.background}cc`,
            backdropFilter: "blur(12px)",
            zIndex: 20,
          }}
        >
          <div
            style={{
              color: colors.secondary,
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "1px",
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            System_Coordinates
          </div>
          <div style={{ fontFamily: "monospace", color: colors.onSurface, fontSize: 12 }}>
            27.7112° N, 85.3215° E
          </div>
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                background: "#22c55e",
                borderRadius: "50%",
                boxShadow: "0 0 8px #22c55e",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                color: colors.onSurfaceVariant,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Server_Online
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT FORM ────────────────────────────────────────────────────────── */
function ContactForm() {
  const inputStyle = {
    width: "100%",
    background: colors.background,
    border: `1px solid ${colors.outlineVariant}`,
    color: colors.onSurface,
    padding: 16,
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    outline: "none",
    transition: "border-color 0.2s",
  };
  const labelStyle = {
    display: "block",
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "1px",
    color: colors.secondary,
    textTransform: "uppercase",
    marginBottom: 8,
  };

  return (
    <div
      style={{
        gridColumn: "span 5",
        background: colors.surfaceContainerLow,
        border: `1px solid ${colors.outlineVariant}`,
        padding: 48,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 4,
          background: colors.secondary,
        }}
      />
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: "2px",
          color: colors.onSurface,
          marginBottom: 24,
          textTransform: "uppercase",
        }}
      >
        SEND US A MESSAGE
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Subject */}
        <div>
          <label style={labelStyle}>Subject_Code</label>
          <select style={{ ...inputStyle, cursor: "pointer" }}>
            {["GENERAL_INQUIRY", "TECHNICAL_SUPPORT", "DEALER_APPLICATION", "WARRANTY_CLAIM"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* Name + Email */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Identifier_Name</label>
            <input type="text" placeholder="FULL NAME" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Comm_Channel</label>
            <input type="email" placeholder="EMAIL ADDRESS" style={inputStyle} />
          </div>
        </div>

        {/* Message */}
        <div>
          <label style={labelStyle}>Intel_Details</label>
          <textarea
            placeholder="ENTER MESSAGE CONTENT..."
            rows={4}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        {/* Submit */}
        <button
          style={{
            width: "100%",
            background: colors.secondary,
            color: colors.background,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "1px",
            padding: "16px",
            border: "none",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.1s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = colors.onSecondaryContainer;
            e.currentTarget.style.color = colors.secondary;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = colors.secondary;
            e.currentTarget.style.color = colors.background;
          }}
        >
          TRANSMIT_MESSAGE
        </button>
      </div>
    </div>
  );
}

/* ─── DEALER NETWORK ──────────────────────────────────────────────────────── */
const dealers = [
  { name: "R MOBILE", location: "NEW ROAD, KATHMANDU" },
  { name: "AXE TECH", location: "JAWALAKHEL, LALITPUR" },
  { name: "VISIONARY IT", location: "CHIPLEDHUNGA, POKHARA" },
  { name: "ELITE SECURE", location: "MAIN ROAD, BIRATNAGAR" },
  { name: "CYBER SENTRY", location: "NARAYANGARH, CHITWAN" },
  { name: "DHARAN CCTVS", location: "BHANU CHOWK, DHARAN" },
  { name: "KTM SOLUTIONS", location: "PUTALISADAK, KATHMANDU" },
  { name: "BUTWAL TECH", location: "TRAFFIC CHOWK, BUTWAL" },
  { name: "PRIME SECURITY", location: "JANAKPUR DHAM" },
  { name: "TECH GUARDIAN", location: "NEPALGUNJ TOWN" },
  { name: "MOUNTAIN TECH", location: "HETAUDA, MAKWANPUR" },
  { name: "EVEREST SECURE", location: "DAMAK, JHAPA" },
];

function DealerCard({ name, location }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.surfaceContainerLowest,
        border: `1px solid ${hovered ? colors.secondary : colors.outlineVariant}`,
        padding: 16,
        transition: "border-color 0.2s",
        cursor: "pointer",
      }}
    >
      <h4
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: hovered ? 700 : 600,
          letterSpacing: "1px",
          color: colors.secondary,
        }}
      >
        {name}
      </h4>
      <p
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          color: colors.onSurfaceVariant,
          marginTop: 4,
        }}
      >
        {location}
      </p>
    </div>
  );
}

function DealerNetwork() {
  return (
    <div style={{ gridColumn: "span 7" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          borderBottom: `1px solid ${colors.outlineVariant}`,
          paddingBottom: 16,
        }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "2px",
            color: colors.onSurface,
            textTransform: "uppercase",
          }}
        >
          AUTHORIZED DEALER NETWORK
        </h2>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "1px",
            color: colors.secondary,
            background: `${colors.secondary}1a`,
            padding: "4px 12px",
            border: `1px solid ${colors.secondary}`,
            whiteSpace: "nowrap",
          }}
        >
          NEPAL_REGION_V04
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
        }}
      >
        {dealers.map((d) => (
          <DealerCard key={d.name} {...d} />
        ))}
      </div>

      {/* Join Banner */}
      <div
        style={{
          marginTop: 24,
          padding: 24,
          background: `${colors.secondary}0d`,
          border: `1px solid ${colors.secondary}33`,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <img
          src="https://lh3.googleusercontent.com/aida/ADBb0uiGsiUA8BUnPz5W1BtC1A_ddnZ32Idm7Lriupd_f9XBElLTooQIq8LxpmwvL2YNhOlnIM6fajbQO37s87483wAxAmFOSFmTKe1pazPPbbgd3GXXHcrOZ_FmxNDfw6K-hg-lOOEJbFQlrv8bng4iKNBuk3CmrTpr5TWqbqgmdqqkC3E0ukVn0vtWSWzkkeMXd6jGuf93ojASN3zONE-bZ3YSRayYWo69aKBJR-yvpokSdWgCPFbDyYKkXdgIqnB5dfIG_MoXHnoS"
          alt="Authorized dealer badge"
          style={{
            width: 64,
            height: 64,
            objectFit: "cover",
            border: `1px solid ${colors.secondary}`,
            flexShrink: 0,
          }}
        />
        <div>
          <h4
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "1px",
              color: colors.secondary,
              textTransform: "uppercase",
            }}
          >
            WANT TO JOIN THE NETWORK?
          </h4>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: colors.onSurfaceVariant,
            }}
          >
            WE ARE EXPANDING OUR ELITE DISTRIBUTION CHANNELS NATIONWIDE.
          </p>
          <a
            href="#"
            style={{
              display: "inline-block",
              marginTop: 8,
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "1px",
              color: colors.secondary,
              textDecoration: "underline",
              textDecorationThickness: 2,
              textUnderlineOffset: 4,
            }}
          >
            REQUEST_DEALER_KIT.PDF
          </a>
        </div>
      </div>
    </div>
  );
}

function FormAndDealersSection() {
  return (
    <section
      style={{
        padding: "0 24px 80px",
        maxWidth: 1280,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "5fr 7fr",
        gap: 80,
      }}
    >
      <ContactForm />
      <DealerNetwork />
    </section>
  );
}

/* ─── APP DOWNLOAD SECTION ────────────────────────────────────────────────── */
function AppDownloadSection() {
  const appButtons = [
    { icon: "android", top: "Get it on", label: "PLAY STORE" },
    { icon: "ios", top: "Download on", label: "APP STORE" },
    { icon: "desktop_windows", top: "Install for", label: "WINDOWS" },
  ];

  return (
    <section style={{ padding: "0 24px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <div
        className="luminous-border"
        style={{
          background: colors.surfaceContainer,
          border: `2px solid ${colors.secondary}`,
          padding: 48,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* BG phone image */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "33%",
            height: "100%",
            opacity: 0.1,
          }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida/ADBb0uhV9NvalV5mRgQS5TOyr0va4SsbfHPOHr5iZvXUk2SFm-oq1xVZOcdyzx9_czyzvUBIosGUq0npg4sdVmf5eIwpDzvjMURgG_NzTJ3FkaiSYCGMtKSEGiYfbkRxQFwr_tR3rmyV2Uj53tm3byEhT3JkxvndqaZ-ewuKOvdCuVZdHEf-Zum9lvWuZjJGdeaRRwd3wGR72u1HwRHh75pzQqsxSFM-ZZ2ejFGgSUUl4Bx2pz0BPd7LIfV9Vb-Tu48aKKSvngDW8Tmk5A"
            alt="Security app on phone"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 40,
                fontWeight: 700,
                letterSpacing: "-1px",
                color: colors.secondary,
                textTransform: "uppercase",
              }}
            >
              COMMAND FROM ANYWHERE
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                lineHeight: 1.6,
                color: colors.onSurface,
                maxWidth: 480,
                marginTop: 8,
              }}
            >
              SYNC YOUR NV/// ECOSYSTEM TO YOUR PERSONAL DEVICE. TOTAL CONTROL, ENCRYPTED ACCESS, INSTANT ALERTS.
            </p>
          </div>

          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {appButtons.map((btn) => (
              <button
                key={btn.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: colors.background,
                  border: `1px solid ${colors.secondary}`,
                  padding: "12px 24px",
                  color: colors.onSurface,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = colors.secondary;
                  e.currentTarget.style.color = colors.background;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = colors.background;
                  e.currentTarget.style.color = colors.onSurface;
                }}
              >
                <Icon name={btn.icon} size={24} />
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, opacity: 0.6, textTransform: "uppercase" }}>
                    {btn.top}
                  </p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.2 }}>
                    {btn.label}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "48px 24px",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: 24,
        maxWidth: 1280,
        margin: "0 auto",
        borderTop: `1px solid ${colors.secondary}`,
        background: colors.surfaceContainerLowest,
      }}
    >
      {/* Brand */}
      <div>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 24,
            fontWeight: 600,
            color: colors.secondary,
          }}
        >
          NV/// NIGHTVISION™
        </span>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            color: colors.onSurfaceVariant,
            marginTop: 16,
            lineHeight: 1.5,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          UNCOMPROMISING VIGILANCE. PROVIDING ELITE SECURITY INFRASTRUCTURE FOR THE FEDERAL AND PRIVATE SECTORS OF NEPAL.
        </p>
      </div>

      {/* Resources */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "1px", color: colors.secondary }}>
          RESOURCES
        </span>
        {["WARRANTY", "SUPPORT", "CAREERS"].map((l) => (
          <a
            key={l}
            href="#"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              letterSpacing: "2px",
              color: colors.onSurfaceVariant,
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            {l}
          </a>
        ))}
      </div>

      {/* Legal */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "1px", color: colors.secondary }}>
          LEGAL
        </span>
        {["PRIVACY POLICY", "TERMS OF SERVICE"].map((l) => (
          <a
            key={l}
            href="#"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              letterSpacing: "2px",
              color: colors.onSurfaceVariant,
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            {l}
          </a>
        ))}
      </div>

      {/* Intel Feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "1px", color: colors.secondary }}>
          INTEL_FEED
        </span>
        <div style={{ display: "flex", gap: 16 }}>
          {["public", "share", "shield"].map((icon) => (
            <span
              key={icon}
              style={{ color: colors.secondary, cursor: "pointer", transition: "transform 0.2s" }}
            >
              <Icon name={icon} size={24} />
            </span>
          ))}
        </div>
        <p
          style={{
            marginTop: 16,
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            color: colors.onSurfaceVariant,
            letterSpacing: "2px",
            lineHeight: 1.5,
          }}
        >
          © 2024 NIGHTVISION SECURITY SYSTEMS. ALL RIGHTS RESERVED. UNCOMPROMISING VIGILANCE.
        </p>
      </div>
    </footer>
  );
}

/* ─── ROOT APP ────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{globalStyle}</style>
      <div style={{ background: colors.background, minHeight: "100vh", color: colors.onBackground }}>
        {/* Sticky header wrapper */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: `${colors.background}f2`,
            backdropFilter: "blur(8px)",
            borderBottom: `1px solid ${colors.outlineVariant}`,
          }}
        >
          <TopAppBar />
        </div>

        <main style={{ maxWidth: 1280, margin: "0 auto" }}>
          <HeroSection />
          <ContactCardsSection />
          <MapSection />
          <FormAndDealersSection />
          <AppDownloadSection />
        </main>

        <Footer />
      </div>
    </>
  );
}