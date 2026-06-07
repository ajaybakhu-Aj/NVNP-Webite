import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";
import { colors } from "../../data/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        background: colors.surfaceContainerLowest,
        borderTop: `1px solid ${colors.secondary}`,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "48px 24px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "40px",
          boxSizing: "border-box",
        }}
      >
        {/* BRAND */}
        <div
          style={{
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "'Arial Black', sans-serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(18px, 2vw, 28px)",
              marginBottom: "20px",
            }}
          >
            <span style={{ color: colors.secondary }}>N</span>
            <span style={{ color: "#fff" }}>V</span>
            <span style={{ color: colors.secondary }}>//</span>
            <span style={{ color: "#fff" }}>
              NIGHTVISION™
            </span>
          </div>

          <p
            style={{
              color: colors.onSurfaceVariant,
              fontSize: "15px",
              lineHeight: 1.8,
              maxWidth: "420px",
              marginBottom: "24px",
            }}
          >
            Dedicated to the highest standard of
            surveillance technology and national
            security for Nepal. Security is our duty.
          </p>

          <div
  style={{
    display: "flex",
    gap: "20px",
    alignItems: "center",
  }}
>
  <a
    href="https://www.instagram.com/nightvision_nepal/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon
      name="instagram"
      size={24}
      style={{
        color: colors.secondary,
        cursor: "pointer",
      }}
    />
  </a>

  <a
    href="https://www.facebook.com/nightvisioninterprises"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon
      name="facebook"
      size={24}
      style={{
        color: colors.secondary,
        cursor: "pointer",
      }}
    />
  </a>

  <a
    href="https://www.tiktok.com/@nvnightvisionnp?lang=en"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon
      name="music_note"
      size={24}
      style={{
        color: colors.secondary,
        cursor: "pointer",
      }}
    />
  </a>

  <a
    href="https://www.youtube.com/@nvnightvisionnp"
    target="_blank"
    rel="noopener noreferrer"
    >
    <Icon
      name="youtube"
      size={24}
      style={{
        color: colors.secondary,
        cursor: "pointer",
      }}
    />
  </a>
</div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h5
            style={{
              color: colors.secondary,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "20px",
              fontSize: "12px",
            }}
          >
            Quick Links
          </h5>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <li>
              <Link
                to="/products"
                style={linkStyle}
              >
                CCTV Cameras
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                style={linkStyle}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={linkStyle}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/dealership"
                style={linkStyle}
              >
                Dealerships
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                style={linkStyle}
              >
                Blog & Events
              </Link>
            </li>
          </ul>
        </div>

        {/* LEGAL & SUPPORT */}
        <div>
          <h5
            style={{
              color: colors.secondary,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "20px",
              fontSize: "12px",
            }}
          >
            Legal & Support
          </h5>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <li>
              <Link
                to="/privacy"
                style={linkStyle}
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                to="/terms"
                style={linkStyle}
              >
                Terms of Service
              </Link>
            </li>

            <li>
              <Link
                to="/support"
                style={linkStyle}
              >
                Support Center
              </Link>
            </li>

            <li>
              <Link
                to="/support/downloads"
                style={linkStyle}
              >
                App Downloads
              </Link>
            </li>
          </ul>
        </div>

        {/* CORPORATE */}
        <div>
          <h5
            style={{
              color: colors.secondary,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "20px",
              fontSize: "12px",
            }}
          >
            Corporate
          </h5>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <li>
              <Link
                to="/warranty"
                style={linkStyle}
              >
                Warranty Info
              </Link>
            </li>

            <li>
              <Link
                to="/careers"
                style={linkStyle}
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div
        style={{
          borderTop: `1px solid ${colors.outlineVariant}`,
          padding: "24px 16px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: colors.onSurfaceVariant,
            fontSize: "13px",
            letterSpacing: "1px",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          © {year} NIGHTVISION SECURITY SYSTEMS.
          ALL RIGHTS RESERVED. UNCOMPROMISING
          SECURITY.
        </p>
      </div>
    </footer>
  );
}

const linkStyle = {
  color: "#b8b8b8",
  textDecoration: "none",
  fontSize: "15px",
  lineHeight: 1.6,
};