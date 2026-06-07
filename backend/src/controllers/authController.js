const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createWallet } = require("../services/walletService");
const {
  createVirtualAccount,
} = require("../services/virtualAccountService.js");
const selectSafeUserFields = "-password";

// ==================== REGISTER ====================

const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or phone number already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // ==================== CREATE WALLET ====================
    try {
      await createWallet(user._id);
      // fake account for now
    await createVirtualAccount({
    user: user._id,
  accountNumber:
    Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString(),
  accountName: user.name.toUpperCase(),
  bankName: "Demo Bank",
  provider: "LOCAL",
  providerAccountId: `VA-${Date.now()}`,
});

    } catch (walletError) {
      // rollback user if wallet fails (important for consistency)
      await User.findByIdAndDelete(user._id);

      return res.status(500).json({
        success: false,
        message: "Wallet creation failed",
      });
    }

    const safeUser = await User.findById(user._id).select(
      selectSafeUserFields
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

// ==================== LOGIN ====================

const loginUser = async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;

    if ((!email && !phone) || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/phone and password are required",
      });
    }

    const identifier = email || phone;

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Access token (short life)
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Refresh token (long life)
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==================== REFRESH TOKEN ====================

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: "Invalid refresh token",
          });
        }

        const accessToken = jwt.sign(
          { id: decoded.id },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        return res.status(200).json({
          success: true,
          accessToken,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== LOGOUT ====================

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  refreshToken,
  logoutUser,
};