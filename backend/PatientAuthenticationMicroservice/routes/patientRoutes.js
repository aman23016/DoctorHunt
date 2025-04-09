const express = require("express");
const db = require("../Config/db"); // Database connection
const bcrypt = require("bcryptjs");
const router = express.Router();

// ✅ Patient Signup
router.post("/signup", async (req, res) => {
  const { name, age, phone, password } = req.body;

  // Log the received data
  console.log("Signup request received with data:", req.body);
  console.log("Request received at /api/patients/login");


  // Check if phone number already exists
  const checkQuery = "SELECT * FROM patients WHERE phone = ?";
  try {
    const [checkResults] = await db.query(checkQuery, [phone]);
    console.log("Check if phone exists:", checkResults);

    if (checkResults.length > 0) {
      return res.status(400).json({ success: false, message: "Phone number already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new patient into the database
    const insertQuery = "INSERT INTO patients (name, age, phone, password) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(insertQuery, [name, age, phone, hashedPassword]);
    console.log("Patient inserted:", result);
    
    res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.error("Signup failed", err);
    return res.status(500).json({ success: false, message: "Database error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  // Log the received data
  console.log("Login request received with data:", req.body);

  // Check if phone number exists
  const query = "SELECT * FROM patients WHERE phone = ?";
  try {
    const [results] = await db.query(query, [phone]);
    console.log("Query result:", results); // Log the query result

    if (results.length === 0) {
      console.log("No user found with the given phone number.");
      return res.status(400).json({ success: false, message: "Invalid phone number or password" });
    }

    const user = results[0];

    // Log user data before comparing password
    console.log("User found:", user);

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match.");
      return res.status(400).json({ success: false, message: "Invalid phone number or password" });
    }

    // If login is successful, send success response with user info
    console.log("Login successful for user:", user.name);
    res.json({
      success: true,
      message: "Login successful",
      patient_id: user.id,  // Send patient ID in response for successful login
      patient_name: user.name,  // Send patient name in response
    });
  } catch (err) {
    console.error("Login failed:", err);
    return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
});

module.exports = router;