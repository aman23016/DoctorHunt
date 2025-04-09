import React, { useState } from "react";
import axios from "axios"; // Import Axios for API calls
import { useNavigate } from "react-router-dom";

const CheckBookings = () => {
  const [doctorId, setDoctorId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [noBookingsFound, setNoBookingsFound] = useState(false);
  const navigate = useNavigate();

  const handleCheckBookings = async (e) => {
    e.preventDefault();
    if (!doctorId) {
      alert("Please enter Doctor ID");
      return;
    }
    // try {
    //   const response = await axios.post("http://localhost:5003/api/check-bookings", {
    //     doctor_id: doctorId,
    //   });
    try {
      const response = await axios.post(
        "http://34.45.68.234/api/check-bookings",  // Replaced with the external IP
        { doctor_id: doctorId }
      );

      if (response.data.success) {
        if (response.data.bookings.length === 0) {
          setNoBookingsFound(true);
        } else {
          setBookings(response.data.bookings); // Set the bookings data to the state
          setNoBookingsFound(false);
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Failed to fetch bookings");
      console.error("Error fetching bookings:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/availability-entry"); // Go back to the availability entry page
  };

  return (
    <div className="check-bookings-container" style={{ padding: "20px" }}>
      {/* Doctor Bar */}
      <div
        style={{
          backgroundColor: "#FFB6C1", // Light reddish-pink color
          color: "white",
          padding: "10px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: "0" }}>Hello Doctor</h2>
      </div>

      {/* Doctor ID Input and Button */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <form onSubmit={handleCheckBookings} style={{ width: "300px" }}>
          <input
            type="text"
            placeholder="Enter Doctor ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "5px",
              marginBottom: "10px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Check Bookings
          </button>
        </form>

        {/* Display Bookings or No bookings message */}
        {noBookingsFound ? (
          <p style={{ marginTop: "20px" }}>No bookings found for this doctor.</p>
        ) : bookings.length > 0 ? (
          <table style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Patient Name</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Address</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Start Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{booking.patient_name}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{booking.address}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{booking.start_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>

      {/* Go Back Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleGoBack}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336", // Red color for logout button
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "auto",
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CheckBookings;
