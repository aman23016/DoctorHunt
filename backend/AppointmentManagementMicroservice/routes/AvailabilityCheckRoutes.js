const express = require("express");
const db = require("../Config/db"); // Ensure the correct path to db
const router = express.Router();

// Backend route for checking bookings
router.post("/check-bookings", async (req, res) => {
    const { doctor_id } = req.body; // Only doctor_id is required
    
    const query = `
      SELECT patient_name, address, start_time, appointment_date
      FROM patient_details
      WHERE doctor_id = ?;
    `;
  
    try {
      const [results] = await db.query(query, [doctor_id]);

      if (results.length > 0) {
        return res.json({ success: true, bookings: results });
      } else {
        return res.json({ success: false, message: "No bookings found for this doctor." });
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
