const Transaction = require("../models/Transaction");

const createTransaction = async ({
  user,
  type,
  amount,
  status = "successful",
  description = "",
  balanceBefore = 0,
  balanceAfter = 0,
}) => {
  const reference =
    "TXN-" +
    Date.now() +
    "-" +
    Math.floor(Math.random() * 10000);

  const transaction =
    await Transaction.create({
      user,
      type,
      amount,
      status,
      reference,
      description,
      balanceBefore,
      balanceAfter,
    });

  return transaction;
};

const getUserTransactions = async (
  userId
) => {
  return await Transaction.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

const getTransactionById = async (
  transactionId
) => {
  return await Transaction.findById(
    transactionId
  );
};

module.exports = {
  createTransaction,
  getUserTransactions,
  getTransactionById,
};