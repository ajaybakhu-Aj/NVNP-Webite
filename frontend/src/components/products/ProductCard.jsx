import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { colors } from "../../data/constants";

export default function ProductCard({
  id,
  img,
  name,
  desc,
  badge,
  price,
}) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const productPrice = price || 4500;
  const productId = id || name.toLowerCase().replace(/\s+/g, "-");

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
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          background: colors.surfaceContainer,
          padding: 16,
          border: `1px solid ${colors.outlineVariant}`,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "border-color 0.3s ease",
          borderColor: hovered ? colors.secondary : colors.outlineVariant,
        }}
      >
        <div>
          {/* SCANLINE */}
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

          {/* IMAGE */}
          <img
            src={img}
            alt={name}
            style={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "cover",
              marginBottom: 24,
              filter: hovered
                ? "grayscale(0%)"
                : "grayscale(100%)",
              transition: "filter 0.5s, transform 0.5s ease",
              transform: hovered ? "scale(1.02)" : "scale(1)",
            }}
          />

          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 8,
            }}
          >
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: 1,
                color: "#fff",
              }}
            >
              {name}
            </h4>

            {badge && (
              <span
                style={{
                  background: colors.secondary,
                  color: "#111",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 8px",
                  whiteSpace: "nowrap",
                }}
              >
                {badge}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <p
            style={{
              color: colors.onSurfaceVariant,
              fontSize: 14,
              marginBottom: 16,
              lineHeight: 1.6,
            }}
          >
            {desc}
          </p>
        </div>

        <div>
          {/* PRICE */}
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: colors.secondary,
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            रू {productPrice.toLocaleString("en-IN")}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddToCart}
            style={{
              width: "100%",
              padding: 12,
              background: hovered
                ? colors.secondary
                : "transparent",
              border: `1px solid ${colors.secondary}`,
              color: hovered
                ? "#111"
                : colors.secondary,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: 1,
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </Link>
  );
}