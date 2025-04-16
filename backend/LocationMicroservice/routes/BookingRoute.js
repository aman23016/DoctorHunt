
const express = require("express");
const router = express.Router();
const BookingService = require("../services/BookingService");

router.post("/book", async (req, res) => {
  const { doctor_id, patient_name, address, start_time } = req.body;

  try {
    const message = await BookingService.bookDoctor(doctor_id, patient_name, address, start_time);
    res.send({ success: true, message });
  } catch (err) {
    console.error("Error booking doctor:", err);
    res.status(500).send({ success: false, message: err.message });
  }
});

module.exports = router;
