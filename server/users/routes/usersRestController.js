const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authenticateToken = require("../../utilities");


//create account
router.post("/create-account", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }
    
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ error: true, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    
    await user.save();
    
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" }
    );
    
    return res.status(201).json({
      error: false,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "Registration Successful",
    });
  } catch (error) {
    console.error("Error in /create-account:", error);
    res.status(500).json({ error: true, message: "Server error" });
  }
});


// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body beacause email and password are required
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "Email and Password are required" });
    }

    // Find user by email because email is unique
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid Credentials" });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" }
    );

    // Return successful response
    return res.status(200).json({
      error: false,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Error in /login:", error.message);

    // Catch unexpected errors
    return res.status(500).json({
      error: true,
      message: "Server error. Please try again later.",
    });
  }
});


// Get user
router.get("/get-user", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    return res.json({ error: false, user });
  } catch (err) {
    console.error("Error in /get-user:", err);
    return res.status(500).json({ error: true, message: "Server error" });
  }
});


module.exports = router;
