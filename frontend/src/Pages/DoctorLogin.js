import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import "./DoctorLogin.css"; // Import CSS for styling

const DoctorLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

   
    if (!phone || !password) {
      alert("Please fill in both fields");
      return;
    }


    try {
      const response = await axios.post(
        "http://34.60.223.171/api/doctor/login",  // Replaced with the external IP
        {
          phone,
          password
        }
      );
    
      // If login is successful, store doctor details in localStorage and navigate
      if (response.data.success) {
        const { doctor_id, doctor_name } = response.data;
        
        if (doctor_id && doctor_name) {
          localStorage.setItem("doctor_id", doctor_id); // Store doctor ID
          localStorage.setItem("doctor_name", doctor_name); // Store doctor name

          alert(response.data.message); // Show success message
          navigate("/availability-entry"); // Redirect to AvailabilityEntry page
        } else {
          alert("Doctor details are missing. Please contact support.");
        }
      } else {
        alert(response.data.message); // Display login failure message
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
