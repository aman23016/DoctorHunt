// const express = require('express');
// const db = require('../Config/db');  // Your DB connection
// const router = express.Router();  // Define the router here

// // Booking a doctor
// router.post("/book-doctor", async (req, res) => {
//   const { doctorId, location, date } = req.body; // Receive location and date from the frontend

//   try {
//     // Step 1: Check if slots are available for the specific doctor, location, and date
//     const checkSlotsQuery = `
//       SELECT available_slots 
//       FROM doctor_availability 
//       WHERE doctor_id = ? 
//       AND available_slots > 0 
//       AND available_date = ? 
//       AND location_name = ?
//       LIMIT 1
//     `;
//     const [slotResults] = await db.promise().query(checkSlotsQuery, [doctorId, date, location]);

//     if (slotResults.length === 0) {
//       return res.status(400).json({ success: false, message: "No available slots for this doctor at this location and date." });
//     }

//     // Step 2: Decrease the available slots by 1 for the selected doctor, location, and date
//     const updateSlotQuery = `
//       UPDATE doctor_availability 
//       SET available_slots = available_slots - 1 
//       WHERE doctor_id = ? 
//       AND available_slots > 0 
//       AND available_date = ? 
//       AND location_name = ?
//       LIMIT 1
//     `;
//     await db.promise().query(updateSlotQuery, [doctorId, date, location]);

//     // Step 3: Return success response
//     res.json({ success: true, message: "Doctor booked successfully." });

//   } catch (err) {
//     console.error("Error booking doctor:", err);
//     res.status(500).json({ success: false, message: "Internal server error", error: err.message });
//   }
// });

// module.exports = router;  // Export the router so it can be used in server.js







// const express = require("express");
// const db = require("../Config/db");
// const router = express.Router();

// // ✅ Book a Doctor API
// router.post("/book", async (req, res) => {
//   const { doctor_id, available_date, start_time } = req.body;

//   // Validate input data
//   if (!doctor_id || !available_date || !start_time) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields: doctor_id, available_date, start_time",
//     });
//   }

//   try {
//     // Check if there are available slots for the given doctor on the specified date and time
//     const checkAvailabilityQuery = `
//       SELECT * FROM doctor_availability
//       WHERE doctor_id = ? 
//       AND available_date = ? 
//       AND start_time = ? 
//       AND available_slots > 0
//     `;
//     const [availableSlots] = await db.promise().query(checkAvailabilityQuery, [
//       doctor_id,
//       available_date,
//       start_time,
//     ]);

//     if (availableSlots.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No available slots for the selected doctor on this date and time.",
//       });
//     }

//     // Reduce the available slots by 1
//     const updateSlotsQuery = `
//       UPDATE doctor_availability
//       SET available_slots = available_slots - 1
//       WHERE doctor_id = ? 
//       AND available_date = ? 
//       AND start_time = ? 
//       AND available_slots > 0
//     `;
//     const [updateResult] = await db.promise().query(updateSlotsQuery, [
//       doctor_id,
//       available_date,
//       start_time,
//     ]);

//     if (updateResult.affectedRows > 0) {
//       return res.json({
//         success: true,
//         message: "Doctor booked successfully. Available slots updated.",
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         message: "Failed to update available slots.",
//       });
//     }
//   } catch (err) {
//     console.error("Error booking doctor:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: err.message,
//     });
//   }
// });

// module.exports = router;



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
