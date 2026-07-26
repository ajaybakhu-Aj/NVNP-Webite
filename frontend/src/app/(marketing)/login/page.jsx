import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../../utils/Icon";
import { authLogin } from "../../../utils/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password cannot be empty.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authLogin(email.trim(), password);
      const user = {
        ...result.user,
        loginTime: new Date().toISOString(),
      };
      // Cached for UI display only — real authorization is the Django session.
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = user.role === "Admin" ? "/admin/" : "/";
    } catch (err) {
      setIsLoading(false);
      if (err.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError(err.message || "Error connecting to server. Please try again.");
      }
    }
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
