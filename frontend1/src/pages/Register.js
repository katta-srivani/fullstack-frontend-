import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) return;

    setLoading(true);

    const success = await register(
      form.name,
      form.email,
      form.password
    );

    setLoading(false);

    if (success) {
      setForm({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    }
  };

  return (
    <div className="register-bg d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg p-4 border-0 rounded-4 register-card">

        <div className="text-center mb-4">
          <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-2" style={{ width: 70, height: 70 }}>
            <i className="bi bi-person-plus" style={{ fontSize: 40, color: "#198754" }}></i>
          </div>
          <h2 className="mt-2 fw-bold text-success" style={{ fontFamily: 'Roboto, sans-serif' }}>Create Account</h2>
          <p className="text-muted mb-0">Join us and start your journey!</p>
        </div>


        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-floating mb-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control form-control-lg"
              id="floatingName"
              placeholder="Name"
              autoComplete="off"
              required
            />
            <label htmlFor="floatingName">Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control form-control-lg"
              id="floatingEmail"
              placeholder="Email"
              autoComplete="off"
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control form-control-lg"
                id="floatingPassword"
                placeholder="Password"
                autoComplete="new-password"
                required
              />
              <span className="input-group-text" style={{ cursor: "pointer" }} onClick={() => setShowPassword((prev) => !prev)}>
                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </span>
            </div>
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="btn btn-success w-100 py-2 fw-bold rounded-3" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <i className="bi bi-person-plus me-2"></i>
            )}
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center mt-3">
            Already have an account? <Link to="/login" className="text-decoration-none text-success fw-semibold">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;