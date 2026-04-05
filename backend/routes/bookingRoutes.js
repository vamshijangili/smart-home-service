const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Get all bookings for a service type
router.get("/requests/:serviceType", async (req, res) => {
  try {
    const type = req.params.serviceType;
    const bookings = await Booking.find({ serviceType: type });
    return res.json(bookings);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Create a new booking
router.post("/book", async (req, res) => {
  try {
    const { userId, workerId, serviceType } = req.body;

    const booking = new Booking({
      userId,
      workerId,
      serviceType
    });

    await booking.save();

    res.json({ message: "Booking Request Sent", booking });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get booking requests for a worker
router.get("/worker-requests/:workerId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      workerId: req.params.workerId
    })
      .populate("userId"); // get user details

    res.json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update booking status (accept/reject)
router.put("/booking/statusUpdate/:workerId", async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    if (!bookingId || !status) {
      return res.status(400).json({ message: "bookingId and status are required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking._id.toString() !== req.params.workerId) {
      return res.status(403).json({ message: "Unauthorized worker" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    res.json({ message: "Status Updated", booking: updatedBooking });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;