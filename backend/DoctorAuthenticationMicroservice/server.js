// const express = require("express");
// const app = express();
// const cors = require("cors");
// const bodyParser = require("body-parser");

// // Import Routes
// const doctorRoutes = require("./routes/DoctorRoutes");
// const availabilityCheckRoutes = require("./routes/AvailabilityCheckRoutes");

// // Middleware
// app.use(cors());  // Enable CORS for all routes
// app.use(bodyParser.json());  // Parse incoming JSON requests

// // Set up routes
// app.use("/api/doctor", doctorRoutes);  // All doctor login routes will be under '/api/doctor'
// app.use("/api/doctor", availabilityCheckRoutes);  // All doctor booking routes will be under '/api/doctor'

// // Server configuration
// const PORT = process.env.PORT || 5001;  // You can change the port to whatever fits
// app.listen(PORT, () => {
//   console.log(`Doctor Authentication Microservice is running on port ${PORT}`);
// });
// server.js
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Import Routes
const doctorRoutes = require("./routes/DoctorRoutes");
const availabilityCheckRoutes = require("./routes/AvailabilityCheckRoutes");

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());  // Parse incoming JSON requests

// Set up routes for specific endpoints
app.use("/api/doctor", doctorRoutes);  // Doctor login route at '/api/doctor'
app.use("/api/doctor/availability", availabilityCheckRoutes);  // Doctor availability at '/api/doctor/availability'

// Server configuration
const PORT = process.env.PORT || 5001;  
app.listen(PORT, () => {
  console.log(`Doctor Authentication Microservice is running on port ${PORT}`);
});
