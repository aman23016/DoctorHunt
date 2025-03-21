// import React, { useEffect, useState } from "react";

// const DoctorSearch = () => {
//   const [patientName, setPatientName] = useState(null);

//   useEffect(() => {
//     // Get the patient name from localStorage
//     const storedName = localStorage.getItem("patient_name");

//     if (storedName) {
//       setPatientName(storedName);  // Set the patient's name to the state
//     }
//   }, []);

//   return (
//     <div>
//       {patientName ? (
//         <h2>Hello, {patientName}!</h2>  // Display patient name
//       ) : (
//         <h2>Please log in to view your details.</h2>
//       )}
//       <p>Here you can search for doctors.</p>
//     </div>
//   );
// };

// export default DoctorSearch;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorSearch = () => {
  const [patientName, setPatientName] = useState(null);
  const [locality, setLocality] = useState("");
  const [date, setDate] = useState("");
  const [doctorType, setDoctorType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get the patient name from localStorage
    const storedName = localStorage.getItem("patient_name");

    if (storedName) {
      setPatientName(storedName);  // Set the patient's name to the state
    }
  }, []);

  const handleSearch = () => {
    // Redirect to a new page after search is clicked (you can design this page later)
    navigate("/search-results", { state: { locality, date, doctorType } });
  };

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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            width: "80%",
            maxWidth: "600px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>Search for a Doctor</h3>

          <label style={{ marginBottom: "10px" }}>Which doctor do you want to search for?</label>

          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            style={{
              padding: "10px",
              marginBottom: "20px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select a locality</option>
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

          <label style={{ marginBottom: "10px" }}>Select Doctor Type:</label>
          <select
            value={doctorType}
            onChange={(e) => setDoctorType(e.target.value)}
            style={{
              padding: "10px",
              marginBottom: "20px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select a doctor type</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dentist">Dentist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="General Physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Radiologist">Radiologist</option>
            <option value="ENT Specialist">ENT Specialist</option>
            <option value="Urologist">Urologist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
            <option value="Reproductive Endocrinologist">Reproductive Endocrinologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>

          <label style={{ marginBottom: "10px" }}>Enter Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              padding: "10px",
              marginBottom: "20px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={handleSearch}
            style={{
              padding: "10px 20px",
              backgroundColor: "#00b0ff", // Light blue color
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorSearch;
