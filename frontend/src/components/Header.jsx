import { useState } from "react";
import { Link } from "react-router-dom";

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        maxWidth: "1280px",
        margin: "0 auto",
        borderBottom: "1px solid #434938",
        backgroundColor: "rgba(19,19,19,0.95)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "Space Grotesk",
          fontSize: "40px",
          lineHeight: "1.2",
          letterSpacing: "2px",
          fontWeight: 700,
          color: "#94da32",
        }}
      >
        NV/// NIGHTVISION™
      </div>

      {/* Desktop Nav */}
      <nav
        style={{
          display: "none",
          gap: "24px",
          alignItems: "center",
        }}
        className="desktop-nav"
      >
        {["CCTV CAMERAS", "ABOUT US", "CONTACT US", "DEALERSHIPS"].map(
          (item) =>
            item === "ABOUT US" ? (
              <Link
                key={item}
                to="/about"
                style={{
                  color: "#94da32",
                  borderBottom: "2px solid #94da32",
                  paddingBottom: "8px",
                  fontWeight: 700,
                  fontFamily: "Inter",
                  fontSize: "12px",
                  letterSpacing: "1px",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                ABOUT US
              </Link>
            ) : (
              <a
                key={item}
                href="#"
                style={{
                  color: "#c3c9b3",
                  fontWeight: 600,
                  fontFamily: "Inter",
                  fontSize: "12px",
                  letterSpacing: "1px",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {item}
              </a>
            )
        )}
      </nav>

      {/* Right Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          className="support-btn"
          style={{
            display: "none",
            fontFamily: "Inter",
            fontSize: "12px",
            letterSpacing: "1px",
            fontWeight: 600,
            color: "#94da32",
            border: "1px solid #94da32",
            padding: "8px 16px",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          SUPPORT HOTLINE
        </button>

        <Icon name="shopping_cart" />
        <Icon name="account_circle" />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: "none",
            border: "none",
            color: "#94da32",
            cursor: "pointer",
            fontSize: "28px",
            lineHeight: 1,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#131313",
            borderBottom: "1px solid #434938",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            zIndex: 100,
          }}
        >
          {["CCTV CAMERAS", "ABOUT US", "CONTACT US", "DEALERSHIPS"].map(
            (item) =>
              item === "ABOUT US" ? (
                <Link
                  key={item}
                  to="/about"
                  style={{
                    color: "#94da32",
                    textDecoration: "none",
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontSize: "12px",
                    letterSpacing: "1px",
                  }}
                >
                  ABOUT US
                </Link>
              ) : (
                <a
                  key={item}
                  href="#"
                  style={{
                    color: "#c3c9b3",
                    textDecoration: "none",
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontSize: "12px",
                    letterSpacing: "1px",
                  }}
                >
                  {item}
                </a>
              )
          )}

          <button
            style={{
              fontFamily: "Inter",
              fontSize: "12px",
              letterSpacing: "1px",
              fontWeight: 600,
              color: "#94da32",
              border: "1px solid #94da32",
              padding: "8px 16px",
              background: "transparent",
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            SUPPORT HOTLINE
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;