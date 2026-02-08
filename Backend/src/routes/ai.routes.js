const express = require("express");
const router = express.Router();

const {
  aiController,
  getReportController,
} = require("../controllers/ai.controller");

const authMiddleware = require("../middlewares/auth.middleware");

// Create AI report
router.post("/ai", authMiddleware, aiController);

// Get user report
router.get("/report", authMiddleware, getReportController);

module.exports = router;
