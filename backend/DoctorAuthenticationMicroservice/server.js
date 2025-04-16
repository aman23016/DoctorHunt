
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

// // Set up routes for specific endpoints
// app.use("/api/doctor", doctorRoutes);  // Doctor login route at '/api/doctor'
// app.use("/api/doctor/availability", availabilityCheckRoutes);  // Doctor availability at '/api/doctor/availability'

// // Server configuration
// const PORT = process.env.PORT || 5001;  
// app.listen(PORT, () => {
//   console.log(`Doctor Authentication Microservice is running on port ${PORT}`);
// });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const client = require("prom-client");  // Import Prometheus client

// Middleware to parse JSON bodies
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());  // Parse incoming JSON requests

// Prometheus metrics collection
const collectdefaultmetrics = client.collectDefaultMetrics;
collectdefaultmetrics({ register: client.register });  // Start collecting default system metrics

// Expose metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

// Import Routes
const doctorRoutes = require("./routes/DoctorRoutes");

// Set up routes for specific endpoints
app.use("/api/doctor", doctorRoutes);  // Doctor login route at '/api/doctor'

// Server configuration
const PORT = process.env.PORT || 5001;  
app.listen(PORT, () => {
  console.log(`Doctor Authentication Microservice is running on port ${PORT}`);
});
