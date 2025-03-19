import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">DoctorHunt</h1>
      <div className="nav-links">
        <Link to="/doctor-login" className="nav-item">
          Doctor Login
        </Link>
        <Link to="/patient-login" className="nav-item">
          Patient Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
