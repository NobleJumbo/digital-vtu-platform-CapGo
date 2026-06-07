const mongoose = require("mongoose");

const virtualAccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one virtual account per user
    },

    accountNumber: {
      type: String,
      required: true,
    },

    accountName: {
      type: String,
      required: true,
    },

    bankName: {
      type: String,
      required: true,
    },

    provider: {
      type: String,
      required: true,
    },

    providerAccountId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VirtualAccount",virtualAccountSchema);