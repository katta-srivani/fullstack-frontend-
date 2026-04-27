import React, { createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const API = "http://localhost:5000/api/auth";

  // ✅ REGISTER
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API}/register`, {
        name,
        email,
        password
      });

      alert(res.data.message);
      return true; // ✅ IMPORTANT

    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
      return false; // ✅ IMPORTANT
    }
  };

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");

      return true; // ✅ IMPORTANT

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  // ✅ FORGOT PASSWORD
  const forgotPassword = async (email) => {
    try {
      const res = await axios.post(`${API}/forgot-password`, { email });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  // ✅ RESET PASSWORD
  const resetPassword = async (token, password) => {
    try {
      const res = await axios.post(`${API}/reset-password/${token}`, {
        password
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ register, login, forgotPassword, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;