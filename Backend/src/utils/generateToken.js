const jwt = require("jsonwebtoken");
let { JWT_SECRET } = require("../config/env");
const generateToken = (userId) => {
  try {
    return jwt.sign(
      { id: userId },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
  } catch (error) {
    console.error("JWT Token generation failed:", error.message);
    throw new Error("Token generation failed");
  }
};

module.exports = generateToken;
