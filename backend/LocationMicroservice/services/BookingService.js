// services/BookingService.js
const BookingModel = require("../models/BookingModel");

const bookDoctor = async (doctor_id, patient_name, address, start_time) => {
  // Step 1: Update doctor availability
  const availabilityUpdate = await BookingModel.updateDoctorAvailability(doctor_id, address, start_time);
  if (availabilityUpdate[0].affectedRows === 0) {
    throw new Error("No available slots or invalid address/time provided.");
  }

  // Step 2: Fetch appointment date
  const [appointmentRows] = await BookingModel.fetchAppointmentDate(doctor_id, address, start_time);
  if (appointmentRows.length === 0) {
    throw new Error("Appointment date not found.");
  }

  const appointment_date = appointmentRows[0].available_date;

  // Step 3: Insert patient booking
  await BookingModel.insertPatientBooking(doctor_id, patient_name, address, appointment_date, start_time);
  
  return "Booking confirmed and saved!";
};

module.exports = {
  bookDoctor
};
