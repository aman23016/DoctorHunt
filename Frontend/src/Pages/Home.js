
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Home.css"; // Custom CSS for styling

const Home = () => {
  const navigate = useNavigate();

  // Function to navigate to Doctor Login
  const handleDoctorLogin = () => {
    navigate("/doctor-login");
  };

  // Function to navigate to Patient Login
  const handlePatientLogin = () => {
    navigate("/patient-login");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/HomepageBackground.jpg')", // Background image
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Navbar />
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center text-white">
          <h2 className="text-5xl font-bold mb-6">Welcome to DoctorHunt</h2>
        </div>
      </div>

      <div className="flex justify-center space-x-10 mt-12 mb-10">
        {/* Doctor Features Section */}
        <div className="feature-box bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
          <h3 className="text-3xl font-bold mb-4">Hello Doctor!!</h3>
          <ul className="text-lg">
            <li>Set Your Availability: Doctors can choose when they're available and how many slots to offer.</li>
            <li>Manage Appointments: Doctors can easily see and manage their appointments with patients.</li>
            <li>Booking History: Doctors can view past and future appointments in one place.</li>
          </ul>
          {/* Doctor Login Button */}
          <button
            className="login-button"
            onClick={handleDoctorLogin} // Navigate to Doctor Login page
          >
            Doctor Login
          </button>
        </div>

        {/* Patient Features Section */}
        <div className="feature-box bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
          <h3 className="text-3xl font-bold mb-4">Hello Patient!!</h3>
          <ul className="text-lg">
            <li>Search for Doctors: Patients can find doctors by specialty, location, and available times.</li>
            <li>Book Appointments Online: Patients can book appointments with doctors directly through the website.</li>
            <li>Secure Login: Patients can safely create accounts and log in to book appointments.</li>
          </ul>
          {/* Patient Login Button */}
          <button
            className="login-button"
            onClick={handlePatientLogin} // Navigate to Patient Login page
          >
            Patient Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
