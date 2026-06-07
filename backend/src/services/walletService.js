const Wallet = require("../models/Wallet");
const { createTransaction } = require("./transactionService");


// Create Wallet
const createWallet = async (userId) => {
  return await Wallet.create({ user: userId,});
};



const creditWallet = async (userId, amount, description = "Wallet funded") => {
  amount = Number(amount);

  if (isNaN(amount) || amount <= 0) {
    throw new Error("Invalid amount");
  }

  const wallet = await Wallet.findOne({ user: userId });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  const before = wallet.balance;

  wallet.balance = Number(wallet.balance) + amount;

  await wallet.save();

  await createTransaction({
    user: userId,
    type: "wallet_funding",
    amount,
    status: "successful",
    description,
    balanceBefore: before,
    balanceAfter: wallet.balance,
  });

  return wallet;
};

const debitWallet = async (userId, amount,type, description) => {
  const wallet = await Wallet.findOne({
    user: userId,
  });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  if (wallet.balance < amount) {
    throw new Error(
      "Insufficient wallet balance"
    );
  }

  const before = wallet.balance;

  wallet.balance -= amount;

  await wallet.save();

  await createTransaction({
    user: userId,
    type,
    amount,
    status: "successful",
    description,
    balanceBefore: before,
    balanceAfter: wallet.balance,
  });

  return wallet;
};


// Get Wallet
const getWalletByUserId = async (userId) => {
  return await Wallet.findOne({
    user: userId,
  });
};


module.exports = {
  createWallet,
  getWalletByUserId,
  creditWallet,
  debitWallet,
};