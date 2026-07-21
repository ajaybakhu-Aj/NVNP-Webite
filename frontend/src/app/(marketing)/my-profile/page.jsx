import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../utils/Icon";

export default function MyProfilePage() {
  const [user, setUser] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setNameInput(parsed.name || "");
        setPhoneInput(parsed.phone || "+977-98XXXXXXXX");
      } catch (e) {
        console.error("Error loading profile session:", e);
      }
    }
    setLoading(false);
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    const updatedUser = {
      ...user,
      name: nameInput.trim().toUpperCase(),
      phone: phoneInput.trim()
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    alert("Profile updated successfully!");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="profile-dashboard-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <Icon name="sync" className="spin-slow" size={32} style={{ color: "#94da32" }} />
      </div>
    );
  }

  // Guard: Not authenticated
  if (!user) {
    return (
      <div className="profile-page-container">
        <div className="profile-card" style={{ maxWidth: "500px" }}>
          <div className="auth-card-corner top-left" />
          <div className="auth-card-corner top-right" />
          <div className="auth-card-corner bottom-left" />
          <div className="auth-card-corner bottom-right" />
          
          <div className="unauthorized-card-wrapper">
            <span className="lock-icon">
              <Icon name="lock" size={48} />
            </span>
            <h1 className="auth-title">LOGIN REQUIRED</h1>
            <p className="auth-subtitle" style={{ marginBottom: "28px" }}>
              Please log in to view your profile settings.
            </p>
            <Link to="/login" className="auth-button" style={{ textDecoration: "none" }}>
              <Icon name="login" size={16} />
              <span>Log In</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-dashboard-container">
      {/* Full-width Page Header */}
      <header className="profile-dashboard-header">
        <h1 className="profile-dashboard-title">Dashboard</h1>
        <p className="profile-dashboard-subtitle">
         <strong style={{ color: "#94da32" }}>{user.name}</strong>
        </p>
      </header>

      {/* Cyber Telemetry Status Cards */}
      

      {/* Dashboard Split Grid */}
      <div className="profile-dashboard-grid">
        {/* Left Side: Info Dossier Card */}
        <div className="profile-dossier-card">
          <div className="auth-card-corner top-left" />
          <div className="auth-card-corner top-right" />
          <div className="auth-card-corner bottom-left" />
          <div className="auth-card-corner bottom-right" />
          
          <div className="avatar-badge-circle" style={{ margin: "0 0 24px" }}>
            <Icon name="admin_panel_settings" size={42} />
          </div>

          <h3 className="auth-label" style={{ fontSize: "14px", marginBottom: "20px", color: "var(--nv-onSurf)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "8px" }}>
            User Specifications
          </h3>

          <div className="dossier-meta-item">
            <div className="dossier-meta-label">Name</div>
            <div className="dossier-meta-val highlight">{user.name}</div>
          </div>

          <div className="dossier-meta-item">
            <div className="dossier-meta-label">Email</div>
            <div className="dossier-meta-val">{user.email}</div>
          </div>

          <div className="dossier-meta-item">
            <div className="dossier-meta-label">Status Level</div>
            <div className="dossier-meta-val" style={{ color: "#b5e75d" }}>Active</div>
          </div>
        </div>

        {/* Right Side: Profile Form Card */}
        <div className="profile-config-card">
          <div className="auth-card-corner top-left" />
          <div className="auth-card-corner top-right" />
          <div className="auth-card-corner bottom-left" />
          <div className="auth-card-corner bottom-right" />

          <h3 className="auth-label" style={{ fontSize: "14px", marginBottom: "20px", color: "var(--nv-onSurf)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "8px" }}>
            Update Profile
          </h3>

          <form onSubmit={handleUpdateProfile} className="auth-form">
            {/* User Name */}
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="name-input">
                FULL NAME
              </label>
              <div className="auth-input-wrapper">
                <Icon name="person" size={18} className="input-icon" />
                <input
                  id="name-input"
                  type="text"
                  className="auth-input"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Contact Telemetry */}
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="phone-input">
                PHONE NUMBER
              </label>
              <div className="auth-input-wrapper">
                <Icon name="phone" size={18} className="input-icon" />
                <input
                  id="phone-input"
                  type="text"
                  className="auth-input"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Save Config */}
            <button type="submit" className="auth-button">
              <Icon name="save" size={16} />
              <span>Save Profile</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
