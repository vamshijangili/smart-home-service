const express = require("express");
const router = express.Router();
const Worker = require("../models/Worker");

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

    res.json({ message: "Login Success", worker });
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