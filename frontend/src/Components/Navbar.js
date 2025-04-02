
import React from "react";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/Logo.avif" alt="DoctorHunt Logo" style={{ height: "65px" }} />
      </div>
      {/* Heading Text */}
      <div className="navbar-heading">
        <h1 style={{ color: "white", fontSize: "2rem" }}>Welcome to DoctorHunt</h1>
      </div>
    </nav>
  );
};

export default Navbar;
