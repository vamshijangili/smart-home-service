const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api", bookingRoutes);
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);
const workerRoutes = require("./routes/workerRoutes");
app.use("/api", workerRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Server
app.listen(5000, () => {
  console.log("Server running on port " + (process.env.PORT || 5000));
});