import React, { useEffect, useState } from "react";

const DoctorSearch = () => {
  const [patientName, setPatientName] = useState(null);

  useEffect(() => {
    // Get the patient name from localStorage
    const storedName = localStorage.getItem("patient_name");

    if (storedName) {
      setPatientName(storedName);  // Set the patient's name to the state
    }
  }, []);

  return (
    <div>
      {patientName ? (
        <h2>Hello, {patientName}!</h2>  // Display patient name
      ) : (
        <h2>Please log in to view your details.</h2>
      )}
      <p>Here you can search for doctors.</p>
    </div>
  );
};

export default DoctorSearch;
