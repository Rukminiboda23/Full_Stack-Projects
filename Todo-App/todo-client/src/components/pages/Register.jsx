import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3002/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert("Registered successfully!");
    setLoggedIn(true); // 👈 Set loggedIn to true
    navigate("/todo"); // 👈 Redirect to Todo page
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>
      <p>
        Already registered?{" "}
        <button type="button" onClick={() => navigate("/login")}>
          Login instead
        </button>
      </p>
    </form>
  );
};

export default Register;
