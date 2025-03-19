const express = require("express");
const db = require("../Config/db");  // Database connection
const router = express.Router();

// Doctor login route
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  try {
    // Query for the correct column name 'mobile_no' instead of 'phone'
    const query = "SELECT * FROM doctor_login WHERE mobile_no = ?";
    const [results] = await db.promise().query(query, [phone]);

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid phone number or password" });
    }

    const user = results[0];

    // Check if password matches
    if (user.password === password) {
      return res.json({
        success: true,
        message: "Login successful",
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid phone number or password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ success: false, message: "Internal server error", error: err });
  }
});

module.exports = router;
