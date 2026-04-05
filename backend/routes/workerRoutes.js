const express = require("express");
const router = express.Router();
const Worker = require("../models/Worker");
const jwt = require("jsonwebtoken");

router.post("/worker/register", async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();

    res.json({ message: "Worker Registered", worker });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/worker/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ email, password });

    if (!worker) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 🔥 Create Token
    const token = jwt.sign(
      { id: worker._id, role: "worker" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login Success", token, worker });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get workers by service type
router.get("/workers", async (req, res) => {
  try {
    const { type } = req.query;

    const workers = await Worker.find({ serviceType: type });

    res.json(workers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;