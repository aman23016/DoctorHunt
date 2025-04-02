// models/BookingModel.js
const db = require("../Config/db");  // Import database connection

// Function to update doctor availability
const updateDoctorAvailability = (doctor_id, address, start_time) => {
  const query = `
    UPDATE doctor_availability
    SET available_slots = available_slots - 1
    WHERE doctor_id = ? AND address = ? AND start_time = ? AND available_slots > 0;
  `;
  return db.promise().query(query, [doctor_id, address, start_time]);
};

// Function to fetch appointment date
const fetchAppointmentDate = (doctor_id, address, start_time) => {
  const query = `
    SELECT available_date FROM doctor_availability
    WHERE doctor_id = ? AND address = ? AND start_time = ? LIMIT 1;
  `;
  return db.promise().query(query, [doctor_id, address, start_time]);
};

// Function to insert patient booking
const insertPatientBooking = (doctor_id, patient_name, address, appointment_date, start_time) => {
  const query = `
    INSERT INTO patient_details (doctor_id, patient_name, address, appointment_date, start_time)
    VALUES (?, ?, ?, ?, ?);
  `;
  return db.promise().query(query, [doctor_id, patient_name, address, appointment_date, start_time]);
};

module.exports = {
  updateDoctorAvailability,
  fetchAppointmentDate,
  insertPatientBooking
};
