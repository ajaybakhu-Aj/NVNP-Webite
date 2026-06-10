import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllProducts } from "../../../utils/productDb";
import { colors } from "../../../data/constants";
import { CartContext } from "../../../Context/CartContext";
import Icon from "../../../utils/Icon";

export default function CctvSetupPage() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({}); // mapping: id -> qty

  useEffect(() => {
    getAllProducts().then((data) => {
      setProductsList(data);
      // Initialize quantities to 0
      const initialQtys = {};
      data.forEach((p) => {
        initialQtys[p.id] = 0;
      });
      setQuantities(initialQtys);
      setLoading(false);
    });
  }, []);

  const handleQtyChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const getSelectedItems = () => {
    return productsList
      .filter((p) => quantities[p.id] > 0)
      .map((p) => ({
        ...p,
        qty: quantities[p.id],
      }));
  };

  const calculateTotal = () => {
    const selected = getSelectedItems();
    return selected.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const handleAddToCart = () => {
    const selected = getSelectedItems();
    if (selected.length === 0) {
      alert("No hardware selected. Please increase quantities on the items you wish to add.");
      return;
    }

    const userSession = localStorage.getItem("user");
    if (!userSession) {
      alert("Login required. Please log in to configure your setup.");
      navigate("/login");
      return;
    }

    selected.forEach((item) => {
      addToCart({ id: item.id, name: item.name, img: item.img, price: item.price }, item.qty);
    });

    alert("Your CCTV setup hardware has been added to your cart!");
  };

  const handleBuyNow = () => {
    const selected = getSelectedItems();
    if (selected.length === 0) {
      alert("No hardware selected. Please increase quantities on the items you wish to purchase.");
      return;
    }

    const userSession = localStorage.getItem("user");
    if (!userSession) {
      alert("Login required. Please log in to purchase hardware.");
      navigate("/login");
      return;
    }

    selected.forEach((item) => {
      addToCart({ id: item.id, name: item.name, img: item.img, price: item.price }, item.qty);
    });

    navigate("/checkout");
  };

  // Group all products by category dynamically
  const categoriesMap = {};
  productsList.forEach((p) => {
    const cat = p.category || "Uncategorized Hardware";
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = [];
    }
    categoriesMap[cat].push(p);
  });

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#131313", color: "#94da32", fontFamily: "monospace" }}>
        INITIALIZING SECURITY HARDWARE CONFIGURATION ENGINE...
      </div>
    );
  }

  return (
    <div style={{ background: "#131313", minHeight: "100vh", color: "#e5e2e1", paddingBottom: "80px" }}>
      {/* SCANLINE */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "repeating-linear-gradient(transparent, transparent 3px, rgba(181,231,93,0.02) 4px)",
          opacity: 0.1,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      {/* BREADCRUMBS & TITLE */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px 0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Space Grotesk', monospace", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#8d937f", marginBottom: 24 }}>
          <Link to="/" style={{ color: "#8d937f", textDecoration: "none" }}>Home</Link>
          <Icon name="chevron_right" size={14} />
          <Link to="/products" style={{ color: "#8d937f", textDecoration: "none" }}>Products</Link>
          <Icon name="chevron_right" size={14} />
          <span style={{ color: "#94da32" }}>CCTV SETUP BUILDER</span>
        </div>

        <div style={{ borderBottom: "1px solid #434938", paddingBottom: 24, marginBottom: 40 }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 2, margin: "0 0 8px 0" }}>
            BUILD YOUR CCTV SETUP
          </h1>
          <p style={{ color: "#8d937f", fontSize: 15, maxWidth: 700, margin: 0, lineHeight: 1.6 }}>
            Customize your custom security hardware stack. Adjust the quantities of cameras, network video recorders, switches, and local storage media to dynamically estimate your build cost and deploy the bundle.
          </p>
        </div>
      </div>

      {/* BUILDER LAYOUT */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 40, alignItems: "start" }}>
        
        {/* HARDWARE CATEGORIES */}
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {Object.keys(categoriesMap).map((catName, index) => (
            <div key={catName}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{
                  background: "#94da32",
                  color: "#111",
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  borderRadius: "50%",
                  fontSize: 14
                }}>{index + 1}</span>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>
                  {catName}
                </h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                {categoriesMap[catName].map((p) => (
                  <HardwareCard
                    key={p.id}
                    product={p}
                    qty={quantities[p.id] || 0}
                    onChange={(delta) => handleQtyChange(p.id, delta)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SIDE ESTIMATOR CALCULATOR */}
        <aside style={{ border: "1px solid #434938", padding: 24, borderRadius: 4, background: "#181a15", position: "sticky", top: 100, display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <h3 style={{ margin: "0 0 6px 0", fontSize: 16, fontFamily: "'Space Grotesk', sans-serif", color: "#fff", textTransform: "uppercase", letterSpacing: 1 }}>
              BUILD ESTIMATOR
            </h3>
            <span style={{ color: "#8d937f", fontSize: 11, fontFamily: "monospace" }}>[SYSTEM_CODE: CUSTOM_DEPLOY]</span>
          </div>

          {/* Selected Hardware List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: "240px", overflowY: "auto", borderTop: "1px solid #2a2a2a", borderBottom: "1px solid #2a2a2a", padding: "16px 0" }}>
            {getSelectedItems().length === 0 ? (
              <div style={{ color: "#8d937f", fontSize: 12, textAlign: "center", padding: "16px 0" }}>
                No hardware units currently configured. Increase quantities to calculate cost.
              </div>
            ) : (
              getSelectedItems().map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", fontSize: 13 }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ color: "#fff", fontWeight: 600 }}>{item.name}</span>
                    <span style={{ color: "#8d937f", fontSize: 11 }}>Qty: {item.qty} × रू {item.price.toLocaleString("en-IN")}</span>
                  </div>
                  <span style={{ color: "#94da32", fontWeight: 700 }}>रू {(item.price * item.qty).toLocaleString("en-IN")}</span>
                </div>
              ))
            )}
          </div>

          {/* Running Total */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>TOTAL BUILD COST:</span>
            <span style={{ color: "#94da32", fontWeight: 700, fontSize: 22, fontFamily: "'Space Grotesk', sans-serif" }}>
              रू {calculateTotal().toLocaleString("en-IN")}
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              onClick={handleAddToCart}
              style={{
                width: "100%",
                padding: 14,
                background: "transparent",
                border: "1px solid #94da32",
                color: "#94da32",
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: 1
              }}
            >
              ADD SETUP TO CART
            </button>

            <button
              onClick={handleBuyNow}
              style={{
                width: "100%",
                padding: 14,
                background: "#94da32",
                border: "none",
                color: "#111",
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: 1,
                boxShadow: "0 0 15px rgba(148, 218, 50, 0.25)"
              }}
            >
              BUY NOW
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
}

function HardwareCard({ product, qty, onChange }) {
  const [hovered, setHovered] = useState(false);

  const getSubheading = () => {
    if (product.cameraMp) {
      return `Camera MP: ${product.cameraMp}`;
    }
    if (product.category === "Network Video Recoder (NVR)") {
      return "NVR Specs: 8 Channels";
    }
    if (product.category === "POE Switch") {
      return "PoE Specs: 8 Ports";
    }
    if (product.category === "Hard Disk") {
      return "Memory Specs: 2TB HDD";
    }
    if (product.category === "SD Card") {
      return "Memory Specs: 128GB SD";
    }
    return "Hardware Accessory";
  };
  const subheadingText = getSubheading();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.surfaceContainer,
        border: `1px solid ${hovered ? "#94da32" : colors.outlineVariant}`,
        padding: 16,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 16,
        transition: "all 0.2s"
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        <img
          src={product.img}
          alt=""
          style={{
            width: 64,
            height: 64,
            objectFit: "cover",
            borderRadius: 2,
            border: "1px solid #434938",
            filter: hovered ? "grayscale(0)" : "grayscale(0.7)",
            transition: "filter 0.3s"
          }}
        />
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "'Space Grotesk', sans-serif",
              height: 38,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </h3>
          <div
            style={{
              color: "#8d937f",
              fontSize: 11,
              marginTop: 4,
              height: 16,
              display: "flex",
              alignItems: "center",
            }}
          >
            {subheadingText}
          </div>
          <div style={{ color: colors.secondary, fontWeight: 700, fontSize: 13, marginTop: 6 }}>
            रू {product.price.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #2a2a2a", paddingTop: 12 }}>
        <span style={{ fontSize: 11, color: "#8d937f", fontFamily: "monospace" }}>Qty Select:</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => onChange(-1)}
            style={{
              width: 28,
              height: 28,
              background: "#0c0d0a",
              border: "1px solid #434938",
              color: "#fff",
              cursor: "pointer",
              borderRadius: 2,
              fontWeight: 700
            }}
          >
            -
          </button>
          <span style={{ color: "#fff", fontWeight: 700, minWidth: 20, textAlign: "center" }}>{qty}</span>
          <button
            onClick={() => onChange(1)}
            style={{
              width: 28,
              height: 28,
              background: "#0c0d0a",
              border: "1px solid #434938",
              color: "#fff",
              cursor: "pointer",
              borderRadius: 2,
              fontWeight: 700
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
