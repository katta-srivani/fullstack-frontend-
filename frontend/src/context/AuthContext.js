import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const getApiBaseUrl = () => {
  const configuredUrl = process.env.REACT_APP_API_URL || "/api";
  return configuredUrl.replace(/\/+$/, "");
};

const API_BASE_URL = getApiBaseUrl();
const API = `${API_BASE_URL}/auth`;

const getApiError = (err, fallback) => {
  const data = err.response?.data;

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.map((error) => error.msg).join(", ");
  }

  return data?.message || fallback;
};

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
  }, []);

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API}/register`, {
        name,
        email: email.trim().toLowerCase(),
        password: password.trim()
      });
      return { success: true, message: res.data.message };
    } catch (err) {
      return { success: false, message: getApiError(err, "Register failed") };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/login`, {
        email: email.trim().toLowerCase(),
        password: password.trim()
      });
      
      if (!res.data.token) {
        return { success: false, message: "Login failed" };
      }

      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      setIsAuthenticated(true);
      return { success: true, message: "Login successful" };
    } catch (err) {
      return { success: false, message: getApiError(err, "Login failed") };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await axios.post(`${API}/forgot-password`, {
        email: email.trim().toLowerCase()
      });
      return { success: true, message: res.data.message };
    } catch (err) {
      return { success: false, message: getApiError(err, "Unable to send reset link") };
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const res = await axios.post(`${API}/reset-password/${token}`, {
        password: password.trim()
      });
      return { success: true, message: res.data.message };
    } catch (err) {
      return { success: false, message: getApiError(err, "Unable to reset password") };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, register, login, forgotPassword, resetPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
