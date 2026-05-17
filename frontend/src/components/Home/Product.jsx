
import { useState, useEffect } from "react";


const COLORS = {
  bg: "#131313",
  surface: "#1e1e1e",
  surfaceHigh: "#2a2a2a",
  surfaceLow: "#181818",
  surfaceLowest: "#0e0e0e",
  lime: "#94da32",
  limeLight: "#b5e75d",
  limeDark: "#75b800",
  limeDeep: "#284300",
  outline: "#434938",
  outlineMid: "#8d937f",
  onSurface: "#e5e2e1",
  onSurfaceVar: "#c3c9b3",
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;
    user-select: none;
  }

  .scan-line {
    background:
      linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.12) 50%),
      linear-gradient(90deg, rgba(255,0,0,0.02), rgba(0,255,0,0.015), rgba(0,0,255,0.02));
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  .ch-tl { position: relative; }
  .ch-tl::before {
    content: '';
    position: absolute;
    top: -1px; left: -1px;
    width: 10px; height: 10px;
    border-top: 2px solid #b5e75d;
    border-left: 2px solid #b5e75d;
    z-index: 10;
    pointer-events: none;
  }
  .ch-br { position: relative; }
  .ch-br::after {
    content: '';
    position: absolute;
    bottom: -1px; right: -1px;
    width: 10px; height: 10px;
    border-bottom: 2px solid #b5e75d;
    border-right: 2px solid #b5e75d;
    z-index: 10;
    pointer-events: none;
  }

  .product-card { transition: border-color 0.2s, box-shadow 0.2s; }
  .product-card:hover { border-color: #94da32 !important; box-shadow: 0 0 18px rgba(148,218,50,0.18); }
  .product-card:hover .card-img { transform: scale(1.05); }
  .card-img { transition: transform 0.5s ease; }

  .deploy-btn { transition: background 0.15s, color 0.15s; }
  .deploy-btn:hover { background: #284300 !important; color: #94da32 !important; }

  .faq-item { transition: border-color 0.2s; }
  .faq-item:hover { border-color: #94da32 !important; }

  .nav-link { transition: color 0.15s; }
  .nav-link:hover { color: #94da32 !important; }

  .filter-btn { transition: border-color 0.15s, color 0.15s; }
  .filter-btn:hover { border-color: #94da32 !important; color: #e5e2e1 !important; }

  .footer-link { transition: color 0.15s; }
  .footer-link:hover { color: #94da32 !important; text-decoration: underline; text-decoration-color: #94da32; text-underline-offset: 6px; }

  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.35; } }
  .pulse { animation: pulse 1.5s ease-in-out infinite; }
`;

const Icon = ({ name, size = 18, color, style: s = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: size, color: color || "inherit", flexShrink: 0, ...s }}
  >
    {name}
  </span>
);

const products = [
  {
    id: 1,
    name: "Y1-RATRI",
    badge: "NEW MODEL",
    img: "https://lh3.googleusercontent.com/aida/ADBb0uiGsiUA8BUnPz5W1BtC1A_ddnZ32Idm7Lriupd_f9XBElLTooQIq8LxpmwvL2YNhOlnIM6fajbQO37s87483wAxAmFOSFmTKe1pazPPbbgd3GXXHcrOZ_FmxNDfw6K-hg-lOOEJbFQlrv8bng4iKNBuk3CmrTpr5TWqbqgmdqqkC3E0ukVn0vtWSWzkkeMXd6jGuf93ojASN3zONE-bZ3YSRayYWo69aKBJR-yvpokSdWgCPFbDyYKkXdgIqnB5dfIG_MoXHnoS",
    features: [
      { icon: "videocam", label: "4MP HD SENSOR" },
      { icon: "visibility", label: "FULL COLOR NIGHT VISION" },
      { icon: "wifi", label: "SMART WI-FI APP CONTROL" },
    ],
    price: "NPR 4,500",
    corner: "br",
    category: "WI-FI ENABLED"
  },
  {
    id: 2,
    name: "T5P-RATRI",
    img: "https://lh3.googleusercontent.com/aida/ADBb0uhFVruSlJhZ5q-sF8CoXAilTa0DbK8uG-4sf3f4cpUJsFuLNX3etF96ADT1UNmyuTuuJJTAVn4JPrUlNFDZt9xkUjNOaYf07xOE23xXpdgNxYTpTDkoXxMnvfQl_5jtL2ZclokCg18NynmRL3LwcqH5dgcnubOAPzSN7_Wmsj1wL7UqcbVy6U_7Snk7bUo4x_eCcpEGWTkQnkl6cD5H1Sla2en4IKIA1dWJFZBHVJWeERaVCKF_AciL8ixQPWy-N5f1jEqv-lJdXw",
    features: [
      { icon: "zoom_in", label: "5MP TURRET LENS" },
      { icon: "thunderstorm", label: "IP67 WEATHERPROOF" },
      { icon: "mic", label: "TWO-WAY AUDIO FEED" },
    ],
    price: "NPR 6,200",
    category: "OUTDOOR TACTICAL"
  },
  {
    id: 3,
    name: "RATRI G11",
    img: "https://lh3.googleusercontent.com/aida/ADBb0uhV9NvalV5mRgQS5TOyr0va4SsbfHPOHr5iZvXUk2SFm-oq1xVZOcdyzx9_czyzvUBIosGUq0npg4sdVmf5eIwpDzvjMURgG_NzTJ3FkaiSYCGMtKSEGiYfbkRxQFwr_tR3rmyV2Uj53tm3byEhT3JkxvndqaZ-ewuKOvdCuVZdHEf-Zum9lvWuZjJGdeaRRwd3wGR72u1HwRHh75pzQqsxSFM-ZZ2ejFGgSUUl4Bx2pz0BPd7LIfV9Vb-Tu48aKKSvngDW8Tmk5A",
    features: [
      { icon: "precision_manufacturing", label: "AI HUMAN DETECTION" },
      { icon: "flashlight_on", label: "50M SMART IR RANGE" },
      { icon: "storage", label: "CLOUD/SD DUAL RECORD" },
    ],
    price: "NPR 5,800",
    category: "OUTDOOR TACTICAL"
  },
  {
    id: 4,
    name: "NETRA V6Z",
    img: "https://lh3.googleusercontent.com/aida/ADBb0ug9YQUIw0MrZtq_29TVpL-FnrRS4-3iO3i2xoUtfnLiEZe_x1qPNnIFn8RajYtk_3kUu4Lecu7tOfey1nC1fDG_afuxXijuyUz9pN7g86X1H10jaMDlqyeOIEEiGQvC1HhjCzxAXW4rYIekvJrK-trj0VvG2TcXCFJOVjtrbWxiyOVuUZaAbzTAwLZaRmCzGd_wGeeF0B0QC1GgBSLdCKyV-GWpYAkfufJgXCH9Uxfm-BaDCmosaS_A-O9GqeSpQeUk2eXxaetlEg",
    features: [
      { icon: "videocam", label: "8MP 4K ULTRA HD" },
      { icon: "sync", label: "360° PANORAMIC VIEW" },
      { icon: "zoom_in", label: "20X OPTICAL ZOOM" },
    ],
    price: "NPR 12,500",
    category: "INDOOR SURVEILLANCE"
  },
  {
    id: 5,
    name: "NETRA S8",
    placeholderIcon: "security",
    gradientDir: "to top right",
    features: [
      { icon: "solar_power", label: "SOLAR POWERED DUAL" },
      { icon: "signal_cellular_4_bar", label: "4G SIM CONNECTIVITY" },
      { icon: "battery_charging_full", label: "15000mAh BATTERY" },
    ],
    price: "NPR 15,900",
    category: "OUTDOOR TACTICAL"
  },
  {
    id: 6,
    name: "F7-NETRA",
    placeholderIcon: "visibility",
    gradientDir: "to bottom left",
    corner: "tl",
    features: [
      { icon: "face", label: "FACIAL RECOGNITION" },
      { icon: "warning", label: "ACTIVE DETERRENT SIREN" },
      { icon: "cloud_done", label: "1TB INTERNAL SSD" },
    ],
    price: "NPR 9,900",
    category: "INDOOR SURVEILLANCE"
  },
];

const faqs = [
  {
    q: "HOW DO I ACCESS THE FEED REMOTELY?",
    a: "All NV™ systems integrate with our proprietary mobile command center. Once deployed, you can access secure, encrypted live feeds from any global location via the NV-Cloud app.",
  },
  { q: "DO THESE CAMERAS WORK DURING POWER OUTAGES?" },
  { q: "WHAT IS THE WARRANTY ON TACTICAL HARDWARE?" },
  { q: "CAN I UPGRADE MY EXISTING NVR SYSTEM?" },
];

const categories = ["ALL SYSTEMS", "INDOOR SURVEILLANCE", "OUTDOOR TACTICAL", "WI-FI ENABLED"];

function ProductCard({ p, addToCart }) {
  const cornerClass = p.corner === "br" ? "ch-br" : p.corner === "tl" ? "ch-tl" : "";

  return (
    <div
      className={`product-card ${cornerClass}`}
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.outline}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1/1",
          background: COLORS.surfaceHigh,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {p.img ? (
          <img
            className="card-img"
            src={p.img}
            alt={p.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Icon
              name={p.placeholderIcon}
              size={72}
              color={COLORS.outlineMid}
              style={{ opacity: 0.22 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(${p.gradientDir}, ${COLORS.bg} 0%, transparent 70%)`,
                opacity: 0.5,
              }}
            />
          </div>
        )}

        {p.badge && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "#dc2626",
              color: "#fff",
              fontSize: 9,
              fontWeight: 700,
              padding: "2px 6px",
              letterSpacing: "0.5px",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            {p.badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: 8,
        }}
      >
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: 18,
            color: COLORS.lime,
            letterSpacing: "0.5px",
          }}
        >
          {p.name}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, opacity: 0.82 }}>
          {p.features.map((f) => (
            <span
              key={f.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.8px",
                color: COLORS.onSurface,
                fontFamily: "'Barlow', sans-serif",
              }}
            >
              <Icon name={f.icon} size={13} color={COLORS.onSurface} />
              {f.label}
            </span>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <span
              style={{
                fontSize: 10,
                color: COLORS.onSurfaceVar,
                display: "block",
                letterSpacing: "0.5px",
                marginBottom: 2,
              }}
            >
              PRICE STARTING AT
            </span>

            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 17,
                color: COLORS.lime,
              }}
            >
              {p.price}
            </span>
          </div>

          <button
            className="deploy-btn"
            onClick={() => addToCart(p)}
            style={{
              background: COLORS.lime,
              color: COLORS.bg,
              fontWeight: 700,
              fontSize: 11,
              padding: "8px 14px",
              border: "none",
              cursor: "pointer",
              letterSpacing: "1px",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NightVision() {
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("ALL SYSTEMS");
  const [cart, setCart] = useState([]);

  const filteredProducts = selectedCategory === "ALL SYSTEMS" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.onSurface, fontFamily: "'Barlow', sans-serif" }}>

        {/* HEADER */}
        

        {/* HERO */}
        <section style={{ background: COLORS.limeDark, padding: "56px 24px", position: "relative", overflow: "hidden", borderBottom: `1px solid ${COLORS.lime}` }}>
          <div className="scan-line" style={{ opacity: 0.25 }} />
          <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.limeDeep, letterSpacing: "4px", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Barlow', sans-serif", marginBottom: 10 }}>
              <span className="pulse" style={{ width: 7, height: 7, background: "#dc2626", borderRadius: "50%", display: "inline-block" }} />
              SYSTEM: ONLINE
            </span>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(52px, 8vw, 88px)", color: COLORS.limeDeep, lineHeight: 1, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 16 }}>
              OUR PRODUCTS
            </h1>
            <p style={{ color: COLORS.limeDeep, fontSize: 15, maxWidth: 520, opacity: 0.88, lineHeight: 1.65 }}>
              Advanced surveillance architecture engineered for uncompromising vigilance in high-stakes environments. Precision optics, night-vision mastery, and tactical reliability.
            </p>
          </div>
        </section>

        {/* PRODUCT SECTION */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "200px 1fr", gap: 40 }}>
          {/* Sidebar */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="ch-tl" style={{ border: `1px solid ${COLORS.outline}`, padding: 20, background: COLORS.surfaceLow, display: "flex", flexDirection: "column", gap: 8 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, color: COLORS.lime, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <Icon name="filter_list" size={18} color={COLORS.lime} />
                CATEGORIES
              </h3>
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  className="filter-btn" 
                  onClick={() => setSelectedCategory(cat)}
                  style={{ 
                    width: "100%", 
                    textAlign: "left", 
                    fontSize: 10, 
                    fontWeight: 700, 
                    padding: "10px 14px", 
                    background: selectedCategory === cat ? COLORS.lime : "transparent",
                    color: selectedCategory === cat ? COLORS.bg : COLORS.onSurfaceVar, 
                    border: selectedCategory === cat ? `1px solid ${COLORS.lime}` : "1px solid transparent", 
                    cursor: "pointer", 
                    letterSpacing: "1px", 
                    fontFamily: "'Barlow', sans-serif" 
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ padding: 16, border: `1px solid ${COLORS.outline}`, background: COLORS.surfaceLowest, opacity: 0.65 }}>
              <h4 style={{ fontSize: 10, color: COLORS.lime, marginBottom: 8, letterSpacing: "1.5px", fontWeight: 700, fontFamily: "'Barlow', sans-serif" }}>
                TECHNICAL ADVISORY
              </h4>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: COLORS.onSurface }}>
                Need a tactical consultation? Our engineers are standing by to design your perimeter defense.
              </p>
            </div>
          </aside>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {filteredProducts.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>

        {/* WHY BUY */}
        <section style={{ background: COLORS.surfaceLow, borderTop: `1px solid ${COLORS.outline}`, borderBottom: `1px solid ${COLORS.outline}`, padding: "72px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 36px)", color: COLORS.lime, marginBottom: 20, letterSpacing: "1.5px", lineHeight: 1.2, textTransform: "uppercase" }}>
                WHY BUY CCTV CAMERAS IN NEPAL FROM NIGHT VISION?
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 28, opacity: 0.82 }}>
                Night Vision Security Systems stands as the authoritative leader in surveillance technology across Nepal. We don't just sell cameras; we engineer peace of mind through technical superiority.
              </p>
              <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, listStyle: "none" }}>
                {[
                  { icon: "verified", title: "GENUINE AUTHENTICITY", desc: "100% original hardware with factory-sealed warranties." },
                  { icon: "engineering", title: "EXPERT DEPLOYMENT", desc: "Professional installation by certified technical engineers." },
                  { icon: "support_agent", title: "24/7 COMMAND CENTER", desc: "Dedicated local support for immediate threat resolution." },
                  { icon: "payments", title: "STRATEGIC VALUE", desc: "Premium protection at competitive regional pricing." },
                ].map((item) => (
                  <li key={item.title} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <Icon name={item.icon} size={20} color={COLORS.lime} style={{ marginTop: 1 }} />
                    <div>
                      <h4 style={{ fontSize: 10, fontWeight: 700, color: COLORS.lime, letterSpacing: "1px", marginBottom: 4, fontFamily: "'Barlow', sans-serif" }}>{item.title}</h4>
                      <p style={{ fontSize: 12, opacity: 0.62, lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live feed mock */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, border: `2px solid rgba(148,218,50,0.18)`, transform: "translate(-14px, 14px)" }} />
              <div style={{ background: COLORS.surfaceHigh, border: `1px solid ${COLORS.lime}`, padding: 4, aspectRatio: "16/9", position: "relative" }}>
                <div style={{ background: COLORS.bg, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <div className="scan-line" />
                  <Icon name="monitoring" size={90} color={COLORS.lime} style={{ opacity: 0.22, zIndex: 1 }} />
                  <div style={{ position: "absolute", top: 10, left: 10, fontSize: 9, color: COLORS.lime, letterSpacing: "2px", fontWeight: 600, fontFamily: "'Barlow', sans-serif", zIndex: 2 }}>
                    Live_Feed_01 // HQ_Perimeter
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 24px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)", color: COLORS.lime, textAlign: "center", marginBottom: 48, letterSpacing: "2px", textTransform: "uppercase" }}>
            FREQUENTLY ASKED PROTOCOLS
          </h2>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 6 }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={isOpen ? "" : "faq-item"} style={{ border: `1px solid ${isOpen ? COLORS.lime : COLORS.outline}`, background: isOpen ? COLORS.surfaceLowest : "transparent", transition: "border-color 0.2s" }}>
                  <button onClick={() => setOpenFaq(isOpen ? -1 : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, color: isOpen ? COLORS.lime : COLORS.onSurface, letterSpacing: "0.5px" }}>
                      {faq.q}
                    </span>
                    <Icon name="expand_more" size={22} color={isOpen ? COLORS.lime : COLORS.outlineMid} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s", flexShrink: 0 }} />
                  </button>
                  {isOpen && faq.a && (
                    <div style={{ padding: "0 22px 20px", paddingTop: 0, fontSize: 14, lineHeight: 1.7, opacity: 0.82, borderTop: `1px solid rgba(148,218,50,0.18)`, marginTop: 0 }}>
                      <div style={{ paddingTop: 14 }}>{faq.a}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        

      </div>
    </>
  );
}