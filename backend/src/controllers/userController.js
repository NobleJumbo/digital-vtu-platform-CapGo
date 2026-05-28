const { request } = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const selectSafeUserFields = "-password";

const createUser = async (request, res, next) => {
  try {
    const { name, email, password } = request.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const safeUser = await User.findById(user._id).select(
      selectSafeUserFields
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: safeUser,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
};