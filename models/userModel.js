const mongoose = require("mongoose");
const validator = require("validator");
const education = ["B.E", "B.TECH", "DIPLOMA"];
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name can not exceed more than 30 characters"],
    minLength: [2, "Name should be greater tha 4 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name can not exceed more than 30 characters"],
    minLength: [2, "Name should be greater tha 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  education: {
    type: String,
    enum: education,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  workplace: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
  },
  hobbies: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
});
module.exports = mongoose.model("User", userSchema,"User");
