import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WorkerLogin() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  // 🔐 Login
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/worker/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        localStorage.setItem("workerToken", data.token);
        localStorage.setItem("workerId", data.worker._id);
        alert("Worker Login Successful ✅");
        navigate("/worker-dashboard"); 
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  // 📝 Register
  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/worker/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          serviceType,
          location
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Worker Registered ✅");
        setShowPopup(false);  
        
      } else {
        alert(data.message || "Error");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="page-card" style={{ textAlign: "center" }}>
      <h2>Worker Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>

      <p>
        Not registered?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setShowPopup(true)}
        >
          Register here
        </span>
      </p>

      {/* 🔷 Popup */}
      {showPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h3>Worker Register</h3>

            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            /><br /><br />

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            /><br /><br />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            /><br /><br />

            <input
              type="text"
              placeholder="Service Type (electrician/plumber)"
              onChange={(e) => setServiceType(e.target.value)}
            /><br /><br />

            <input
              type="text"
              placeholder="Address"
              onChange={(e) => setLocation(e.target.value)}
            /><br /><br />

            <button onClick={handleRegister}>Register</button>
            <button
              onClick={() => setShowPopup(false)}
              style={{ marginLeft: "10px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const popupStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center"
};

export default WorkerLogin;