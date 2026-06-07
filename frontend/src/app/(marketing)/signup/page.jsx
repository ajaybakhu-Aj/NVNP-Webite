import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../../utils/Icon";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ label: "None", score: 0 });
  const navigate = useNavigate();

  // Simple real-time password strength calculation
  useEffect(() => {
    if (!password) {
      setPasswordStrength({ label: "None", score: 0 });
      return;
    }

    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let label = "Weak";
    if (score >= 4) {
      label = "Strong";
    } else if (score >= 2) {
      label = "Medium";
    }

    setPasswordStrength({ label, score });
  }, [password]);

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all registration fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and protocols.");
      return;
    }

    setIsLoading(true);

    // Simulate account registration
    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Account registered successfully! Redirecting to login...");
      
      // Navigate to login page
      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
          <h1 className="auth-title">CREATE ACCOUNT</h1>
          <p className="auth-subtitle">Create an account to manage your devices and orders</p>
        </div>

        {error && (
          <div className="auth-error-banner">
            <Icon name="warning" size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="auth-error-banner" style={{ background: "rgba(148, 218, 50, 0.1)", border: "1px solid rgba(148, 218, 50, 0.3)", color: "#94da32" }}>
            <Icon name="check_circle" size={18} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSignUp} className="auth-form">
          {/* Full Name */}
          <div className="auth-input-group">
            <label className="auth-label" htmlFor="name-input">
              Full Name
            </label>
            <div className="auth-input-wrapper">
              <Icon name="person" size={18} className="input-icon" />
              <input
                id="name-input"
                type="text"
                className="auth-input"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
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
                autoComplete="new-password"
              />
            </div>
            
            {password && (
              <div style={{ marginTop: "4px" }}>
                <div className="password-strength-container">
                  <div className={`password-strength-bar ${passwordStrength.score >= 1 ? passwordStrength.label.toLowerCase() : ""}`} />
                  <div className={`password-strength-bar ${passwordStrength.score >= 3 ? passwordStrength.label.toLowerCase() : ""}`} />
                  <div className={`password-strength-bar ${passwordStrength.score >= 5 ? passwordStrength.label.toLowerCase() : ""}`} />
                </div>
                <div className="password-strength-text">
                  Password Strength: <strong style={{ color: passwordStrength.label === "Strong" ? "#94da32" : passwordStrength.label === "Medium" ? "#ffaa44" : "#ff5b5b" }}>{passwordStrength.label.toUpperCase()}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="auth-input-group">
            <label className="auth-label" htmlFor="confirm-password-input">
              CONFIRM Password
            </label>
            <div className="auth-input-wrapper">
              <Icon name="enhanced_encryption" size={18} className="input-icon" />
              <input
                id="confirm-password-input"
                type="password"
                className="auth-input"
                placeholder="Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="auth-checkbox-group" htmlFor="terms-checkbox">
            <input
              id="terms-checkbox"
              type="checkbox"
              className="auth-checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span className="auth-checkbox-label">
              I agree to the terms and privacy policy.
            </span>
          </label>

          {/* Submit Button */}
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <Icon name="sync" className="spin-slow" size={16} />
                <span>Registering account...</span>
              </>
            ) : (
              <>
                <Icon name="how_to_reg" size={16} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already registered? </span>
          <Link to="/login" className="auth-link">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
