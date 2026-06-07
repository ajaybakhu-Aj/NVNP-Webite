import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    document.body.classList.remove("light-mode");
    localStorage.removeItem("theme");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = screenWidth >= 1200;
  const isTablet = screenWidth < 1200;
  const isMobile = screenWidth < 768;
  const isSmallMobile = screenWidth < 480;

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
      label: "BLOG & EVENTS",
      route: "/blog",
    },
    {
      label: "DOWNLOADS",
      route: "/support/downloads",
    },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        width: "100%",
        background: "rgba(19,19,19,0.98)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #2a2a2a",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isSmallMobile
            ? "10px 12px"
            : isMobile
            ? "12px 16px"
            : "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isDesktop ? "40px" : "0px",
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* LOGO */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "'Arial Black', sans-serif",
                fontStyle: "italic",
                whiteSpace: "nowrap",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <span
                style={{
                  fontSize: isSmallMobile
                    ? "14px"
                    : isMobile
                    ? "16px"
                    : isTablet
                    ? "22px"
                    : "30px",
                }}
              >
                <span style={{ color: "#B5E75D" }}>N</span>
                <span style={{ color: "#FFFFFF" }}>V</span>
                <span style={{ color: "#B5E75D" }}>//</span>
              </span>

              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: isSmallMobile
                    ? "14px"
                    : isMobile
                    ? "16px"
                    : isTablet
                    ? "18px"
                    : "26px",
                }}
              >
                NIGHTVISION™
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          {isDesktop && (
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.route}
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontFamily: "'Arial Black', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* RIGHT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isSmallMobile ? "10px" : "14px",
          }}
        >
          {isDesktop && (
            <span
              style={{
                color: colors.secondary,
                fontSize: "11px",
                fontFamily: "'Arial Black', sans-serif",
                letterSpacing: "1px",
              }}
            >
              SUPPORT HOTLINE: +977-9745978217
            </span>
          )}

          {/* CART */}
          <Link
            to="/cart"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name="shopping_cart"
              size={isSmallMobile ? 20 : 24}
              style={{
                color: colors.onSurfaceVariant,
              }}
            />
          </Link>

          {/* ACCOUNT */}
          {!isSmallMobile && (
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setAccountOpen(!accountOpen)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="account_circle"
                  size={24}
                  style={{
                    color: colors.onSurfaceVariant,
                  }}
                />
              </div>

              {accountOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "42px",
                    width: "220px",
                    background: "#1c1c1c",
                    border: "1px solid #434938",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  }}
                >
                  {[
                    "My Profile",
                    "Dashboard",
                    "Orders",
                    "Settings",
                    "Logout",
                  ].map((item) => (
                    <Link
                      key={item}
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      style={{
                        display: "block",
                        padding: "14px 16px",
                        color: "#c3c9b3",
                        textDecoration: "none",
                        borderBottom: "1px solid #333",
                        fontSize: "14px",
                      }}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MENU */}
          {isTablet && (
            <div
              onClick={() => setMobileMenu(!mobileMenu)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon
                name={mobileMenu ? "close" : "menu"}
                size={28}
                style={{
                  color: "#ffffff",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isTablet && mobileMenu && (
        <div
          style={{
            width: "100%",
            background: "#131313",
            borderTop: "1px solid #2b2b2b",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.route}
              onClick={() => setMobileMenu(false)}
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontFamily: "'Arial Black', sans-serif",
                fontSize: "14px",
                letterSpacing: "1px",
                paddingBottom: "14px",
                borderBottom: "1px solid #2d2d2d",
              }}
            >
              {item.label}
            </Link>
          ))}

          <div
            style={{
              color: colors.secondary,
              fontSize: "12px",
              lineHeight: "1.8",
              marginTop: "10px",
            }}
          >
            SUPPORT HOTLINE
            <br />
            +977-9745978217
          </div>
        </div>
      )}
    </header>
  );
}