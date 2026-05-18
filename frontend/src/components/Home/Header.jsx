 import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = screenWidth > 1100;
  const isTablet = screenWidth <= 1100;
  const isMobile = screenWidth <= 768;
  const isSmallMobile = screenWidth <= 480;

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
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          width: "100%",
          background: "rgba(19,19,19,0.97)",
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
              ? "12px 14px"
              : isMobile
              ? "14px 18px"
              : "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            boxSizing: "border-box",
          }}
        >
          {/* LEFT SIDE */}
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
                  fontFamily: "'Arial Black', sans-serif",
                  fontStyle: "italic",
                  fontSize: isSmallMobile
                    ? "16px"
                    : isMobile
                    ? "20px"
                    : isTablet
                    ? "24px"
                    : "30px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <span>
                  <span style={{ color: "#B5E75D" }}>N</span>
                  <span style={{ color: "#FFFFFF" }}>V</span>
                  <span style={{ color: "#B5E75D" }}>//</span>
                </span>

                <span style={{ color: "#FFFFFF" }}>
                  {isSmallMobile
                    ? "NV"
                    : isMobile
                    ? "NIGHTVISION"
                    : "NIGHTVISION™"}
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            {isDesktop && (
              <nav
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  flexWrap: "nowrap",
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
                      fontWeight: 600,
                      fontSize: "11px",
                      letterSpacing: "1px",
                      whiteSpace: "nowrap",
                      transition: "0.3s",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isSmallMobile ? "8px" : "12px",
              flexShrink: 0,
            }}
          >
            {/* HOTLINE */}
            {isDesktop && (
              <span
                style={{
                  fontFamily: "'Arial Black', sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "1px",
                  color: colors.secondary,
                  whiteSpace: "nowrap",
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
                textDecoration: "none",
              }}
            >
              <Icon
                name="shopping_cart"
                size={isSmallMobile ? 20 : 24}
                style={{
                  color: colors.onSurfaceVariant,
                  cursor: "pointer",
                }}
              />
            </Link>

            {/* ACCOUNT */}
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setAccountOpen(!accountOpen)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  name="account_circle"
                  size={isSmallMobile ? 20 : 24}
                  style={{
                    color: colors.onSurfaceVariant,
                  }}
                />
              </div>

              {accountOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "42px",
                    right: 0,
                    width: isSmallMobile ? "170px" : "220px",
                    background: "#1c1c1c",
                    border: "1px solid #434938",
                    borderRadius: "8px",
                    overflow: "hidden",
                    zIndex: 999,
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
                      to="#"
                      style={{
                        display: "block",
                        padding: isSmallMobile
                          ? "12px"
                          : "14px 16px",
                        color: "#c3c9b3",
                        textDecoration: "none",
                        borderBottom: "1px solid #343434",
                        fontFamily: "Inter",
                        fontSize: isSmallMobile ? "12px" : "14px",
                      }}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            {isTablet && (
              <div
                onClick={() => setMobileMenu(!mobileMenu)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Icon
                  name={mobileMenu ? "close" : "menu"}
                  size={isSmallMobile ? 22 : 28}
                  style={{
                    color: "#ffffff",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* MOBILE/TABLET MENU */}
        {isTablet && mobileMenu && (
          <div
            style={{
              width: "100%",
              background: "#131313",
              borderTop: "1px solid #2b2b2b",
              padding: isSmallMobile
                ? "18px 14px"
                : "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              boxSizing: "border-box",
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
                  fontSize: isSmallMobile ? "12px" : "14px",
                  letterSpacing: "1px",
                  borderBottom: "1px solid #2d2d2d",
                  paddingBottom: "14px",
                }}
              >
                {item.label}
              </Link>
            ))}

            {/* MOBILE HOTLINE */}
            <div
              style={{
                marginTop: "4px",
                color: colors.secondary,
                fontSize: isSmallMobile ? "10px" : "12px",
                fontFamily: "'Arial Black', sans-serif",
                lineHeight: 1.6,
              }}
            >
              SUPPORT HOTLINE:
              <br />
              +977-9745978217
            </div>
          </div>
        )}
      </header>
    </>
  );
}