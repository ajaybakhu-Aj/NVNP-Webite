import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../utils/Icon";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("notifications"); // "notifications", "config", "password"

  // States for notifications
  const [motionDetection, setMotionDetection] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  // States for system configuration
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [chatbotActive, setChatbotActive] = useState(true);

  // States for password change form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);

        // Load settings from localStorage if they exist, or set defaults
        const savedSettings = localStorage.getItem("settings_telemetry");
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setMotionDetection(parsedSettings.motionDetection !== false);
          setSoundAlerts(!!parsedSettings.soundAlerts);
          setEmailAlerts(parsedSettings.emailAlerts !== false);
          setSessionTimeout(parsedSettings.sessionTimeout || 30);
          setChatbotActive(parsedSettings.chatbotActive !== false);
        }
      } catch (e) {
        console.error("Error decoding user or settings metadata:", e);
      }
    }
    setLoading(false);
  }, []);

  const saveSettingsToStorage = (updatedSettings) => {
    localStorage.setItem("settings_telemetry", JSON.stringify(updatedSettings));
  };

  const handleToggleMotion = () => {
    const val = !motionDetection;
    setMotionDetection(val);
    saveSettingsToStorage({
      motionDetection: val,
      soundAlerts,
      emailAlerts,
      sessionTimeout,
      chatbotActive
    });
  };

  const handleToggleSound = () => {
    const val = !soundAlerts;
    setSoundAlerts(val);
    saveSettingsToStorage({
      motionDetection,
      soundAlerts: val,
      emailAlerts,
      sessionTimeout,
      chatbotActive
    });
  };

  const handleToggleEmail = () => {
    const val = !emailAlerts;
    setEmailAlerts(val);
    saveSettingsToStorage({
      motionDetection,
      soundAlerts,
      emailAlerts: val,
      sessionTimeout,
      chatbotActive
    });
  };

  const handleTimeoutChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setSessionTimeout(val);
    saveSettingsToStorage({
      motionDetection,
      soundAlerts,
      emailAlerts,
      sessionTimeout: val,
      chatbotActive
    });
  };

  const handleToggleChatbot = () => {
    const val = !chatbotActive;
    setChatbotActive(val);
    saveSettingsToStorage({
      motionDetection,
      soundAlerts,
      emailAlerts,
      sessionTimeout,
      chatbotActive: val
    });

    // Fire event to notify floating chatbot to show/hide if needed
    window.dispatchEvent(new CustomEvent("cyber-chatbot-toggle", { detail: { active: val } }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!currentPassword) {
      setFormError("Current password is required to authorize changes.");
      return;
    }

    if (newPassword.length < 6) {
      setFormError("New password must be at least 6 characters in length.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormError("Password mismatch. Confirmation password does not match new password.");
      return;
    }

    // Process change password simulation
    setFormSuccess("Password updated successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  if (loading) {
    return (
      <div className="settings-dashboard-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
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
              Please log in to access settings.
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
    <div className="settings-dashboard-container">
      {/* Page Header */}
      <header className="settings-dashboard-header">
        <h1 className="settings-dashboard-title">Account Settings</h1>
        <p className="settings-dashboard-subtitle">
          Manage notifications, system settings, and your password for account: <strong style={{ color: "#94da32" }}>{user.name}</strong>
        </p>
      </header>

      {/* Settings Tab Layout */}
      <div className="settings-dashboard-layout">
        
        {/* Left Column: Sidebar Profile and Navigation */}
        <aside className="settings-sidebar-nav">
          
          {/* User Profile Summary */}
          <div className="settings-sidebar-profile-card">
            <div className="auth-card-corner top-left" />
            <div className="auth-card-corner top-right" />
            <div className="auth-card-corner bottom-left" />
            <div className="auth-card-corner bottom-right" />
            
            <div className="settings-sidebar-avatar">
              <Icon name="person" size={32} />
            </div>
            
            <div className="settings-sidebar-name">{user.name}</div>
          </div>

          {/* Navigation Items */}
          <button 
            className={`settings-nav-item ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Icon name="notifications" size={18} className="settings-nav-item-icon" />
            <span>Notifications</span>
          </button>

          <button 
            className={`settings-nav-item ${activeTab === "config" ? "active" : ""}`}
            onClick={() => setActiveTab("config")}
          >
            <Icon name="settings" size={18} className="settings-nav-item-icon" />
            <span>Configuration</span>
          </button>

          <button 
            className={`settings-nav-item ${activeTab === "password" ? "active" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            <Icon name="lock" size={18} className="settings-nav-item-icon" />
            <span>Change Password</span>
          </button>
        </aside>

        {/* Right Column: Tab Panels Content */}
        <main className="settings-active-panel-wrapper">
          
          {/* TAB 1: Notifications */}
          {activeTab === "notifications" && (
            <div className="settings-group-card">
              <div className="auth-card-corner top-left" />
              <div className="auth-card-corner top-right" />
              <div className="auth-card-corner bottom-left" />
              <div className="auth-card-corner bottom-right" />

              <h2 className="settings-card-title">Notifications</h2>

              {/* Toggle 1 */}
              <div className="cyber-switch-group">
                <div className="cyber-switch-label">
                  <span className="cyber-switch-title">Motion Alerts</span>
                  <span className="cyber-switch-desc">Receive real-time push notifications if motion is detected.</span>
                </div>
                <label className="cyber-switch">
                  <input 
                    type="checkbox" 
                    className="cyber-switch-checkbox" 
                    checked={motionDetection}
                    onChange={handleToggleMotion}
                  />
                  <span className="cyber-switch-slider" />
                </label>
              </div>

              {/* Toggle 2 */}
              <div className="cyber-switch-group">
                <div className="cyber-switch-label">
                  <span className="cyber-switch-title">Audio Warnings</span>
                  <span className="cyber-switch-desc">Audible alert for system notifications.</span>
                </div>
                <label className="cyber-switch">
                  <input 
                    type="checkbox" 
                    className="cyber-switch-checkbox" 
                    checked={soundAlerts}
                    onChange={handleToggleSound}
                  />
                  <span className="cyber-switch-slider" />
                </label>
              </div>

              {/* Toggle 3 */}
              <div className="cyber-switch-group">
                <div className="cyber-switch-label">
                  <span className="cyber-switch-title">Email Dispatch</span>
                  <span className="cyber-switch-desc">Receive product updates and newsletters.</span>
                </div>
                <label className="cyber-switch">
                  <input 
                    type="checkbox" 
                    className="cyber-switch-checkbox" 
                    checked={emailAlerts}
                    onChange={handleToggleEmail}
                  />
                  <span className="cyber-switch-slider" />
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: System Configuration */}
          {activeTab === "config" && (
            <div className="settings-group-card">
              <div className="auth-card-corner top-left" />
              <div className="auth-card-corner top-right" />
              <div className="auth-card-corner bottom-left" />
              <div className="auth-card-corner bottom-right" />

              <h2 className="settings-card-title">Configuration</h2>

              {/* Slider input */}
              <div className="cyber-slider-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="cyber-switch-title">Session Timeout</span>
                  <span className="cyber-range-val">{sessionTimeout} MIN</span>
                </div>
                <p className="cyber-switch-desc" style={{ marginTop: "-8px" }}>
                  Automatically log out of your session when inactive.
                </p>
                <input 
                  type="range" 
                  min="15" 
                  max="120" 
                  step="5" 
                  className="cyber-range-input" 
                  value={sessionTimeout}
                  onChange={handleTimeoutChange}
                />
              </div>

              {/* Chatbot Toggle */}
              <div className="cyber-switch-group" style={{ marginTop: "12px" }}>
                <div className="cyber-switch-label">
                  <span className="cyber-switch-title">Chatbot Assistant</span>
                  <span className="cyber-switch-desc">Toggle the floating helper assistant globally.</span>
                </div>
                <label className="cyber-switch">
                  <input 
                    type="checkbox" 
                    className="cyber-switch-checkbox" 
                    checked={chatbotActive}
                    onChange={handleToggleChatbot}
                  />
                  <span className="cyber-switch-slider" />
                </label>
              </div>
            </div>
          )}

          {/* TAB 3: Change Password */}
          {activeTab === "password" && (
            <div className="settings-group-card">
              <div className="auth-card-corner top-left" />
              <div className="auth-card-corner top-right" />
              <div className="auth-card-corner bottom-left" />
              <div className="auth-card-corner bottom-right" />

              <h2 className="settings-card-title">Change Password</h2>

              <form onSubmit={handlePasswordSubmit} className="auth-form" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {formError && (
                  <div className="auth-error-msg" style={{ display: "flex", gap: "8px", alignItems: "center", border: "1px solid rgba(255, 68, 68, 0.4)", padding: "10px", borderRadius: "6px", background: "rgba(255, 68, 68, 0.1)", color: "#ff4444", fontSize: "12px" }}>
                    <Icon name="warning" size={16} />
                    <span>{formError}</span>
                  </div>
                )}
                {formSuccess && (
                  <div className="auth-success-msg" style={{ display: "flex", gap: "8px", alignItems: "center", border: "1px solid rgba(148, 218, 50, 0.4)", padding: "10px", borderRadius: "6px", background: "rgba(148, 218, 50, 0.1)", color: "#94da32", fontSize: "12px" }}>
                    <Icon name="check_circle" size={16} />
                    <span>{formSuccess}</span>
                  </div>
                )}

                {/* Current Password */}
                <div className="auth-input-group">
                  <label className="auth-label" htmlFor="current-pass">CURRENT PASSWORD</label>
                  <div className="auth-input-wrapper">
                    <Icon name="lock" size={18} className="input-icon" />
                    <input 
                      id="current-pass" 
                      type="password" 
                      className="auth-input" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div className="auth-input-group">
                  <label className="auth-label" htmlFor="new-pass">NEW PASSWORD</label>
                  <div className="auth-input-wrapper">
                    <Icon name="vpn_key" size={18} className="input-icon" />
                    <input 
                      id="new-pass" 
                      type="password" 
                      className="auth-input" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 characters"
                    />
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="auth-input-group">
                  <label className="auth-label" htmlFor="confirm-pass">CONFIRM PASSWORD</label>
                  <div className="auth-input-wrapper">
                    <Icon name="key" size={18} className="input-icon" />
                    <input 
                      id="confirm-pass" 
                      type="password" 
                      className="auth-input" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new key"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" className="auth-button" style={{ marginTop: "8px" }}>
                  <Icon name="shield" size={16} />
                  <span>Update Password</span>
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
