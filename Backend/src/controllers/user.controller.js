const UserModel = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");
const uploadToImageKit = require("../services/storage.service");
const OTPGenerator = require("otp-generator");
const twilio = require("twilio");
let { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = require("../config/env");

const otpStore = new Map();

  const client = twilio(
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
  );

const sendOTPController = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Valid 10-digit mobile required",
      });
    }

    const otp = OTPGenerator.generate(4, { digits: true });
    otpStore.set(mobile, { otp, expires: Date.now() + 5 * 60 * 1000 });

    await client.messages.create({
      body: `Your OTP is ${otp}. Valid for 5 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${mobile}`,
    });

    res.json({
      success: true,
      message: "OTP sent to your mobile!",
    });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ success: false, message: "OTP sending failed" });
  }
};

const registerController = async (req, res) => {
  try {
    const { name, email, mobile, age, password, otp } = req.body;

    if (!name || !password || (!email && !mobile)) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (email && (await UserModel.findOne({ email }))) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }
    if (mobile && (await UserModel.findOne({ mobile }))) {
      return res
        .status(409)
        .json({ success: false, message: "Mobile already exists" });
    }

    // OTP verify
    if (mobile && otp) {
      const otpData = otpStore.get(mobile);
      if (!otpData || otpData.otp !== otp || otpData.expires < Date.now()) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid/expired OTP" });
      }
      otpStore.delete(mobile);
    }

    const hashedPassword = await hashPassword(password);
    const userData = { name, password: hashedPassword };
    if (email) userData.email = email;
    if (mobile) userData.mobile = mobile;
    if (age) userData.age = age;

    const user = await UserModel.create(userData);
    const token = generateToken(user._id);
    res.cookie("token", token);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email & password required" });
    }

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.cookie("token", token);
    return res
      .status(200)
      .json({ success: true, message: "Login successful", data: user });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const uploadProfilePicController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    } // Upload single file buffer to ImageKit

    const uploadedImage = await uploadToImageKit(
      req.file.buffer,
      req.file.originalname,
    ); // Get URL

    const imagePath = uploadedImage.url; // Update user in DB

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      { image: imagePath },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      data: {
        image: updatedUser.image,
      },
    });
  } catch (error) {
    console.error("Upload Profile Pic Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  uploadProfilePicController,
  sendOTPController,
};
