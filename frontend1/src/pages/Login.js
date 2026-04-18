import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Email and password are required.");
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      setEmail("");
      setPassword("");
      navigate("/Dashboard");
    } else {
      setFormError("Invalid email or password.");
    }
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg p-4 border-0 rounded-4 login-card">
        <div className="text-center mb-4">
          <i className="bi bi-person-circle" style={{ fontSize: 56, color: "#0d6efd" }}></i>
          <h2 className="mt-2 fw-bold text-primary">Sign In</h2>
          <p className="text-muted">Welcome back! Please login.</p>
        </div>

        {/* 🔥 AUTOFILL DISABLED */}
        <form onSubmit={handleSubmit} autoComplete="off">
          
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="random_email_123"   // 🔥 trick to avoid autofill
              className="form-control form-control-lg rounded-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="off"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="random_pass_456"   // 🔥 trick to avoid autofill
                className="form-control form-control-lg rounded-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="off"
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </span>
            </div>
          </div>

          {formError && <div className="alert alert-danger py-2">{formError}</div>}

          <button className="btn btn-primary w-100 py-2 fw-bold rounded-3" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </>
            )}
          </button>

          <div className="mt-3 text-center">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <div className="mt-2 text-center">
            Don’t have an account? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;