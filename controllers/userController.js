const User = require("../models/userModel");
const hashPassword = require("./../helpers/authHelper.js");
exports.registerUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      education,
      skills,
      workplace,
      hobbies,
      password,
    } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      firstname,
      lastname,
      email,
      education,
      skills,
      workplace,
      hobbies,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      status: "success",
      data: savedUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        status: "fail",
        message: errors,
      });
    }
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
