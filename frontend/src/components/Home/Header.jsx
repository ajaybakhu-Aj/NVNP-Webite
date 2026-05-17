import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false);
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "16px 24px",
        maxWidth: 1280,
        margin: "0 auto",
        borderBottom: "1px solid transparent",
        background: "rgba(19,19,19,0.95)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <div
          style={{
            fontFamily: "'Arial Black', sans-serif",
            fontStyle: "italic",
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <span>
            <span style={{ color: "#B5E75D" }}>N</span>
            <span style={{ color: "#FFFFFF" }}>V</span>
            <span style={{ color: "#B5E75D" }}>//</span>
          </span>
          <span style={{ color: "#FFFFFF" }}>NIGHTVISION™</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          marginLeft: "20px",
          
        }}
      >
        {[
  "CCTV CAMERAS",
  "ABOUT US",
  "CONTACT US",
  "DEALERSHIPS",
].map((item, i) => {

  const route =
    item === "CCTV CAMERAS"
      ? "/products"
      : item === "ABOUT US"
      ? "/about"
      : item === "CONTACT US"
      ? "/contact"
      : item === "DEALERSHIPS"
      ? "/dealership"
      : "/";

  return (
    <Link
      key={item}
      to={route}
      style={{
  color: "#ffffff",
  borderBottom: "2px solid transparent",
  paddingBottom: "6px",
  fontFamily: "'Arial Black', sans-serif",
  fontWeight: 600,
  fontSize: "12px",
  letterSpacing: "1px",
  textDecoration: "none",
  lineHeight: 1,
}}
    >
      {item}
    </Link>
  );
})}
      </nav>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "nowrap",
        }}
      >
        <span
          style={{
            fontFamily: "'Arial Black', sans-serif",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: 1,
            color: colors.secondary,
            marginRight: 16,
            marginLeft: "20px",
            whiteSpace: "nowrap",
          }}
        >
          SUPPORT HOTLINE: +977-9745978217
        </span>

        <Link to="/cart" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Icon name="shopping_cart" size={24} style={{ color: colors.onSurfaceVariant, cursor: "pointer", flexShrink: 0 }} />
        </Link>

        {/* Account Dropdown */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setAccountOpen(!accountOpen)}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Icon name="account_circle" size={24} style={{ color: colors.onSurfaceVariant, flexShrink: 0 }} />
          </div>

          {accountOpen && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                width: "220px",
                background: "#20201f",
                border: "1px solid #434938",
                zIndex: 999,
              }}
            >
              {["My Profile", "Dashboard", "Orders", "Settings", "Logout"].map((item) => (
                <Link
                  key={item}
                  to="#"
                  style={{
                    display: "block",
                    padding: "14px",
                    color: "#c3c9b3",
                    textDecoration: "none",
                    borderBottom: "1px solid #434938",
                    fontFamily: "Inter",
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}