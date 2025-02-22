import React from "react";
import "./Navbar.css"; // Import the CSS file
import logo from "./logo.png"; // Add your logo image

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo on the left */}
        <a href="#" className="logo">
          <img src={logo} alt="SUVAI Logo" />
        </a>

        {/* Centered Brand Name */}
        <div className="brand-name">SUVAI</div>

        {/* Navigation Links on the right */}
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#">Signup</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
