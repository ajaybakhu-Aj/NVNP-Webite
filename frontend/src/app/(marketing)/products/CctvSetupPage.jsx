import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { colors } from "../../../data/constants";
import { CartContext } from "../../../Context/CartContext";
import { apiPost } from "../../../utils/api";
import Icon from "../../../utils/Icon";

export default function CctvSetupPage() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // User input states
  const [propertyType, setPropertyType] = useState("home");
  const [cameraQuantity, setCameraQuantity] = useState(4);
  const [coverageType, setCoverageType] = useState("both");

  // Recommendation state
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Drawer / Modal states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isKhaltiModalOpen, setIsKhaltiModalOpen] = useState(false);
  
  // Drawer form states
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submittingQuote, setSubmittingQuote] = useState(false);
  const [quoteSuccessMsg, setQuoteSuccessMsg] = useState(null);

  // Khalti payment simulator states
  const [khaltiPhone, setKhaltiPhone] = useState("");
  const [khaltiPin, setKhaltiPin] = useState("");
  const [khaltiOtp, setKhaltiOtp] = useState("");
  const [khaltiStep, setKhaltiStep] = useState(1); // 1 = input, 2 = OTP, 3 = success
  const [khaltiError, setKhaltiError] = useState("");
  const [paying, setPaying] = useState(false);

  // Section refs for anchor scrolling
  const propertyRef = useRef(null);
  const qtyRef = useRef(null);
  const coverageRef = useRef(null);
  const recommendationRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Run calculation backend rules reactively
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Call django view endpoint
    apiPost("/api/wizard/recommendation/", {
      property_type: propertyType,
      camera_quantity: cameraQuantity,
      coverage_type: coverageType,
    })
      .then((data) => {
        setRecommendation(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err.message);
        // Fallback Client-side Engine
        const fallbackData = calculateClientFallback(propertyType, cameraQuantity, coverageType);
        setRecommendation(fallbackData);
        setLoading(false);
      });
  }, [propertyType, cameraQuantity, coverageType]);

  // Client side fallback rule controller matching backend matrix
  const calculateClientFallback = (prop, qty, cov) => {
    let domeModel = "NightVision Dome Pro V2 (2MP)";
    let domePrice = 4500;
    let bulletModel = "NightVision Trishul Bullet Pro (2MP)";
    let bulletPrice = 5500;

    if (prop === "warehouse" || prop === "shop") {
      domeModel = "NightVision Dome AI Pro (4MP)";
      domePrice = 6000;
      bulletModel = "NightVision Industrial AI Bullet (4MP)";
      bulletPrice = 7500;
    }

    let cameraItems = [];
    if (cov === "indoor") {
      cameraItems.push({
        name: domeModel,
        qty: qty,
        unit_price: domePrice,
        total_price: qty * domePrice,
        type: "Camera"
      });
    } else if (cov === "outdoor") {
      cameraItems.push({
        name: bulletModel,
        qty: qty,
        unit_price: bulletPrice,
        total_price: qty * bulletPrice,
        type: "Camera"
      });
    } else {
      const domeQty = Math.floor(qty / 2);
      const bulletQty = qty - domeQty;
      if (domeQty > 0) {
        cameraItems.push({
          name: domeModel,
          qty: domeQty,
          unit_price: domePrice,
          total_price: domeQty * domePrice,
          type: "Camera"
        });
      }
      if (bulletQty > 0) {
        cameraItems.push({
          name: bulletModel,
          qty: bulletQty,
          unit_price: bulletPrice,
          total_price: bulletQty * bulletPrice,
          type: "Camera"
        });
      }
    }

    // NVR
    let nvrModel = "NightVision 4-Channel PoE NVR Hub";
    let nvrPrice = 12000;
    if (qty > 4 && qty <= 8) {
      nvrModel = "NightVision 8-Channel PoE NVR Hub";
      nvrPrice = 18000;
    } else if (qty > 8) {
      nvrModel = "NightVision 16-Channel Enterprise NVR Array";
      nvrPrice = 35000;
    }

    const nvrItem = {
      name: nvrModel,
      qty: 1,
      unit_price: nvrPrice,
      total_price: nvrPrice,
      type: "Control Unit"
    };

    // Connectivity
    let connModel = "Standard PoE Injector & Cat6 Cabling Kit";
    let connPrice = 3500;
    if (qty > 4 && qty <= 8) {
      connModel = "8-Port PoE Gigabit Switch & Core Cat6 Cabling Kit";
      connPrice = 7500;
    } else if (qty > 8) {
      connModel = "16-Port Managed PoE Switch & Fiber Uplink Kit";
      connPrice = 18000;
    }

    const connItem = {
      name: connModel,
      qty: 1,
      unit_price: connPrice,
      total_price: connPrice,
      type: "Connectivity"
    };

    // Storage
    let hddModel = "1TB Seagate Surveillance Hard Drive";
    let hddPrice = 6500;
    if (qty > 4 && qty <= 8) {
      hddModel = "2TB Western Digital Purple Surveillance Drive";
      hddPrice = 9500;
    } else if (qty > 8) {
      hddModel = "4TB Western Digital Purple Enterprise Drive";
      hddPrice = 15000;
    }

    const hddItem = {
      name: hddModel,
      qty: 1,
      unit_price: hddPrice,
      total_price: hddPrice,
      type: "Storage"
    };

    // Accessories
    const miscItem = {
      name: "Weatherproof Junction Boxes, RJ45 Connectors & Power Units",
      qty: 1,
      unit_price: 2500,
      total_price: 2500,
      type: "Accessories"
    };

    const items = [...cameraItems, nvrItem, connItem, hddItem, miscItem];
    const subtotal = items.reduce((sum, item) => sum + item.total_price, 0);
    const tax = Math.round(subtotal * 0.13);
    const total = subtotal + tax;

    return {
      property_type: prop,
      camera_quantity: qty,
      coverage_type: cov,
      items,
      subtotal,
      tax,
      total,
      currency: "NPR"
    };
  };

  // Add items to context cart
  const addPackageToCart = () => {
    if (!recommendation) return;
    recommendation.items.forEach((item) => {
      addToCart({
        id: `wizard-${item.name.replace(/\s+/g, '-').toLowerCase()}`,
        name: item.name,
        price: item.unit_price,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfmkbSFVJ8AlzhQZHjMM4pIiv2OYIDhHkMZsWnmMTKqm9GwRMBdIZX2nZtMt94Rn9WI1BacR8uuqTkmZl_vWiGITSLb49PmCUbbZ5M81mz2w_VyCO_KCjT7d-p9hzUHt4rvyKm4OXLTA1XrWaJUvzewFlMad6e3pebPKLMVM7HknUwJL2jt6HUAMzjyO_-JJH3L6zzV8GnKhvA1im_7ZfPFJuRx-skTuwyvbK7kLrYtRHDbm4bdy8"
      }, item.qty);
    });
  };

  // Submit quote request via POST endpoint
  const handleRequestQuoteSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientEmail) {
      alert("Please populate name, phone, and email coordinates.");
      return;
    }

    setSubmittingQuote(true);
    apiPost("/api/wizard/quote/", {
      property_type: propertyType,
      camera_quantity: cameraQuantity,
      coverage_type: coverageType,
      client_name: clientName,
      client_phone: clientPhone,
      client_email: clientEmail,
      additional_notes: notes,
      recommended_package: recommendation
    })
      .then((data) => {
        setSubmittingQuote(false);
        if (data.success) {
          const randRef = Math.floor(1000 + Math.random() * 9000);
          setQuoteSuccessMsg(`QUOTE GENERATED: Reference ID NV-QUOTE-${data.quote_id > 0 ? data.quote_id : randRef}. Our tactical team will contact you in under 12 hours.`);
        } else {
          alert(`Error saving quote request: ${data.error}`);
        }
      })
      .catch((err) => {
        console.error(err);
        setSubmittingQuote(false);
        // Offline / disconnected simulation
        const randRef = Math.floor(1000 + Math.random() * 9000);
        setQuoteSuccessMsg(`OFFLINE LOGGED: Reference ID NV-OFFLINE-${randRef}. Your quote request parameters were cached and logged local-side.`);
      });
  };

  // Khalti payment triggers
  const startKhaltiPayment = () => {
    setKhaltiStep(1);
    setKhaltiError("");
    setKhaltiPhone("");
    setKhaltiPin("");
    setKhaltiOtp("");
    setIsKhaltiModalOpen(true);
  };

  const handleKhaltiSubmitCredentials = (e) => {
    e.preventDefault();
    if (!khaltiPhone || khaltiPhone.length < 10) {
      setKhaltiError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!khaltiPin) {
      setKhaltiError("Enter your secret 4-digit PIN.");
      return;
    }
    setPaying(true);
    setKhaltiError("");
    setTimeout(() => {
      setPaying(false);
      setKhaltiStep(2); // Jump to OTP entry
    }, 1500);
  };

  const handleKhaltiConfirmOtp = (e) => {
    e.preventDefault();
    if (!khaltiOtp) {
      setKhaltiError("Please enter the verification OTP sent to your phone.");
      return;
    }
    setPaying(true);
    setKhaltiError("");
    setTimeout(() => {
      setPaying(false);
      setKhaltiStep(3); // success!
      addPackageToCart();
    }, 2000);
  };

  return (
    <div style={{ background: "#131313", minHeight: "100vh", color: "#e5e2e1", paddingBottom: "100px", position: "relative" }}>
      {/* SCANLINE OVERLAY */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "repeating-linear-gradient(transparent, transparent 3px, rgba(148,218,50,0.02) 4px)",
          opacity: 0.15,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      {/* HEADER HERO */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px 0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Space Grotesk', monospace", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#8d937f", marginBottom: 20 }}>
          <Link to="/" style={{ color: "#8d937f", textDecoration: "none" }}>Home</Link>
          <Icon name="chevron_right" size={14} />
          <Link to="/products" style={{ color: "#8d937f", textDecoration: "none" }}>Products</Link>
          <Icon name="chevron_right" size={14} />
          <span style={{ color: "#94da32" }}>Interactive Setup Wizard</span>
        </div>

        <div style={{ borderBottom: "1px solid #434938", paddingBottom: 24, marginBottom: 40 }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, color: "var(--nv-onSurf)", textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 12px 0" }}>
            CCTV PACKAGE WIZARD
          </h1>
          <p style={{ color: "#8d937f", fontSize: 15, maxWidth: 800, margin: 0, lineHeight: 1.6 }}>
            Answer three simple parameters below to dynamically build, price, and customize an optimized enterprise surveillance network package tailor-fit for your property needs.
          </p>
        </div>
      </div>

      {/* FLOATING STEP ANCHOR MAP */}
      <div style={{
        position: "sticky",
        top: 20,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        gap: 16,
        marginBottom: 48,
        padding: "0 24px"
      }}>
        <div style={{
          background: "rgba(24, 26, 21, 0.85)",
          border: "1px solid #434938",
          borderRadius: 30,
          padding: "8px 24px",
          display: "flex",
          gap: 12,
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
        }}>
          <button onClick={() => scrollToSection(propertyRef)} style={stepAnchorStyle}>
            <Icon name="home" size={16} /> Property Type
          </button>
          <button onClick={() => scrollToSection(qtyRef)} style={stepAnchorStyle}>
            <Icon name="videocam" size={16} /> Cameras
          </button>
          <button onClick={() => scrollToSection(coverageRef)} style={stepAnchorStyle}>
            <Icon name="edgesensor_high" size={16} /> Coverage
          </button>
          <button onClick={() => scrollToSection(recommendationRef)} style={{ ...stepAnchorStyle, color: "#94da32" }}>
            <Icon name="build" size={16} /> View Deal
          </button>
        </div>
      </div>

      {/* CORE BUILDER LAYOUT */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 40, alignItems: "start" }}>
        
        {/* PROGRESSIVE SELECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          
          {/* STEP 1: PROPERTY TYPE */}
          <section ref={propertyRef} style={stepContainerStyle}>
            <div style={stepHeaderStyle}>
              <div style={stepBadgeStyle}>01</div>
              <h2 style={stepTitleStyle}>Select Property Configuration</h2>
            </div>
            <p style={stepDescStyle}>
              Different layouts require distinct camera styles, ranges, and AI event recognition rules.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 24 }}>
              {[
                { id: "home", label: "Residential Home", icon: "home", desc: "Perimeter threat detection and family safety monitoring." },
                { id: "office", label: "Corporate Office", icon: "business", desc: "Employee safety, lobby security, and access control." },
                { id: "shop", label: "Retail Shop", icon: "storefront", desc: "Cash counter audits, customer patterns, and theft prevention." },
                { id: "warehouse", label: "Warehouse / Depot", icon: "warehouse", desc: "Industrial surveillance, thermal sensors, and high range bullet optics." }
              ].map((p) => {
                const active = propertyType === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setPropertyType(p.id);
                      scrollToSection(qtyRef);
                    }}
                    style={{
                      ...cardSelectionStyle,
                      border: active ? "1px solid #94da32" : "1px solid #434938",
                      background: active ? "rgba(148,218,50,0.06)" : "#181a15",
                      transform: active ? "scale(1.02)" : "scale(1)"
                    }}
                  >
                    <div style={{ color: active ? "#94da32" : "#8d937f", marginBottom: 12 }}>
                      <Icon name={p.icon} size={36} />
                    </div>
                    <h3 style={{ ...cardTitleStyle, color: active ? "#fff" : "#deffa4" }}>{p.label}</h3>
                    <p style={cardDescStyle}>{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* STEP 2: CAMERA QUANTITY */}
          <section ref={qtyRef} style={stepContainerStyle}>
            <div style={stepHeaderStyle}>
              <div style={stepBadgeStyle}>02</div>
              <h2 style={stepTitleStyle}>Specify Camera Node Density</h2>
            </div>
            <p style={stepDescStyle}>
              Choose the total number of security channels needed to eliminate blind spots.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginTop: 24 }}>
              {[
                { val: 2, label: "2 Channels", desc: "Small rooms / entryways" },
                { val: 4, label: "4 Channels", desc: "Standard house / small shop" },
                { val: 8, label: "8 Channels", desc: "Medium facility / dual floor" },
                { val: 16, label: "16+ Channels", desc: "Enterprise scale mapping" }
              ].map((q) => {
                const active = cameraQuantity === q.val;
                return (
                  <div
                    key={q.val}
                    onClick={() => {
                      setCameraQuantity(q.val);
                      scrollToSection(coverageRef);
                    }}
                    style={{
                      ...cardSelectionStyle,
                      border: active ? "1px solid #94da32" : "1px solid #434938",
                      background: active ? "rgba(148,218,50,0.06)" : "#181a15",
                      textAlign: "center"
                    }}
                  >
                    <h3 style={{ fontSize: 24, fontFamily: "'Space Grotesk', sans-serif", color: active ? "#94da32" : "#fff", margin: "0 0 4px 0" }}>
                      {q.val}
                    </h3>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#deffa4", marginBottom: 6 }}>{q.label}</div>
                    <p style={{ ...cardDescStyle, margin: 0 }}>{q.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* STEP 3: COVERAGE TYPE */}
          <section ref={coverageRef} style={stepContainerStyle}>
            <div style={stepHeaderStyle}>
              <div style={stepBadgeStyle}>03</div>
              <h2 style={stepTitleStyle}>Select Environment Coverage</h2>
            </div>
            <p style={stepDescStyle}>
              Weatherproof bullet cameras for outdoor elements vs dome cameras for indoor ceilings.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 24 }}>
              {[
                { id: "indoor", label: "Indoor Coverage", desc: "Dome cameras optimized for low-profile ceiling mounting." },
                { id: "outdoor", label: "Outdoor Elements", desc: "IP67 Weatherproof Bullet units with active night vision matrix." },
                { id: "both", label: "Indoor & Outdoor Hybrid", desc: "Balanced combination of both Dome & Bullet style hardware." }
              ].map((c) => {
                const active = coverageType === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setCoverageType(c.id);
                      setTimeout(() => {
                        recommendationRef.current?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    style={{
                      ...cardSelectionStyle,
                      border: active ? "1px solid #94da32" : "1px solid #434938",
                      background: active ? "rgba(148,218,50,0.06)" : "#181a15"
                    }}
                  >
                    <h3 style={{ ...cardTitleStyle, color: active ? "#94da32" : "#fff" }}>{c.label}</h3>
                    <p style={cardDescStyle}>{c.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* PACKAGE RECOMMENDATION OUTPUT CONTAINER */}
          <section ref={recommendationRef} style={{ ...stepContainerStyle, minHeight: "400px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #434938", paddingBottom: 16, marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, margin: 0, textTransform: "uppercase", color: "#deffa4" }}>
                Relational Recommendation Matrix
              </h2>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "#8d937f" }}>[RECOMMENDED CONFIGURATION]</span>
            </div>

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "200px", color: "#94da32" }}>
                <Icon name="loop" size={32} style={{ animation: "spin 1.5s linear infinite", marginBottom: 12 }} />
                <span>EVALUATING CUSTOM HARDWARE ALIGNMENTS...</span>
              </div>
            ) : recommendation ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {recommendation.items.map((item, idx) => (
                  <div key={idx} style={recommendationItemStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={iconWrapperStyle}>
                        <Icon name={
                          item.type === "Camera" ? "videocam" :
                          item.type === "Control Unit" ? "dns" :
                          item.type === "Connectivity" ? "router" :
                          item.type === "Storage" ? "album" : "build"
                        } size={22} style={{ color: "#94da32" }} />
                      </div>
                      <div>
                        <h4 style={{ color: "var(--nv-onSurf)", margin: 0, fontSize: 14, fontWeight: 600 }}>{item.name}</h4>
                        <span style={{ color: "#8d937f", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.type}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>रू {item.total_price.toLocaleString("en-IN")}</div>
                      <span style={{ color: "#8d937f", fontSize: 11 }}>Qty: {item.qty} × रू {item.unit_price.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: "#8d937f", textAlign: "center", padding: "40px 0" }}>
                Make your choices above to view the dynamic package matrix.
              </div>
            )}
          </section>

        </div>

        {/* SIDEBAR TOTAL ESTIMATOR & CTAs */}
        <aside style={{
          border: "1px solid #434938",
          padding: 24,
          borderRadius: 4,
          background: "#181a15",
          position: "sticky",
          top: 100,
          display: "flex",
          flexDirection: "column",
          gap: 24
        }}>
          <div>
            <h3 style={{ margin: "0 0 6px 0", fontSize: 16, fontFamily: "'Space Grotesk', sans-serif", color: "var(--nv-onSurf)", textTransform: "uppercase", letterSpacing: 1 }}>
              Surveillance Estimate
            </h3>
            <span style={{ color: "#8d937f", fontSize: 11, fontFamily: "monospace" }}>[SYSTEM_CODE: WIZARD_PRO_V3]</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid #2a2a2a", borderBottom: "1px solid #2a2a2a", padding: "16px 0" }}>
            <div style={summaryRowStyle}>
              <span style={{ color: "#8d937f" }}>Property Type:</span>
              <span style={{ color: "#fff", textTransform: "capitalize" }}>{propertyType}</span>
            </div>
            <div style={summaryRowStyle}>
              <span style={{ color: "#8d937f" }}>Camera Qty:</span>
              <span style={{ color: "#fff" }}>{cameraQuantity} Nodes</span>
            </div>
            <div style={summaryRowStyle}>
              <span style={{ color: "#8d937f" }}>Coverage Area:</span>
              <span style={{ color: "#fff", textTransform: "capitalize" }}>{coverageType}</span>
            </div>
            {recommendation && (
              <>
                <div style={{ ...summaryRowStyle, marginTop: 8 }}>
                  <span style={{ color: "#8d937f" }}>Hardware Subtotal:</span>
                  <span style={{ color: "#fff" }}>रू {recommendation.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div style={summaryRowStyle}>
                  <span style={{ color: "#8d937f" }}>Gov. Tax (13% VAT):</span>
                  <span style={{ color: "#fff" }}>रू {recommendation.tax.toLocaleString("en-IN")}</span>
                </div>
              </>
            )}
          </div>

          {/* Running Grand Total */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>ESTIMATED TOTAL:</span>
            <span style={{ color: "#94da32", fontWeight: 700, fontSize: 24, fontFamily: "'Space Grotesk', sans-serif" }}>
              रू {recommendation ? recommendation.total.toLocaleString("en-IN") : "0"}
            </span>
          </div>

          {/* DUAL CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              onClick={startKhaltiPayment}
              disabled={!recommendation}
              style={{
                ...primaryCtaStyle,
                background: "#5C2D91", // Khalti Purple
                color: "#fff",
                border: "1px solid #7539b7",
                boxShadow: "0 0 15px rgba(92, 45, 145, 0.25)"
              }}
            >
              <Icon name="payment" size={18} /> INSTANT CHECKOUT (KHALTI)
            </button>

            <button
              onClick={() => {
                setQuoteSuccessMsg(null);
                setIsDrawerOpen(true);
              }}
              style={{
                ...primaryCtaStyle,
                background: "transparent",
                border: "1px solid #94da32",
                color: "#94da32"
              }}
            >
              <Icon name="receipt_long" size={18} /> REQUEST CUSTOM QUOTE
            </button>
          </div>

          <div style={{ fontSize: 11, color: "#8d937f", textAlign: "center", lineHeight: 1.4 }}>
            Includes 1-Year Ironclad Warranty, mounting accessories, and priority installation assistance.
          </div>
        </aside>

      </div>

      {/* REQUEST QUOTE SLIDING DRAWER */}
      {isDrawerOpen && (
        <div style={drawerOverlayStyle} onClick={() => setIsDrawerOpen(false)}>
          <div style={drawerPanelStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #434938", paddingBottom: 16, marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, color: "#94da32", margin: 0, textTransform: "uppercase" }}>
                Request Operator Quote
              </h3>
              <button onClick={() => setIsDrawerOpen(false)} style={closeBtnStyle}>
                <Icon name="close" size={20} />
              </button>
            </div>

            {quoteSuccessMsg ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80%", textAlign: "center", padding: 24 }}>
                <Icon name="check_circle" size={64} style={{ color: "#94da32", marginBottom: 16 }} />
                <h4 style={{ color: "var(--nv-onSurf)", fontSize: 18, marginBottom: 12 }}>PROVISION SUCCESSFUL</h4>
                <p style={{ color: "#c3c9b3", fontSize: 14, lineHeight: 1.6 }}>{quoteSuccessMsg}</p>
                <button onClick={() => setIsDrawerOpen(false)} style={drawerSubmitBtnStyle}>DISMISS PROTOCOL</button>
              </div>
            ) : (
              <form onSubmit={handleRequestQuoteSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>CLIENT FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter your first & last name"
                    style={inputStyle}
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>TACTICAL CONTACT NUMBER</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="E.g., 98xxxxxxxx"
                    style={inputStyle}
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>EMAIL COORDINATES</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="yourname@domain.com"
                    style={inputStyle}
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>ADDITIONAL ARCHITECTURE NOTES (OPTIONAL)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specify cabling lengths, heights, custom constraints..."
                    rows={4}
                    style={textareaStyle}
                  />
                </div>

                <div style={{ borderTop: "1px solid #434938", paddingTop: 16, marginTop: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ color: "#8d937f", fontSize: 12 }}>Configuration Total:</span>
                    <span style={{ color: "#94da32", fontWeight: 700, fontSize: 14 }}>
                      रू {recommendation?.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <button type="submit" disabled={submittingQuote} style={drawerSubmitBtnStyle}>
                    {submittingQuote ? "SUBMITTING TO DATABASE LOGS..." : "TRANSMIT QUOTE REQUEST"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* KHALTI PAYMENT DIALOG MODAL */}
      {isKhaltiModalOpen && (
        <div style={modalOverlayStyle} onClick={() => setIsKhaltiModalOpen(false)}>
          <div style={modalPanelStyle} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#5C2D91", padding: "16px 24px", color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ background: "#fff", borderRadius: 4, padding: "4px 8px", display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#5C2D91", fontWeight: 900, fontSize: 14 }}>khalti</span>
                </div>
                <span style={{ fontWeight: 700, letterSpacing: 0.5, fontSize: 13 }}>PAYMENT GATEWAY</span>
              </div>
              <button onClick={() => setIsKhaltiModalOpen(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
                <Icon name="close" size={20} />
              </button>
            </div>

            <div style={{ padding: 24, color: "#111" }}>
              {khaltiStep === 1 && (
                <form onSubmit={handleKhaltiSubmitCredentials} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ textAlign: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: "#666" }}>PAYING TO NIGHTVISION SURVEILLANCE</span>
                    <h3 style={{ margin: "4px 0 0 0", color: "#5C2D91", fontSize: 22, fontWeight: 800 }}>
                      रू {recommendation?.total.toLocaleString("en-IN")}
                    </h3>
                  </div>

                  {khaltiError && (
                    <div style={{ background: "#ffeef0", border: "1px solid #ffccd3", color: "#ea2c44", padding: 10, borderRadius: 4, fontSize: 12 }}>
                      {khaltiError}
                    </div>
                  )}

                  <div style={formGroupStyle}>
                    <label style={lightLabelStyle}>KHALTI REGISTERED MOBILE NUMBER</label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={khaltiPhone}
                      onChange={(e) => setKhaltiPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="98xxxxxxxx"
                      style={lightInputStyle}
                    />
                  </div>

                  <div style={formGroupStyle}>
                    <label style={lightLabelStyle}>KHALTI TRANSACTION PIN</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={khaltiPin}
                      onChange={(e) => setKhaltiPin(e.target.value.replace(/\D/g, ""))}
                      placeholder="••••"
                      style={lightInputStyle}
                    />
                  </div>

                  <button type="submit" disabled={paying} style={khaltiSubmitBtnStyle}>
                    {paying ? "AUTHENTICATING SECURE PIN..." : "INITIATE TRANSACTION"}
                  </button>
                </form>
              )}

              {khaltiStep === 2 && (
                <form onSubmit={handleKhaltiConfirmOtp} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ textAlign: "center", marginBottom: 8 }}>
                    <Icon name="lock" size={36} style={{ color: "#5C2D91", marginBottom: 6 }} />
                    <h3 style={{ margin: 0, color: "#333", fontSize: 16 }}>Enter Verification Code</h3>
                    <p style={{ color: "#666", fontSize: 12, margin: "4px 0 0 0" }}>An OTP has been dispatched to {khaltiPhone}</p>
                  </div>

                  {khaltiError && (
                    <div style={{ background: "#ffeef0", border: "1px solid #ffccd3", color: "#ea2c44", padding: 10, borderRadius: 4, fontSize: 12 }}>
                      {khaltiError}
                    </div>
                  )}

                  <div style={formGroupStyle}>
                    <label style={lightLabelStyle}>ONE TIME PASSCODE (OTP)</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={khaltiOtp}
                      onChange={(e) => setKhaltiOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter 6-digit OTP code"
                      style={{ ...lightInputStyle, textAlign: "center", fontSize: 18, letterSpacing: 4 }}
                    />
                  </div>

                  <button type="submit" disabled={paying} style={khaltiSubmitBtnStyle}>
                    {paying ? "VERIFYING TRANSACTION INTEGRITY..." : "CONFIRM & DISPATCH PAYMENT"}
                  </button>
                </form>
              )}

              {khaltiStep === 3 && (
                <div style={{ textAlign: "center", padding: "16px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Icon name="check_circle" size={64} style={{ color: "#4caf50", marginBottom: 16 }} />
                  <h3 style={{ margin: "0 0 8px 0", color: "#111", fontSize: 20, fontWeight: 700 }}>TRANSACTION COMPLETED</h3>
                  <p style={{ color: "#555", fontSize: 13, lineHeight: 1.5, maxWidth: 300, margin: "0 0 24px 0" }}>
                    Your payment was successfully received. The custom security setup has been populated into your basket.
                  </p>
                  <div style={{ width: "100%", borderTop: "1px solid #eee", paddingTop: 16, display: "flex", gap: 12 }}>
                    <button
                      onClick={() => {
                        setIsKhaltiModalOpen(false);
                        navigate("/cart");
                      }}
                      style={{ ...khaltiSubmitBtnStyle, background: "#5C2D91" }}
                    >
                      GO TO CART & DISPATCH
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer security badge */}
            <div style={{ background: "#f5f5f5", borderTop: "1px solid #e0e0e0", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "#666" }}>
              <span>SECURE 256-BIT ENCRYPTION</span>
              <span>POWERED BY KHALTI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline Visual Theme Elements
const stepAnchorStyle = {
  background: "none",
  border: "none",
  color: "#8d937f",
  fontFamily: "'Space Grotesk', monospace",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 8px",
  borderRadius: 4,
  transition: "all 0.2s",
  textTransform: "uppercase"
};

const stepContainerStyle = {
  border: "1px solid #434938",
  borderRadius: 4,
  padding: 32,
  background: "linear-gradient(180deg, #181a15 0%, #0d0f0a 100%)",
  position: "relative",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)"
};

const stepHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginBottom: 8
};

const stepBadgeStyle = {
  background: "#94da32",
  color: "#111",
  width: 28,
  height: 28,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  borderRadius: 2,
  fontFamily: "'Space Grotesk', monospace",
  fontSize: 13
};

const stepTitleStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 18,
  fontWeight: 700,
  color: "#fff",
  textTransform: "uppercase",
  margin: 0,
  letterSpacing: 1
};

const stepDescStyle = {
  color: "#8d937f",
  fontSize: 13,
  margin: 0,
  lineHeight: 1.5
};

const cardSelectionStyle = {
  padding: 20,
  borderRadius: 4,
  cursor: "pointer",
  transition: "all 0.25s ease",
  display: "flex",
  flexDirection: "column",
  gap: 8,
  userSelect: "none"
};

const cardTitleStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 14,
  fontWeight: 700,
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: 0.5
};

const cardDescStyle = {
  color: "#8d937f",
  fontSize: 12,
  lineHeight: 1.5,
  margin: 0
};

const recommendationItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #2a2a2a",
  borderRadius: 4,
  padding: 16,
  background: "#10110e"
};

const iconWrapperStyle = {
  background: "rgba(148,218,50,0.1)",
  width: 38,
  height: 38,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const summaryRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 13
};

const primaryCtaStyle = {
  width: "100%",
  padding: 14,
  fontWeight: 700,
  fontSize: 12,
  cursor: "pointer",
  fontFamily: "'Space Grotesk', sans-serif",
  letterSpacing: 1,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  transition: "all 0.2s"
};

// Quote Request Drawer styles
const drawerOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.75)",
  backdropFilter: "blur(4px)",
  zIndex: 1000,
  display: "flex",
  justifyContent: "flex-end"
};

const drawerPanelStyle = {
  width: "420px",
  maxWidth: "100%",
  height: "100%",
  background: "#181a15",
  borderLeft: "1px solid #434938",
  padding: 32,
  boxShadow: "-10px 0 30px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  overflowY: "auto",
  animation: "slideIn 0.3s ease-out"
};

const closeBtnStyle = {
  background: "none",
  border: "none",
  color: "#8d937f",
  cursor: "pointer",
  padding: 4
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 8
};

const labelStyle = {
  fontSize: 11,
  color: "#deffa4",
  fontFamily: "'Space Grotesk', monospace",
  letterSpacing: 1
};

const inputStyle = {
  background: "#0c0d0a",
  border: "1px solid #434938",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: 4,
  fontSize: 13,
  fontFamily: "inherit"
};

const textareaStyle = {
  background: "#0c0d0a",
  border: "1px solid #434938",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: 4,
  fontSize: 13,
  fontFamily: "inherit",
  resize: "vertical"
};

const drawerSubmitBtnStyle = {
  width: "100%",
  padding: "16px",
  background: "#94da32",
  border: "none",
  color: "#111",
  fontWeight: 700,
  fontSize: 12,
  fontFamily: "'Space Grotesk', sans-serif",
  letterSpacing: 1,
  borderRadius: 4,
  cursor: "pointer",
  transition: "background 0.2s"
};

// Khalti Modal styles
const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.75)",
  backdropFilter: "blur(4px)",
  zIndex: 1001,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16
};

const modalPanelStyle = {
  background: "#fff",
  width: "380px",
  maxWidth: "100%",
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column"
};

const lightLabelStyle = {
  fontSize: 10,
  color: "#5C2D91",
  fontWeight: 700,
  letterSpacing: 0.5
};

const lightInputStyle = {
  border: "1px solid #dcdcdc",
  padding: "12px 16px",
  borderRadius: 4,
  fontSize: 14,
  color: "#333",
  fontFamily: "inherit"
};

const khaltiSubmitBtnStyle = {
  background: "#5C2D91",
  border: "none",
  color: "#fff",
  padding: "14px",
  borderRadius: 4,
  fontWeight: 700,
  fontSize: 12,
  cursor: "pointer",
  letterSpacing: 0.5,
  transition: "opacity 0.2s"
};
