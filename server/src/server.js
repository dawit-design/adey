require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to Adey API");
});

// Connect DB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Adey API running on port ${PORT}`);
});