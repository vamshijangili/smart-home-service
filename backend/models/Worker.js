const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  serviceType: String,
  address: String
});

module.exports = mongoose.model("Worker", workerSchema);