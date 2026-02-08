const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  try {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
  } catch (error) {
    console.error("JWT Token generation failed:", error.message);
    throw new Error("Token generation failed");
  }
};

module.exports = generateToken;
