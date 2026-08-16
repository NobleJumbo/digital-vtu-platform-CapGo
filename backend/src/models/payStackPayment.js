const mongoose = require("mongoose");

const serviceOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: String,
      required: true,
      enum: [
        "data",
        "airtime",
        "cable",
        "electricity",
      ],
    },

    phone: {
      type: String,
      required: true,
    },

    network: {
      type: Number,
      required: false,
    },

    planId: {
      type: Number,
      required: false,
    },

    planName: {
      type: String,
      required: false,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentReference: {
      type: String,
      unique: true,
      sparse: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
      ],
      default: "pending",
    },

    serviceStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "successful",
        "failed",
      ],
      default: "pending",
    },

    providerReference: {
      type: String,
      default: null,
    },

    providerResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ServiceOrder",
  serviceOrderSchema
);