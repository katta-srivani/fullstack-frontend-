import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const result = await forgotPassword(email);
    setLoading(false);

    if (result.success) {
      setSuccess(result.message);
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="auth-shell auth-shell-info">
      <section className="auth-panel d-none d-lg-flex">
        <div className="auth-panel-content">
          <div className="brand-lockup">
            <span className="brand-mark">A</span>
            <span>Auth Studio</span>
          </div>
          <h1>Reset safely</h1>
          <p className="lead mb-4">
            Recover your account with a private link sent to your registered email.
          </p>
        </div>
      </section>

      <section className="auth-card-wrap">
        <div className="auth-card">
          <div className="card-body">
            <div className="mb-4">
              <span className="auth-mark">A</span>
              <div className="auth-kicker">Recovery</div>
              <h2>Forgot password</h2>
              <p className="text-muted mb-0">Use the email connected to your account.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="forgotEmail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <label htmlFor="forgotEmail">Email address</label>
              </div>

              {error && <div className="alert alert-danger py-2">{error}</div>}
              {success && <div className="alert alert-success py-2">{success}</div>}

              <button type="submit" className="btn btn-info text-white w-100" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
                {loading ? "Sending link..." : "Send reset link"}
              </button>
            </form>

            <p className="text-center text-muted mt-4 mb-0">
              Remembered it?{" "}
              <Link to="/login" className="fw-semibold text-decoration-none">
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
