import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";
import logo from "../../assets/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo-link">
            <img src={logo} alt="NightVision Logo" className="footer-logo-image" />
          </Link>

          <p className="footer-brand-desc">
            Dedicated to the highest standard of
            surveillance technology and national
            security for Nepal. Security is our duty.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/nightvision_nepal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                name="instagram"
                size={24}
                className="footer-social-icon"
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
                className="footer-social-icon"
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
                className="footer-social-icon"
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
                className="footer-social-icon"
              />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h5 className="footer-section-title">Quick Links</h5>
          <ul className="footer-links-list">
            <li>
              <Link to="/products" className="footer-link">
                CCTV Cameras
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/dealership" className="footer-link">
                Dealerships
              </Link>
            </li>
            <li>
              <Link to="/blog" className="footer-link">
                Blog & Events
              </Link>
            </li>
          </ul>
        </div>

        {/* LEGAL & SUPPORT */}
        <div>
          <h5 className="footer-section-title">Legal & Support</h5>
          <ul className="footer-links-list">
            <li>
              <Link to="/privacy" className="footer-link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="footer-link">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/support" className="footer-link">
                Support Center
              </Link>
            </li>
            <li>
              <Link to="/support/downloads" className="footer-link">
                App Downloads
              </Link>
            </li>
          </ul>
        </div>

        {/* CORPORATE */}
        <div>
          <h5 className="footer-section-title">Corporate</h5>
          <ul className="footer-links-list">
            <li>
              <Link to="/warranty" className="footer-link">
                Warranty Info
              </Link>
            </li>
            <li>
              <Link to="/careers" className="footer-link">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/apply-dealers" className="footer-link">
                Become a Dealer
              </Link>
            </li>
            <li>
              <Link to="/login" className="footer-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="footer-link">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-copyright-wrapper">
        <p className="footer-copyright-text">
          © {year} NIGHTVISION SECURITY SYSTEMS. ALL RIGHTS RESERVED. UNCOMPROMISING SECURITY.
        </p>
      </div>
    </footer>
  );
}