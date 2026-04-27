import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } else {
      setFormError(result.message);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-panel d-none d-lg-flex">
        <div className="auth-panel-content">
          <div className="brand-lockup">
            <span className="brand-mark">A</span>
            <span>Auth Studio</span>
          </div>
          <h1>Welcome back</h1>
          <p className="lead mb-4">
            Sign in to continue to your dashboard and manage your account securely.
          </p>
        </div>
      </section>

      <section className="auth-card-wrap">
        <div className="auth-card">
          <div className="card-body">
            <div className="mb-4">
              <span className="auth-mark">A</span>
              <div className="auth-kicker">Account access</div>
              <h2>Sign in</h2>
              <p className="text-muted mb-0">Use the email and password you registered with.</p>
            </div>

            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  name="login_email"
                  className="form-control"
                  id="loginEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  autoComplete="off"
                  required
                />
                <label htmlFor="loginEmail">Email address</label>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="loginPassword">
                  Password
                </label>
                <div className="input-group input-group-lg">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="login_password"
                    className="form-control"
                    id="loginPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    autoComplete="off"
                    required
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {formError && <div className="alert alert-danger py-2">{formError}</div>}

              <div className="d-flex justify-content-end mb-4">
                <Link to="/forgot-password" className="link-primary text-decoration-none fw-semibold">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="text-center text-muted mt-4 mb-0">
              New here?{" "}
              <Link to="/register" className="fw-semibold text-decoration-none">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
