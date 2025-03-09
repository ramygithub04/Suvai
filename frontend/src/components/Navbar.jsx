import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../components/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    const updateRole = () => {
      setRole(localStorage.getItem("role") || "");
    };
  
    // ✅ Listen for storage changes (including from login)
    window.addEventListener("storage", updateRole);
  
    return () => {
      window.removeEventListener("storage", updateRole);
    };
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setRole(""); // Update state to trigger re-render
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="SUVAI Logo" className="nav-logo" />
        </div>
        <h1 className="brand-name">SUVAI</h1>

        <ul className="nav-links">
          <li><button className="nav-btn" onClick={() => navigate("/")}>Home</button></li>
          <li><button className="nav-btn" onClick={() => navigate("/about")}>About Us</button></li>

          {role === "admin" ? (
            <>
              <li><button className="nav-btn" onClick={() => navigate("/add-restaurant")}>Add Restaurant/Product</button></li>
              <li><button className="nav-btn" onClick={handleLogout}>Sign Out</button></li>
            </>
          ) : role === "customer" ? (
            <>
              <li><button className="nav-btn" onClick={() => navigate("/cart")}>Cart</button></li>
              <li><button className="nav-btn" onClick={handleLogout}>Sign Out</button></li>
            </>
          ) : (
            <>
              <li><button className="nav-btn" onClick={() => navigate("/login")}>Login</button></li>
              <li><button className="nav-btn" onClick={() => navigate("/register")}>Signup</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;