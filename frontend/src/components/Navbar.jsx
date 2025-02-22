import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../components/logo.png"; // Make sure the image is inside src/assets/

const Navbar = () => {
  const navigate = useNavigate(); 

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="SUVAI Logo" className="nav-logo" />
        </div>

        {/* Brand Name */}
        <h1 className="brand-name">SUVAI</h1>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><button className="nav-btn" onClick={() => navigate("/login")}>Login</button></li>
          <li><button className="nav-btn" onClick={() => navigate("/register")}>Signup</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
