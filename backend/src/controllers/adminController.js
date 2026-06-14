const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");

//GETTING ALL USERS
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// GETTING ALL TRANSACTIONS
const getAllTransactions = async (req,
  res,
  next
) => {
  try {
    const transactions =
      await Transaction.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

// GETTING ALL WALLETS
const getAllWallets = async (req, res, next) => {
  try {
    const wallets = await Wallet.find().populate("user", "name email");
    return res.status(200).json({
      success: true,
      count: wallets.length,
      wallets,
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req,res,next) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalWallets =
      await Wallet.countDocuments();

    const totalTransactions =
      await Transaction.countDocuments();

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalWallets,
        totalTransactions,
      },
    });
  } catch (error) {
    next(error);
  }
};



const getUserById = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await User.findById(
        req.params.id
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const blockUser = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          isBlocked: true,
        },
        { new: true }
      );

    return res.status(200).json({
      success: true,
      message:
        "User blocked successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const unblockUser = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          isBlocked: false,
        },
        { new: true }
      );

    return res.status(200).json({
      success: true,
      message:
        "User unblocked successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const {
  creditWallet,
} = require(
  "../services/walletService"
);

const adminCreditWallet =
  async (req, res, next) => {
    try {
      const { userId, amount } =
        req.body;

      const wallet =
        await creditWallet(
          userId,
          amount,
          "Admin wallet credit"
        );

      return res.status(200).json({
        success: true,
        wallet,
      });
    } catch (error) {
      next(error);
    }
  };


const createAdmin = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      email,
      phone,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser =
      await User.findOne({
        $or: [
          { email },
          { phone },
        ],
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email or phone already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
    });

    await createWallet(admin._id);

    return res.status(201).json({
      success: true,
      message:
        "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUsers,
  getAllTransactions,
  getAllWallets,
  getDashboardStats, 
  getUserById,
  blockUser,
  unblockUser,
  adminCreditWallet,   
    createAdmin
};