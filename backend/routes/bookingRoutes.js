const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// 
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

    res.json({ message: "Booking Request Sent" });
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
router.put("/update/:id", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });

    res.json({ message: "Status Updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;