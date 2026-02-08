const { GoogleGenAI } = require("@google/genai");
let { GOOGLE_GEMINI_KEY } = require("../config/env");
let promptInstruction = require("../utils/prompt");

const ai = new GoogleGenAI({
  apiKey: GOOGLE_GEMINI_KEY,
});

async function generateContent(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      maxOutputTokens: 150,
      temperature: 0.2,
      systemInstruction: promptInstruction,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    return (
      response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
    );
  } catch (err) {
    console.error("AI generation error:", err);
    return "Error generating response.";
  }
}

module.exports = generateContent;
