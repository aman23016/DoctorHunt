const express = require("express");
const cors = require("cors");
const doctorRoutes = require("./Routes/DoctorRoutes");  // Ensure correct path
const availabilityRoutes = require("./Routes/AvailabilityRoutes");  // Ensure correct path
const patientRoutes = require("./Routes/PatientRoutes");  // Ensure correct path for patient routes

const app = express();

// Middleware to parse JSON bodies (express.json is built into Express, no need for body-parser)
app.use(express.json());

// Enable CORS for all origins (or you can configure it as needed)
app.use(cors());

// Register routes for doctor-related endpoints
app.use("/api/doctors", doctorRoutes);  // Register doctor routes

// Register routes for availability-related endpoints
app.use("/api/doctors", availabilityRoutes);  // Register availability routes

// Register routes for patient-related endpoints
app.use("/api/patients", patientRoutes);  // Register patient routes

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
