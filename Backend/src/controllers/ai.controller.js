const generateContent = require("../services/ai.service");
const ReportModel = require("../models/report.model");
const limitWords = require('../utils/limitWords')
const removeForbiddenPhrases = require('../utils/removeForbiddenPhrases')
const convertToSixBullets = require('../utils/convertToSixBullets')

const aiController = async (req, res) => {
  try {
    const { prompt, reportName, reportType } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    if (!prompt || !reportName || !reportType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const aiResponse = await generateContent(prompt);

    if (!aiResponse) {
      return res.status(500).json({
        success: false,
        message: "AI response failed",
      });
    }

    // 🔥 REAL PIPELINE (now actually used)
    const cleaned = removeForbiddenPhrases(aiResponse);
    const limited = limitWords(cleaned, 50);
    const finalOutput = convertToSixBullets(limited);

    const newReport = await ReportModel.create({
      userId,
      reportName,
      reportType,
      aiAnalysis: finalOutput,
    });

    return res.status(201).json({
      success: true,
      message: "Report created successfully",
      data: newReport,
    });
  } catch (error) {
    console.error("AI Controller error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const getReportController = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const report = await ReportModel.findOne({ userId });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Report fetched successfully",
      data: report,
    });
  } catch (error) {
    console.error("Get Report Controller error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { aiController, getReportController };
