import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";
import logo from "../../assets/logo.png";

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.classList.remove("light-mode");
    localStorage.removeItem("theme");

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing user session:", e);
      }
    }

    const handleClickOutside = (event) => {
      const accountWrapper = document.querySelector(".account-wrapper");
      if (accountWrapper && !accountWrapper.contains(event.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAccountOpen(false);
    window.location.href = "/";
  };

  const navItems = [
    {
      label: "CCTV CAMERAS",
      route: "/products",
    },
    {
      label: "ABOUT US",
      route: "/about",
    },
    {
      label: "CONTACT US",
      route: "/contact",
    },
    {
      label: "DEALERSHIPS",
      route: "/dealership",
    },
    {
      label: "BLOG",
      dropdown: [
        { label: "Blogs", route: "/blog" },
        { label: "News and Events", route: "/events" },
        { label: "Gallery", route: "/gallery" },
      ],
    },
  ];

  return (
    <header className="app-header">
      <div className="header-container">
        {/* LEFT */}
        <div className="header-left">
          {/* LOGO */}
          <Link to="/" className="logo-link">
            <img src={logo} alt="NightVision Logo" className="logo-image" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <div key={item.label} className="nav-dropdown-wrapper">
                    <span className="nav-link dropdown-trigger">
                      {item.label} <span className="dropdown-arrow">▼</span>
                    </span>
                    <div className="nav-dropdown">
                      <div className="nav-dropdown-menu">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.route}
                            className="nav-dropdown-link"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.route}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* RIGHT */}
        <div className="header-right">
          <span className="support-hotline">
            SUPPORT HOTLINE: +977-9745978217
          </span>

          {/* CART */}
          <Link to="/cart" className="cart-link">
            <Icon
              name="shopping_cart"
              size={24}
              className="cart-icon"
            />
          </Link>

          {/* ACCOUNT */}
          <div className="account-wrapper">
            <div
              onClick={() => setAccountOpen(!accountOpen)}
              className="account-trigger"
            >
              <Icon
                name="account_circle"
                size={24}
                className="account-icon"
              />
            </div>

            {accountOpen && (
              <div className="account-dropdown">
                {user && (
                  <div className="dropdown-user-info" style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "11px", color: "#94da32", fontWeight: "600", textTransform: "uppercase" }}>
                    USER: {user.name}
                  </div>
                )}
                
                {!user && (
                  <>
                    <Link
                      to="/login"
                      className="dropdown-link"
                      style={{ color: "#94da32", fontWeight: "600" }}
                      onClick={() => setAccountOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="dropdown-link"
                      style={{ color: "#94da32", fontWeight: "600", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
                      onClick={() => setAccountOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                {[
                  "My Profile",
                  "Dashboard",
                  "Orders",
                  "Settings"
                ].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="dropdown-link"
                    onClick={() => setAccountOpen(false)}
                  >
                    {item}
                  </Link>
                ))}

                <button
                  onClick={handleLogout}
                  className="dropdown-link"
                  style={{ background: "none", border: "none", width: "100%", textAlign: "left", color: "#ff5b5b", cursor: "pointer" }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MENU */}
          <div
            onClick={() => setMobileMenu(!mobileMenu)}
            className="menu-trigger"
          >
            <Icon
              name={mobileMenu ? "close" : "menu"}
              size={28}
              className="menu-icon"
            />
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="mobile-menu">
          {/* USER INFO / AUTH ACTIONS FOR MOBILE */}
          <div className="mobile-auth-section" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "16px", marginBottom: "8px" }}>
            {user ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div className="mobile-user-info" style={{ color: "#94da32", fontSize: "11px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", padding: "0 8px 4px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  USER: {user.name}
                </div>
                {[
                  "My Profile",
                  "Dashboard",
                  "Orders",
                  "Settings"
                ].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    onClick={() => setMobileMenu(false)}
                    className="mobile-menu-link"
                    style={{ borderBottom: "none", padding: "6px 8px", fontSize: "14px" }}
                  >
                    {item}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenu(false);
                  }}
                  className="mobile-menu-link"
                  style={{ background: "none", border: "none", width: "100%", textAlign: "left", color: "#ff5b5b", cursor: "pointer", padding: "6px 8px", fontSize: "14px", borderBottom: "none" }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "12px", padding: "0 8px" }}>
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#94da32",
                    color: "#131313",
                    padding: "10px",
                    borderRadius: "4px",
                    fontWeight: "600",
                    fontSize: "12px",
                    textDecoration: "none",
                    fontFamily: "Space Grotesk",
                    letterSpacing: "1px"
                  }}
                >
                  LOGIN
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenu(false)}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    background: "transparent",
                    border: "1px solid #94da32",
                    color: "#94da32",
                    padding: "10px",
                    borderRadius: "4px",
                    fontWeight: "600",
                    fontSize: "12px",
                    textDecoration: "none",
                    fontFamily: "Space Grotesk",
                    letterSpacing: "1px"
                  }}
                >
                  SIGN UP
                </Link>
              </div>
            )}
          </div>

          {navItems.map((item) => {
            if (item.dropdown) {
              return (
                <div key={item.label} className="mobile-dropdown-wrapper">
                  <div
                    onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
                    className="mobile-menu-link mobile-dropdown-trigger"
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                  >
                    {item.label}
                    <span style={{ fontSize: "10px", transition: "transform 0.2s", transform: mobileBlogOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </div>
                  {mobileBlogOpen && (
                    <div className="mobile-dropdown-subitems" style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.route}
                          onClick={() => {
                            setMobileMenu(false);
                            setMobileBlogOpen(false);
                          }}
                          className="mobile-menu-link"
                          style={{ borderBottom: "none", paddingBottom: "8px", paddingTop: "8px", fontSize: "13px", color: "#c3c9b3" }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                to={item.route}
                onClick={() => setMobileMenu(false)}
                className="mobile-menu-link"
              >
                {item.label}
              </Link>
            );
          })}

          <div className="mobile-hotline">
            SUPPORT HOTLINE: +977-9745978217
          </div>
        </div>
      )}
    </header>
  );
}