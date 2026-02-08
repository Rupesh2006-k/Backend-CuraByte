const generateConten = require("../services/ai.service");

const aiController = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const aiResponse = await generateConten(prompt);
    return res.status(200).json({ result: aiResponse });
  } catch (err) {
    console.error("AI Controller error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = aiController;
