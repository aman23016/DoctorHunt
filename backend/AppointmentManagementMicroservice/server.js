const express = require("express");
const cors = require("cors");  // Import CORS
const app = express();

// Import Routes
const availabilityRoutes = require("./routes/AvailabilityRoutes");
const availabilityCheckRoutes = require("./routes/AvailabilityCheckRoutes");  // Import the AvailabilityCheckRoute

// Middlewares
app.use(cors());  // Allow CORS for all routes
app.use(express.json());  // Parse incoming JSON requests

// Routes
app.use("/api/doctors", availabilityRoutes); // Update route to match frontend
// Handles booking appointments and appointment history
app.use("/api", availabilityCheckRoutes); // Handles checking doctor availability (using /api/doctor for consistency)

// Start the server
app.listen(5003, () => {
  console.log("Appointment Management Microservice running on port 5003");
});
