const express = require('express');
const cors = require('cors');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS (if needed)
app.use(cors());

// Import patient routes
const patientRoutes = require('./routes/patientRoutes');

// Register routes
app.use('/api/patients', patientRoutes);

// Start the server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Patient Authentication Microservice running on port ${PORT}`);
});
