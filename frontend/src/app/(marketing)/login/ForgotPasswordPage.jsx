import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../../utils/Icon";
import {
  passwordResetRequest,
  passwordResetVerify,
  passwordResetConfirm,
} from "../../../utils/api";

// Server-side password reset: the backend generates the OTP, emails it to the
// account address, and verifies it. The browser never sees the code.
export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();

  // Cooldown timer for the resend button
  useEffect(() => {
    let timer = null;
    if (step === 2 && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await passwordResetRequest(email.trim());
      setSuccess(res.message || "If an account exists for that address, a verification code has been sent.");
      setCountdown(60);
      setStep(2);
    } catch (err) {
      setError(err.message || "Could not request a reset code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    try {
      await passwordResetVerify(email.trim(), otp);
      setStep(3);
    } catch (err) {
      setError(err.message || "Invalid verification code. Please check and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await passwordResetConfirm(email.trim(), otp, password);
      setSuccess("Your password has been successfully reset! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Could not reset your password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setSuccess("");
    setOtp("");
    setCountdown(60);
    try {
      const res = await passwordResetRequest(email.trim());
      setSuccess(res.message || "A new verification code has been sent.");
    } catch (err) {
      setError(err.message || "Could not resend the code. Please try again.");
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
          <h1 className="auth-title">RESET PASSWORD</h1>
          {step === 1 && <p className="auth-subtitle">Step 1: Enter email to request reset code</p>}
          {step === 2 && <p className="auth-subtitle">Step 2: Enter the 6-digit verification code</p>}
          {step === 3 && <p className="auth-subtitle">Step 3: Establish your new secure credentials</p>}
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

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="auth-form">
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="email-input">
                EMAIL ADDRESS
              </label>
              <div className="auth-input-wrapper">
                <Icon name="mail" size={18} className="input-icon" />
                <input
                  id="email-input"
                  type="email"
                  className="auth-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icon name="sync" className="spin-slow" size={16} />
                  <span>Requesting Code...</span>
                </>
              ) : (
                <>
                  <Icon name="send" size={16} />
                  <span>Send Reset OTP</span>
                </>
              )}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="auth-form">
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="otp-input">
                VERIFICATION CODE (OTP)
              </label>
              <div className="auth-input-wrapper">
                <Icon name="vpn_key" size={18} className="input-icon" />
                <input
                  id="otp-input"
                  type="text"
                  maxLength={6}
                  className="auth-input"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  required
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#8d937f", marginTop: -4, marginBottom: 12 }}>
              <span>The code expires in 10 minutes</span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={countdown > 0}
                style={{
                  background: "none",
                  border: "none",
                  color: countdown > 0 ? "#555" : "#94da32",
                  cursor: countdown > 0 ? "default" : "pointer",
                  fontWeight: 600,
                  fontSize: 12,
                  fontFamily: "inherit",
                  textDecoration: countdown > 0 ? "none" : "underline"
                }}
              >
                {countdown > 0 ? `Resend OTP (${countdown}s)` : "Resend OTP"}
              </button>
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icon name="sync" className="spin-slow" size={16} />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <Icon name="verified_user" size={16} />
                  <span>Verify OTP</span>
                </>
              )}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="auth-form">
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="password-input">
                NEW PASSWORD
              </label>
              <div className="auth-input-wrapper">
                <Icon name="lock" size={18} className="input-icon" />
                <input
                  id="password-input"
                  type="password"
                  className="auth-input"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label" htmlFor="confirm-password-input">
                CONFIRM NEW PASSWORD
              </label>
              <div className="auth-input-wrapper">
                <Icon name="lock" size={18} className="input-icon" />
                <input
                  id="confirm-password-input"
                  type="password"
                  className="auth-input"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icon name="sync" className="spin-slow" size={16} />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <Icon name="save" size={16} />
                  <span>Reset Password</span>
                </>
              )}
            </button>
          </form>
        )}

        <div className="auth-footer" style={{ marginTop: 24 }}>
          <Link to="/login" className="auth-link" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon name="arrow_back" size={16} />
            <span>Back to Login</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
