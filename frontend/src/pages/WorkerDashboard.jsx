import { useEffect, useState } from "react";
import axios from "axios";

function WorkerDashboard() {
  const [bookings, setBookings] = useState([]);

  // Worker name can come from login context; for now use a default test worker.
  const workerName = "Ravi";

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/worker-bookings/${workerName}`);
        setBookings(res.data);
      } catch (error) {
        console.error("Failed to load worker bookings", error);
      }
    };
    loadBookings();
  }, [workerName]);

  return (
    <div className="page-card" style={{ textAlign: "center" }}>
      <h2>{workerName} Dashboard</h2>
      <p>You have {bookings.length} booking(s) assigned.</p>
      {bookings.length === 0 && <p>No bookings yet.</p>}

      {bookings.map((booking) => (
        <div
          key={booking._id}
          style={{ background: "#f1faff", padding: "12px", borderRadius: "8px", margin: "8px 0" }}
        >
          <strong>{booking.userName}</strong>
          <p>Service: {booking.serviceType}</p>
          <p>Status: {booking.status}</p>
        </div>
      ))}
    </div>
  );
}

export default WorkerDashboard;