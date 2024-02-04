const express = require("express");
const { registerUser } = require("../controllers/userController");
const router = express.Router();

// This is correct
router.route("/register").post(registerUser);

module.exports = router;
