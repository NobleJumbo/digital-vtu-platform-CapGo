const User = require("../models/User");
const {
  initializePayment,
  verifyPayment,
} = require("../services/paymentService");

const {
  creditWallet,
} = require("../services/walletService");

const fundWallet = async (
  req,
  res,
  next
) => {
  try {
    const { amount } = req.body;

    const user = await User.findById(
      req.user.id
    );

    const payment =
      await initializePayment(
        user.email,
        amount
      );

    return res.status(200).json({
      success: true,
      data: payment.data,
    });
  } catch (error) {
    next(error);
  }
};

const verifyWalletFunding = async (
  req,
  res,
  next
) => {
  try {
    const { reference } = req.params;

    const payment =
      await verifyPayment(reference);

    if (
      payment.data.status === "success"
    ) {
      const amount =
        payment.data.amount / 100;

      await creditWallet(
        req.user.id,
        amount
      );

      return res.status(200).json({
        success: true,
        message:
          "Wallet funded successfully",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Payment failed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fundWallet,
  verifyWalletFunding,
};