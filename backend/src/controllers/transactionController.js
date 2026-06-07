const {
  getUserTransactions,
  getTransactionById,
} = require("../services/transactionService");

const getTransactions = async (
  req,
  res,
  next
) => {
  try {
    const transactions =
      await getUserTransactions(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

const getTransaction = async (
  req,
  res,
  next
) => {
  try {
    const transaction =
      await getTransactionById(
        req.params.id
      );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message:
          "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTransactions,
  getTransaction,
};