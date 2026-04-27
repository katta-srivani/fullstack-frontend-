import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (!form.name || !form.email || !form.password) {
      setFormError("All fields are required.");
      return;
    }

    setLoading(true);
    const result = await register(form.name, form.email, form.password);
    setLoading(false);

    if (result.success) {
      setSuccessMessage(result.message);
      setForm({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 900);
    } else {
      setFormError(result.message);
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
          <h1>Create your account</h1>
          <p className="lead mb-4">
            Set up your profile and keep your account ready for secure recovery.
          </p>
        </div>
      </section>

      <section className="auth-card-wrap">
        <div className="auth-card">
          <div className="card-body">
            <div className="mb-4">
              <span className="auth-mark">A</span>
              <div className="auth-kicker">New account</div>
              <h2>Register</h2>
              <p className="text-muted mb-0">Start with a fresh email address.</p>
            </div>

            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  id="registerName"
                  placeholder="Full name"
                  autoComplete="off"
                  required
                />
                <label htmlFor="registerName">Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  id="registerEmail"
                  placeholder="name@example.com"
                  autoComplete="off"
                  required
                />
                <label htmlFor="registerEmail">Email address</label>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="registerPassword">
                  Password
                </label>
                <div className="input-group input-group-lg">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control"
                    id="registerPassword"
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
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

              {formError && <div className="alert alert-danger py-2">{formError}</div>}
              {successMessage && <div className="alert alert-success py-2">{successMessage}</div>}

              <button className="btn btn-success w-100 mt-2" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="text-center text-muted mt-4 mb-0">
              Already registered?{" "}
              <Link to="/login" className="fw-semibold text-decoration-none text-success">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
