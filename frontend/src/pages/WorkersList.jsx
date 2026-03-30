import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function WorkersList() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const serviceType = query.get("type") || "general";

  const [workers] = useState([
    { name: "Ravi", experience: "5 years" },
    { name: "Suresh", experience: "3 years" }
  ]);
  const [message, setMessage] = useState("");

  const handleBooking = async (workerName) => {
    try {
      const userName = "Demo User";
      const response = await axios.post("http://localhost:5000/api/bookings", {
        userName,
        workerName,
        serviceType
      });
      setMessage(`Booking confirmed with ${workerName} for ${serviceType}.`);
      console.log("Booking saved", response.data);
    } catch (error) {
      console.error("Booking failed", error);
      setMessage("Booking failed. Try again.");
    }
  };

  return (
    <div className="page-card" style={{ textAlign: "center" }}>
      <h2>Available {serviceType} Workers</h2>
      <p>{message}</p>

      {workers.map((w, index) => (
        <div key={index} style={{ padding: "10px" }}>
          <h3>{w.name}</h3>
          <p>{w.experience}</p>
          <button onClick={() => handleBooking(w.name)}>Book Now</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default WorkersList;