const paystack = require("../services/paymentService.js");
const ServiceOrder = require("../models/payStackPayment.js");

const initializeServicePayment = async (req, res, next) => {
  try {
    const {
      service,
      phone,
      network,
      planId,
      planName,
      amount,
    } = req.body;

    // Validate fields
    if (
      !service ||
      !phone ||
      !amount
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Service, phone and amount are required",
      });
    }

    // Make sure amount is valid
    const numericAmount = Number(amount);

    if (
      Number.isNaN(numericAmount) ||
      numericAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    // Create our internal order first
    const order = await ServiceOrder.create({
      user: req.user.id,
      service,
      phone,
      network,
      planId,
      planName,
      amount: numericAmount,
      paymentStatus: "pending",
      serviceStatus: "pending",
    });

    // Paystack amount is in kobo
    const amountInKobo = Math.round(
      numericAmount * 100
    );

    // Initialize Paystack
    const response = await paystack.post(
      "/transaction/initialize",
      {
        email: req.user.email,

        amount: amountInKobo,

        currency: "NGN",

        channels: [
          "card",
          "bank_transfer",
        ],

        callback_url:
          "http://localhost:5173/payment/callback",

        metadata: {
          orderId: order._id.toString(),

          userId: req.user.id.toString(),

          service,

          phone,

          network,

          planId,

          planName,

          amount: numericAmount,
        },
      }
    );

    if (!response.data.status) {
      return res.status(400).json({
        success: false,
        message:
          "Unable to initialize payment",
      });
    }

    // Save Paystack reference
    order.paymentReference =
      response.data.data.reference;

    await order.save();

    return res.status(200).json({
      success: true,

      message:
        "Payment initialized successfully",

      orderId: order._id,

      reference:
        response.data.data.reference,

      authorization_url:
        response.data.data.authorization_url,

      access_code:
        response.data.data.access_code,
    });
  } catch (error) {
    console.log(
      "PAYSTACK INITIALIZATION ERROR:",
      error.response?.data ||
        error.message
    );

    next(error);
  }
};

module.exports = {
  initializeServicePayment,
};