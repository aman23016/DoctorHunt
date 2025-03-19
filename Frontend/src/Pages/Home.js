import React from "react";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center h-[80vh]">
        <h2 className="text-3xl font-semibold text-gray-700">
          Welcome to DoctorHunt
        </h2>
      </div>
    </div>
  );
};

export default Home;
