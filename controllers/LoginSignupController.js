const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const cloudinary=require('../config/cloudinary');
const Admin = require('../models/Admin');

require('dotenv').config()

//  Register new admin
const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      
    } = req.body;

    if (
      !username||
      !email ||
      !password ||
      !confirmPassword 
    ) {
      return res.status(400).json({ message: "Required data missing" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const newUser = await Admin.create({
      username,
      email,
      password: hashedPassword,
      
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Signup successful.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


//  Login and get token 
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // if (!user.isEmailVerified) {
    //   return res.status(400).json({ message: "Email not verified. Please verify your email to log in." });
    // }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username:user.username
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Login successful.",
      userId: user._id,
      token: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


module.exports = { signup, login}