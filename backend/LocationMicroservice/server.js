// const express = require("express");
// const cors = require("cors");  // Import CORS
// const bodyParser = require("body-parser");
// const app = express();

// // Import Routes
// const searchResultsRoute = require("./routes/SearchRoute.js");
// const bookingRoute = require("./routes/BookingRoute");  // Import BookingRoute

// // Middleware
// app.use(cors());  // Enable CORS for all rosutes
// app.use(bodyParser.json());  // Parse incoming JSON requests

// // Routes
// app.use("/api/search", searchResultsRoute);  // Search-related routes under '/api/search'
// app.use("/api/booking", bookingRoute);// All booking-related routes under '/api/book'

// // Server configuration
// const PORT = process.env.PORT || 5002;  // You can change the port to whatever fits
// app.listen(PORT, () => {
//   console.log(`Location Microservice is running on port ${PORT}`);
// });
const express = require("express");
const cors = require("cors");  // Import CORS
const bodyParser = require("body-parser");
const client = require("prom-client");  // Import Prometheus client
const app = express();

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
const searchResultsRoute = require("./routes/SearchRoute.js");
const bookingRoute = require("./routes/BookingRoute");  // Import BookingRoute

// Routes
app.use("/api/search", searchResultsRoute);  // Search-related routes under '/api/search'
app.use("/api/booking", bookingRoute);      // All booking-related routes under '/api/book'

// Server configuration
const PORT = process.env.PORT || 5002;  // You can change the port to whatever fits
app.listen(PORT, () => {
  console.log(`Location Microservice is running on port ${PORT}`);
});
