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
    if (!firstname) {
      return res.send({ error: "First name is Required" });
    }
    if (!lastname) {
      return res.send({ error: "Last name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!education) {
      return res.send({ message: "Education is Required" });
    }
    if (!skills.length) {
      return res.send({ message: "Please Provide At least One Skill" });
    }
    if (!workplace) {
      return res.send({ message: "Please Provide workplace" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Already Registered",
      });
    }
    console.log(req.body);
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
    // console.log("After creating user:", newUser);

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Registered successfully",
      savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};
