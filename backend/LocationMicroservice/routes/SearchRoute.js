
const express = require('express');
const db = require('../Config/db');  // Your DB connection
const router = express.Router();  // This is where the router is defined

router.post("/search", async (req, res) => {
  const { locality, doctorType, date } = req.body;

  try {
    // Step 1: Fetch nearest metro stations and distances
    const locationQuery = `
      SELECT 
        station_name, 
        nearest_metro_1, distance_1,
        nearest_metro_2, distance_2,
        nearest_metro_3, distance_3,
        nearest_metro_4, distance_4
      FROM location_map 
      WHERE station_name = ?
    `;
    const [locationResults] = await db.query(locationQuery, [locality]);

    if (locationResults.length === 0) {
      return res.status(400).json({ success: false, message: "No data found for this locality." });
    }

    const nearbyStations = locationResults[0];

    // Step 2: Fetch doctors based on location (using 4 nearest metro stations) and specialization
    const doctorQuery = `
      SELECT da.*, dl.id AS doctor_id, dl.name AS doctor_name, dl.specialization, dl.consultation_fees, dl.contact_details
      FROM doctor_availability da
      JOIN doctor_login dl ON da.doctor_id = dl.id
      WHERE da.location_name IN (?, ?, ?, ?) 
        AND da.available_date = ? 
        AND dl.specialization = ?
    `;
    const [doctorResults] = await db.query(doctorQuery, [
      nearbyStations.nearest_metro_1, 
      nearbyStations.nearest_metro_2, 
      nearbyStations.nearest_metro_3,
      nearbyStations.nearest_metro_4,
      date,
      doctorType
    ]);

    if (doctorResults.length === 0) {
      return res.status(400).json({ success: false, message: "No doctors available for this search." });
    }

    // Step 3: Prepare the response to include the details of doctors and their distance from nearest metro stations
    const doctorsWithDistance = doctorResults.map((doctor) => {
      const remainingSlots = doctor.available_slots ? doctor.available_slots : "N/A"; // Get remaining slots, or "N/A" if not available
      return {
        doctor_id: doctor.doctor_id,  // Added doctor_id here
        doctor_name: doctor.doctor_name,
        specialization: doctor.specialization,
        consultation_fees: doctor.consultation_fees,
        contact_details: doctor.contact_details,
        available_date: doctor.available_date,
        start_time: doctor.start_time,
        available_slots: remainingSlots, // Add remaining slots
        address: doctor.address,
        nearest_metro_station: getNearestMetro(doctor.location_name, nearbyStations),
        distance: getDistance(doctor.location_name, nearbyStations)
      };
    });

    // Step 4: Return the doctor details along with nearest metro station and distance
    res.json({
      success: true,
      message: "Doctors found successfully",
      doctors: doctorsWithDistance,
    });

  } catch (err) {
    console.error("Error during doctor search:", err);
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
});

// Helper function to get the nearest metro station
function getNearestMetro(location, stations) {
  switch (location) {
    case stations.nearest_metro_1:
      return stations.nearest_metro_1;
    case stations.nearest_metro_2:
      return stations.nearest_metro_2;
    case stations.nearest_metro_3:
      return stations.nearest_metro_3;
    case stations.nearest_metro_4:
      return stations.nearest_metro_4;
    default:
      return "Unknown";
  }
}

function getDistance(location, stations) {
  switch (location) {
    case stations.nearest_metro_1:
      return stations.distance_1;
    case stations.nearest_metro_2:
      return stations.distance_2;
    case stations.nearest_metro_3:
      return stations.distance_3;
    case stations.nearest_metro_4:
      return stations.distance_4;
    default:
      return "Unknown";
  }
}

module.exports = router;  


