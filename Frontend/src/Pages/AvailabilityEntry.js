import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import "./AvailabilityEntry.css"; // Ensure you have the CSS file for styling

const AvailabilityEntry = () => {
  const [doctorId, setDoctorId] = useState(""); // New state for doctor_id input
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState(10);
  const [availableDate, setAvailableDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate doctorId to make sure it's provided
    if (!doctorId) {
      alert("Please enter your Doctor ID");
      return;
    }

    // Prepare the data to be sent to the backend
    const availabilityData = {
      doctor_id: doctorId, // Use the input from the doctor
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
        setDoctorId(""); // Reset doctor_id input
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
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="availability-entry-container">
      <div className="availability-box">
        <h2>Set Your Availability</h2>
        <form onSubmit={handleSubmit}>
          {/* Doctor ID Input */}
          <input
            type="text"
            placeholder="Enter Doctor ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          />

          {/* Location Name Dropdown */}
          <select
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            required
          >
            <option value="">Select Metro Station</option>
            <option value="Kashmere Gate">Kashmere Gate</option>
            <option value="Lal Quila">Lal Quila</option>
            <option value="Jama Masjid">Jama Masjid</option>
            <option value="Delhi Gate">Delhi Gate</option>
            <option value="ITO">ITO</option>
            <option value="Mandi House">Mandi House</option>
            <option value="Janpath">Janpath</option>
            <option value="Central Secretariat">Central Secretariat</option>
            <option value="Khan Market">Khan Market</option>
            <option value="Jawaharlal Nehru Stadium">Jawaharlal Nehru Stadium</option>
            <option value="Jangpura">Jangpura</option>
            <option value="Lajpat Nagar">Lajpat Nagar</option>
            <option value="Moolchand">Moolchand</option>
            <option value="Kailash Colony">Kailash Colony</option>
            <option value="Nehru Place">Nehru Place</option>
            <option value="Kalkaji Mandir">Kalkaji Mandir</option>
            <option value="Govind Puri">Govind Puri</option>
            <option value="Okhla">Okhla</option>
            <option value="Jasola">Jasola</option>
            <option value="Sarita Vihar">Sarita Vihar</option>
            <option value="Mohan Estate">Mohan Estate</option>
            <option value="Tughlakabad">Tughlakabad</option>
            <option value="Badarpur Border">Badarpur Border</option>
            <option value="Sarai">Sarai</option>
            <option value="N.H.P.C. Chowk">N.H.P.C. Chowk</option>
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