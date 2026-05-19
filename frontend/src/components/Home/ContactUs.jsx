import React, { useState } from 'react';

export default function NightVisionContactPage() {
  const [formData, setFormData] = useState({
    subject: 'GENERAL_INQUIRY',
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      subject: 'GENERAL_INQUIRY',
      name: '',
      email: '',
      message: ''
    });
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .nv-contact-container {
      background-color: #131313;
      color: #e5e2e1;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
    }

    /* Header/TopAppBar */
    .header {
      position: sticky;
      top: 0;
      z-index: 50;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 16px 24px;
      max-width: 1280px;
      margin: 0 auto;
      border-bottom: 1px solid #434938;
      background-color: rgba(19, 19, 19, 0.95);
      backdrop-filter: blur(4px);
    }

    .header-logo {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #94da32;
    }

    .header-nav {
      display: none;
      gap: 48px;
      align-items: center;
    }

    @media (min-width: 768px) {
      .header-nav {
        display: flex;
      }
    }

    .header-nav a {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #c3c9b3;
      text-decoration: none;
      text-transform: uppercase;
      transition: color 0.2s;
    }

    .header-nav a:hover {
      color: #94da32;
    }

    .header-nav a.active {
      color: #94da32;
      border-bottom: 2px solid #94da32;
      padding-bottom: 8px;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .support-info {
      display: none;
      padding: 8px 16px;
      background-color: #2a2a2a;
      color: #94da32;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      border: 1px solid #434938;
    }

    @media (min-width: 1024px) {
      .support-info {
        display: block;
      }
    }

    .header-icons {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .header-icon-btn {
      background: none;
      border: none;
      color: #c3c9b3;
      cursor: pointer;
      font-size: 24px;
      transition: color 0.2s;
    }

    .header-icon-btn:hover {
      color: #94da32;
    }

    /* Hero Section */
    .hero {
      position: relative;
      height: 40vh;
      min-height: 300px;
      background-color: #b5e75d;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
      background-size: 100% 4px, 3px 100%;
      pointer-events: none;
      z-index: 10;
    }

    .hero-bg-img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.2;
      filter: grayscale(100%);
      z-index: 0;
    }

    .hero-content {
      position: relative;
      z-index: 20;
      text-align: center;
      padding: 0 24px;
    }

    .hero-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .pulse-dot {
      width: 12px;
      height: 12px;
      background-color: #dc2626;
      border-radius: 50%;
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .hero-badge-text {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #233600;
      text-transform: uppercase;
    }

    .hero-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 64px;
      font-weight: 700;
      letter-spacing: 4px;
      color: #233600;
      text-transform: uppercase;
      margin-bottom: 16px;
      line-height: 1.1;
    }

    .hero-subtitle {
      font-size: 18px;
      line-height: 1.6;
      color: #233600;
      max-width: 640px;
      margin: 0 auto;
      opacity: 0.8;
    }

    .hero-accent-tl {
      position: absolute;
      top: 32px;
      left: 32px;
      font-family: monospace;
      font-size: 10px;
      color: #233600;
      opacity: 0.5;
      z-index: 20;
    }

    .hero-accent-br {
      position: absolute;
      bottom: 32px;
      right: 32px;
      font-family: monospace;
      font-size: 10px;
      color: #233600;
      opacity: 0.5;
      z-index: 20;
    }

    /* Contact Cards */
    .contact-cards {
      padding: 80px 24px;
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }

    @media (min-width: 768px) {
      .contact-cards {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .contact-card {
      background-color: #1b1b1b;
      border: 1px solid #434938;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      transition: all 0.2s;
    }

    .contact-card:hover {
      border-color: #94da32;
    }

    .contact-card.featured {
      border-color: #94da32;
      box-shadow: 0 0 15px rgba(181, 231, 93, 0.2);
    }

    .card-icon-wrapper {
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #94da32;
      margin-bottom: 24px;
      background-color: #131313;
      transition: all 0.2s;
    }

    .contact-card:hover .card-icon-wrapper {
      background-color: #94da32;
      color: #131313;
    }

    .contact-card.featured .card-icon-wrapper {
      background-color: #94da32;
      color: #131313;
    }

    .card-icon {
      font-size: 32px;
    }

    .card-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #94da32;
      margin-bottom: 4px;
      text-transform: uppercase;
    }

    .card-subtitle {
      font-size: 16px;
      color: #c3c9b3;
      margin-bottom: 16px;
    }

    .card-content {
      space-y: 4px;
    }

    .card-content-item {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      color: #e5e2e1;
      font-weight: bold;
      margin-bottom: 8px;
    }

    /* Map Section */
    .map-section {
      padding: 0 24px 80px;
      max-width: 1280px;
      margin: 0 auto;
    }

    .map-container {
      position: relative;
      width: 100%;
      height: 500px;
      border: 1px solid #94da32;
      background-color: #0a0a0a;
      overflow: hidden;
    }

    .map-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
      opacity: 0.4;
      filter: grayscale(100%) sepia(30%) brightness(0.5);
    }

    .map-pin-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 20;
    }

    .map-pin-pulse {
      position: absolute;
      width: 80px;
      height: 80px;
      background-color: rgba(148, 218, 50, 0.2);
      border-radius: 50%;
      animation: mapPulse 2s infinite;
    }

    @keyframes mapPulse {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.5); opacity: 0; }
    }

    .map-pin {
      width: 24px;
      height: 24px;
      background-color: #94da32;
      border-radius: 50%;
      border: 4px solid #131313;
      position: relative;
      z-index: 30;
    }

    .map-pin-label {
      position: absolute;
      top: -48px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #94da32;
      color: #131313;
      padding: 4px 16px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      white-space: nowrap;
      z-index: 30;
    }

    .map-info-box {
      position: absolute;
      top: 16px;
      left: 16px;
      padding: 16px;
      border: 1px solid #434938;
      background-color: rgba(19, 19, 19, 0.8);
      backdrop-filter: blur(8px);
      z-index: 20;
    }

    .map-info-title {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #94da32;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .map-info-coords {
      font-family: monospace;
      font-size: 12px;
      color: #e5e2e1;
      margin-bottom: 16px;
    }

    .map-info-status {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10px;
      color: #c3c9b3;
      text-transform: uppercase;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background-color: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 8px #22c55e;
    }

    /* Form & Dealers Grid */
    .form-dealers-section {
      padding: 0 24px 80px;
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 80px;
    }

    @media (min-width: 1024px) {
      .form-dealers-section {
        grid-template-columns: 2fr 3fr;
      }
    }

    /* Form */
    .contact-form-wrapper {
      background-color: #1b1b1b;
      border: 1px solid #434938;
      padding: 48px;
      position: relative;
      overflow: hidden;
    }

    .contact-form-wrapper::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background-color: #94da32;
    }

    .form-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #e5e2e1;
      margin-bottom: 24px;
      text-transform: uppercase;
    }

    .form-group {
      margin-bottom: 24px;
    }

    .form-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #94da32;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .form-input,
    .form-select,
    .form-textarea {
      width: 100%;
      background-color: #131313;
      border: 1px solid #434938;
      color: #e5e2e1;
      padding: 16px;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      transition: all 0.2s;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #94da32;
      box-shadow: 0 0 8px rgba(148, 218, 50, 0.2);
    }

    .form-select option {
      background-color: #131313;
      color: #e5e2e1;
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .form-submit-btn {
      width: 100%;
      background-color: #94da32;
      color: #131313;
      border: none;
      padding: 16px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s;
    }

    .form-submit-btn:hover {
      background-color: #284300;
      color: #94da32;
    }

    .form-submit-btn:active {
      transform: scale(0.95);
    }

    /* Dealers */
    .dealers-wrapper {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .dealers-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 16px;
      border-bottom: 1px solid #434938;
    }

    .dealers-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #e5e2e1;
      text-transform: uppercase;
    }

    .dealers-badge {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #94da32;
      background-color: rgba(148, 218, 50, 0.1);
      border: 1px solid #94da32;
      padding: 4px 12px;
    }

    .dealers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 4px;
    }

    .dealer-card {
      background-color: #0e0e0e;
      border: 1px solid #434938;
      padding: 16px;
      transition: all 0.2s;
    }

    .dealer-card:hover {
      border-color: #94da32;
    }

    .dealer-name {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #94da32;
      margin-bottom: 4px;
    }

    .dealer-location {
      font-size: 10px;
      font-family: monospace;
      color: #c3c9b3;
    }

    .dealers-promo {
      padding: 24px;
      background-color: rgba(148, 218, 50, 0.05);
      border: 1px solid rgba(148, 218, 50, 0.2);
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .dealers-promo-img {
      width: 64px;
      height: 64px;
      border: 1px solid #94da32;
      object-fit: cover;
    }

    .dealers-promo-content h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #94da32;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .dealers-promo-content p {
      font-size: 16px;
      color: #c3c9b3;
      margin-bottom: 8px;
    }

    .dealers-promo-link {
      font-size: 12px;
      color: #94da32;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 4px;
      transition: color 0.2s;
    }

    .dealers-promo-link:hover {
      color: #e5e2e1;
    }

    /* =========================
   APP DOWNLOAD SECTION
========================= */

.app-download-section {
  padding: 0 24px 80px;
  max-width: 1280px;
  margin: 0 auto;
}

.app-download-box {
  background-color: #20201f;
  border: 2px solid #94da32;
  padding: 60px 40px;
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 0 20px rgba(181, 231, 93, 0.18);
}

/* BACKGROUND IMAGE */
.app-download-bg {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 33.333%;
  height: 100%;
  opacity: 0.08;
  object-fit: cover;
  filter: grayscale(100%);
  pointer-events: none;
}

/* CONTENT */
.app-download-content {
  position: relative;
  z-index: 20;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  text-align: center;

  gap: 48px;
}

/* DESKTOP */
@media (min-width: 768px) {
  .app-download-content {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

/* TEXT */
.app-download-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-download-text h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 42px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #94da32;
  text-transform: uppercase;
  margin-bottom: 18px;
  line-height: 1.1;
}

.app-download-text p {
  font-size: 18px;
  line-height: 1.8;
  color: #e5e2e1;
  max-width: 700px;
  opacity: 0.85;
}

/* BUTTONS WRAPPER */
.app-download-buttons {
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  align-items: center;

  gap: 24px;
}

/* BUTTON */
.app-download-btn {
  display: flex;
  align-items: center;
  gap: 14px;

  background-color: rgba(19, 19, 19, 0.95);

  border: 1px solid rgba(148, 218, 50, 0.35);

  padding: 16px 24px;

  color: #ffffff;

  border-radius: 16px;

  min-width: 240px;

  backdrop-filter: blur(8px);

  transition: none;

  box-shadow: 0 0 10px rgba(148, 218, 50, 0.08);
}

/* ICON */
.app-download-btn img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
}

/* APPLE ICON */
.apple-icon {
  filter: invert(1);
}

/* BUTTON TEXT */
.app-download-btn-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.app-download-btn-label {
  font-size: 10px;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.app-download-btn-name {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
  letter-spacing: 1px;
}
    /* Footer */
    .footer {
      width: 100%;
      padding: 48px 24px;
      background-color: #0e0e0e;
      border-top: 1px solid #94da32;
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }

    @media (min-width: 768px) {
      .footer {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .footer-brand h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 700;
      color: #94da32;
    }

    .footer-brand p {
      font-size: 10px;
      color: #c3c9b3;
      margin-top: 16px;
      line-height: 1.6;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .footer-section-title {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #94da32;
      margin-bottom: 16px;
      text-transform: uppercase;
    }

    .footer-section-nav {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .footer-section-nav a {
      font-size: 16px;
      color: #c3c9b3;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.2s;
    }

    .footer-section-nav a:hover {
      color: #94da32;
      text-decoration: underline;
      text-decoration-color: #94da32;
      text-decoration-thickness: 2px;
      text-underline-offset: 8px;
    }

    .footer-icons {
      display: flex;
      gap: 16px;
    }

    .footer-icon-btn {
      background: none;
      border: none;
      color: #94da32;
      cursor: pointer;
      font-size: 24px;
      transition: transform 0.2s;
    }

    .footer-icon-btn:hover {
      transform: scale(1.1);
    }

    .footer-copyright {
      font-size: 10px;
      color: #c3c9b3;
      margin-top: 16px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .crosshair::before {
      content: '+';
      position: absolute;
      top: 8px;
      left: 8px;
      color: #b5e75d;
      font-family: monospace;
      opacity: 0.5;
      font-size: 14px;
    }
      /* =========================================
   GLOBAL RESPONSIVE FIXES
========================================= */

img,
iframe {
  max-width: 100%;
  display: block;
}

body,
html {
  overflow-x: hidden;
}

/* =========================================
   HERO SECTION
========================================= */

@media (max-width: 1024px) {
  .hero-title {
    font-size: 52px;
  }

  .hero-subtitle {
    font-size: 16px;
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 260px;
    padding: 40px 20px;
  }

  .hero-title {
    font-size: 38px;
    letter-spacing: 2px;
  }

  .hero-subtitle {
    font-size: 14px;
    line-height: 1.5;
  }

  .hero-accent-tl,
  .hero-accent-br {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 30px;
  }

  .hero-badge-text {
    font-size: 10px;
  }
}

/* =========================================
   CONTACT CARDS
========================================= */

@media (max-width: 768px) {
  .contact-cards {
    padding: 50px 20px;
    gap: 20px;
  }

  .contact-card {
    padding: 20px;
  }

  .card-title {
    font-size: 20px;
  }

  .card-content-item {
    font-size: 18px;
    word-break: break-word;
  }
}

/* =========================================
   MAP SECTION
========================================= */

@media (max-width: 1024px) {
  .map-container {
    height: 450px !important;
  }
}

@media (max-width: 768px) {
  .map-section {
    padding: 0 16px 60px;
  }

  .map-container {
    height: 420px !important;
    border-radius: 18px !important;
  }
}

@media (max-width: 600px) {
  .map-container {
    height: 380px !important;
  }

  .map-info-box {
    width: calc(100% - 32px);
    left: 16px !important;
    top: 16px !important;
  }
}

/* =========================================
   INLINE MAP OVERLAY FIXES
========================================= */

@media (max-width: 768px) {
  div[style*="minWidth: 300px"] {
    min-width: unset !important;
    width: calc(100% - 32px) !important;
    left: 16px !important;
    top: 16px !important;
    padding: 16px !important;
  }

  div[style*="width: 280px"] {
    width: calc(100% - 32px) !important;
    right: 16px !important;
    bottom: 16px !important;
    padding: 16px !important;
  }
}

@media (max-width: 480px) {
  div[style*="minWidth: 300px"] h3 {
    font-size: 18px !important;
  }

  div[style*="minWidth: 300px"] p {
    font-size: 12px !important;
  }
}

/* =========================================
   FORM SECTION
========================================= */

@media (max-width: 1024px) {
  .form-dealers-section {
    gap: 50px;
  }

  .contact-form-wrapper {
    padding: 32px;
  }
}

@media (max-width: 768px) {
  .form-dealers-section {
    padding: 0 16px 60px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-title,
  .dealers-title {
    font-size: 28px;
    line-height: 1.2;
  }

  .contact-form-wrapper {
    padding: 24px;
  }

  .form-submit-btn {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .contact-form-wrapper {
    padding: 20px;
  }

  .form-input,
  .form-select,
  .form-textarea {
    padding: 14px;
    font-size: 14px;
  }
}

/* =========================================
   DEALERS GRID
========================================= */

@media (max-width: 768px) {
  .dealers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .dealers-grid {
    grid-template-columns: 1fr;
  }

  .dealer-card {
    padding: 14px;
  }
}

/* =========================================
   DEALER PROMO
========================================= */

@media (max-width: 768px) {
  .dealers-promo {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  .dealers-promo-content h4 {
    font-size: 18px;
  }

  .dealers-promo-content p {
    font-size: 14px;
  }
}

/* =========================================
   APP DOWNLOAD
========================================= */

@media (max-width: 768px) {
  .app-download-section {
    padding: 0 16px 60px;
  }

  .app-download-buttons {
    flex-direction: column;
    width: 100%;
  }

  .app-download-btn {
    width: 100%;
    min-width: unset;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .app-download-btn {
    padding: 14px 18px;
  }

  .app-download-btn-name {
    font-size: 12px;
  }
}

/* =========================================
   FOOTER
========================================= */

@media (max-width: 768px) {
  .footer {
    padding: 40px 20px;
    gap: 32px;
  }

  .footer-section-nav a {
    font-size: 14px;
  }
}

/* =========================================
   EXTRA SMALL DEVICES
========================================= */

@media (max-width: 360px) {
  .hero-title,
  .form-title,
  .dealers-title {
    font-size: 24px;
  }

  .card-content-item {
    font-size: 16px;
  }

  .app-download-btn {
    padding: 12px;
  }
}`;

  return (
    <>
      <style>{styles}</style>
      <div className="nv-contact-container">
        {/* Header */}
        
        {/* Hero Section */}
        <section className="hero">
          <img 
            className="hero-bg-img"
            src="https://lh3.googleusercontent.com/aida/ADBb0uigFZm2MU_7fFkN1PGbqxTC4_zsd19WX1rPPXQ9Dq4i5EMbGW8uL59JfytFZsh1esNLU9nligJX4Uv90jKWL6D8MLXnq26q3GTMcyBfSr1_zrrXpo67IpigOrch4RSQvHkeqBk9x4VXRJLGzluFfWso-xnep3TZtUNQtmjjVkx4xUm72ROueuOlQghaRdACvRgs6p-gLEx5sf_1mpkxK_OjtZIMzVkcxp_k_5NJOEzBPjW9mg5vXhadcbQb9GP1FJGoMGX0s4cmKw"
            alt="surveillance"
          />
          <div className="hero-accent-tl">
            LAT: 27.7172° N<br/>LON: 85.3240° E
          </div>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse-dot"></span>
              <span className="hero-badge-text">LIVE_CONNECTION_ESTABLISHED</span>
            </div>
            <h1 className="hero-title">CONTACT US</h1>
            <p className="hero-subtitle">
              OUR SURVEILLANCE SPECIALISTS ARE STANDING BY. CONNECT WITH THE COMMAND CENTER FOR UNCOMPROMISING SECURITY SOLUTIONS.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="contact-cards">
  <div className="contact-card">
    <div className="card-icon-wrapper">
      <span className="card-icon">📞</span>
    </div>

    <h3 className="card-title">CALL US</h3>

    <p className="card-subtitle">24/7 HELPLINE</p>

    <div className="card-content">
      <div className="card-content-item">
        <a
          href="tel:015925995"
          style={{
            color: "#e5e2e1",
            textDecoration: "none",
          }}
        >
          01-5925995
        </a>
      </div>

      <div className="card-content-item">
        <a
          href="tel:+9779745978217"
          style={{
            color: "#e5e2e1",
            textDecoration: "none",
          }}
        >
          +977-9745978217
        </a>
      </div>
    </div>
  </div>


          <a
  href="https://maps.app.goo.gl/WiF7jeWaksC2YRF37"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    textDecoration: "none",
  }}
>
  <div className="contact-card featured">
    <div className="card-icon-wrapper">
      <span className="card-icon">📍</span>
    </div>

    <h3 className="card-title">VISIT US</h3>

    <p className="card-subtitle">HEADQUARTER</p>

    <address
      style={{
        fontStyle: "normal",
      }}
      className="card-content"
    >
      <div className="card-content-item">
        Radhe Radhe
      </div>

      <div className="card-content-item">
        Bhaktapur, NEPAL
      </div>
    </address>
  </div>
</a>

          <div className="contact-card">
            <div className="card-icon-wrapper">
              <span className="card-icon">✉️</span>
            </div>
            <h3 className="card-title">E-MAIL US</h3>
            <p className="card-subtitle">COMMUNICATIONS</p>
            <div className="card-content">
  <div className="card-content-item">
    <a
      href="mailto:info@nightvision.com.np"
      style={{
        color: "#e5e2e1",
        textDecoration: "none",
      }}
    >
      info@nightvision.com.np
    </a>
  </div>

  <div className="card-content-item">
    <a
      href="https://www.nightvision.com.np"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#e5e2e1",
        textDecoration: "none",
      }}
    >
      www.nightvision.com.np
    </a>
  </div>
</div>
          </div>
        </section>

        {/* Map Section */}
<section
  className="map-section"
  style={{
    padding: "0 24px 80px",
    maxWidth: "1280px",
    margin: "0 auto",
  }}
>
  <div
    className="map-container"
    style={{
      position: "relative",
      width: "100%",
      height: "550px",
      borderRadius: "24px",
      overflow: "hidden",
      border: "2px solid #94da32",
      boxShadow: "0 0 30px rgba(148,218,50,0.2)",
      background: "#101010",
    }}
  >
    {/* GOOGLE MAP */}
    <iframe
      title="Night Vision CCTV Nepal"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d516.379656973646!2d85.3979903064471!3d27.677293954618367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1902e459720b%3A0x446057850e6bebe5!2sNight%20Vision%20CCTV%20Nepal!5e1!3m2!1sen!2snp!4v1778740476919!5m2!1sen!2snp"
      width="100%"
      height="100%"
      style={{
        border: 0,
      }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />

    {/* TOP GRADIENT */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "120px",
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.85), transparent)",
        zIndex: 2,
      }}
    />

    {/* BOTTOM GRADIENT */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "140px",
        background:
          "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
        zIndex: 2,
      }}
    />

    {/* LOCATION INFO CARD */}
    {/* LOCATION INFO CARD */}
<div
  style={{
    position: "absolute",

    top:
      window.innerWidth <= 480
        ? "12px"
        : "24px",

    left:
      window.innerWidth <= 480
        ? "12px"
        : "24px",

    right:
      window.innerWidth <= 480
        ? "12px"
        : "auto",

    zIndex: 5,

    background: "rgba(0,0,0,0.78)",

    backdropFilter: "blur(12px)",

    border: "1px solid rgba(148,218,50,0.3)",

    borderRadius:
      window.innerWidth <= 480
        ? "14px"
        : "18px",

    padding:
      window.innerWidth <= 480
        ? "14px"
        : "18px 22px",

    width:
      window.innerWidth <= 480
        ? "calc(100% - 24px)"
        : window.innerWidth <= 768
        ? "calc(100% - 48px)"
        : "340px",

    maxWidth: "100%",

    boxShadow:
      "0 0 20px rgba(148,218,50,0.15)",

    boxSizing: "border-box",

    overflow: "hidden",
  }}
>
  {/* RED LIVE DOT */}
  <div
    style={{
      display: "flex",

      alignItems: "center",

      gap: "10px",

      marginBottom: "12px",

      flexWrap: "wrap",
    }}
  >
    <div
      style={{
        width: "12px",

        height: "12px",

        borderRadius: "50%",

        background: "#ff2d2d",

        boxShadow: "0 0 14px #ff2d2d",

        animation: "pulse 1s infinite",

        flexShrink: 0,
      }}
    />

    <span
      style={{
        color: "#94da32",

        fontSize:
          window.innerWidth <= 480
            ? "10px"
            : "12px",

        letterSpacing: "2px",

        fontWeight: "700",

        fontFamily:
          "'Space Grotesk', sans-serif",

        lineHeight: 1.5,

        wordBreak: "break-word",
      }}
    >
      LIVE LOCATION ACTIVE
    </span>
  </div>

  <h3
    style={{
      color: "#ffffff",

      fontSize:
        window.innerWidth <= 480
          ? "18px"
          : window.innerWidth <= 768
          ? "20px"
          : "24px",

      marginBottom: "10px",

      fontFamily:
        "'Space Grotesk', sans-serif",

      lineHeight: 1.3,

      wordBreak: "break-word",
    }}
  >
    Night Vision CCTV Nepal
  </h3>

  <p
    style={{
      color: "#d4d4d4",

      lineHeight: 1.7,

      fontSize:
        window.innerWidth <= 480
          ? "12px"
          : "14px",

      marginBottom: "18px",

      wordBreak: "break-word",
    }}
  >
    Kathmandu, Nepal
    <br />
    Advanced Surveillance Headquarters
  </p>

  {/* GET DIRECTIONS BUTTON */}
  <a
    href="https://maps.app.goo.gl/QohWxPHLPzi1MPCu7"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "flex",

      justifyContent: "center",

      alignItems: "center",

      width:
        window.innerWidth <= 480
          ? "100%"
          : "fit-content",

      background: "#94da32",

      color: "#111",

      padding:
        window.innerWidth <= 480
          ? "12px"
          : "12px 18px",

      borderRadius: "12px",

      textDecoration: "none",

      fontWeight: "700",

      fontSize:
        window.innerWidth <= 480
          ? "12px"
          : "13px",

      letterSpacing: "1px",

      boxSizing: "border-box",

      textAlign: "center",
    }}
  >
    GET DIRECTIONS →
  </a>
</div>

    {/* COORDINATES CARD */}
    <div
      style={{
        position: "absolute",
        bottom: "24px",
        right: "24px",
        zIndex: 5,
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(148,218,50,0.25)",
        borderRadius: "18px",
        padding: "18px 22px",
        width: "280px",
      }}
    >
      <div
        style={{
          color: "#94da32",
          fontSize: "12px",
          letterSpacing: "2px",
          marginBottom: "14px",
          fontWeight: "700",
        }}
      >
        LOCATION COORDINATES
      </div>

      <div
        style={{
          color: "#ffffff",
          fontSize: "15px",
          lineHeight: 1.9,
        }}
      >
        LATITUDE:
        <span style={{ color: "#38bdf8", marginLeft: "8px" }}>
          27.677293° N
        </span>

        <br />

        LONGITUDE:
        <span style={{ color: "#facc15", marginLeft: "8px" }}>
          85.397990° E
        </span>
      </div>
    </div>

    {/* SCANLINE */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        background:
          "linear-gradient(to right, transparent, #94da32, transparent)",
        boxShadow: "0 0 18px #94da32",
        animation: "scanlineMove 4s linear infinite",
        zIndex: 4,
      }}
    />

    {/* ANIMATIONS */}
    <style>
      {`
        @keyframes pulse {
          0%,100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.35;
            transform: scale(0.75);
          }
        }

        @keyframes scanlineMove {
          0% {
            transform: translateY(0);
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          90% {
            opacity: 1;
          }

          100% {
            transform: translateY(550px);
            opacity: 0;
          }
        }
      `}
    </style>
  </div>
</section>

        {/* Form & Dealers */}
        <section className="form-dealers-section">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h2 className="form-title">SEND US A MESSAGE</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label className="form-label">PURPOSE</label>
                <select 
                  className="form-select"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                >
                  <option>GENERAL_INQUIRY</option>
                  <option>TECHNICAL_SUPPORT</option>
                  <option>DEALER_APPLICATION</option>
                  <option>WARRANTY_CLAIM</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">FULL NAME</label>
                  <input 
                    className="form-input"
                    type="text"
                    placeholder="FULL NAME"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">EMAIL</label>
                  <input 
                    className="form-input"
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Details</label>
                <textarea 
                  className="form-textarea"
                  placeholder="ENTER MESSAGE CONTENT..."
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button type="submit" className="form-submit-btn">SEND US MESSAGE</button>
            </form>
          </div>

          {/* Dealers */}
          <div className="dealers-wrapper">
            <div className="dealers-header">
              <h2 className="dealers-title">AUTHORIZED DEALER NETWORK</h2>
              <div className="dealers-badge">NEPAL</div>
            </div>

            <div className="dealers-grid">
              {[
                { name: 'R MOBILE', location: 'NEW ROAD, KATHMANDU' },
                { name: 'AXE TECH', location: 'JAWALAKHEL, LALITPUR' },
                { name: 'VISIONARY IT', location: 'CHIPLEDHUNGA, POKHARA' },
                { name: 'ELITE SECURE', location: 'MAIN ROAD, BIRATNAGAR' },
                { name: 'CYBER SENTRY', location: 'NARAYANGARH, CHITWAN' },
                { name: 'DHARAN CCTVS', location: 'BHANU CHOWK, DHARAN' },
                { name: 'KTM SOLUTIONS', location: 'PUTALISADAK, KATHMANDU' },
                { name: 'BUTWAL TECH', location: 'TRAFFIC CHOWK, BUTWAL' },
                { name: 'PRIME SECURITY', location: 'JANAKPUR DHAM' },
                { name: 'TECH GUARDIAN', location: 'NEPALGUNJ TOWN' },
                { name: 'MOUNTAIN TECH', location: 'HETAUDA, MAKWANPUR' },
                { name: 'EVEREST SECURE', location: 'DAMAK, JHAPA' },
              ].map((dealer, idx) => (
                <div key={idx} className="dealer-card">
                  <div className="dealer-name">{dealer.name}</div>
                  <div className="dealer-location">{dealer.location}</div>
                </div>
              ))}
            </div>

            <div className="dealers-promo">
              <img 
                className="dealers-promo-img"
                src="https://lh3.googleusercontent.com/aida/ADBb0uiGsiUA8BUnPz5W1BtC1A_ddnZ32Idm7Lriupd_f9XBElLTooQIq8LxpmwvL2YNhOlnIM6fajbQO37s87483wAxAmFOSFmTKe1pazPPbbgd3GXXHcrOZ_FmxNDfw6K-hg-lOOEJbFQlrv8bng4iKNBuk3CmrTpr5TWqbqgmdqqkC3E0ukVn0vtWSWzkkeMXd6jGuf93ojASN3zONE-bZ3YSRayYWo69aKBJR-yvpokSdWgCPFbDyYKkXdgIqnB5dfIG_MoXHnoS"
                alt="dealer badge"
              />
              <div className="dealers-promo-content">
                <h4>WANT TO JOIN THE NETWORK?</h4>
                <p>WE ARE EXPANDING OUR ELITE DISTRIBUTION CHANNELS NATIONWIDE.</p>
                <a href="#" className="dealers-promo-link">REQUEST_DEALER_KIT.PDF</a>
              </div>
            </div>
          </div>
        </section>

        {/* App Download */}
<section className="app-download-section">
  <div className="app-download-buttons">

    {/* PLAY STORE */}
    <a
      href="https://play.google.com/store"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <button className="app-download-btn">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg"
          alt="Google Play"
          style={{
            width: "28px",
            height: "28px",
            objectFit: "contain",
          }}
        />

        <div className="app-download-btn-text">
          <span className="app-download-btn-label">
            GET IT ON
          </span>

          <span className="app-download-btn-name">
            GOOGLE PLAY
          </span>
        </div>
      </button>
    </a>

    {/* APP STORE */}
    <a
      href="https://www.apple.com/app-store/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <button className="app-download-btn">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          alt="Apple App Store"
          style={{
            width: "24px",
            height: "24px",
            objectFit: "contain",
            filter: "invert(1)",
          }}
        />

        <div className="app-download-btn-text">
          <span className="app-download-btn-label">
            DOWNLOAD ON THE
          </span>

          <span className="app-download-btn-name">
            APP STORE
          </span>
        </div>
      </button>
    </a>

    {/* WINDOWS STORE */}
    <a
      href="https://apps.microsoft.com/store/apps"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <button className="app-download-btn">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg"
          alt="Windows Store"
          style={{
            width: "24px",
            height: "24px",
            objectFit: "contain",
          }}
        />

        <div className="app-download-btn-text">
          <span className="app-download-btn-label">
            INSTALL FOR
          </span>

          <span className="app-download-btn-name">
            WINDOWS
          </span>
        </div>
      </button>
    </a>

  </div>
</section>

        {/* Footer */}
        
      </div>
    </>
  );
}