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

  const finalDesc = description || desc || "";
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
      style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%", boxSizing: "border-box" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          background: colors.surfaceContainer || "#1e2117",
          padding: 16,
          border: `1px solid ${hovered ? colors.secondary : colors.outlineVariant || "#434938"}`,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 16,
          boxSizing: "border-box",
          width: "100%",
          transition: "border-color 0.3s ease",
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
              opacity: 0.1,
              pointerEvents: "none",
            }}
          />

          {/* IMAGE CONTAINER */}
          <div
            style={{
              position: "relative",
              marginBottom: 16,
              overflow: "hidden",
              aspectRatio: "1/1",
              background: "#181a15",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <img
              src={img}
              alt={name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
                transition: "filter 0.5s, transform 0.5s ease",
                transform: hovered ? "scale(1.04)" : "scale(1)",
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
                  background: colors.secondary,
                  color: "#111",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "4px 8px",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {badge}
              </span>
            )}
          </div>

          {/* PRODUCT INFO */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              zIndex: 2,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: 0.5,
                color: "#fff",
                margin: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
              title={name}
            >
              {name}
            </h4>
            <div
              style={{
                fontSize: 12,
                color: colors.secondary,
                fontFamily: "'Space Grotesk', sans-serif",
                marginTop: 4,
                letterSpacing: 0.5,
                height: 20,
                display: "flex",
                alignItems: "center",
              }}
            >
              {subheadingText}
            </div>

            {/* PRICE */}
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: colors.secondary,
                fontSize: 18,
                fontWeight: 700,
                marginTop: 4,
                marginBottom: 8,
              }}
            >
              रू {productPrice ? productPrice.toLocaleString("en-IN") : "4,500"}
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleAddToCart}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 16px",
            background: hovered ? colors.secondary : "transparent",
            border: `1px solid ${colors.secondary}`,
            color: hovered ? "#111" : colors.secondary,
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.2s",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: 1,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          ADD TO CART
        </button>
      </div>
    </Link>
  );
}