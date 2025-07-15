import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    try {
      const res = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setLoggedIn(true);
        navigate("/todo");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Login</h2>

      {error && <p className="form-error">{error}</p>}

      <input
        className="form-input"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button className="form-button" type="submit">
        Login
      </button>
      <p className="form-footer">
        New user?{" "}
        <button
          type="button"
          className="form-link-button"
          onClick={() => navigate("/register")}
        >
          Register Now
        </button>
      </p>
    </form>
  );
};

export default Login;
