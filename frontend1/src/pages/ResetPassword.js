
import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ResetPassword = () => {
  const { token } = useParams();
  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const result = await resetPassword(token, password);
    setLoading(false);
    if (result) {
      setSuccess("Password reset successful. Please login.");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError("Failed to reset password. The link may be invalid or expired.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
        <div className="text-center mb-3">
          <i className="bi bi-shield-lock" style={{ fontSize: 40, color: "#0d6efd" }}></i>
          <h3 className="mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Reset Password</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <i className="bi bi-arrow-repeat me-2"></i>
            )}
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;