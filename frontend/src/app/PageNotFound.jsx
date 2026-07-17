import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const COLORS = {
  primary: "#B5E75D",
  primaryDark: "#76B900",
  bg: "#0a0d07",
  bgContainer: "#13180e",
  bgHigh: "#1c2214",
  surface: "#111409",
  border: "#2a3420",
  borderAccent: "#3d4d28",
  textPrimary: "#e8edda",
  textMuted: "#8a9b72",
  textFaint: "#4a5a38",
};

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => { savedCallback.current = callback; }, [callback]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

function ScanlineOverlay() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100,
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
    }} />
  );
}

function CornerBrackets({ size = 16, color = COLORS.primary, opacity = 0.8 }) {
  const s = { position: "absolute", width: size, height: size, borderColor: color, opacity };
  return (
    <>
      <span style={{ ...s, top: 0, left: 0, borderTop: `1.5px solid`, borderLeft: `1.5px solid` }} />
      <span style={{ ...s, top: 0, right: 0, borderTop: `1.5px solid`, borderRight: `1.5px solid` }} />
      <span style={{ ...s, bottom: 0, left: 0, borderBottom: `1.5px solid`, borderLeft: `1.5px solid` }} />
      <span style={{ ...s, bottom: 0, right: 0, borderBottom: `1.5px solid`, borderRight: `1.5px solid` }} />
    </>
  );
}

function SurveillanceLens() {
  const [flicker, setFlicker] = useState(1);
  useInterval(() => {
    setFlicker(Math.random() > 0.85 ? 0.3 + Math.random() * 0.4 : 1);
  }, 120);

  return (
    <div style={{
      position: "relative", width: "100%", paddingBottom: "100%",
      background: COLORS.bgContainer, border: `1px solid ${COLORS.border}`,
    }}>
      <CornerBrackets size={18} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 200, height: 200, borderRadius: "50%",
          border: `2px solid rgba(181,231,93,0.15)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", width: "100%", height: 1,
            background: `rgba(181,231,93,0.25)`, top: "50%",
          }} />
          <div style={{
            position: "absolute", height: "100%", width: 1,
            background: `rgba(181,231,93,0.25)`, left: "50%",
          }} />
          <div style={{
            width: 130, height: 130, borderRadius: "50%",
            border: `1.5px solid rgba(181,231,93,0.3)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: "50%",
              background: `rgba(181,231,93,0.08)`,
              border: `1px solid ${COLORS.primary}`,
              opacity: flicker,
              transition: "opacity 0.05s",
              boxShadow: `0 0 12px rgba(181,231,93,0.15)`,
            }} />
          </div>
        </div>
        <div style={{
          position: "absolute", top: 12, left: 12,
          fontFamily: "'Space Mono', monospace", fontSize: 10,
          color: COLORS.primary, opacity: 0.7, lineHeight: 1.6,
          letterSpacing: "0.05em",
        }}>
          REC [●] 00:00:00<br />CAM_04_ENTRY
        </div>
        <div style={{
          position: "absolute", bottom: 12, right: 12, textAlign: "right",
          fontFamily: "'Space Mono', monospace", fontSize: 10,
          color: COLORS.primary, opacity: 0.7, lineHeight: 1.6,
        }}>
          ISO 3200<br />F/1.2 INF
        </div>
        <div style={{
          position: "absolute", inset: 0, background: "rgba(10,13,7,0.7)",
          backdropFilter: "blur(2px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 8, opacity: 0,
          transition: "opacity 0.4s",
        }}
          className="lens-hover-overlay"
        />
      </div>
    </div>
  );
}

function DiagnosticLog() {
  const logs = [
    "[SYSTEM_LOG] Initializing system scan...",
    "[SEARCH] Scanning camera network...",
    "[SEARCH] Scanning server directories...",
    "[ERROR] 404 Page Not Found.",
  ];
  const [visibleLines, setVisibleLines] = useState(0);
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= logs.length) clearInterval(timer);
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      border: `1px solid ${COLORS.border}`, padding: "12px 14px",
      height: 90, overflow: "hidden",
    }}>
      {logs.slice(0, visibleLines).map((l, i) => (
        <div key={i} style={{
          fontFamily: "'Space Mono', monospace", fontSize: 10, lineHeight: 1.7,
          color: l.includes("ERROR") ? "#ff6b6b" : COLORS.textFaint,
        }}>{l}</div>
      ))}
    </div>
  );
}

function CoordDisplay() {
  const [coords, setCoords] = useState("66°23'N 56°47'E");
  useInterval(() => {
    const lat = `${Math.floor(Math.random() * 89)}°${Math.floor(Math.random() * 59)}'N`;
    const lng = `${Math.floor(Math.random() * 179)}°${Math.floor(Math.random() * 59)}'E`;
    setCoords(`${lat} ${lng}`);
  }, 3000);
  return <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: COLORS.textMuted }}>{coords}</span>;
}

export default function NotFound() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div style={{ background: COLORS.bg, color: COLORS.textPrimary, fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>

      <ScanlineOverlay />

      {/* Fixed border vignette */}
      <div style={{ position: "fixed", inset: 0, border: "10px solid rgba(0,0,0,0.5)", pointerEvents: "none", zIndex: 99 }} />

      <main style={{ minHeight: "calc(100vh - 120px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", padding: "60px 32px 60px" }}>
        {/* Big BG text */}
        <div className="bg-404">404</div>

        {/* Main grid */}
        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1000, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Camera side */}
          <div className={`fade-up delay-1 ${mounted ? "fade-up" : ""}`} style={{ maxWidth: 460 }}>
            <SurveillanceLens />
          </div>

          {/* Content side */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className={`fade-up delay-2 ${mounted ? "fade-up" : ""}`}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 96, fontWeight: 700, color: COLORS.primary, lineHeight: 0.9, letterSpacing: "-0.04em" }}>404</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: COLORS.textPrimary, letterSpacing: "0.04em", marginTop: 8, textTransform: "uppercase" }}>PAGE NOT FOUND</div>
              <div style={{ width: 48, height: 3, background: COLORS.primary, marginTop: 14 }} />
            </div>

            <p className={`fade-up delay-3 ${mounted ? "fade-up" : ""}`} style={{ fontSize: 15, color: COLORS.textMuted, lineHeight: 1.7, maxWidth: 400 }}>
              The requested page could not be found. It may have been moved, deleted, or never existed in our directory.
            </p>

            {/* Diagnostic box */}
            <div className={`fade-up delay-3 ${mounted ? "fade-up" : ""}`} style={{
              background: COLORS.bgContainer,
              borderLeft: `3px solid ${COLORS.primary}`,
              padding: "14px 16px",
              display: "flex", flexDirection: "column", gap: 4,
            }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: COLORS.primary, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.9 }}>DIAGNOSTIC REPORT</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: COLORS.textMuted }}>
                CONNECTION FAILED - PATH: {window.location.pathname}
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: COLORS.textFaint, fontStyle: "italic" }}>
                Error Code: 404 Not Found
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: COLORS.primary, marginTop: 4, fontWeight: "bold" }}>
                REDIRECTING TO HOME IN {countdown}S...
              </div>
            </div>

            {/* Search */}
            <div className={`fade-up delay-4 ${mounted ? "fade-up" : ""}`} style={{ position: "relative" }}>
              <input
                className="nv-search"
                placeholder="SEARCH WEBSITE..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchValue.trim()) {
                    navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
                  }
                }}
              />
              <button 
                onClick={() => {
                  if (searchValue.trim()) {
                    navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
                  }
                }}
                style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer",
                color: COLORS.primary, fontSize: 18, display: "flex", alignItems: "center",
              }}>⌕</button>
            </div>

            {/* CTA buttons */}
            <div className={`fade-up delay-5 ${mounted ? "fade-up" : ""}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button className="nv-btn-primary" onClick={() => navigate("/")}>
                <span>RETURN HOME</span>
                <span>⌂</span>
              </button>
              <button className="nv-btn-outline" onClick={() => navigate("/products")}>
                <span>VIEW PRODUCTS</span>
                <span>⊞</span>
              </button>
            </div>
          </div>
        </div>

        {/* System logs strip */}
        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1000, marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, opacity: 0.45 }}>
          <DiagnosticLog />
          {[
            ["[NETWORK] Session handshake established.", "[NETWORK] Processing request path...", "[ALERT] Page address path terminated unexpectedly."],
            ["[USER_AUTH] Anonymous session initiated.", "[DATABASE] Accessing website_content.db", "[QUERY] Select * from site_pages where status='active'"],
          ].map((lines, i) => (
            <div key={i} style={{ border: `1px solid ${COLORS.border}`, padding: "12px 14px", height: 90 }}>
              {lines.map((l, j) => (
                <div key={j} style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, lineHeight: 1.7, color: COLORS.textFaint }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}