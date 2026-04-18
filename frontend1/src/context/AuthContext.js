
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// Backend API base URL
const API = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/auth`
  : "http://localhost:5000/api/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check token on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ REGISTER
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API}/register`, {
        name,
        email,
        password
      });

      alert(res.data.message);
      return true;

    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
      return false;
    }
  };

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user)); // 🔥 store user
        setIsAuthenticated(true); // 🔥 update state
        alert("Login successful");
        return true;
      }

      return false;

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  // ✅ LOGOUT (🔥 NEW)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  // ✅ FORGOT PASSWORD
  const forgotPassword = async (email) => {
    try {
      const res = await axios.post(`${API}/forgot-password`, { email });
      alert(res.data.message);
      return true;
    } catch (err) {
      alert(err.response?.data?.message);
      return false;
    }
  };

  // ✅ RESET PASSWORD
  const resetPassword = async (token, password) => {
    try {
      const res = await axios.post(`${API}/reset-password/${token}`, {
        password
      });
      alert(res.data.message);
      return true;
    } catch (err) {
      alert(err.response?.data?.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,          // 🔥 expose logout
        isAuthenticated, // 🔥 expose state
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;