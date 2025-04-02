
const express = require("express");
const db = require("../Config/db");
const router = express.Router();

// Book doctor route (with patient tracking)
router.post("/book", async (req, res) => {
  const { doctor_id, patient_name, address, start_time } = req.body;

  console.log("Booking attempt:", { doctor_id, patient_name, address, start_time });

  // Step 1: Update doctor availability
  const updateSql = `
    UPDATE doctor_availability
    SET available_slots = available_slots - 1
    WHERE doctor_id = ? AND address = ? AND start_time = ? AND available_slots > 0;
  `;

  db.query(updateSql, [doctor_id, address, start_time], (error, results) => {
    if (error) {
      console.error("Error updating doctor availability:", error);
      return res.status(500).send({ success: false, message: "Database error while booking." });
    }

    if (results.affectedRows === 0) {
      return res.status(400).send({
        success: false,
        message: "No available slots or invalid address/time provided.",
      });
    }

    // Step 2: Fetch the appointment date from doctor_availability
    const fetchDateSql = `
      SELECT available_date FROM doctor_availability
      WHERE doctor_id = ? AND address = ? AND start_time = ? LIMIT 1;
    `;

    db.query(fetchDateSql, [doctor_id, address, start_time], (err2, rows) => {
      if (err2) {
        console.error("Error fetching appointment date:", err2);
        return res.status(500).send({ success: false, message: "Error retrieving appointment date." });
      }

      if (rows.length === 0) {
        return res.status(500).send({ success: false, message: "Appointment date not found." });
      }

      const appointment_date = rows[0].available_date;

      // Step 3: Insert into patient_details
      const insertSql = `
        INSERT INTO patient_details (doctor_id, patient_name, address, appointment_date, start_time)
        VALUES (?, ?, ?, ?, ?);
      `;

      db.query(insertSql, [doctor_id, patient_name, address, appointment_date, start_time], (err3, result) => {
        if (err3) {
          console.error("Error inserting patient booking:", err3);
          return res.status(500).send({ success: false, message: "Error recording booking." });
        }

        res.send({ success: true, message: "Booking confirmed and saved!" });
      });
    });
  });
});

module.exports = router;
