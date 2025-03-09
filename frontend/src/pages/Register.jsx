import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
    restaurantName: "",
    location: ""
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:3000/register", formData);

      if (response.status === 201) {
        alert("Registration Successful!");

        // Store user data in localStorage
        localStorage.setItem("username", formData.username);
        localStorage.setItem("role", formData.role);

        // Navigate to home page and reload to update navbar
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data?.message);
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" className="form-control" value={formData.role} onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {formData.role === "admin" && (
          <>
            <div className="form-group">
              <label>Restaurant Name</label>
              <input type="text" name="restaurantName" className="form-control" value={formData.restaurantName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
            </div>
          </>
        )}

        <button type="submit" className="btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
