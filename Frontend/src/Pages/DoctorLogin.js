import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Import Axios for API calls
import "./DoctorLogin.css"; // Import CSS for styling

const DoctorLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sending phone and password to the backend for validation
      const response = await axios.post("http://localhost:5000/api/doctors/login", {
        phone,
        password
      });

      // If login is successful, navigate to the availability entry page
      if (response.data.success) {
        alert(response.data.message);  // Show success message
        navigate("/availability-entry");  // Redirect to AvaibilityEntry.js
      } else {
        alert(response.data.message);  // Display message if login fails
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="doctor-login-container">
      <div className="login-box">
        <h2>Welcome, Doctor</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
