import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AvailabilityEntry.css"; // Ensure you have the CSS file for styling

const AvailabilityEntry = () => {
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState(10);
  const [availableDate, setAvailableDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorId = localStorage.getItem("doctor_id"); // Retrieve doctor ID
    if (!doctorId) {
      alert("Doctor not logged in");
      navigate("/doctor-login"); // Redirect to doctor login page if not logged in
      return;
    }

    const availabilityData = {
      doctor_id: doctorId, // Include doctor_id in the request data
      location_name: locationName,
      address,
      available_date: availableDate,
      start_time: startTime,
      available_slots: availableSlots,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctors/availability",
        availabilityData
      );

      if (response.data.success) {
        alert("Availability successfully added!");
        // After saving, reset inputs
        setLocationName("");
        setAddress("");
        setStartTime("");
        setAvailableSlots(10);
        setAvailableDate("");
        // Optionally, reload the page after successful submission
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error saving availability", error);
      alert("Something went wrong! Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("doctor_id"); // Remove doctor_id from localStorage
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="availability-entry-container">
      <div className="availability-box">
        <h2>Set Your Availability</h2>
        <form onSubmit={handleSubmit}>
          {/* Location Name Dropdown */}
          <select
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            required
          >
            <option value="">Select Metro Station</option>
            <option value="Govindpuri">Govindpuri</option>
            <option value="Nehru Place">Nehru Place</option>
            <option value="Central Secretariat">Central Secretariat</option>
            <option value="Kashmere Gate">Kashmere Gate</option>
            <option value="Patel Chowk">Patel Chowk</option>
          </select>

          {/* Other form fields */}
          <input
            type="text"
            placeholder="Enter the address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Available Date"
            value={availableDate}
            onChange={(e) => setAvailableDate(e.target.value)}
            required
          />
          <input
            type="time"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Available Slots"
            value={availableSlots}
            onChange={(e) => setAvailableSlots(e.target.value)}
            min="1"
            max="20"
            required
          />
          <button type="submit">Save Availability</button>
        </form>

        {/* Add space between buttons */}
        <div style={{ margin: "20px 0" }}></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            padding: "10px",
            backgroundColor: "#f44336", // Red color for logout button
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AvailabilityEntry;
