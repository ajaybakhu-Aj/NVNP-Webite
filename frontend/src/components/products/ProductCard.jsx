import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { colors } from "../../data/constants";

export default function ProductCard({
  id,
  img,
  name,
  description,
  desc,
  badge,
  price,
  cameraMp,
  category,
}) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const productPrice = price || 4500;
  const productId = id || (name ? name.toLowerCase().replace(/\s+/g, "-") : "product");

  const getSubheading = () => {
    if (cameraMp) {
      return `Camera MP: ${cameraMp}`;
    }
    if (category === "Network Video Recoder (NVR)") {
      return "NVR Specs: 8 Channels";
    }
    if (category === "POE Switch") {
      return "PoE Specs: 8 Ports";
    }
    if (category === "Hard Disk") {
      return "Memory Specs: 2TB HDD";
    }
    if (category === "SD Card") {
      return "Memory Specs: 128GB SD";
    }
    return "Hardware Accessory";
  };
  const subheadingText = getSubheading();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const userSession = localStorage.getItem("user");
    if (!userSession) {
      alert("Login required. Please log in to add products to your cart.");
      navigate("/login");
      return;
    }

    const cartProduct = {
      id: productId,
      name: name,
      img: img,
      price: productPrice,
    };

    addToCart(cartProduct, 1);
  };

  return (
    <Link
      to={`/product/${productId}`}
      style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%", height: "100%", boxSizing: "border-box" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          background: "var(--nv-surfCont, #1e2117)",
          border: `1px solid ${hovered ? "var(--nv-secondary, #94da32)" : "var(--nv-outlineVar, #434938)"}`,
          borderRadius: "14px",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          width: "100%",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          boxShadow: hovered ? "0 12px 32px rgba(148, 218, 50, 0.18)" : "0 2px 10px rgba(0,0,0,0.2)",
          transform: hovered ? "translateY(-4px)" : "none",
        }}
      >
        <div style={{ width: "100%", boxSizing: "border-box" }}>
          {/* SCANLINE OVERLAY */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(transparent, transparent 3px, rgba(181,231,93,0.05) 4px)",
              opacity: 0.08,
              pointerEvents: "none",
            }}
          />

          {/* IMAGE CONTAINER WITH UNIFIED FRAMING */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              aspectRatio: "1/1",
              background: "var(--nv-surfLow, #0c0f07)",
              borderBottom: "1px solid var(--nv-outlineVar, #434938)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              boxSizing: "border-box",
              padding: "24px",
              background: "radial-gradient(circle at center, rgba(148,218,50,0.06) 0%, rgba(12,15,7,0.95) 75%)",
            }}
          >
            <img
              src={(!img || img.includes("AB6AXuDKHBBETCmvmUDQXf390HXH-Ol")) ? "/assets/white_dome_camera.png" : img}
              alt={name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                filter: hovered ? "grayscale(0%) brightness(1.05)" : "grayscale(15%) brightness(0.95)",
                transition: "all 0.5s ease",
                transform: hovered ? "scale(1.06)" : "scale(1)",
              }}
              loading="lazy"
            />
            {badge && (
              <span
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  zIndex: 3,
                  background: "#94da32",
                  color: "#111111",
                  fontSize: 10,
                  fontWeight: 800,
                  padding: "4px 8px",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderRadius: "2px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                {badge}
              </span>
            )}
          </div>

          {/* PRODUCT DETAILS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "18px 18px 14px 18px",
              position: "relative",
              zIndex: 2,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: 0.5,
                color: hovered ? "var(--nv-secondary, #94da32)" : "var(--nv-onSurf, #ffffff)",
                margin: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </h4>

            {/* SUBHEADING */}
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: "var(--nv-onSurfVar, #c3c9b3)",
                fontSize: 12,
                marginTop: 6,
                lineHeight: 1.4,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {subheadingText}
            </div>

            {/* PRICE */}
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "var(--nv-secondary, #94da32)",
                fontSize: 18,
                fontWeight: 800,
                marginTop: 8,
                letterSpacing: 0.5,
              }}
            >
              रू {productPrice ? productPrice.toLocaleString("en-IN") : "4,500"}
            </div>
          </div>
        </div>

        {/* BUTTON AT BOTTOM */}
        <div style={{ padding: "0 18px 18px 18px", width: "100%", boxSizing: "border-box" }}>
          <button
            onClick={handleAddToCart}
            className={`w-full ${hovered ? "nv-btn-primary" : "nv-btn-secondary"} nv-btn-compact`}
            style={{
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </Link>
  );
}