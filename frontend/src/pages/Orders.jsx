import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  const workerId = localStorage.getItem("workerId");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/worker-requests/${workerId}`
        );
        setBookings(res.data);
      } catch (error) {
        console.error("Failed to load bookings", error);
        setError("Could not load booking requests.");
      }
    };

    if (workerId) loadBookings();
  }, [workerId]);

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/booking/statusUpdate/${workerId}`,
        { bookingId, status: newStatus }
      );

      console.log(res.data);

      // Update UI instantly
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
      setError("Failed to update booking status.");
    }
  };

  return (
    <div className="page-card" style={{ textAlign: "center" }}>
      <h2>Worker Orders</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>You have {bookings.length} request(s)</p>

      {bookings.length === 0 && <p>No requests yet.</p>}

      {bookings.map((booking) => (
        <div
          key={booking._id}
          style={{
            background: "#f1faff",
            padding: "12px",
            borderRadius: "8px",
            margin: "8px 0"
          }}
        >
          <strong>{booking.userId?.name || "Unknown"}</strong>
          <p>Email: {booking.userId?.email || "Unknown"}</p>
          <p>Location: {booking.userId?.location || "Not provided"}</p>
          <p>Service: {booking.serviceType}</p>
          <p>Status: {booking.status}</p>

          {/* ✅ Show buttons only if status is pending */}
          {booking.status === "pending" && (
            <>
              <button
                onClick={() =>
                  updateBookingStatus(booking._id, "accepted")
                }
              >
                Accept
              </button>

              <button
                style={{ marginLeft: "10px" }}
                onClick={() =>
                  updateBookingStatus(booking._id, "rejected")
                }
              >
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;