const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      unique: true,
      minlength: [10, "Mobile number must be 10 digits"],
      maxlength: [10, "Mobile number must be exactly 10 digits"],
    },

    age: {
      type: Number,
      min: 1,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", userSchema);
