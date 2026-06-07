const { creditWallet } = require("../services/walletService");
const { getWalletByUserId } = require("../services/walletService");

const fundWallet = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid amount",
      });
    }

    // 🔥 THIS IS THE KEY PART
    const userId = req.user.id;

    const wallet = await creditWallet(userId, amount);

    return res.status(200).json({
      success: true,
      message: "Wallet funded successfully",
      wallet,
    });
  } catch (error) {
    next(error);
  }
};


const getWallet = async (req, res, next) => {
  try {
    const wallet = await getWalletByUserId(req.user.id);  

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found",
      });
    }

    return res.status(200).json({
      success: true,
      wallet,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fundWallet,
  getWallet,
};