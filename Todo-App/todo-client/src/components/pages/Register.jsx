import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:3002/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      alert(data.message || "Registered successfully!");
      setLoggedIn(true);
      navigate("/todo");
    } else {
      alert(data.message || "Registration failed.");
    }
  } catch (err) {
    alert("Server error. Please try again.");
    console.error("Registration error:", err);
  }
};


  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Register</h2>
      <input
        className="form-input"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        className="form-input"
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button className="form-button" type="submit">Register</button>
      <p className="form-footer">
        Already registered?{" "}
        <button
          type="button"
          className="form-link-button"
          onClick={() => navigate("/login")}
        >
          Login Here
        </button>
      </p>
    </form>
  );
};

export default Register;
