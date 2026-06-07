const {
  getVirtualAccountByUser,
} = require("../services/virtualAccountService");

const getMyVirtualAccount = async (
  req,
  res,
  next
) => {
  try {
    const account =
      await getVirtualAccountByUser(
        req.user.id
      );

    if (!account) {
      return res.status(404).json({
        success: false,
        message:
          "Virtual account not found",
      });
    }

    return res.status(200).json({
      success: true,
      account,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyVirtualAccount,
};