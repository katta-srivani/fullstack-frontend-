import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ResetPassword = () => {
  const { token } = useParams();
  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const result = await resetPassword(token, password);
    setLoading(false);

    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="auth-shell auth-shell-success">
      <section className="auth-panel d-none d-lg-flex">
        <div className="auth-panel-content">
          <div className="brand-lockup">
            <span className="brand-mark">A</span>
            <span>Auth Studio</span>
          </div>
          <h1>Set a fresh password</h1>
          <p className="lead mb-4">
            Choose a new password and return to your account with confidence.
          </p>
        </div>
      </section>

      <section className="auth-card-wrap">
        <div className="auth-card">
          <div className="card-body">
            <div className="mb-4">
              <span className="auth-mark">A</span>
              <div className="auth-kicker">New password</div>
              <h2>Reset password</h2>
              <p className="text-muted mb-0">Choose a new password with at least 6 characters.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="resetPassword">
                  New password
                </label>
                <div className="input-group input-group-lg">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="resetPassword"
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
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

              {error && <div className="alert alert-danger py-2">{error}</div>}
              {success && <div className="alert alert-success py-2">{success}</div>}

              <button type="submit" className="btn btn-success w-100" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
                {loading ? "Updating password..." : "Update password"}
              </button>
            </form>

            <p className="text-center text-muted mt-4 mb-0">
              Need a new link?{" "}
              <Link to="/forgot-password" className="fw-semibold text-decoration-none text-success">
                Request again
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
