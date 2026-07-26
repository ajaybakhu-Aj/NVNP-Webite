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
  originalPrice,
  cameraMp,
  category,
}) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const productPrice = price || 4500;
  const listPrice = originalPrice || Math.round(productPrice * 1.25);
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
    return "Hardware Spec";
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
          background: "#141612",
          borderRadius: "16px",
          border: `1px solid ${hovered ? "rgba(181, 231, 93, 0.6)" : "rgba(255, 255, 255, 0.08)"}`,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          width: "100%",
          transition: "all 0.35s ease",
          boxShadow: hovered ? "0 12px 30px rgba(181, 231, 93, 0.18)" : "0 4px 15px rgba(0, 0, 0, 0.3)",
          transform: hovered ? "translateY(-6px)" : "none",
        }}
      >
        <div style={{ width: "100%", boxSizing: "border-box" }}>
          {/* SCANLINE OVERLAY */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(transparent, transparent 3px, rgba(181,231,93,0.03) 4px)",
              opacity: 0.08,
              pointerEvents: "none",
            }}
          />

          {/* IMAGE CONTAINER WITH UNIFIED 1:1 ASPECT RATIO */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              aspectRatio: "1 / 1",
              background: "#1a1d17",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              boxSizing: "border-box",
              padding: "20px",
            }}
          >
            <img
              src={img}
              alt={name}
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                filter: hovered ? "drop-shadow(0 8px 16px rgba(0,0,0,0.4))" : "grayscale(15%)",
                transition: "all 0.4s ease",
                transform: hovered ? "scale(1.08)" : "scale(1)",
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
                  background: "#b5e75d",
                  color: "#111111",
                  fontSize: 10,
                  fontWeight: 800,
                  padding: "4px 10px",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderRadius: "20px",
                  boxShadow: "0 2px 10px rgba(181, 231, 93, 0.4)",
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
              padding: "18px 18px 12px 18px",
              position: "relative",
              zIndex: 2,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* META TAG BADGE */}
            <span
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontSize: 10,
                color: "#b5e75d",
                background: "rgba(181, 231, 93, 0.1)",
                border: "1px solid rgba(181, 231, 93, 0.25)",
                padding: "3px 8px",
                borderRadius: "12px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                marginBottom: 8,
                letterSpacing: "0.5px",
              }}
            >
              {subheadingText}
            </span>

            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: 0.3,
                color: hovered ? "#b5e75d" : "#ffffff",
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                height: "44px",
                lineHeight: "22px",
                width: "100%",
                transition: "color 0.2s ease",
              }}
              title={name}
            >
              {name}
            </h4>

            {/* PRICING WITH STRUCK THROUGH ORIGINAL PRICE */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginTop: 10,
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#b5e75d",
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                }}
              >
                रू {productPrice ? productPrice.toLocaleString("en-IN") : "4,500"}
              </div>

              {listPrice && (
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#757c6b",
                    fontSize: 13,
                    textDecoration: "line-through",
                    fontWeight: 500,
                  }}
                >
                  रू {listPrice.toLocaleString("en-IN")}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GLASSMORPHIC BUTTON AT BOTTOM */}
        <div style={{ padding: "0 18px 18px 18px", width: "100%", boxSizing: "border-box" }}>
          <button
            onClick={handleAddToCart}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "11px",
              background: hovered ? "#b5e75d" : "rgba(181, 231, 93, 0.06)",
              border: `1px solid ${hovered ? "#b5e75d" : "rgba(181, 231, 93, 0.4)"}`,
              color: hovered ? "#111111" : "#b5e75d",
              fontWeight: 800,
              fontSize: 11,
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              borderRadius: "10px",
              backdropFilter: "blur(4px)",
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </Link>
  );
}