import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #000;
    color: #e5e2e1;
    font-family: 'Inter', sans-serif;
  }

  .nv-root {
    background: #000;
    color: #e5e2e1;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
  }

  /* Scanline */
  .scanline {
    background: linear-gradient(to bottom, transparent 50%, rgba(181,231,93,0.05) 50%);
    background-size: 100% 4px;
  }

  /* Crosshair corners */
  .crosshair { position: relative; }
  .crosshair::before, .crosshair::after {
    content: '+';
    position: absolute;
    color: #B5E75D;
    font-size: 12px;
    opacity: 0.6;
    z-index: 2;
    pointer-events: none;
  }
  .ch-tl::before { top: -8px; left: -6px; }
  .ch-tr::after  { top: -8px; right: -6px; }

  .crosshair-b { position: relative; }
  .crosshair-b::before, .crosshair-b::after {
    content: '+';
    position: absolute;
    color: #B5E75D;
    font-size: 12px;
    opacity: 0.6;
    z-index: 2;
    pointer-events: none;
  }
  .ch-bl::before { bottom: -8px; left: -6px; }
  .ch-br::after  { bottom: -8px; right: -6px; }

  /* Glow border on hover */
  .glow-hover { transition: box-shadow 0.2s; }
  .glow-hover:hover { box-shadow: 0 0 15px rgba(181,231,93,0.3); }

  /* Pulse */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .animate-pulse { animation: pulse 1.5s infinite; }

  /* Header */
  .nv-header {
    position: sticky; top: 0; z-index: 50;
    display: flex; justify-content: space-between; align-items: center;
    width: 100%; padding: 16px 24px;
    max-width: 1280px; margin: 0 auto;
    border-bottom: 1px solid #434938;
    background: rgba(19,19,19,0.95);
    backdrop-filter: blur(4px);
  }
  .nv-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 40px; font-weight: 700;
    letter-spacing: -2px; color: #94da32;
  }
  .nv-nav { display: flex; gap: 24px; align-items: center; }
  .nv-nav a {
    font-size: 12px; font-weight: 600; letter-spacing: 1px;
    color: #8d937f; text-decoration: none; text-transform: uppercase;
    transition: color 0.2s;
  }
  .nv-nav a:hover { color: #94da32; }
  .nv-hotline {
    font-size: 12px; font-weight: 600; letter-spacing: 1px;
    color: #94da32; padding: 4px 12px;
    border: 1px solid rgba(148,218,50,0.3);
  }
  .nv-icon-btn {
    padding: 8px; background: none; border: none; cursor: pointer;
    transition: background 0.15s;
  }
  .nv-icon-btn:hover { background: #2a2a2a; }
  .mat-icon {
    font-family: 'Material Symbols Outlined';
    font-size: 24px; color: #94da32;
    font-variation-settings: 'FILL' 1;
  }

  /* Main */
  .nv-main {
    max-width: 1280px; margin: 0 auto;
    padding: 48px 24px; min-height: 100vh;
  }

  /* Cart Header Section */
  .nv-cart-header {
    position: relative; margin-bottom: 80px;
    padding: 24px; padding-left: 24px;
    border-left: 4px solid #94da32;
    background: rgba(14,14,14,0.5);
    overflow: hidden;
  }
  .nv-cart-loc {
    position: absolute; top: 0; right: 0; padding: 12px;
    font-size: 12px; font-weight: 600; letter-spacing: 1px;
    color: rgba(148,218,50,0.4); text-transform: uppercase;
  }
  .nv-cart-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 64px; font-weight: 700;
    letter-spacing: -4px; color: #94da32;
    text-transform: uppercase; line-height: 1.1;
  }
  .nv-cart-sub {
    font-size: 12px; font-weight: 600; letter-spacing: 4px;
    color: #8d937f; text-transform: uppercase; margin-top: 4px;
  }

  /* Grid */
  .nv-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    align-items: start;
  }
  @media (min-width: 1024px) {
    .nv-grid { grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; }
    .nv-products { grid-column: span 8; }
    .nv-sidebar { grid-column: span 4; position: sticky; top: 112px; }
    .nv-nav-mobile { display: flex !important; }
    .nv-hotline { display: block !important; }
  }

  /* Product Card */
  .nv-card {
    position: relative;
    background: #1b1b1b;
    border: 1px solid #434938;
    padding: 24px;
    display: flex; flex-direction: column; gap: 24px;
    transition: box-shadow 0.2s;
  }
  .nv-card:hover { box-shadow: 0 0 15px rgba(181,231,93,0.3); }
  @media (min-width: 768px) {
    .nv-card { flex-direction: row; }
  }
  .nv-card-img-wrap {
    width: 100%; aspect-ratio: 1;
    background: #000; border: 1px solid #434938;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    flex-shrink: 0;
  }
  @media (min-width: 768px) { .nv-card-img-wrap { width: 192px; } }
  .nv-card-img-wrap img {
    width: 100%; height: 100%; object-fit: cover;
    opacity: 0.8; transition: opacity 0.2s;
  }
  .nv-card:hover .nv-card-img-wrap img { opacity: 1; }
  .nv-rec-badge {
    position: absolute; top: 8px; left: 8px;
    display: flex; align-items: center; gap: 4px;
    background: rgba(0,0,0,0.8); padding: 4px 8px;
    border: 1px solid #dc2626;
  }
  .nv-rec-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #dc2626;
  }
  .nv-rec-txt {
    font-size: 10px; font-weight: 700;
    color: #dc2626; text-transform: uppercase;
  }
  .nv-card-body { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .nv-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .nv-card-name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px; font-weight: 600; letter-spacing: 1px;
    color: #e5e2e1; text-transform: uppercase;
  }
  .nv-card-sku { font-size: 12px; font-weight: 600; color: #8d937f; }
  .nv-card-price {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px; font-weight: 600;
    color: #94da32; white-space: nowrap;
  }
  .nv-tags { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
  .nv-tag {
    padding: 4px 8px; background: #353535;
    font-size: 10px; font-weight: 700; color: #e5e2e1;
    text-transform: uppercase; border: 1px solid #8d937f;
  }
  .nv-card-footer {
    display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid #434938; padding-top: 24px; margin-top: 24px;
    flex-wrap: wrap; gap: 12px;
  }
  .nv-qty-label { font-size: 12px; font-weight: 600; color: #8d937f; text-transform: uppercase; margin-right: 16px; }
  .nv-qty-wrap { display: flex; align-items: center; }
  .nv-qty-ctrl {
    display: flex; align-items: center;
    background: #000; border: 1px solid #8d937f;
  }
  .nv-qty-btn {
    width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
    background: none; border: none; color: #e5e2e1; font-weight: 700;
    cursor: pointer; font-size: 18px; transition: background 0.15s, color 0.15s;
  }
  .nv-qty-btn:hover { background: #94da32; color: #000; }
  .nv-qty-btn:first-child { border-right: 1px solid #8d937f; }
  .nv-qty-btn:last-child { border-left: 1px solid #8d937f; }
  .nv-qty-val {
    width: 48px; height: 40px; display: flex; align-items: center; justify-content: center;
    font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 600;
    color: #e5e2e1;
  }
  .nv-remove-btn {
    display: flex; align-items: center; gap: 8px;
    background: none; border: none; cursor: pointer;
    font-size: 12px; font-weight: 600; letter-spacing: 4px;
    color: #ffb4ab; text-transform: uppercase;
    transition: color 0.2s;
  }
  .nv-remove-btn:hover { color: #f87171; }
  .nv-remove-btn .mat-icon { font-size: 18px; color: inherit; font-variation-settings: 'FILL' 0; }

  .nv-continue {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 600; letter-spacing: 4px;
    color: #94da32; text-decoration: none; text-transform: uppercase;
    padding-top: 24px;
    transition: text-decoration 0.2s;
  }
  .nv-continue:hover { text-decoration: underline; text-underline-offset: 8px; }
  .nv-continue .mat-icon { font-size: 20px; color: #94da32; font-variation-settings: 'FILL' 0; }

  /* Sidebar */
  .nv-sidebar-box {
    background: #20201f; border: 1px solid #94da32;
    padding: 24px; position: relative;
    display: flex; flex-direction: column; gap: 24px;
  }
  .nv-sidebar-label {
    position: absolute; top: -10px; left: 16px;
    background: #94da32; color: #000;
    padding: 2px 8px; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 4px;
  }
  .nv-summary-rows { display: flex; flex-direction: column; gap: 12px; }
  .nv-summary-row {
    display: flex; justify-content: space-between;
    font-size: 12px; font-weight: 600; letter-spacing: 1px;
    color: #8d937f; text-transform: uppercase;
  }
  .nv-summary-val { color: #e5e2e1; }
  .nv-summary-free { color: #94da32; font-weight: 700; }
  .nv-total-row {
    border-top: 1px solid #434938; padding-top: 24px;
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .nv-total-label {
    font-size: 12px; font-weight: 700; letter-spacing: 4px;
    color: #94da32; text-transform: uppercase;
  }
  .nv-total-val {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 40px; font-weight: 700; color: #94da32;
  }

  /* Promo */
  .nv-promo-label {
    font-size: 12px; font-weight: 600; letter-spacing: 4px;
    color: #8d937f; text-transform: uppercase; display: block; margin-bottom: 4px;
  }
  .nv-promo-row { display: flex; gap: 8px; }
  .nv-promo-input {
    flex: 1; background: #000; border: 1px solid #8d937f;
    color: #e5e2e1; padding: 12px 24px;
    font-size: 12px; font-family: 'Inter', sans-serif;
    outline: none; transition: border-color 0.2s;
  }
  .nv-promo-input::placeholder { color: #434938; }
  .nv-promo-input:focus { border-color: #94da32; }
  .nv-promo-btn {
    background: #2a2a2a; border: 1px solid #8d937f;
    padding: 0 16px; cursor: pointer;
    display: flex; align-items: center;
    transition: background 0.2s, color 0.2s;
  }
  .nv-promo-btn:hover { background: #94da32; }
  .nv-promo-btn:hover .mat-icon { color: #000; }
  .nv-promo-btn .mat-icon { color: #94da32; font-variation-settings: 'FILL' 0; }

  /* CTA */
  .nv-cta {
    width: 100%; background: #b5e75d; color: #466700;
    padding: 24px; border: none; cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase;
    transition: background 0.2s;
  }
  .nv-cta:hover { background: #94da32; }
  .nv-cta:active { transform: scale(0.98); }

  /* Trust */
  .nv-trust-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
    border-top: 1px solid #434938; padding-top: 24px;
  }
  .nv-trust-item {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 8px;
    border: 1px solid rgba(67,73,56,0.3);
  }
  .nv-trust-item .mat-icon { color: #94da32; margin-bottom: 4px; font-variation-settings: 'FILL' 0; }
  .nv-trust-txt { font-size: 9px; font-weight: 700; color: #8d937f; text-transform: uppercase; letter-spacing: 2px; }
  .nv-sidebar-tagline {
    text-align: center;
    font-size: 10px; color: #8d937f; opacity: 0.5;
    text-transform: uppercase; letter-spacing: 6px; font-style: italic;
  }

  /* Footer */
  .nv-footer {
    max-width: 1280px; margin: 80px auto 0;
    padding: 48px 24px;
    display: grid; grid-template-columns: 1fr;
    gap: 24px;
    border-top: 1px solid #94da32;
    background: #0e0e0e;
  }
  @media (min-width: 768px) {
    .nv-footer { grid-template-columns: repeat(4, 1fr); }
    .nv-footer-brand { grid-column: span 1; }
    .nv-footer-bottom { grid-column: span 4; }
    .nv-nav-desktop { display: flex !important; }
    .nv-nav-mobile-hide { display: none !important; }
  }
  .nv-footer-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px; font-weight: 600;
    color: #94da32; margin-bottom: 24px;
  }
  .nv-footer-desc {
    font-size: 16px; text-transform: uppercase;
    letter-spacing: 4px; color: #8d937f; line-height: 1.5;
  }
  .nv-footer-heading {
    font-size: 12px; font-weight: 700; letter-spacing: 4px;
    color: #94da32; text-transform: uppercase; margin-bottom: 12px;
  }
  .nv-footer-link {
    display: block; font-size: 16px; letter-spacing: 4px;
    color: #8d937f; text-decoration: none; text-transform: uppercase;
    margin-bottom: 8px; transition: color 0.2s;
  }
  .nv-footer-link:hover { color: #94da32; text-decoration: underline; text-underline-offset: 8px; text-decoration-color: #94da32; text-decoration-thickness: 2px; }
  .nv-footer-address { font-size: 16px; letter-spacing: 4px; color: #8d937f; text-transform: uppercase; line-height: 1.8; }
  .nv-footer-bottom {
    border-top: 1px solid #434938; padding-top: 24px; text-align: center;
  }
  .nv-footer-copy { font-size: 16px; letter-spacing: 4px; color: #8d937f; text-transform: uppercase; }
`;

const PRODUCTS = [
  {
    id: 1,
    name: "Ratri G11 Precision Surveillance",
    sku: "NV-RT-G11-BLK",
    price: 45000,
    tags: ["4K ULTRA HD", "THERMAL IMAGING", "NEPAL CERTIFIED"],
    showRec: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp-gHcxsU2U3lcWDjS5StF2marnQ-HGTUA7cQgIAu_C1F3lphvZkr4yASAg-zy8sYFgVLXezSDW9aHU_iYNq8HbaK2Mhdb2LUsby0lMzPT-OTqaULBNCmKRPq6yLLQ_s3QyjMlc0cjxrez0ZuE_04NbyRubYvCUW0SIa6kfP3xR1L5NohtG_fiH4VkOSdyQOZu-6HLka1OG7C-NrPkDPlaJa618Eh6PH3vszw6PBhbKUCFn1T5-tRNaT9z6o0HYWQBIbeUtefjmmk",
    alt: "Ratri G11 Night Vision Camera",
  },
  {
    id: 2,
    name: "Command Center Pro HUB v4",
    sku: "NV-CP-V4-SYS",
    price: 125000,
    tags: [],
    showRec: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALs9JbbU-xN9pi7787estalJIgNIySfJMoto5SzDbghH8ggDjidvjMRColJMLFN1FSH3gyxR_LR3Z11anfd0R43bYk7g_p2Y5MKF8GKZHUrb_3zfyyDbhBUBQ1Lw0jaFcuCwHNOcCTUZcjb0FaQsv3lNQeqgB5RLjpSqDBcSZ--Zeu9D8lnSKcGYXAI_lP5wx1xSZYagxu_7WvKkPpVcSwNW8jne90fpDCvxgP3KMGxSjROQE-kZ4-LWtLO5LF8vbkyGsdYTuiLq8",
    alt: "Command Center Pro HUB",
  },
];

const TAX_RATE = 0.13;
const SHIPPING = 0;

function formatNPR(n) {
  return "रू " + n.toLocaleString("en-IN");
}

function ProductCard({ product, qty, onQtyChange, onRemove }) {
  return (
    <div className="nv-card crosshair ch-tl ch-tr crosshair-b ch-bl ch-br glow-hover">
      <div className="nv-card-img-wrap">
        <img src={product.img} alt={product.alt} />
        {product.showRec && (
          <div className="nv-rec-badge">
            <span className="nv-rec-dot animate-pulse" />
            <span className="nv-rec-txt">REC</span>
          </div>
        )}
      </div>
      <div className="nv-card-body">
        <div>
          <div className="nv-card-top">
            <div>
              <div className="nv-card-name">{product.name}</div>
              <div className="nv-card-sku">SKU: {product.sku}</div>
            </div>
            <div className="nv-card-price">{formatNPR(product.price)}</div>
          </div>
          {product.tags.length > 0 && (
            <div className="nv-tags">
              {product.tags.map((t) => <span key={t} className="nv-tag">{t}</span>)}
            </div>
          )}
        </div>
        <div className="nv-card-footer">
          <div className="nv-qty-wrap">
            <span className="nv-qty-label">QUANTITY:</span>
            <div className="nv-qty-ctrl">
              <button className="nv-qty-btn" onClick={() => onQtyChange(product.id, qty - 1)}>−</button>
              <span className="nv-qty-val">{qty}</span>
              <button className="nv-qty-btn" onClick={() => onQtyChange(product.id, qty + 1)}>+</button>
            </div>
          </div>
          <button className="nv-remove-btn" onClick={() => onRemove(product.id)}>
            <span className="mat-icon" style={{ fontVariationSettings: "'FILL' 0" }}>delete_forever</span>
            REMOVE FROM PERIMETER
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NightVisionCart() {
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1 });
  const [items, setItems] = useState(PRODUCTS.map((p) => p.id));
  const [promoCode, setPromoCode] = useState("");

  const handleQtyChange = (id, newQty) => {
    if (newQty < 1) return;
    setQuantities((q) => ({ ...q, [id]: newQty }));
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((i) => i !== id));
  };

  const cartProducts = PRODUCTS.filter((p) => items.includes(p.id));
  const subtotal = cartProducts.reduce((sum, p) => sum + p.price * (quantities[p.id] || 1), 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax + SHIPPING;

  return (
    <>
      <style>{styles}</style>
      <div className="nv-root">
        {/* Header */}
        

        <main className="nv-main">
          {/* Cart Header */}
          <section className="nv-cart-header">
            <h1 className="nv-cart-title scanline">YOUR COMMAND CART</h1>
            <p className="nv-cart-sub">REVIEWING MISSION-CRITICAL EQUIPMENT FOR DEPLOYMENT</p>
          </section>

          <div className="nv-grid">
            {/* Products */}
            <div className="nv-products" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {cartProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  qty={quantities[product.id] || 1}
                  onQtyChange={handleQtyChange}
                  onRemove={handleRemove}
                />
              ))}

              {cartProducts.length === 0 && (
                <div style={{ padding: "48px", textAlign: "center", border: "1px solid #434938", color: "#8d937f", fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", letterSpacing: "2px", textTransform: "uppercase" }}>
                  PERIMETER CLEAR — NO ITEMS IN CART
                </div>
              )}

              <div>
                <a href="#" className="nv-continue">
                  <span className="mat-icon" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
                  CONTINUE DEPLOYING (SHOP MORE)
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="nv-sidebar">
              <div className="nv-sidebar-box">
                <div className="nv-sidebar-label">MISSION SUMMARY</div>

                <div className="nv-summary-rows">
                  <div className="nv-summary-row">
                    <span>SUBTOTAL:</span>
                    <span className="nv-summary-val">{formatNPR(subtotal)}</span>
                  </div>
                  <div className="nv-summary-row">
                    <span>SHIPPING (NEPAL-WIDE):</span>
                    <span className="nv-summary-free">FREE</span>
                  </div>
                  <div className="nv-summary-row">
                    <span>ESTIMATED EXCISE TAX:</span>
                    <span className="nv-summary-val">{formatNPR(tax)}</span>
                  </div>
                </div>

                <div className="nv-total-row">
                  <span className="nv-total-label">TOTAL COMMAND COST:</span>
                  <span className="nv-total-val scanline">{formatNPR(total)}</span>
                </div>

                <div>
                  <label className="nv-promo-label">AUTHORIZATION CODE</label>
                  <div className="nv-promo-row">
                    <input
                      className="nv-promo-input"
                      placeholder="SECURE_DISCOUNT_CODE"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button className="nv-promo-btn">
                      <span className="mat-icon" style={{ fontVariationSettings: "'FILL' 0" }}>key</span>
                    </button>
                  </div>
                </div>

                <button className="nv-cta">PROCEED TO SECURE CHECKOUT</button>

                <div className="nv-trust-grid">
                  <div className="nv-trust-item">
                    <span className="mat-icon" style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
                    <span className="nv-trust-txt">ENCRYPTED TRANSACTION</span>
                  </div>
                  <div className="nv-trust-item">
                    <span className="mat-icon" style={{ fontVariationSettings: "'FILL' 0" }}>support_agent</span>
                    <span className="nv-trust-txt">24H COMMAND SUPPORT</span>
                  </div>
                </div>

                <div className="nv-sidebar-tagline">UNCOMPROMISING VIGILANCE EST. 2024</div>
              </div>
            </aside>
          </div>
        </main>

        {/* Footer */}
        
      </div>
    </>
  );
}