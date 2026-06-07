import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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



  return (
    <>
      <div className="nv-contact-container">
        {/* Header */}
        
        {/* Hero Section */}
        <section className="hero">
          <img 
            className="hero-bg-img"
            src="https://lh3.googleusercontent.com/aida/ADBb0uigFZm2MU_7fFkN1PGbqxTC4_zsd19WX1rPPXQ9Dq4i5EMbGW8uL59JfytFZsh1esNLU9nligJX4Uv90jKWL6D8MLXnq26q3GTMcyBfSr1_zrrXpo67IpigOrch4RSQvHkeqBk9x4VXRJLGzluFfWso-xnep3TZtUNQtmjjVkx4xUm72ROueuOlQghaRdACvRgs6p-gLEx5sf_1mpkxK_OjtZIMzVkcxp_k_5NJOEzBPjW9mg5vXhadcbQb9GP1FJGoMGX0s4cmKw"
            alt="surveillance"
          />
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse-dot"></span>
              <span className="hero-badge-text">CONTACT ACTIVE</span>
            </div>
            <h1 className="hero-title">CONTACT US</h1>
            <p className="hero-subtitle">
              OUR SURVEILLANCE SPECIALISTS ARE STANDING BY. CONNECT WITH OUR SURVEILLANCE EXPERTS FOR UNCOMPROMISING SECURITY SOLUTIONS.
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

            <div className="dealers-promo">
              <img 
                className="dealers-promo-img"
                src="https://lh3.googleusercontent.com/aida/ADBb0uiGsiUA8BUnPz5W1BtC1A_ddnZ32Idm7Lriupd_f9XBElLTooQIq8LxpmwvL2YNhOlnIM6fajbQO37s87483wAxAmFOSFmTKe1pazPPbbgd3GXXHcrOZ_FmxNDfw6K-hg-lOOEJbFQlrv8bng4iKNBuk3CmrTpr5TWqbqgmdqqkC3E0ukVn0vtWSWzkkeMXd6jGuf93ojASN3zONE-bZ3YSRayYWo69aKBJR-yvpokSdWgCPFbDyYKkXdgIqnB5dfIG_MoXHnoS"
                alt="dealer badge"
              />
              <div className="dealers-promo-content">
                <h4>WANT TO JOIN THE NETWORK?</h4>
                <p>WE ARE EXPANDING OUR ELITE DISTRIBUTION CHANNELS NATIONWIDE.</p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
                  <Link to="/apply-dealers" className="dealers-promo-link" style={{ textDecoration: 'none' }}>APPLY FOR DEALERSHIP</Link>
                  <a href="#" className="dealers-promo-link" onClick={(e) => { e.preventDefault(); alert("Dealer kit download initiated."); }}>REQUEST_DEALER_KIT.PDF</a>
                </div>
              </div>
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

    {/* WINDOWS STORE */}
    <Link
      to="/support/downloads"
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
    </Link>

  </div>
</section>

        {/* Footer */}
        
      </div>
    </>
  );
}