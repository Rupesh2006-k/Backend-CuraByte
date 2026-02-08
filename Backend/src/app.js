require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
let aiRoutes = require('./routes/ai.routes')
let userRoutes = require('./routes/user.routes');
const connectDB = require("./db/connectDB");
const app = express()

// ================== MIDDLEWARES ==================
connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ================== ROUTES ==================

app.use('/api/ai' , aiRoutes)
app.use('/api/auth' ,userRoutes)

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running 🚀",
  });
});
module.exports = app;
