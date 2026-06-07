import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../../../Context/CartContext";
import Icon from "../../../../utils/Icon";
import { getProductById, getAllProducts } from "../../../../utils/productDb";

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeImg, setActiveImg] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    setLoading(true);
    getProductById(slug).then((prod) => {
      if (prod) {
        setProduct(prod);
        setActiveImg(prod.img);
        setActiveColor(prod.colors && prod.colors[0] ? prod.colors[0].name : "Standard");
        setQuantity(1);

        // Fetch related products
        getAllProducts().then((allProds) => {
          const filtered = allProds.filter((p) => p.id !== prod.id).slice(0, 3);
          setRelatedProducts(filtered);
        });
      } else {
        setProduct(null);
      }
      setLoading(false);
    }).catch((err) => {
      console.error("Database query failed:", err);
      setProduct(null);
      setLoading(false);
    });
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;

    const userSession = localStorage.getItem("user");
    if (!userSession) {
      alert("Login required. Please log in to add products to your cart.");
      navigate("/login");
      return;
    }

    const cartProduct = {
      id: product.id,
      name: `${product.name} (${activeColor})`,
      img: activeImg,
      price: product.price,
    };
    
    addToCart(cartProduct, quantity);
  };

  const handleBuyNow = () => {
    if (!product) return;

    const userSession = localStorage.getItem("user");
    if (!userSession) {
      alert("Login required. Please log in to purchase products.");
      navigate("/login");
      return;
    }

    const cartProduct = {
      id: product.id,
      name: `${product.name} (${activeColor})`,
      img: activeImg,
      price: product.price,
    };

    addToCart(cartProduct, quantity);
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="product-detail-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ color: "#94da32", fontFamily: "'Space Mono', monospace", letterSpacing: 2 }}>
          CONNECTING DIGITAL UPLINK FOR DEVICE '{slug.toUpperCase()}'...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center", background: "#181a15", border: "1px solid #ff6b6b", padding: 40, maxWidth: 500, borderRadius: 4 }}>
          <h1 style={{ color: "#ff6b6b", fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, marginBottom: 16 }}>
            SYSTEM NOT REGISTERED
          </h1>
          <p style={{ color: "#8d937f", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
            The requested device key '{slug}' was not found in the NightVision security database registry.
          </p>
          <Link to="/products" style={{
            background: "#94da32",
            color: "#111",
            textDecoration: "none",
            padding: "10px 20px",
            fontWeight: 700,
            display: "inline-block",
            fontFamily: "'Inter', sans-serif"
          }}>
            RETURN TO CATALOG
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="hud-scanline" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999 }} />

      <main>
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <Icon name="chevron_right" size={14} />
          <Link to="/products">Products</Link>
          <Icon name="chevron_right" size={14} />
          <span className="current-product">{product.name}</span>
        </div>

        <div className="detail-grid">
          {/* Gallery Column */}
          <div className="gallery-col">
            <div className="main-img-box">
              <img src={activeImg} alt={product.name} className="main-img" />
              {product.badge && (
                <span className="product-badge">
                  {product.badge}
                </span>
              )}
            </div>
            {product.thumbs && product.thumbs.length > 1 && (
              <div className="thumbs-list">
                {product.thumbs.map((t, idx) => (
                  <button key={idx} onClick={() => setActiveImg(t)} className={`thumb-btn ${activeImg === t ? "active" : ""}`}>
                    <img src={t} alt="" className="thumb-img" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="details-col">
            <div>
              <span className="system-code">
                SYSTEM_CODE: {product.code}
              </span>
              <h1 className="detail-title">
                {product.name}
              </h1>
              <p className="detail-desc">
                {product.description}
              </p>
            </div>

            <div className="price-line">
              <span className="price-val">
                रू {product.price.toLocaleString("en-IN")}
              </span>
              <span className="status-label">
                [ STATUS: {product.status} ]
              </span>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="shell-label">
                  SELECT SHELL COLOR: <span className="shell-color-name">{activeColor}</span>
                </span>
                <div className="colors-list">
                  {product.colors.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setActiveColor(col.name)}
                      className={`color-btn ${activeColor === col.name ? "active" : ""}`}
                      style={{ background: col.hex }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="actions-row" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div className="qty-selector" style={{ flexShrink: 0 }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="qty-btn">-</button>
                <div className="qty-val">
                  {quantity}
                </div>
                <button onClick={() => setQuantity(q => q + 1)} className="qty-btn">+</button>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  background: "transparent",
                  color: "#deffa4",
                  border: "1px solid #deffa4",
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  padding: "14px 24px",
                  cursor: "pointer",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.2s"
                }}
              >
                <Icon name="shopping_cart" size={18} />
                ADD TO CART
              </button>

              <button onClick={handleBuyNow} className="deploy-btn" style={{ flex: 1 }}>
                <Icon name="chevron_right" size={18} />
                BUY NOW
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Section */}
        <div className="tab-section">
          <div className="tabs-header">
            {[
              { id: "specs", label: "TECHNICAL SPECS" },
              { id: "intel", label: "PRODUCT DETAILS" },
              { id: "logs", label: "DEVICE LOGS" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === "specs" && product.specs && (
              <div className="specs-tab-grid">
                <div className="specs-icons-grid">
                  {product.specs.map((s, i) => (
                    <div key={i} className="spec-icon-box">
                      <Icon name={s.icon} size={28} style={{ color: "#deffa4" }} />
                      <span className="spec-icon-label">{s.label}</span>
                    </div>
                  ))}
                </div>
                <div className="specs-table">
                  {product.specTable && product.specTable.map(([k, v]) => (
                    <div key={k} className="specs-table-row">
                      <span className="specs-table-key">{k}</span>
                      <span className="specs-table-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "intel" && (
              <div className="intel-content">
                <p>{product.longDesc || product.description}</p>
                <p>NIGHTVISION™ products are designed for durability, ease of deployment, and high integration capability with custom security networks. Supported under global SLA agreements.</p>
              </div>
            )}

            {activeTab === "logs" && (
              <div className="logs-terminal">
                <div>[SYS_INIT] CONNECTING TO DEVICE {product.code}...</div>
                <div>[SYS_HANDSHAKE] CRYPTO KEY VALIDATED [RSA-4096]</div>
                <div>[UPLINK] ACTIVE — BITRATE: 14.2 Mbps</div>
                <div>[DIAGNOSTICS] ALL OPTICAL ELEMENTS NOMINAL</div>
                <div>[LOGS] 00:00:01 — SYS:BOOT_SUCCESS</div>
                <div>[LOGS] 00:00:15 — AI:PERIMETER_DETECTION_ACTIVE</div>
                <div className="logs-uplink">■ UPLINK SECURED — LIVE STREAMS ONWARD — </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Section */}
        {relatedProducts.length > 0 && (
          <div className="related-section">
            <h3 className="related-title">
              RELATED_SYSTEM_PROT
            </h3>
            <div className="related-grid">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="related-card">
                    <img src={p.img} alt={p.name} className="related-card-img" />
                    <div className="related-card-footer">
                      <span className="related-card-name">{p.name}</span>
                      <span className="related-card-price">रू {p.price.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}