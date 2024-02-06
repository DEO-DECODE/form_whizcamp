const User = require("../models/userModel");
const hashPassword = require("./../helpers/authHelper.js");
const { validationResult } = require('express-validator');
const { body } = require('express-validator');

exports.registerUser = [
  // Validation rules
  body('firstname').notEmpty().withMessage('First name is required'),
  body('lastname').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('education').notEmpty().withMessage('Education is required'),
  body('skills').notEmpty().withMessage('At least one skill is required'),
  body('workplace').notEmpty().withMessage('Workplace is required'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array().map((error) => ({ field: error.param, message: error.msg })),
      });
    }

    try {
      // Your existing code for user registration
      const { firstname, lastname, email, education, skills, workplace, hobbies, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: 'Already Registered',
        });
      }

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
        success: true,
        message: 'User Registered successfully',
        savedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: 'Error in Registration',
        error,
      });
    }
  },
];
