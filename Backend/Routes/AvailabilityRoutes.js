const express = require("express");
const db = require("../Config/db");  // Database connection
const router = express.Router();

// ✅ Doctor Availability Entry Route
router.post("/availability", async (req, res) => {
  const { doctor_id, location_name, address, available_date, start_time, available_slots } = req.body;

  // Log the received data to ensure it's being sent properly
  console.log("Received Availability Data:", req.body);

  // Validation: Ensure all fields are present
  if (!doctor_id || !location_name || !address || !available_date || !start_time || !available_slots) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }

  try {
    // Insert query to save availability in the doctor_availability table
    const query = `
      INSERT INTO doctor_availability (doctor_id, location_name, address, available_date, start_time, available_slots)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    // Execute the query with the data from the request body
    const [result] = await db.promise().query(query, [doctor_id, location_name, address, available_date, start_time, available_slots]);

    // If insertion is successful, return success response
    console.log("Inserted availability with ID:", result.insertId);
    res.json({ success: true, message: "Availability saved successfully!" });
  } catch (err) {
    // Log and return error message if something goes wrong
    console.error("Error saving availability:", err);
    return res.status(500).json({ success: false, message: "Error saving availability", error: err.message });
  }
});

module.exports = router;
