// services/SearchService.js
const SearchModel = require("../models/SearchModel");

const searchDoctors = async (locality, doctorType, date) => {
  // Step 1: Fetch nearest metro stations
  const [locationResults] = await SearchModel.getNearestMetroStations(locality);
  if (locationResults.length === 0) {
    throw new Error("No data found for this locality.");
  }
  
  const nearbyStations = [
    locationResults[0].nearest_metro_1,
    locationResults[0].nearest_metro_2,
    locationResults[0].nearest_metro_3,
    locationResults[0].nearest_metro_4,
  ];

  // Step 2: Fetch doctors based on location and specialization
  const [doctorResults] = await SearchModel.getDoctors(nearbyStations, date, doctorType);
  if (doctorResults.length === 0) {
    throw new Error("No doctors available for this search.");
  }

  return doctorResults;
};

module.exports = {
  searchDoctors
};
