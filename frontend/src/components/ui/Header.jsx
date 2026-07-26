import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../utils/Icon";
import { useSiteContents } from "../../utils/cmsDb";
import { getAllProducts } from "../../utils/productDb";
import { authLogout } from "../../utils/api";

export default function Header() {
  const siteContents = useSiteContents();
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

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

    // Load products for search
    getAllProducts().then((prods) => setAllProducts(prods));

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    authLogout().catch(() => {});
    localStorage.removeItem("user");
    setUser(null);
    setAccountOpen(false);
    window.location.href = "/";
  };

  const navItems = [
    {
      label: "PRODUCTS",
      route: "/products",
    },
    {
      label: "ABOUT",
      dropdown: [
        { label: "About Us", route: "/about" },
        { label: "About CEO", route: "/founder" },
      ],
    },
    {
      label: "CONTACT US",
      route: "/contact",
    },
    {
      label: "DEALERS",
      route: "/dealership",
    },
    {
      label: "RESOURCES",
      dropdown: [
        { label: "Blogs", route: "/blog" },
        { label: "News and Events", route: "/events" },
        { label: "Gallery", route: "/gallery" },
      ],
    },
  ];

  // ── Search logic ──────────────────────────────────────────────────────────
  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setSearchQuery("");
    setSearchResults([]);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const handleEsc = (e) => { if (e.key === "Escape") closeSearch(); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matched = allProducts.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const cat = (p.category || "").toLowerCase();
      const type = (p.productType || "").toLowerCase();
      return name.includes(q) || cat.includes(q) || type.includes(q);
    });
    setSearchResults(matched.slice(0, 12));
  }, [searchQuery, allProducts]);

  const handleResultClick = (product) => {
    closeSearch();
    navigate(`/product/${product.id}`);
  };

  return (
    <header className="app-header">
      <div className="header-container max-w-[1280px] mx-auto px-[20px] md:px-[24px] w-full">
        {/* LEFT */}
        <div className="header-left">
          {/* LOGO */}
          <Link to="/" className="logo-link">
            <img src="/logo.png" alt="NightVision Logo" className="logo-image" />
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

            {/* SUPPORT HOTLINE — inside nav so gap is identical to nav items */}
            <div className="support-hotline">
              <div className="hotline-label">SUPPORT HOTLINE</div>
              <a href={`tel:${siteContents.supportHelpline || "+977-9745978217"}`} className="hotline-number">
                {siteContents.supportHelpline || "+977-9745978217"}
              </a>
            </div>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="header-right">
          {/* SEARCH */}
          <div
            onClick={openSearch}
            className="search-trigger"
            title="Search products"
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Icon
              name="search"
              size={24}
              className="header-icon search-icon"
            />
          </div>

          {/* CART */}
          <Link to="/cart" className="cart-link">
            <Icon
              name="shopping_cart"
              size={24}
              className="header-icon cart-icon"
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
                className="header-icon account-icon"
              />
            </div>

            {accountOpen && (
              <div className="account-dropdown">
                {user && (
                  <div className="dropdown-user-info" style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "11px", color: "var(--nv-secondary)", fontWeight: "600", textTransform: "uppercase" }}>
                    USER: {user.name}
                  </div>
                )}
                
                {!user && (
                  <>
                    <Link
                      to="/login"
                      className="dropdown-link"
                      style={{ color: "var(--nv-secondary)", fontWeight: "600" }}
                      onClick={() => setAccountOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="dropdown-link"
                      style={{ color: "var(--nv-secondary)", fontWeight: "600", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
                      onClick={() => setAccountOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                {[
                  "My Profile",
                  ...(user && user.role === "Admin" ? ["System Console"] : []),
                  "Dashboard",
                  "Orders",
                  "Settings"
                ].map((item) => {
                  if (item === "System Console") {
                    return (
                      <a
                        key={item}
                        href="/admin/"
                        className="dropdown-link"
                        onClick={() => setAccountOpen(false)}
                      >
                        System Console
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={item}
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="dropdown-link"
                      onClick={() => setAccountOpen(false)}
                    >
                      {item}
                    </Link>
                  );
                })}

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
              className="header-icon menu-icon"
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
                <div className="mobile-user-info" style={{ color: "var(--nv-secondary)", fontSize: "11px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", padding: "0 8px 4px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
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
                    background: "var(--nv-secondary)",
                    color: "var(--nv-onPrimaryContainer, #111)",
                    padding: "10px",
                    borderRadius: "4px",
                    fontWeight: "600",
                    fontSize: "12px",
                    textDecoration: "none",
                    fontFamily: "Poppins",
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
                    color: "var(--nv-secondary)",
                    padding: "10px",
                    borderRadius: "4px",
                    fontWeight: "600",
                    fontSize: "12px",
                    textDecoration: "none",
                    fontFamily: "Poppins",
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
              const isAbout = item.label === "ABOUT";
              const isOpen = isAbout ? mobileAboutOpen : mobileBlogOpen;
              const toggleOpen = () => isAbout ? setMobileAboutOpen(!mobileAboutOpen) : setMobileBlogOpen(!mobileBlogOpen);

              return (
                <div key={item.label} className="mobile-dropdown-wrapper">
                  <div
                    onClick={toggleOpen}
                    className="mobile-menu-link mobile-dropdown-trigger"
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                  >
                    {item.label}
                    <span style={{ fontSize: "10px", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </div>
                  {isOpen && (
                    <div className="mobile-dropdown-subitems" style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.route}
                          onClick={() => {
                            setMobileMenu(false);
                            setMobileAboutOpen(false);
                            setMobileBlogOpen(false);
                          }}
                          className="mobile-menu-link"
                          style={{ borderBottom: "none", paddingBottom: "8px", paddingTop: "8px", fontSize: "13px", color: "var(--nv-onSurfVar)" }}
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
            SUPPORT HOTLINE: {siteContents.supportHelpline || "+977-9745978217"}
          </div>
        </div>
      )}

      {/* ── SEARCH OVERLAY ── */}
      {searchOpen && (
        <div
          className="search-overlay"
          onClick={closeSearch}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "var(--nv-bg)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "clamp(80px,15vh,160px)",
            padding: "clamp(80px,15vh,160px) 16px 40px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 680,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Close button */}
            <button
              onClick={closeSearch}
              style={{
                alignSelf: "flex-end",
                background: "var(--nv-surfHi)",
                border: "1px solid rgba(148,218,50,0.3)",
                color: "var(--nv-onSurf)",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: 8,
                marginBottom: 8,
              }}
            >
              <Icon name="close" size={20} />
            </button>

            {/* Search input */}
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--nv-outline)",
                  display: "flex",
                }}
              >
                <Icon name="search" size={22} />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, category, or type…"
                style={{
                  width: "100%",
                  background: "var(--nv-surfCont)",
                  border: "2px solid #94da32",
                  borderRadius: 12,
                  padding: "18px 20px 18px 54px",
                  color: "var(--nv-onSurf)",
                  fontSize: 16,
                  fontFamily: "Poppins, sans-serif",
                  outline: "none",
                  boxShadow: "0 0 30px rgba(148,218,50,0.15)",
                }}
              />
            </div>

            {/* Results */}
            {searchQuery.trim() && (
              <div
                style={{
                  background: "var(--nv-surfCont)",
                  border: "1px solid #434938",
                  borderRadius: 12,
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                {searchResults.length === 0 ? (
                  <div
                    style={{
                      padding: "40px 20px",
                      textAlign: "center",
                      color: "var(--nv-outline)",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: 13,
                    }}
                  >
                    No products found matching "{searchQuery}"
                  </div>
                ) : (
                  searchResults.map((product, idx) => (
                    <div
                      key={product.id}
                      onClick={() => handleResultClick(product)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "14px 20px",
                        cursor: "pointer",
                        borderBottom: idx < searchResults.length - 1 ? "1px solid #434938" : "none",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(148,218,50,0.08)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      {/* Thumbnail */}
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 8,
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "var(--nv-surfHi)",
                          border: "1px solid #434938",
                        }}
                      >
                        <img
                          src={product.img}
                          alt={product.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: 14,
                            fontWeight: 600,
                            color: "var(--nv-onSurf)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {product.name}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            marginTop: 4,
                            flexWrap: "wrap",
                          }}
                        >
                          {product.category && (
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 600,
                                letterSpacing: "0.5px",
                                color: "var(--nv-secondary)",
                                background: "var(--nv-surfHi)",
                                padding: "2px 8px",
                                borderRadius: 4,
                                fontFamily: "Space Grotesk, sans-serif",
                              }}
                            >
                              {product.category}
                            </span>
                          )}
                          {product.productType && (
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 600,
                                letterSpacing: "0.5px",
                                color: "var(--nv-onSurfVar)",
                                background: "var(--nv-surfHi)",
                                padding: "2px 8px",
                                borderRadius: 4,
                                fontFamily: "Space Grotesk, sans-serif",
                              }}
                            >
                              {product.productType}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: 14,
                          fontWeight: 700,
                          color: "var(--nv-primary)",
                          flexShrink: 0,
                        }}
                      >
                        Rs. {product.price?.toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Hint */}
            {!searchQuery.trim() && (
              <div
                style={{
                  textAlign: "center",
                  color: "var(--nv-outline)",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 12,
                  marginTop: 12,
                }}
              >
                Search by product name, category, or type. Press <span style={{ color: "var(--nv-primary)", fontWeight: 700 }}>ESC</span> to close.
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}