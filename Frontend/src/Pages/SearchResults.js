
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [doctors, setDoctors] = useState([]);
  const [patientName, setPatientName] = useState(null);
  const { state } = useLocation();

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/search/search", {
        locality: state.locality,
        doctorType: state.doctorType,
        date: state.date,
      });

      if (response.data.success) {
        setDoctors(response.data.doctors);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors", error);
      alert("Something went wrong while fetching doctors.");
    }
  }, [state.locality, state.doctorType, state.date]);

  useEffect(() => {
    const storedName = localStorage.getItem("patient_name");
    if (storedName) {
      setPatientName(storedName);
    }

    fetchDoctors();
  }, [fetchDoctors]);

  const handleBookDoctor = async (doctorId, address, startTime) => {
    console.log("Booking attempt:", {
      doctor_id: doctorId,
      address: address,
      start_time: startTime,
    });

    try {
      const response = await axios.post("http://localhost:5000/api/booking/book", {
        doctor_id: doctorId,
        address: address,
        start_time: startTime,
      });

      if (response.data.success) {
        alert("Doctor booked successfully!");
        fetchDoctors(); // Refresh updated slot count
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Booking failed!");
      console.error("Error booking doctor", error);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "#28a745", color: "white", padding: "10px 20px", textAlign: "center" }}>
        {patientName ? <h2>Hello, {patientName}!</h2> : <h2>Please log in to view your details.</h2>}
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={`${doctor.doctor_id}-${doctor.start_time}`}
              style={{
                padding: "20px",
                borderBottom: "1px solid #ccc",
                marginBottom: "20px",
                width: "90%",
                maxWidth: "500px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
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
                  alignSelf: "flex-end",
                  marginTop: "10px",
                }}
                onClick={() =>
                  handleBookDoctor(doctor.doctor_id, doctor.address, doctor.start_time)
                }
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
