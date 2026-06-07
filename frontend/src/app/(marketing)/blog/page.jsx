import { useState } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────── */
const C = {
  bg: "#11140c",
  surface: "#11140c",
  surfCont: "#1e2117",
  surfHi: "#282b21",
  surfHighest: "#33362c",
  surfLow: "#0c0f07",
  onSurf: "#e2e4d5",
  onSurfVar: "#c3c9b3",
  primary: "#deffa4",
  onPrimary: "#233600",
  secondary: "#94da32",
  outline: "#8d937f",
  outlineVar: "#434938",
  sg: "'Space Grotesk', sans-serif",
  pp: "'Poppins', sans-serif",
};

/* ─── ARTICLE DATA ───────────────────────────────── */
const articles = [
  {
    id: 1,
    tag: "Tech Report",
    date: "Oct 14, 2024",
    author: "Commander V.",
    title: "Integrating AI Motion Detection in High-Risk Perimeters",
    excerpt:
      "A deep dive into how neural networks are reducing false positives in enterprise-grade security environments through algorithmic refining.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnrOG19ZEUFvu4Y8fo3JaRsuT1cM-JTtLfK1XZ-WAvXM-vcIIoVeF3elAcB7PMeMglDfZbBaCfTsSYcA3eY2kykeGLUBNNmNqQH-poowBIazkZ0pDw0ENC8msf47oiXow4TOBNqKpJAAxuuXADt8Ywb_f_MfItwJcttluIpsXTBOpCFbcqe2cN22eIdIm63ybN-VzPyjIMy1VL75r3j_NZzAuQkz7wz9AzlD6q6UxaRK7oA3A0DJDBBlPew3O1tbr0pnAkcHmRHJs",
  },
  {
    id: 2,
    tag: "Infrastructure",
    date: "Oct 12, 2024",
    author: "Tech Lead K.",
    title: "Quantum Encryption for Remote IP Camera Feeds",
    excerpt:
      "Evaluating the necessity of quantum-resistant security protocols in the current landscape of global digital espionage and data theft.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXvIRiJKGZJ2iKfQ1-_kWWNz94baRJqpvDJ-GcUp_sErwdk_waTwtG02uNOKvsJ_7QqroY656QSBZTsn8vyBsnC78Rp_hKx2tKrVomEU-Kbe97E6zEym8H-vGFR_Hr-RhAA7RTjXb85FeS2KOkB-AGgw7kaZMqjDnl_QADzp_Z3QhprSkyHbcV5RuOF2a7__sTFqcZyjoamWdyDsPlaJrTQN13OX62k98e3ADcoCZlGfN1ZzV5tbeZYO2h26s17DcDdqcvLqucBTk",
  },
  {
    id: 3,
    tag: "Hardware",
    date: "Oct 09, 2024",
    author: "Logistics O.",
    title: "Field Testing: NV-900 Series vs Arctic Conditions",
    excerpt:
      "How our latest thermal optics performed during sub-zero operations in the high Himalayas. Durability meets extreme precision.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCX4fwuV_29IHl2jxynNtAG8uY2KXdJGQBJXXbFnCixRjoRhSAKVea0f3RgtuKqjSp7nFg69MNgY3zDkxb6j6_XqVEWSZrOt5CcMU3b-RWH5eVvS5F50uiY8FK9i2yO4Y4SgFdiRkztRMzj6pU-ST6ecEDSgrzrsiDzmpBOxBd_H3BuzmUAnqKWoiJk3jFcYDskEuWdh0vy1AZ_81vSsNh8yzdI6wBf8ZzCD9mPeb8j6LmuZq4YBVY10SDVkWKWQ6Nd4U5RR9MNDL0",
  },
  {
    id: 4,
    tag: "Operations",
    date: "Oct 05, 2024",
    author: "Chief Eng. L.",
    title: "Centralized Monitoring for Multi-Site Enterprises",
    excerpt:
      "Strategies for streamlining 50+ camera feeds into a single, actionable command dashboard without data fatigue.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD71gPu9tVyuoN99Koj__dd45B4JaRC0b4JpA479NJwWMhtpfny_wq1_cZDgMARJmIxGuGdQDlDfkMnAF8GiCrxFFASXMQFGPyx2kBCq-CUrUwm-GRdqogZ3SGw_N943dk8-BK23oNe80HwKtLZkYi-6e5sDaDx20Dh3YB2NNjjmfec4XZeRhz67R6C63P1lNtf_zz-ijT90LzRFDuQy5DqtvFWdH9bmAlwuTnE81lcYwhM6dXXRzWyVewu23gJVxA0p8HG1XeBCwU",
  },
  {
    id: 5,
    tag: "Engineering",
    date: "Oct 01, 2024",
    author: "R&D Labs",
    title: "The Physics of Gen 5 Thermal Imaging Sensors",
    excerpt:
      "Understanding the sensitivity leap in our newest sensor array and how it redefines clarity in zero-light conditions.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh5NMPJG3EEFQ4j7jc3dx3fyRKJLytXwRm1QWUOYQMhJWWKI-4ssODj5Mx0l60di23dml4TQ5ifVDMxTdU4NgQKAGfxmTQp_ww3Uwt226jOJ5zdkuBrzAfHkEZkg1Hhuz4GFgg0D1q_0uTriwFLo3GKzI04xAD9dW33l76SZKrAJPnYA6a0ITVaC8pKsks2RQgA1laG68QzPrYwdJ-4v6iAnlr1ImTvJd4RkenS-WlW_p6uKGmaSu6qcM2uLaRSTuk2RNeJ6fCLaY",
  },
];

const categories = ["All Operations", "Thermal Tech", "Case Studies", "Tactical Gear", "Software Updates"];

/* ─── ICON COMPONENTS ───────────────────────────── */
const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconCart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const IconPerson = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconChevLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconRss = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" fill="currentColor" />
  </svg>
);
const IconTerminal = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
const IconHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="5" r="2" /><circle cx="19" cy="19" r="2" /><circle cx="5" cy="19" r="2" />
    <line x1="12" y1="9" x2="19" y2="7" /><line x1="12" y1="9" x2="5" y2="7" />
    <line x1="12" y1="15" x2="19" y2="17" /><line x1="12" y1="15" x2="5" y2="17" />
  </svg>
);
const IconChevR = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ─── ARTICLE CARD ───────────────────────────────── */
function ArticleCard({ article }) {
  const [hovered, setHovered] = useState(false);
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surfCont,
        border: `1px solid ${hovered ? C.primary : "transparent"}`,
        display: "flex",
        flexDirection: "column",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* Corner brackets */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: 10, height: 10,
        borderTop: `2px solid ${C.primary}`, borderLeft: `2px solid ${C.primary}`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s", zIndex: 2,
      }} />
      <div style={{
        position: "absolute", bottom: 0, right: 0, width: 10, height: 10,
        borderBottom: `2px solid ${C.primary}`, borderRight: `2px solid ${C.primary}`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s", zIndex: 2,
      }} />

      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
        <img
          src={article.img}
          alt={article.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
            filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
          }}
          loading="lazy"
        />
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: C.primary, color: C.onPrimary,
          padding: "3px 10px",
          fontSize: 11, fontWeight: 600, letterSpacing: "1.5px",
          textTransform: "uppercase", fontFamily: C.pp,
        }}>{article.tag}</div>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 28px 24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase",
          color: C.onSurfVar, opacity: 0.65, marginBottom: 12, fontFamily: C.pp,
        }}>
          {article.date} — By {article.author}
        </div>

        <h3 style={{
          fontFamily: C.pp,
          fontSize: "clamp(16px, 1.6vw, 18px)",
          fontWeight: 600,
          lineHeight: 1.4,
          color: hovered ? C.primary : C.onSurf,
          marginBottom: 12,
          transition: "color 0.2s",
        }}>{article.title}</h3>

        <p style={{
          fontSize: 14,
          lineHeight: "22px",
          color: C.onSurfVar,
          marginBottom: 24,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          fontFamily: C.pp,
        }}>{article.excerpt}</p>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: hovered ? 12 : 6, transition: "gap 0.3s" }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "2px",
            textTransform: "uppercase", color: C.secondary, fontFamily: C.pp,
          }}>Read Full Dossier</span>
          <span style={{ color: C.secondary, display: "flex" }}><IconArrow /></span>
        </div>
      </div>
    </article>
  );
}

/* ─── NEWSLETTER CARD ─────────────────────────────── */
function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleJoin = () => {
    if (email && email.includes("@")) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus(null), 3000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus(null), 2000);
    }
  };

  return (
    <div style={{
      background: C.primary,
      padding: "clamp(24px,3vw,40px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      overflow: "hidden",
      minHeight: 320,
    }}>
      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(35,54,0,0.04) 2px, rgba(35,54,0,0.04) 4px)",
        pointerEvents: "none",
      }} />
      {/* BG icon */}
      <div style={{
        position: "absolute", bottom: 12, right: 16, opacity: 0.18,
        color: C.onPrimary, userSelect: "none",
      }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{
          fontFamily: C.sg,
          fontSize: "clamp(18px,2.5vw,24px)",
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: C.onPrimary,
          marginBottom: 12,
          lineHeight: 1.2,
        }}>Subscribe to Field Intel</h3>
        <p style={{
          fontSize: 13,
          lineHeight: "20px",
          color: C.onPrimary,
          opacity: 0.8,
          marginBottom: 24,
          fontFamily: C.pp,
        }}>
          Receive weekly technical bulletins and priority alerts on tactical hardware releases.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL ADDRESS"
            style={{
              background: "rgba(0,0,0,0.2)",
              border: "none",
              borderBottom: `1px solid ${status === "error" ? "#ff6b6b" : C.onPrimary}`,
              color: C.onPrimary,
              padding: "12px 0",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              outline: "none",
              fontFamily: C.pp,
              transition: "border-color 0.2s",
            }}
          />
          <button
            onClick={handleJoin}
            style={{
              background: C.onPrimary,
              color: status === "success" ? C.secondary : C.primary,
              padding: "14px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              fontFamily: C.pp,
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "scale(0.98)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; }}
          >
            {status === "success" ? "Protocol Active ✓" : "Join Protocol"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────── */
export default function NightWatchBlog() {
  const [activeCategory, setActiveCategory] = useState("All Operations");
  const [activePage, setActivePage] = useState(1);
  return (
    <div style={{ background: C.bg, color: C.onSurf, fontFamily: C.pp, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:#deffa4;color:#233600;}
        body{cursor:crosshair;}
        .nvbtn:hover{background:#33362c !important;}
        .nvlink:hover{color:#deffa4 !important;}
        .nvicon:hover{color:#deffa4 !important;}
        .nvpage:hover{background:#b5e75d !important;color:#233600 !important;}
        .footlink:hover{color:#94da32 !important;transform:translateX(4px);}
        /* Scanline overlay on body */
        body::before{
          content:'';position:fixed;inset:0;pointer-events:none;z-index:40;
          background:repeating-linear-gradient(to bottom,transparent,transparent 2px,rgba(181,231,93,0.03) 2px,rgba(181,231,93,0.03) 4px);
          opacity:0.5;
        }
        @media(max-width:768px){
          .desktop-nav{display:none !important;}
          .hamburger-btn{display:flex !important;}
          .blog-grid{grid-template-columns:1fr !important;}
          .hero-section{padding-top:100px !important;}
          .footer-grid{grid-template-columns:1fr 1fr !important;}
          .footer-bottom{flex-direction:column !important;text-align:center !important;gap:12px !important;}
        }
        @media(min-width:769px) and (max-width:1024px){
          .blog-grid{grid-template-columns:1fr 1fr !important;}
          .footer-grid{grid-template-columns:1fr 1fr !important;}
        }
        @media(min-width:1025px){
          .blog-grid{grid-template-columns:1fr 1fr 1fr !important;}
        }
        @media(max-width:480px){
          .footer-grid{grid-template-columns:1fr !important;}
          .cat-scroll{overflow-x:auto;}
          .cat-scroll::-webkit-scrollbar{display:none;}
        }
        input::placeholder{color:rgba(194,201,179,0.5);}
      `}</style>

      {/* ── MAIN ── */}
      <main className="hero-section" style={{ paddingTop: 110, paddingBottom: 80, maxWidth: 1440, margin: "0 auto", padding: "110px clamp(16px,4vw,64px) 80px" }}>

        {/* Hero Header */}
        

        {/* Category Tabs */}
        <div className="cat-scroll" style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: 8,
          marginBottom: 48,
          borderBottom: `1px solid ${C.outlineVar}`,
          paddingBottom: 16,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? C.primary : C.surfHi,
                color: activeCategory === cat ? C.onPrimary : C.onSurf,
                padding: "8px 20px",
                fontSize: 11, fontWeight: 600, letterSpacing: "1.5px",
                textTransform: "uppercase", border: "none", cursor: "pointer",
                fontFamily: C.pp, transition: "all 0.2s",
                whiteSpace: "nowrap", flexShrink: 0,
              }}
              onMouseEnter={(e) => { if (activeCategory !== cat) e.target.style.background = C.surfHighest; }}
              onMouseLeave={(e) => { if (activeCategory !== cat) e.target.style.background = C.surfHi; }}
            >{cat}</button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="blog-grid" style={{ display: "grid", gap: 24 }}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
          <NewsletterCard />
        </div>

        {/* Pagination */}
        <nav style={{ marginTop: 64, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
          {[null, 1, 2, 3, null].map((page, i) => {
            const isArrow = page === null;
            const isLeft = i === 0;
            const isActive = page === activePage;
            return (
              <button
                key={i}
                className={isArrow ? "nvpage" : "nvpage"}
                onClick={() => !isArrow && setActivePage(page)}
                style={{
                  width: 44, height: 44,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isActive ? C.primary : C.surfCont,
                  color: isActive ? C.onPrimary : C.onSurf,
                  border: `1px solid ${C.outlineVar}`,
                  cursor: "pointer",
                  fontFamily: C.pp, fontSize: 14, fontWeight: isActive ? 700 : 400,
                  transition: "all 0.2s",
                }}
              >
                {isArrow ? (isLeft ? <IconChevLeft /> : <IconChevRight />) : page}
              </button>
            );
          })}
        </nav>
      </main>

    </div>
  );
}