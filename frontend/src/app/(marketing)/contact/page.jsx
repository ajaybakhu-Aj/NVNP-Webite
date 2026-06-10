import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Globe } from 'lucide-react';
import { saveContact, getSettings, saveActivity, useSiteContents } from '../../../utils/cmsDb';
import PageHeroBanner from '../../../components/ui/PageHeroBanner';
import Icon from '../../../utils/Icon';

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

  const [settings, setSettings] = useState(null);
  const siteContents = useSiteContents();

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all message details.");
      return;
    }

    const newContact = {
      id: "msg-" + Math.floor(10000 + Math.random() * 90000),
      subject: formData.subject,
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      status: "Unread",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    };

    saveContact(newContact).then(() => {
      saveActivity(`New client message received from: ${newContact.name} (${newContact.email})`, "contact");
      alert("Your message has been safely transmitted to our operations team. Code: " + newContact.id);
      setFormData({
        subject: 'GENERAL_INQUIRY',
        name: '',
        email: '',
        message: ''
      });
    }).catch(err => {
      console.error("Message transmission failed:", err);
      alert("Transmission failed. Please check console.");
    });
  };



  return (
    <>
      <div className="nv-contact-container">
        {/* Header */}
        
        {/* Hero Section */}
        <PageHeroBanner
          title={siteContents.contactHeroTitle || "CONTACT US"}
          subtitle={siteContents.contactHeroSubtitle || "Our surveillance specialists are standing by. Connect with our team for uncompromising security solutions."}
        />

        {/* Contact Cards */}
        <section className="contact-cards">
  <div className="contact-card">
    <div className="card-icon-wrapper">
      <Phone size={32} className="contact-card-icon" />
    </div>

    <h3 className="card-title">CALL US</h3>

    <p className="card-subtitle">24/7 HELPLINE</p>

    <div className="card-content">
      <div className="card-content-item">
        <a
          href={`tel:${settings?.helpline1 || "015925995"}`}
          style={{
            color: "#e5e2e1",
            textDecoration: "none",
          }}
        >
          {settings?.helpline1 || "01-5925995"}
        </a>
      </div>

      <div className="card-content-item">
        <a
          href={`tel:${settings?.helpline2 || "+9779745978217"}`}
          style={{
            color: "#e5e2e1",
            textDecoration: "none",
          }}
        >
          {settings?.helpline2 || "+977-9745978217"}
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
  <div className="contact-card">
    <div className="card-icon-wrapper">
      <MapPin size={32} className="contact-card-icon" />
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
        {settings?.address || "Radhe Radhe, Bhaktapur, NEPAL"}
      </div>
    </address>
  </div>
</a>

          <div className="contact-card">
            <div className="card-icon-wrapper">
              <Mail size={32} className="contact-card-icon" />
            </div>
            <h3 className="card-title">E-MAIL US</h3>
            <p className="card-subtitle">COMMUNICATIONS</p>
    <div className="card-content">
      <div className="card-content-item">
        <a
          href={`mailto:${settings?.email || "info@nightvision.com.np"}`}
          style={{
            color: "#e5e2e1",
            textDecoration: "none",
          }}
        >
          {settings?.email || "info@nightvision.com.np"}
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
      src={siteContents.contactMapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d516.379656973646!2d85.3979903064471!3d27.677293954618367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1902e459720b%3A0x446057850e6bebe5!2sNight%20Vision%20CCTV%20Nepal!5e1!3m2!1sen!2snp!4v1778740476919!5m2!1sen!2snp"}
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
    {siteContents.contactMapTitle || "Night Vision CCTV Nepal"}
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
    {siteContents.contactMapLocationName || "Kathmandu, Nepal"}
    <br />
    {siteContents.contactMapLocationDesc || "Advanced Surveillance Headquarters"}
  </p>

  {/* GET DIRECTIONS BUTTON */}
  <a
    href={siteContents.contactMapDirectionsUrl || "https://maps.app.goo.gl/QohWxPHLPzi1MPCu7"}
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
          {siteContents.contactMapLat || "27.677293° N"}
        </span>

        <br />

        LONGITUDE:
        <span style={{ color: "#facc15", marginLeft: "8px" }}>
          {siteContents.contactMapLng || "85.397990° E"}
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
                { name: 'Nano Tek', location: 'KanchanBari, Biratnagar', province: 'Koshi Province [01]', route: '/dealer/nanotek' },
                { name: 'White Pearl', location: 'Janakpurdham, Dhanusha', province: 'Madhesh Province [02]', route: '/dealer/whitepearl' },
                { name: 'Night Vision CCTV', location: 'Bhaktapur Secure Depot', province: 'Bagmati Province [03]', route: '/dealer/night-vision' },
                { name: 'SR Suppliers', location: 'Bardaghat, Nawalparasi', province: 'Gandaki Province [04]', route: '/dealer/srsuppliers' },
                { name: 'AXE-Tech', location: 'Kohalpur, Banke', province: 'Karnali Province [06]', route: '/dealer/axetech' },
                { name: 'Joshi Kyodai', location: 'Dhangadi, Kailali', province: 'Sudurpashchim Province [07]', route: '/dealer/joshi-kyodai' }
              ].map((dealer, idx) => (
                <Link to={dealer.route} key={idx} style={{ textDecoration: 'none' }}>
                  <div className="dealer-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '110px' }}>
                    <div>
                      <div className="dealer-province" style={{ fontSize: '9px', color: '#c3c9b3', opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'monospace' }}>
                        {dealer.province}
                      </div>
                      <div className="dealer-name" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '700', color: '#94da32', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {dealer.name} <span style={{ fontSize: '10px', opacity: 0.8 }}>↗</span>
                      </div>
                    </div>
                    <div className="dealer-location" style={{ fontSize: '10px', color: '#c3c9b3', marginTop: 'auto' }}>{dealer.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* App Download */}
<section className="app-download-section">
  <div className="app-download-buttons">

    {/* PLAY STORE */}
    <Link
      to="/support/downloads"
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
    </Link>

    {/* APP STORE */}
    <Link
      to="/support/downloads"
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
    </Link>

    {/* WEB VIEW */}
    <Link
      to="/support/downloads"
      style={{ textDecoration: "none" }}
    >
      <button className="app-download-btn">
        <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Globe size={24} style={{ color: "#b5e75d" }} />
        </div>

        <div className="app-download-btn-text">
          <span className="app-download-btn-label">
            ACCESS ON
          </span>

          <span className="app-download-btn-name">
            WEB VIEW
          </span>
        </div>
      </button>
    </Link>

  </div>
</section>

        {/* Footer */}
        
      </div>
    </>
  );
}