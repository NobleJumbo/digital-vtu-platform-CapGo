const { debitWallet } = require("../services/walletService");

const buyAirtime = async (req, res, next) => {
  try {
    const { amount, phone, network } = req.body;

    if (!amount || !phone || !network) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const wallet = await debitWallet(
      req.user.id,
      amount,
      "airtime",
      `Airtime purchase for ${phone}`
    );

    return res.status(200).json({
      success: true,
      message: "Airtime purchased successfully (simulated)",
      wallet,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  buyAirtime,
};