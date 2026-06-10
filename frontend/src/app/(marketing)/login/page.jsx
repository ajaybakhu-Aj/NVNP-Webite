import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../../utils/Icon";
import { getAllAdmins } from "../../../utils/cmsDb";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password cannot be empty.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    // Simulate server verification delay
    setTimeout(() => {
      getAllAdmins().then((adminsList) => {
        const adminRecord = adminsList.find(x => x.email.toLowerCase() === email.toLowerCase());
        if (adminRecord) {
          // This email belongs to an admin!
          if (adminRecord.password === password) {
            const adminUser = {
              email: adminRecord.email,
              name: adminRecord.name,
              role: adminRecord.role || "Admin",
              loginTime: new Date().toISOString()
            };
            localStorage.setItem("user", JSON.stringify(adminUser));
            window.location.href = "/admin";
          } else {
            setIsLoading(false);
            setError("Incorrect password for administrator account.");
          }
        } else {
          // Regular user (Operator simulation)
          const mockUser = {
            email: email,
            name: email.split("@")[0].toUpperCase(),
            role: "Operator",
            loginTime: new Date().toISOString()
          };
          localStorage.setItem("user", JSON.stringify(mockUser));
          window.location.href = "/";
        }
      }).catch(() => {
        setIsLoading(false);
        setError("Error connecting to database. Please try again.");
      });
    }, 1200);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {/* Cyber aesthetics corner brackets */}
        <div className="auth-card-corner top-left" />
        <div className="auth-card-corner top-right" />
        <div className="auth-card-corner bottom-left" />
        <div className="auth-card-corner bottom-right" />

        <div className="auth-header">
          <h1 className="auth-title">LOGIN</h1>
          <p className="auth-subtitle">Sign in to access your account</p>
        </div>

        {error && (
          <div className="auth-error-banner">
            <Icon name="warning" size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">
          {/* Email Input */}
          <div className="auth-input-group">
            <label className="auth-label" htmlFor="email-input">
              EMAIL
            </label>
            <div className="auth-input-wrapper">
              <Icon name="mail" size={18} className="input-icon" />
              <input
                id="email-input"
                type="email"
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="auth-input-group">
            <label className="auth-label" htmlFor="password-input">
              PASSWORD
            </label>
            <div className="auth-input-wrapper">
              <Icon name="lock" size={18} className="input-icon" />
              <input
                id="password-input"
                type="password"
                className="auth-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Action Button */}
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <Icon name="sync" className="spin-slow" size={16} />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <Icon name="login" size={16} />
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer" style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <div>
            <span>New user? </span>
            <Link to="/signup" className="auth-link">
              Sign Up
            </Link>
          </div>
          <div>
            <Link to="/forgot-password" className="auth-link" style={{ fontSize: "13px" }}>
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
