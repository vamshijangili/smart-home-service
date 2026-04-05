import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function WorkersList() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const serviceType = query.get("type") || "general";

  const [workers, setWorkers] = useState([]);
  const [message, setMessage] = useState("");

  // 🔥 Fetch workers from backend
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/workers?type=${serviceType}`
        );
        setWorkers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWorkers();
  }, [serviceType]);

  // 🔥 Booking
  const handleBooking = async (workerId) => {
    try {
      const userId = localStorage.getItem("userId"); // later set in login

      const res = await axios.post("http://localhost:5000/api/book", {
        userId,
        workerId,
        serviceType
      });

      const booking = res.data.booking;

      setMessage(
      `Booking sent ✅ | Status: ${booking.status}`
    );
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Booking failed ❌");
    }
  };

  return (
    <div className="page-card" style={{ textAlign: "center" }}>
      <h2>Available {serviceType} Workers</h2>
      <p>{message}</p>

      {workers.length === 0 ? (
        <p>No workers available</p>
      ) : (
        workers.map((w) => (
          <div key={w._id} style={{ padding: "10px" }}>
            <h3>{w.name}</h3>
            <p>Service: {w.serviceType}</p>
            <p>Location: {w.location}</p>

            <button onClick={() => handleBooking(w._id)}>
              Request 
            </button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default WorkersList;