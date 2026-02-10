const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reportName: {
      type: String,
      required: true, 
    },  

    reportType: {
      type: String,
      enum: ["blood", "xray", "mri", "ct", "prescription", "other","Fever","health"],
      required: true,
    },

    aiAnalysis: {
      type: String, 
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("report", reportSchema);
