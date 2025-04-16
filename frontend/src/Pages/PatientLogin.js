// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./PatientAuth.css"; // Shared CSS for login & signup

// const PatientLogin = () => {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();  // Initialize useNavigate hook

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!phone || !password) {
//       alert("Please fill in both fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/patients/login", {
//         phone,
//         password,
//       });

//       if (response.data.success) {
//         // Check if the redirection works
//         navigate("/doctor-search");  // Redirect to doctor search page
//       } else {
//         alert("Invalid phone number or password");
//       }
//     } catch (error) {
//       console.error("Login failed", error);
//       alert("Something went wrong! Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Patient Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Enter your phone number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <p>New here? <a href="/patient-signup">Sign up</a></p>
//       </div>
//     </div>
//   );
// };

// export default PatientLogin;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PatientAuth.css"; // Shared CSS for login & signup

const PatientLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!phone || !password) {
      alert("Please fill in both fields.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post("http://34.69.20.136/api/patients/login", {
        phone,
        password,
      });
  
      if (response.data.success) {
        // Store the patient's name and other details in localStorage
        localStorage.setItem("patient_name", response.data.patient_name); // Save patient name
        localStorage.setItem("patient_phone", phone);  // Optionally save phone number too
  
        navigate("/doctor-search"); // Redirect to doctor search page
      } else {
        alert("Invalid phone number or password");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Patient Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          New here?{" "}
          <button onClick={() => navigate("/patient-signup")}>Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default PatientLogin;
