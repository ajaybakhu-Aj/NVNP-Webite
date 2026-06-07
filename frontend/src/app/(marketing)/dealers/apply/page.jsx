import { useState } from "react";

const scanlineStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --primary: #deffa4;
    --primary-container: #b5e75d;
    --secondary: #94da32;
    --secondary-container: #75b800;
    --background: #11140c;
    --surface: #11140c;
    --surface-container: #1e2117;
    --surface-container-low: #1a1d14;
    --surface-container-lowest: #0c0f07;
    --surface-container-high: #282b21;
    --surface-bright: #373a30;
    --surface-variant: #33362c;
    --on-surface: #e2e4d5;
    --on-surface-variant: #c3c9b3;
    --on-primary: #233600;
    --on-secondary-container: #284300;
    --outline: #8d937f;
    --outline-variant: #434938;
    --inverse-on-surface: #2e3227;
  }

  body {
    background-color: var(--background);
    color: var(--on-surface);
    font-family: 'Poppins', sans-serif;
    cursor: crosshair;
    overflow-x: hidden;
  }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }

  .scanline {
    width: 100%;
    height: 100px;
    z-index: 99;
    background: linear-gradient(0deg, rgba(222,255,164,0) 0%, rgba(222,255,164,0.05) 50%, rgba(222,255,164,0) 100%);
    opacity: 0.1;
    position: fixed;
    bottom: 100%;
    pointer-events: none;
    animation: scanline 8s linear infinite;
  }
  @keyframes scanline {
    0% { bottom: 100%; }
    100% { bottom: -100px; }
  }

  .corner-bracket {
    position: absolute;
    width: 15px;
    height: 15px;
    border-color: var(--primary);
  }
  .tl { top: 0; left: 0; border-top: 1px solid; border-left: 1px solid; }
  .tr { top: 0; right: 0; border-top: 1px solid; border-right: 1px solid; }
  .bl { bottom: 0; left: 0; border-bottom: 1px solid; border-left: 1px solid; }
  .br { bottom: 0; right: 0; border-bottom: 1px solid; border-right: 1px solid; }

  input:focus, textarea:focus, select:focus {
    box-shadow: inset 0 0 10px rgba(222,255,164,0.1);
    outline: none !important;
    border-color: var(--primary) !important;
  }

  .nav-link {
    color: var(--on-surface);
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    transition: color 0.2s;
  }
  .nav-link:hover { color: var(--primary); }

  .benefit-card {
    position: relative;
    padding: 2rem;
    background: var(--surface-container);
    border: 1px solid var(--outline-variant);
    transition: border-color 0.3s;
    flex: 1;
    min-width: 260px;
  }
  .benefit-card:hover { border-color: var(--primary); }
  .benefit-card:hover .hover-hint { opacity: 1; }

  .hover-hint {
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--primary);
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: 600;
    margin-top: 1.5rem;
  }

  .form-input {
    width: 100%;
    background: var(--surface-container-low);
    border: 1px solid var(--outline-variant);
    color: var(--on-surface);
    padding: 1rem;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    border-radius: 0;
    transition: border-color 0.2s;
  }
  .form-input::placeholder { color: var(--outline); }
  .form-input:focus { border-color: var(--primary); box-shadow: inset 0 0 10px rgba(222,255,164,0.1); outline: none; }

  .form-label {
    display: block;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 4px;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 8px;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
  }

  .submit-btn {
    background: var(--primary);
    color: var(--on-primary);
    padding: 1.25rem 3rem;
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    border: none;
    cursor: crosshair;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: box-shadow 0.3s, opacity 0.2s;
    white-space: nowrap;
  }
  .submit-btn:hover { box-shadow: 0 0 20px rgba(222,255,164,0.3); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .submit-btn.success { background: var(--secondary-container); }

  .footer-link {
    color: var(--on-surface-variant);
    text-decoration: none;
    font-size: 16px;
    transition: color 0.2s, transform 0.2s;
    display: inline-block;
  }
  .footer-link:hover { color: var(--primary); transform: translateX(4px); }
  .footer-link.highlighted { color: var(--primary); font-weight: 700; }

  @media (max-width: 768px) {
    .benefits-grid { flex-direction: column !important; }
    .form-row { flex-direction: column !important; }
    .layout-grid { flex-direction: column !important; }
    .vetting-sidebar { display: none !important; }
    .hero-title { font-size: 32px !important; letter-spacing: 2px !important; }
    .footer-grid { flex-direction: column !important; gap: 2rem !important; }
    .nav-links-desktop { display: none !important; }
    .nav-icon-profile { display: none !important; }
    .submit-btn { width: 100%; justify-content: center; }
  }
`;

export default function DealerPage() {
  const [btnState, setBtnState] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnState("loading");
    setTimeout(() => {
      setBtnState("success");
      setTimeout(() => {
        setBtnState("idle");
        e.target.reset();
      }, 2000);
    }, 1500);
  };

  const btnLabel =
    btnState === "loading"
      ? "TRANSMITTING..."
      : btnState === "success"
      ? "TRANSMISSION COMPLETE"
      : "SUBMIT APPLICATION";

  return (
    <>
      <style>{scanlineStyle}</style>
      <div className="scanline" />

      <main style={{
        paddingTop: "clamp(120px, 14vw, 140px)",
        paddingBottom: "6rem",
        paddingLeft: "clamp(16px, 4vw, 64px)",
        paddingRight: "clamp(16px, 4vw, 64px)",
        maxWidth: "1440px",
        margin: "0 auto",
      }}>
        {/* HEADER */}
        <header style={{ marginBottom: "clamp(3rem, 6vw, 6rem)", position: "relative" }}>
          <div style={{
            position: "absolute", left: "-2rem", top: 0,
            color: "rgba(222,255,164,0.1)", pointerEvents: "none", userSelect: "none",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: "120px" }}>verified_user</span>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "12px", lineHeight: "16px", letterSpacing: "4px", fontWeight: 600,
              color: "var(--primary)", marginBottom: "1rem", textTransform: "uppercase",
            }}>
              PARTNERSHIP PROGRAM v4.0
            </p>
            <h1 className="hero-title" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              lineHeight: 1.2,
              letterSpacing: "clamp(1px, 0.5vw, 2px)",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--on-surface)",
              maxWidth: "48rem",
            }}>
              BECOME AN <span style={{ color: "var(--primary)" }}>AUTHORIZED DEALER</span>
            </h1>
            <div style={{ height: "4px", width: "96px", background: "var(--primary)", marginTop: "1.5rem" }} />
          </div>
        </header>

        {/* BENEFITS */}
        <section className="benefits-grid" style={{
          display: "flex", flexWrap: "wrap",
          gap: "24px", marginBottom: "6rem",
        }}>
          {[
            {
              icon: "security",
              title: "Elite Hardware",
              body: "Direct access to the full NV/// NIGHTVISION™ surveillance hardware suite including exclusive enterprise-grade IP optics and NVR units.",
              hint: "SPECIFICATIONS ATTACHED",
            },
            {
              icon: "monitoring",
              title: "Tier 1 Support",
              body: "24/7 dedicated engineering support line for configuration assistance and critical system maintenance for your end clients.",
              hint: "UPTIME GUARANTEED",
            },
            {
              icon: "universal_currency",
              title: "Exclusive Margins",
              body: "Competitive wholesale pricing structures and marketing MDF (Market Development Funds) to scale your territory operations.",
              hint: "REVENUE MODELING",
            },
          ].map(({ icon, title, body, hint }) => (
            <div key={title} className="benefit-card">
              <div className="corner-bracket tl" />
              <div className="corner-bracket tr" />
              <div className="corner-bracket bl" />
              <div className="corner-bracket br" />
              <div style={{ marginBottom: "1.5rem", color: "var(--primary)" }}>
                <span className="material-symbols-outlined" style={{
                  fontSize: "36px",
                  fontVariationSettings: "'FILL' 1",
                }}>{icon}</span>
              </div>
              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600, fontSize: "20px", lineHeight: "28px",
                color: "var(--on-surface)", marginBottom: "0.75rem",
                textTransform: "uppercase", letterSpacing: "1px",
              }}>{title}</h3>
              <p style={{ color: "var(--on-surface-variant)", fontSize: "16px", lineHeight: "24px" }}>
                {body}
              </p>
              <div className="hover-hint">
                <span>{hint}</span>
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_right_alt</span>
              </div>
            </div>
          ))}
        </section>

        {/* FORM SECTION */}
        <section className="layout-grid" style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
          {/* SIDEBAR */}
          <div className="vetting-sidebar" style={{
            width: "320px", flexShrink: 0,
            position: "sticky", top: "96px",
          }}>
            <div style={{
              padding: "2rem",
              borderLeft: "2px solid var(--primary)",
              background: "var(--surface-container-low)",
            }}>
              <h2 style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600, fontSize: "20px",
                color: "var(--primary)", textTransform: "uppercase",
                marginBottom: "1rem",
              }}>Vetting Process</h2>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  "Submission of dealer credentials and business profile.",
                  "Technical review of infrastructure capabilities.",
                  "Territory exclusivity assessment.",
                  "Final authorization and onboarding sync.",
                ].map((step, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px", color: "var(--on-surface-variant)", fontSize: "16px", lineHeight: "24px" }}>
                    <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FORM */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              background: "var(--surface-container)",
              padding: "clamp(1.5rem, 4vw, 3rem)",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: 0, right: 0, padding: "1rem",
                opacity: 0.15, pointerEvents: "none",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: "64px" }}>qr_code_2</span>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div className="form-row" style={{ display: "flex", gap: "2rem" }}>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">Company Name</label>
                    <input className="form-input" type="text" placeholder="SECURE LOGISTICS LTD" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">Business Type</label>
                    <select className="form-input" style={{ appearance: "none" }}>
                      <option>System Integrator</option>
                      <option>Distributor</option>
                      <option>Retailer</option>
                      <option>Security Consultant</option>
                    </select>
                  </div>
                </div>

                <div className="form-row" style={{ display: "flex", gap: "2rem" }}>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">Contact Person</label>
                    <input className="form-input" type="text" placeholder="FULL NAME" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" placeholder="CONTACT@DOMAIN.COM" />
                  </div>
                </div>

                <div>
                  <label className="form-label">Current Territory / Location</label>
                  <input className="form-input" type="text" placeholder="CITY, COUNTRY" />
                </div>

                <div>
                  <label className="form-label">Business Brief / Experience</label>
                  <textarea
                    className="form-input"
                    placeholder="Describe your current operations and experience with surveillance systems..."
                    rows={4}
                    style={{ resize: "vertical" }}
                  />
                </div>

                <div style={{
                  display: "flex", alignItems: "flex-start", gap: "1rem",
                  padding: "1rem",
                  border: "1px solid rgba(67,73,56,0.3)",
                  background: "rgba(17,20,12,0.5)",
                }}>
                  <input
                    type="checkbox"
                    id="terms"
                    style={{
                      marginTop: "2px", flexShrink: 0,
                      accentColor: "var(--primary)",
                      width: "16px", height: "16px",
                      cursor: "crosshair",
                    }}
                  />
                  <label htmlFor="terms" style={{
                    color: "var(--on-surface-variant)", fontSize: "14px",
                    lineHeight: "1.5", cursor: "crosshair",
                  }}>
                    I confirm that all submitted information is accurate and I am authorized to represent the aforementioned entity for partnership negotiations.
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`submit-btn${btnState === "success" ? " success" : ""}`}
                    disabled={btnState === "loading"}
                  >
                    {btnLabel}
                    {btnState === "idle" && (
                      <span className="material-symbols-outlined">double_arrow</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>


    </>
  );
}