import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios for API calls
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [doctors, setDoctors] = useState([]);
  const [patientName, setPatientName] = useState(null);
  const { state } = useLocation(); // Get search state from the previous page

  useEffect(() => {
    // Get the patient name from localStorage
    const storedName = localStorage.getItem("patient_name");
    if (storedName) {
      setPatientName(storedName); // Set the patient's name to the state
    }

    // Fetch doctors data based on search parameters (locality, doctorType, and date)
    const fetchDoctors = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/search/search", {
          locality: state.locality,
          doctorType: state.doctorType,
          date: state.date,
        });

        if (response.data.success) {
          setDoctors(response.data.doctors); // Set the doctors data to the state
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching doctors", error);
        alert("Something went wrong while fetching doctors.");
      }
    };

    fetchDoctors();
  }, [state]);

  return (
    <div>
      <div
        style={{
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 20px",
          textAlign: "center",
        }}
      >
        {patientName ? (
          <h2>Hello, {patientName}!</h2>
        ) : (
          <h2>Please log in to view your details.</h2>
        )}
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor.id}
              style={{
                padding: "20px",
                borderBottom: "1px solid #ccc",
                marginBottom: "20px",
                width: "90%", // Increased width for horizontal expansion
                maxWidth: "500px", // Limit the width
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Align the content to the left
              }}
            >
              <h4>Doctor Name: {doctor.doctor_name}</h4>
              <p>Specialization: {doctor.specialization}</p>
              <p>Fees: ₹{doctor.consultation_fees}</p>
              <p>Address: {doctor.address}</p>
              <p>Nearest Metro Station: {doctor.nearest_metro_station}</p>
              <p>Distance: {doctor.distance} km</p>
              <p>
                Available Date: {new Date(doctor.available_date).toLocaleDateString()}{" "}
                <span style={{ marginLeft: "20px" }}>Start Time: {doctor.start_time}</span>
              </p>
              <p>Remaining Slots: {doctor.available_slots}</p>
              <button
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  alignSelf: "flex-end", // Align to the right side
                  marginTop: "10px",
                }}
                onClick={() => alert(`Doctor ${doctor.doctor_name} booked!`)}
              >
                Book Doctor
              </button>
            </div>
          ))
        ) : (
          <p>No doctors found for your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
