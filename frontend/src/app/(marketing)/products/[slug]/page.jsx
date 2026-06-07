import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../../../Context/CartContext";
import Icon from "../../../../utils/Icon";

const C = {
  bg: "#11140c",
  bgContainer: "#1e2117",
  bgHigh: "#282b21",
  bgLow: "#1a1d14",
  bgLowest: "#0c0f07",
  surface: "#11140c",
  surfaceVariant: "#33362c",
  primary: "#deffa4",
  secondary: "#94da32",
  secondaryContainer: "#75b800",
  outline: "#8d937f",
  outlineVariant: "#434938",
  onSurface: "#e2e4d5",
  onSurfaceVariant: "#c3c9b3",
  onSecondary: "#203700",
  onPrimary: "#233600",
};

const PRODUCTS = [
  {
    id: "ratri-g11",
    name: "Ratri G11",
    code: "NV-CAM-001",
    category: "bullet",
    tags: ["bullet", "outdoor"],
    price: 8499,
    badge: "BESTSELLER",
    status: "ACTIVE DEPLOYMENT",
    description: "Advanced tactical surveillance unit designed for critical monitoring environments. Features Quad HD resolution and two-way audio communication in a brutalist, secure housing.",
    longDesc: "The Ratri G11 is the flagship bullet camera from NIGHTVISION™. Engineered for perimeter security in commercial and industrial environments, it delivers uncompromising image quality with built-in AI analytics. Weatherproof IP67 housing ensures operation in all conditions.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJXIhdE3QlNTyBvvVNsX7AvQ1FgR0bEuz9t4y2rZUZzPYH31IBG8mDdC_YSs4ZVv-SvZh4BX2N8rerYwJP9KWeiTbNl1Mi5f6YeutWhIjRBYGcd5up8aI2HRoy3_SE8gTfOBC51xZdw2cZQ75_07DCVMTgWV3hOGVfuG9iCgYLIF1hsHOFxRYhlT-DhRsnC3XP7q61WV9mDrFD4VpSEdGMCvBbvmX88LcQrCIU0n26Uvpn8Q6v8UlrMFINjCp9TI4KQSz_GrfS__w",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJXIhdE3QlNTyBvvVNsX7AvQ1FgR0bEuz9t4y2rZUZzPYH31IBG8mDdC_YSs4ZVv-SvZh4BX2N8rerYwJP9KWeiTbNl1Mi5f6YeutWhIjRBYGcd5up8aI2HRoy3_SE8gTfOBC51xZdw2cZQ75_07DCVMTgWV3hOGVfuG9iCgYLIF1hsHOFxRYhlT-DhRsnC3XP7q61WV9mDrFD4VpSEdGMCvBbvmX88LcQrCIU0n26Uvpn8Q6v8UlrMFINjCp9TI4KQSz_GrfS__w",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzJg1D0mnGkYwZ8Fajghv4evONVAKLuwriOPflWIo1zkQoU4AFCDPj7lS4O_WQQONg9naYxzfWmkOrYx178ceJD72fG7SJWe6hIPt068mI2Ku3wztp9tbh5Bg8e3MDrday1sCj-mvcGojpvR7jfe1Y3CdpiQo6WYeLrVI4dzPm2YQOEKsubDGCL2__a5bIoP5YtGE8aFjxaNb89gIK59qcToZ7Rp-RGg2FR3WHBuqDIRFFOJwGiK_B9Vjc13C-ehWcvJIY_mihhqk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACFYmNpNc7IwWdFUekpo88S1faiuGdDjnQa1XcRuvR553detzam-Sqv6XC-mdj4Q58bqe2dv2yscd70xySyu7ND88f-Z9xGaokv3cxbjqM-He98fHHkIoncOqyD5YH3k28vrH4ms_XrV9xoiU39Op3qzW2jV3c4SbM66ZCcQe_bqwDfzernIbv1jvLeYqUlpZntMG8fljKP0FJkASftEEhRCI3v-ASHn-hpAnKIKasMLd4GnbJd-xLuG5tUMb9_38x-fhG-TNzdzo",
    ],
    colors: [{ name: "Matte Black", hex: "#1a1a1a" }, { name: "Military Green", hex: "#3a4a2f" }, { name: "Desert Tan", hex: "#c4a882" }],
    specs: [
      { icon: "hd", label: "QUAD HD" },
      { icon: "record_voice_over", label: "VIEW & TALK" },
      { icon: "speed", label: "HIGH PERF" },
      { icon: "motion_sensor_active", label: "MOTION ALERT" },
    ],
    specTable: [
      ["Resolution", "2560×1440 (4MP QHD)"],
      ["Frame Rate", "30fps / 60fps"],
      ["Night Vision", "50m IR Range"],
      ["IP Rating", "IP67 Weatherproof"],
      ["Storage", "128GB SD + Cloud"],
      ["Audio", "Two-Way Mic/Speaker"],
      ["Connectivity", "Wi-Fi 6 / PoE+"],
      ["Power", "12V DC / PoE"],
      ["Dimensions", "180 × 75 × 75mm"],
      ["Weight", "620g"],
    ]
  },
  {
    id: "apex-x4",
    name: "Apex X4",
    code: "NV-CAM-002",
    category: "dome",
    tags: ["dome", "indoor"],
    price: 6299,
    badge: "NEW",
    status: "IN STOCK",
    description: "Compact dome camera with 360° wide-angle coverage. Ideal for indoor perimeter surveillance with AI-driven anomaly detection.",
    longDesc: "The Apex X4 reimagines indoor surveillance with a low-profile dome form factor and an ultra-wide 180° lens. Its AI co-processor runs onboard anomaly detection, reducing false alarms by 94% compared to legacy motion-trigger systems.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuACFYmNpNc7IwWdFUekpo88S1faiuGdDjnQa1XcRuvR553detzam-Sqv6XC-mdj4Q58bqe2dv2yscd70xySyu7ND88f-Z9xGaokv3cxbjqM-He98fHHkIoncOqyD5YH3k28vrH4ms_XrV9xoiU39Op3qzW2jV3c4SbM66ZCcQe_bqwDfzernIbv1jvLeYqUlpZntMG8fljKP0FJkASftEEhRCI3v-ASHn-hpAnKIKasMLd4GnbJd-xLuG5tUMb9_38x-fhG-TNzdzo",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACFYmNpNc7IwWdFUekpo88S1faiuGdDjnQa1XcRuvR553detzam-Sqv6XC-mdj4Q58bqe2dv2yscd70xySyu7ND88f-Z9xGaokv3cxbjqM-He98fHHkIoncOqyD5YH3k28vrH4ms_XrV9xoiU39Op3qzW2jV3c4SbM66ZCcQe_bqwDfzernIbv1jvLeYqUlpZntMG8fljKP0FJkASftEEhRCI3v-ASHn-hpAnKIKasMLd4GnbJd-xLuG5tUMb9_38x-fhG-TNzdzo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJXIhdE3QlNTyBvvVNsX7AvQ1FgR0bEuz9t4y2rZUZzPYH31IBG8mDdC_YSs4ZVv-SvZh4BX2N8rerYwJP9KWeiTbNl1Mi5f6YeutWhIjRBYGcd5up8aI2HRoy3_SE8gTfOBC51xZdw2cZQ75_07DCVMTgWV3hOGVfuG9iCgYLIF1hsHOFxRYhlT-DhRsnC3XP7q61WV9mDrFD4VpSEdGMCvBbvmX88LcQrCIU0n26Uvpn8Q6v8UlrMFINjCp9TI4KQSz_GrfS__w",
    ],
    colors: [{ name: "Matte White", hex: "#e8e8e8" }, { name: "Matte Black", hex: "#1a1a1a" }],
    specs: [
      { icon: "360", label: "WIDE ANGLE" },
      { icon: "smart_toy", label: "AI DETECT" },
      { icon: "wifi", label: "WI-FI 6" },
      { icon: "cloud_done", label: "CLOUD SYNC" },
    ],
    specTable: [
      ["Resolution", "3840×2160 (8MP 4K)"],
      ["View Angle", "180° Ultra Wide"],
      ["Frame Rate", "30fps"],
      ["Night Vision", "30m IR Range"],
      ["IP Rating", "IP44 Indoor"],
      ["Storage", "256GB SD + Cloud"],
      ["Connectivity", "Wi-Fi 6 / Ethernet"],
      ["Power", "USB-C PD / PoE"],
      ["Dimensions", "Ø 120 × 55mm"],
      ["Weight", "380g"],
    ]
  },
  {
    id: "vanta-d2",
    name: "Vanta D2",
    code: "NV-CAM-003",
    category: "ptz",
    tags: ["ptz", "outdoor"],
    price: 14999,
    badge: "PRO",
    status: "LIMITED STOCK",
    description: "Pan-Tilt-Zoom powerhouse with 30× optical zoom and auto-tracking. For large-area coverage requiring surgical precision.",
    longDesc: "The Vanta D2 is NIGHTVISION™'s most capable PTZ unit. Its 30× optical zoom combined with AI auto-tracking allows a single camera to cover areas previously requiring 8–12 fixed cameras. Ruggedized for arctic to desert conditions.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzJg1D0mnGkYwZ8Fajghv4evONVAKLuwriOPflWIo1zkQoU4AFCDPj7lS4O_WQQONg9naYxzfWmkOrYx178ceJD72fG7SJWe6hIPt068mI2Ku3wztp9tbh5Bg8e3MDrday1sCj-mvcGojpvR7jfe1Y3CdpiQo6WYeLrVI4dzPm2YQOEKsubDGCL2__a5bIoP5YtGE8aFjxaNb89gIK59qcToZ7Rp-RGg2FR3WHBuqDIRFFOJwGiK_B9Vjc13C-ehWcvJIY_mihhqk",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzJg1D0mnGkYwZ8Fajghv4evONVAKLuwriOPflWIo1zkQoU4AFCDPj7lS4O_WQQONg9naYxzfWmkOrYx178ceJD72fG7SJWe6hIPt068mI2Ku3wztp9tbh5Bg8e3MDrday1sCj-mvcGojpvR7jfe1Y3CdpiQo6WYeLrVI4dzPm2YQOEKsubDGCL2__a5bIoP5YtGE8aFjxaNb89gIK59qcToZ7Rp-RGg2FR3WHBuqDIRFFOJwGiK_B9Vjc13C-ehWcvJIY_mihhqk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACFYmNpNc7IwWdFUekpo88S1faiuGdDjnQa1XcRuvR553detzam-Sqv6XC-mdj4Q58bqe2dv2yscd70xySyu7ND88f-Z9xGaokv3cxbjqM-He98fHHkIoncOqyD5YH3k28vrH4ms_XrV9xoiU39Op3qzW2jV3c4SbM66ZCcQe_bqwDfzernIbv1jvLeYqUlpZntMG8fljKP0FJkASftEEhRCI3v-ASHn-hpAnKIKasMLd4GnbJd-xLuG5tUMb9_38x-fhG-TNzdzo",
    ],
    colors: [{ name: "Matte Black", hex: "#1a1a1a" }, { name: "Arctic White", hex: "#f0f0f0" }],
    specs: [
      { icon: "zoom_in", label: "30× ZOOM" },
      { icon: "track_changes", label: "AUTO TRACK" },
      { icon: "visibility", label: "200M RANGE" },
      { icon: "thermostat", label: "ALL WEATHER" },
    ],
    specTable: [
      ["Resolution", "4K UHD 8MP"],
      ["Optical Zoom", "30× / Digital 16×"],
      ["Pan Range", "360° Continuous"],
      ["Tilt Range", "-20° to +90°"],
      ["Night Vision", "200m IR Smart"],
      ["IP Rating", "IP66 + IK10"],
      ["Connectivity", "Dual Ethernet"],
      ["Power", "24V AC / Hi-PoE"],
      ["Dimensions", "Ø 200 × 320mm"],
      ["Weight", "2.8kg"],
    ]
  },
  {
    id: "ghost-m1",
    name: "Ghost M1",
    code: "NV-CAM-004",
    category: "indoor",
    tags: ["indoor", "dome"],
    price: 3299,
    badge: "DISCREET",
    status: "IN STOCK",
    description: "Ultra-discreet mini dome for covert indoor monitoring. Invisible design meets full 1080p performance.",
    longDesc: "The Ghost M1 is engineered for environments where camera visibility must be minimized. Its flush-mount design and matte finish allow near-invisible installation in ceilings and walls, while its full HD sensor delivers crisp footage day and night.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuACFYmNpNc7IwWdFUekpo88S1faiuGdDjnQa1XcRuvR553detzam-Sqv6XC-mdj4Q58bqe2dv2yscd70xySyu7ND88f-Z9xGaokv3cxbjqM-He98fHHkIoncOqyD5YH3k28vrH4ms_XrV9xoiU39Op3qzW2jV3c4SbM66ZCcQe_bqwDfzernIbv1jvLeYqUlpZntMG8fljKP0FJkASftEEhRCI3v-ASHn-hpAnKIKasMLd4GnbJd-xLuG5tUMb9_38x-skTuwyvbK7kLrYtRHDbm4bdy8",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfmkbSFVJ8AlzhQZHjMM4pIiv2OYIDhHkMZsWnmMTKqm9GwRMBdIZX2nZtMt94Rn9WI1BacR8uuqTkmZl_vWiGITSLb49PmCUbbZ5M81mz2w_VyCO_KCjT7d-p9hzUHt4rvyKm4OXLTA1XrWaJUvzewFlMad6e3pebPKLMVM7HknUwJL2jt6HUAMzjyO_-JJH3L6zzV8GnKhvA1im_7ZfPFJuRx-skTuwyvbK7kLrYtRHDbm4bdy8"
    ],
    colors: [{ name: "Matte White", hex: "#e8e8e8" }, { name: "Smoke Grey", hex: "#6b7280" }],
    specs: [
      { icon: "visibility_off", label: "COVERT" },
      { icon: "hd", label: "FULL HD" },
      { icon: "wifi", label: "WIRELESS" },
      { icon: "battery_full", label: "LONG LIFE" },
    ],
    specTable: [
      ["Resolution", "1920×1080 (2MP)"],
      ["View Angle", "115° Wide"],
      ["Frame Rate", "30fps"],
      ["Night Vision", "10m Infrared"],
      ["IP Rating", "IP20 Indoor"],
      ["Storage", "64GB SD + Cloud"],
      ["Connectivity", "Wi-Fi 5"],
      ["Power", "5V USB / PoE"],
      ["Dimensions", "Ø 68 × 32mm"],
      ["Weight", "95g"],
    ]
  },
  {
    id: "bastion-r3",
    name: "Bastion R3",
    code: "NV-CAM-005",
    category: "outdoor",
    tags: ["outdoor", "bullet"],
    price: 11299,
    badge: "RUGGED",
    status: "IN STOCK",
    description: "Industrial-grade outdoor unit rated for extreme environments. IK10 vandal-proof casing with military-spec connectors.",
    longDesc: "The Bastion R3 is NIGHTVISION™'s answer to harsh industrial environments. Its IK10-rated casing withstands direct impact, while the military-spec connectors ensure IP68 water tightness.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzJg1D0mnGkYwZ8Fajghv4evONVAKLuwriOPflWIo1zkQoU4AFCDPj7lS4O_WQQONg9naYxzfWmkOrYx178ceJD72fG7SJWe6hIPt068mI2Ku3wztp9tbh5Bg8e3MDrday1sCj-mvcGojpvR7jfe1Y3CdpiQo6WYeLrVI4dzPm2YQOEKsubDGCL2__a5bIoP5YtGE8aFjxaNb89gIK59qcToZ7Rp-RGg2FR3WHBuqDIRFFOJwGiK_B9Vjc13C-ehWcvJIY_mihhqk",
    thumbs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzJg1D0mnGkYwZ8Fajghv4evONVAKLuwriOPflWIo1zkQoU4AFCDPj7lS4O_WQQONg9naYxzfWmkOrYx178ceJD72fG7SJWe6hIPt068mI2Ku3wztp9tbh5Bg8e3MDrday1sCj-mvcGojpvR7jfe1Y3CdpiQo6WYeLrVI4dzPm2YQOEKsubDGCL2__a5bIoP5YtGE8aFjxaNb89gIK59qcToZ7Rp-RGg2FR3WHBuqDIRFFOJwGiK_B9Vjc13C-ehWcvJIY_mihhqk"
    ],
    colors: [{ name: "Matte Black", hex: "#1a1a1a" }, { name: "Desert Tan", hex: "#c4a882" }],
    specs: [
      { icon: "shield", label: "RUGGED" },
      { icon: "hd", label: "FULL HD" },
      { icon: "thermostat", label: "WEATHER" },
      { icon: "cloud_done", label: "CLOUD" },
    ],
    specTable: [
      ["Resolution", "2560×1440 (4MP)"],
      ["IP Rating", "IP68 Waterproof"],
      ["Casing", "IK10 Vandal-Proof"],
      ["Night Vision", "40m IR Range"],
      ["Storage", "128GB SD + Cloud"],
      ["Power", "PoE / 12V DC"],
      ["Dimensions", "200 × 90 × 90mm"],
      ["Weight", "920g"],
    ]
  }
];

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useContext(CartContext);

  const product = PRODUCTS.find(p => p.id === slug) || PRODUCTS[0];

  const [activeImg, setActiveImg] = useState(product.img);
  const [activeColor, setActiveColor] = useState(product.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    if (product) {
      setActiveImg(product.img);
      setActiveColor(product.colors[0]?.name || "");
      setQuantity(1);
    }
  }, [product]);

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: `${product.name} (${activeColor})`,
      img: activeImg,
      price: product.price,
    };
    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct);
    }
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.onSurface, fontFamily: "'Be Vietnam Pro', sans-serif", paddingBottom: "60px" }}>
      {/* Scanline pattern */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)"
      }} />

      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Space Grotesk', monospace", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: C.outline, marginBottom: "32px" }}>
          <Link to="/" style={{ color: C.outline, textDecoration: "none" }}>Home</Link>
          <Icon name="chevron_right" size={14} style={{ color: C.outline }} />
          <Link to="/product" style={{ color: C.outline, textDecoration: "none" }}>Products</Link>
          <Icon name="chevron_right" size={14} style={{ color: C.outline }} />
          <span style={{ color: C.primary }}>{product.name}</span>
        </div>

        {/* Product presentation */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
          
          {/* Gallery Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ width: "100%", aspectRatio: "1.2/1", border: `1px solid ${C.outlineVariant}`, background: C.bgLowest, overflow: "hidden", position: "relative" }}>
              <img src={activeImg} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {product.badge && (
                <span style={{ position: "absolute", top: "16px", left: "16px", background: C.secondary, color: "#111", fontFamily: "'Space Grotesk', monospace", fontSize: "10px", fontWeight: 700, padding: "4px 10px", letterSpacing: "1px" }}>
                  {product.badge}
                </span>
              )}
            </div>
            {/* Gallery thumbs */}
            {product.thumbs.length > 1 && (
              <div style={{ display: "flex", gap: "12px" }}>
                {product.thumbs.map((t, idx) => (
                  <button key={idx} onClick={() => setActiveImg(t)} style={{ width: "80px", height: "80px", border: `1px solid ${activeImg === t ? C.primary : C.outlineVariant}`, background: C.bgLowest, cursor: "pointer", overflow: "hidden", padding: 0 }} className="thumb">
                    <img src={t} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: activeImg === t ? "none" : "grayscale(80%)" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: "10px", letterSpacing: "2px", color: C.secondary, textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                SYSTEM_CODE: {product.code}
              </span>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "40px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#fff", lineHeight: 1.1, marginBottom: "16px" }}>
                {product.name}
              </h1>
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: C.onSurfaceVariant }}>
                {product.description}
              </p>
            </div>

            {/* Price Line */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", padding: "16px 0", borderTop: `1px solid ${C.outlineVariant}`, borderBottom: `1px solid ${C.outlineVariant}` }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "32px", fontWeight: 700, color: C.primary }}>
                रू {product.price.toLocaleString("en-IN")}
              </span>
              <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: "11px", color: C.secondary }}>
                [ STATUS: {product.status} ]
              </span>
            </div>

            {/* Color swatches */}
            <div>
              <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: C.outline, display: "block", marginBottom: "12px" }}>
                SELECT SHELL COLOR: <span style={{ color: "#fff" }}>{activeColor}</span>
              </span>
              <div style={{ display: "flex", gap: "12px" }}>
                {product.colors.map(col => (
                  <button key={col.name} onClick={() => setActiveColor(col.name)} style={{ width: "36px", height: "36px", background: col.hex, border: `2px solid ${activeColor === col.name ? C.primary : C.outlineVariant}`, cursor: "pointer", transition: "all 0.15s" }} title={col.name} />
                ))}
              </div>
            </div>

            {/* Qty and Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ display: "flex", border: `1px solid ${C.outlineVariant}`, background: C.bgLowest }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", color: "#fff", width: "40px", height: "40px", cursor: "pointer", fontSize: "18px" }}>-</button>
                <div style={{ width: "48px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 700 }}>
                  {quantity}
                </div>
                <button onClick={() => setQuantity(q => q + 1)} style={{ background: "none", border: "none", color: "#fff", width: "40px", height: "40px", cursor: "pointer", fontSize: "18px" }}>+</button>
              </div>

              <button onClick={handleAddToCart} style={{ background: C.primary, color: "#111", fontFamily: "'Space Grotesk', monospace", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", padding: "14px 28px", border: "none", cursor: "pointer", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <Icon name="radar" size={18} />
                DEPLOY SYSTEM
              </button>
            </div>

          </div>
        </div>

        {/* Tab section */}
        <div style={{ marginTop: "64px", borderTop: `1px solid ${C.outlineVariant}` }}>
          <div style={{ display: "flex", gap: "8px", borderBottom: `1px solid ${C.outlineVariant}`, background: C.bgLowest }}>
            {[
              { id: "specs", label: "TECHNICAL_SPECS" },
              { id: "intel", label: "SYSTEM_DETAILS" },
              { id: "logs", label: "OPERATIONAL_LOGS" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "16px 24px", background: "none", border: "none", borderBottom: `2px solid ${activeTab === tab.id ? C.primary : "transparent"}`, color: activeTab === tab.id ? C.primary : C.outline, fontFamily: "'Space Grotesk', monospace", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", transition: "all 0.15s" }}>
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: "32px 0" }}>
            {activeTab === "specs" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                {/* Specs grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {product.specs.map((s, i) => (
                    <div key={i} style={{ border: `1px solid ${C.outlineVariant}`, padding: "20px", background: C.bgLowest, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
                      <Icon name={s.icon} size={28} style={{ color: C.primary }} />
                      <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: "10px", letterSpacing: "1.5px", color: C.outline }}>{s.label}</span>
                    </div>
                  ))}
                </div>
                {/* Specs Table */}
                <div style={{ border: `1px solid ${C.outlineVariant}`, background: C.bgLowest }}>
                  {product.specTable.map(([k, v], idx) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: idx < product.specTable.length - 1 ? `1px solid ${C.outlineVariant}` : "none", fontSize: "14px" }}>
                      <span style={{ color: C.onSurfaceVariant }}>{k}</span>
                      <span style={{ color: "#fff", fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "intel" && (
              <div style={{ maxWidth: "800px", fontSize: "15px", lineHeight: "1.8", color: C.onSurfaceVariant, display: "flex", flexDirection: "column", gap: "16px" }}>
                <p>{product.longDesc}</p>
                <p>NIGHTVISION™ products are designed for durability, ease of deployment, and high integration capability with custom tactical command networks. Supported under global SLA agreements.</p>
              </div>
            )}

            {activeTab === "logs" && (
              <div style={{ background: C.bgLowest, border: `1px solid ${C.outlineVariant}`, padding: "24px", fontFamily: "'Space Mono', monospace", fontSize: "12px", color: C.secondary, lineHeight: 1.8 }}>
                <div>[SYS_INIT] CONNECTING TO DEVICE {product.code}...</div>
                <div>[SYS_HANDSHAKE] CRYPTO KEY VALIDATED [RSA-4096]</div>
                <div>[UPLINK] ACTIVE — BITRATE: 14.2 Mbps</div>
                <div>[DIAGNOSTICS] ALL OPTICAL ELEMENTS NOMINAL</div>
                <div>[LOGS] 00:00:01 — SYS:BOOT_SUCCESS</div>
                <div>[LOGS] 00:00:15 — AI:ARMED_PERIMETER_DETECTION</div>
                <div className="blink" style={{ color: C.primary }}>■ UPLINK SECURED — LIVE STREAMS ONWARD — </div>
              </div>
            )}
          </div>
        </div>

        {/* Related units */}
        <div style={{ marginTop: "80px" }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "32px", color: "#fff" }}>
            RELATED_SYSTEMS_PROT
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ border: `1px solid ${C.outlineVariant}`, background: C.bgLowest, padding: "16px", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = C.primary} onMouseLeave={e => e.currentTarget.style.borderColor = C.outlineVariant}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", aspectRatio: "1.5/1", objectFit: "cover", marginBottom: "16px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: "#fff" }}>{p.name}</span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", color: C.secondary, fontWeight: 700 }}>रू {p.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}