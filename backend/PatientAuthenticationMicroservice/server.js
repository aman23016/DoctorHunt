
const express = require('express');
const cors = require('cors');
const client = require('prom-client');  // Import Prometheus client
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS (if needed)
app.use(cors());

// Prometheus metrics collection
const collectdefaultmetrics = client.collectDefaultMetrics;
collectdefaultmetrics({ register: client.register });  // Start collecting default system metrics

// Expose metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

// Import patient routes
const patientRoutes = require('./routes/patientRoutes');

// Register routes
app.use('/api/patients', patientRoutes);

// Start the server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Patient Authentication Microservice running on port ${PORT}`);
});
