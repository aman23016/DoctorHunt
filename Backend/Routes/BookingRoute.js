
const express = require("express");
const db = require("../Config/db");
const router = express.Router();

// Book doctor route (without date)
router.post("/book", async (req, res) => {
  const { doctor_id, address, start_time } = req.body;

  console.log("Booking attempt:", { doctor_id, address, start_time });

  const sql = `
    UPDATE doctor_availability
    SET available_slots = available_slots - 1
    WHERE doctor_id = ? AND address = ? AND start_time = ? AND available_slots > 0;
  `;

  db.query(sql, [doctor_id, address, start_time], (error, results) => {
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

    res.send({ success: true, message: "Booking confirmed!" });
  });
});

module.exports = router;
