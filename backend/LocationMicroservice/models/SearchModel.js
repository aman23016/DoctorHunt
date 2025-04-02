// models/SearchModel.js
const db = require("../Config/db");

// Function to fetch nearest metro stations for location
const getNearestMetroStations = (locality) => {
  const query = `
    SELECT 
      station_name, 
      nearest_metro_1, distance_1,
      nearest_metro_2, distance_2,
      nearest_metro_3, distance_3,
      nearest_metro_4, distance_4
    FROM location_map 
    WHERE station_name = ?
  `;
  return db.promise().query(query, [locality]);
};

// Function to fetch doctors based on location and specialization
const getDoctors = (metroStations, date, doctorType) => {
  const query = `
    SELECT da.*, dl.id AS doctor_id, dl.name AS doctor_name, dl.specialization, dl.consultation_fees, dl.contact_details
    FROM doctor_availability da
    JOIN doctor_login dl ON da.doctor_id = dl.id
    WHERE da.location_name IN (?, ?, ?, ?) 
      AND da.available_date = ? 
      AND dl.specialization = ?
  `;
  return db.promise().query(query, [...metroStations, date, doctorType]);
};

module.exports = {
  getNearestMetroStations,
  getDoctors
};
