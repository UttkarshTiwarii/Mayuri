import { useState, type FormEvent } from "react";
import type { PageName } from "../types";

type AuthPageProps = {
  onPageChange: (page: PageName) => void;
  onToast: (message: string) => void;
};

export default function AuthPage({ onPageChange, onToast }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const completeAuth = (message: string) => {
    onToast(message);
    onPageChange("home");
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    completeAuth("Welcome back!");
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      onToast("Passwords do not match");
      return;
    }

    completeAuth("Account created! Welcome to MAYURI");
  };

  return (
    <div className="page active" id="auth-page">
      <div className="auth-wrap">
        <div className="auth-visual">
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }} viewBox="0 0 600 900" fill="none">
            <ellipse cx="300" cy="400" rx="14" ry="320" fill="white" />
            <ellipse cx="300" cy="240" rx="180" ry="180" fill="none" stroke="white" strokeWidth="2" />
            <ellipse cx="300" cy="240" rx="110" ry="110" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
          </svg>
          <div className="auth-visual-content">
            <h3>Welcome to<br />MAYURI</h3>
            <p>Sign in to access your wishlist, track orders, and enjoy an exclusive shopping experience tailored just for you.</p>
          </div>
        </div>

        <div className="auth-form-wrap">
          <div className="auth-form">
            <div className="auth-tabs">
              <button className={`auth-tab ${activeTab === "login" ? "active" : ""}`} type="button" onClick={() => setActiveTab("login")}>Sign In</button>
              <button className={`auth-tab ${activeTab === "register" ? "active" : ""}`} type="button" onClick={() => setActiveTab("register")}>Create Account</button>
            </div>

            {activeTab === "login" && (
              <form id="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input className="form-input" type="email" placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input className="form-input" type="password" placeholder="********" required />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, marginTop: -8 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "var(--text-muted)" }}>
                    <input type="checkbox" style={{ accentColor: "var(--teal)" }} /> Remember me
                  </label>
                  <a href="#" style={{ fontSize: 13, color: "var(--teal)", textDecoration: "none" }}>Forgot password?</a>
                </div>
                <button className="form-submit" type="submit">Sign In</button>
                <div className="form-divider">or continue with</div>
                <div className="social-login">
                  <button className="social-login-btn" type="button">Google</button>
                  <button className="social-login-btn" type="button">Facebook</button>
                </div>
              </form>
            )}

            {activeTab === "register" && (
              <form id="register-form" onSubmit={handleRegister}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input className="form-input" type="text" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input className="form-input" type="email" placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input className="form-input" type="tel" placeholder="+91 98765 43210" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input className="form-input" name="password" type="password" placeholder="Create a strong password" minLength={8} required />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input className="form-input" name="confirmPassword" type="password" placeholder="Re-enter your password" minLength={8} required />
                </div>
                <div style={{ marginBottom: 20, marginTop: -4 }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)" }}>
                    <input type="checkbox" style={{ accentColor: "var(--teal)", marginTop: 3 }} required />
                    I agree to receive style updates and accept the terms of service.
                  </label>
                </div>
                <button className="form-submit" type="submit">Create Account</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
