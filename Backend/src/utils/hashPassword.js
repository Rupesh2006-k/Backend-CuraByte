const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.error("Password hashing failed:", error.message);
    throw new Error("Hashing failed");
  }
};

module.exports = hashPassword;
