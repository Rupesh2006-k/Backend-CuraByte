const express = require("express");
const userRoute = express.Router();
const upload = require("../middlewares/multer.middleware");
const {
  registerController,
  loginController,
  logoutController,
  uploadProfilePicController,
  sendOTPController,
} = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");

userRoute.post("/register", registerController);
userRoute.post("/login", loginController);
userRoute.post("/logout", authMiddleware, logoutController);
userRoute.post("/send-otp", sendOTPController);

// Upload profile pic route
userRoute.post(
  "/profile-pic",
  authMiddleware,
  upload.single("image"), // expects "image" in form-data
  uploadProfilePicController,
);
module.exports = userRoute;
