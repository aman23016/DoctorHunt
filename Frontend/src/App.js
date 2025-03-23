
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import DoctorLogin from "./Pages/DoctorLogin";
import PatientLogin from "./Pages/PatientLogin";
import PatientSignup from "./Pages/PatientSignup";
import DoctorSearch from "./Pages/DoctorSearch";
import AvailabilityEntry from "./Pages/AvailabilityEntry"; // Import AvailabilityEntry page
import SearchResults from "./Pages/SearchResults"; // Import SearchResults page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-signup" element={<PatientSignup />} />
        <Route path="/doctor-search" element={<DoctorSearch />} />
        <Route path="/availability-entry" element={<AvailabilityEntry />} />
        <Route path="/search-results" element={<SearchResults />} /> {/* Add route for SearchResults */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
