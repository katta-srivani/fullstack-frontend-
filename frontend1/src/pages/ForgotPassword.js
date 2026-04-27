import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" },
  card: { padding: "30px", background: "#fff", borderRadius: "10px" },
  input: { margin: "10px 0", padding: "10px", width: "250px" },
  button: { padding: "10px", width: "100%" }
};

export default ForgotPassword;