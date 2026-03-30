const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/user/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.json({ message: "User Registered", user });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.json({ message: "Login Success", user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;