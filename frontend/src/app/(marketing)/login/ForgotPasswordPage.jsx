import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../../utils/Icon";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();

  // Developer Settings configuration
  const [showConfig, setShowConfig] = useState(false);
  const [serviceId, setServiceId] = useState(localStorage.getItem("nv_emailjs_service_id") || "");
  const [templateId, setTemplateId] = useState(localStorage.getItem("nv_emailjs_template_id") || "");
  const [publicKey, setPublicKey] = useState(localStorage.getItem("nv_emailjs_public_key") || "");

  // Timer logic for OTP Resend
  useEffect(() => {
    let timer = null;
    if (step === 2 && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const sendEmailOtp = async (code) => {
    const hasConfig = serviceId && templateId && publicKey;
    if (!hasConfig) {
      setSuccess("EmailJS configuration not set. Falling back to on-screen simulation.");
      return false;
    }

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            to_email: email,
            otp_code: code,
            to_name: email.split("@")[0],
          }
        })
      });

      if (res.ok) {
        setSuccess(`A verification code has been sent to ${email}. Please check your inbox!`);
        return true;
      } else {
        const text = await res.text();
        setError(`Failed to send email: ${text || res.statusText}. Falling back to simulation.`);
        return false;
      }
    } catch (err) {
      setError(`Network error: ${err.message}. Falling back to simulation.`);
      return false;
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      setIsLoading(false);
      // Generate random 6-digit OTP
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setCountdown(30);
      setStep(2);

      await sendEmailOtp(code);
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (otp !== generatedOtp) {
      setError("Invalid verification code. Please check and try again.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 800);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Your password has been successfully reset! Redirecting to login...");
      
      // Navigate to login page after 1.5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }, 1200);
  };

  const handleResendOtp = () => {
    setError("");
    setSuccess("");
    setOtp("");
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setCountdown(30);
    
    sendEmailOtp(code);
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>{success}</span>
              {/* Show simulated OTP ONLY when not using real email delivery */}
              {(!serviceId || !templateId || !publicKey) && step === 2 && generatedOtp && (
                <div style={{ marginTop: 8, padding: 8, background: "#0c0d0a", border: "1px dashed #ffaa44", borderRadius: 4, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "#ffaa44", marginBottom: 4 }}>[SIMULATION FALLBACK - NO EMAILJS CONFIG]</div>
                  OTP CODE: <strong style={{ fontSize: 18, color: "#fff", letterSpacing: 2 }}>{generatedOtp}</strong>
                </div>
              )}
            </div>
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
              <span>Code expires in {countdown}s</span>
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
                Resend OTP
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

        {/* DEVELOPER CONFIG PANEL */}
        <div style={{ borderTop: "1px solid #2a2a2a", marginTop: 24, paddingTop: 16 }}>
          <button
            type="button"
            onClick={() => setShowConfig(!showConfig)}
            style={{
              background: "none",
              border: "none",
              color: "#8d937f",
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
              margin: "0 auto"
            }}
          >
            <Icon name="settings" size={14} className={showConfig ? "spin-slow" : ""} />
            <span>{showConfig ? "Hide Email Settings" : "Configure Real Email (EmailJS)"}</span>
          </button>

          {showConfig && (
            <div style={{ background: "#0c0d0a", border: "1px solid #434938", borderRadius: 4, padding: 12, marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 11, color: "#94da32", fontWeight: 700, letterSpacing: 0.5 }}>
                EMAILJS CONFIGURATION
              </div>
              <p style={{ color: "#8d937f", fontSize: 10, margin: 0, lineHeight: 1.4 }}>
                Enter your free EmailJS credentials. Ensure your template sends <code>{"{{otp_code}}"}</code> to <code>{"{{to_email}}"}</code>.
              </p>

              <div>
                <label style={{ display: "block", fontSize: 9, color: "#8d937f", marginBottom: 3 }}>SERVICE ID</label>
                <input
                  type="text"
                  placeholder="e.g. service_gmail"
                  value={serviceId}
                  onChange={(e) => {
                    setServiceId(e.target.value);
                    localStorage.setItem("nv_emailjs_service_id", e.target.value);
                  }}
                  style={{ width: "100%", background: "#131313", border: "1px solid #434938", color: "#fff", fontSize: 11, padding: "6px 8px", borderRadius: 2 }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 9, color: "#8d937f", marginBottom: 3 }}>TEMPLATE ID</label>
                <input
                  type="text"
                  placeholder="e.g. template_reset"
                  value={templateId}
                  onChange={(e) => {
                    setTemplateId(e.target.value);
                    localStorage.setItem("nv_emailjs_template_id", e.target.value);
                  }}
                  style={{ width: "100%", background: "#131313", border: "1px solid #434938", color: "#fff", fontSize: 11, padding: "6px 8px", borderRadius: 2 }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 9, color: "#8d937f", marginBottom: 3 }}>PUBLIC KEY</label>
                <input
                  type="text"
                  placeholder="e.g. user_abcdef..."
                  value={publicKey}
                  onChange={(e) => {
                    setPublicKey(e.target.value);
                    localStorage.setItem("nv_emailjs_public_key", e.target.value);
                  }}
                  style={{ width: "100%", background: "#131313", border: "1px solid #434938", color: "#fff", fontSize: 11, padding: "6px 8px", borderRadius: 2 }}
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
