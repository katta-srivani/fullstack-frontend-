import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="dashboard-shell">
      <nav className="navbar dashboard-nav">
        <div className="container">
          <span className="navbar-brand d-flex align-items-center gap-2 fw-bold mb-0">
            <span className="auth-mark mb-0">A</span>
            Auth Studio
          </span>
          <button className="btn btn-outline-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <section className="container dashboard-main">
        <div className="dashboard-hero">
          <div>
            <div className="auth-kicker">Dashboard</div>
            <h1>You are signed in</h1>
            <p className="text-muted fs-5 mb-0">
              Your session is active and the authentication flow is ready.
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            End session
          </button>
        </div>

        <div className="metric-strip mb-4">
          <div className="metric-item">
            <strong>1d</strong>
            <span className="text-muted">Session expiry</span>
          </div>
          <div className="metric-item">
            <strong>15m</strong>
            <span className="text-muted">Reset link window</span>
          </div>
          <div className="metric-item">
            <strong>4</strong>
            <span className="text-muted">Auth routes</span>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold mb-3">Account overview</h2>
              <p className="text-muted mb-4">
                Login, registration, email recovery, and password reset are connected to the backend API.
              </p>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 border rounded-2 h-100">
                    <div className="fw-bold mb-1">Token auth</div>
                    <div className="text-muted small">JWT is stored locally after login.</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 border rounded-2 h-100">
                    <div className="fw-bold mb-1">Recovery email</div>
                    <div className="text-muted small">Reset links are sent through the backend mailer.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="dashboard-card">
            <div className="card-body p-4">
              <h2 className="h5 fw-bold mb-3">Flow status</h2>
              <div className="status-row">
                <span>Login</span>
                <span className="status-pill">Ready</span>
              </div>
              <div className="status-row">
                <span>Register</span>
                <span className="status-pill">Ready</span>
              </div>
              <div className="status-row">
                <span>Forgot password</span>
                <span className="status-pill">Ready</span>
              </div>
              <div className="status-row">
                <span>Reset password</span>
                <span className="status-pill">Ready</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
