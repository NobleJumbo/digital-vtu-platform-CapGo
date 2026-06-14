const VirtualAccount = require("../models/VirtualAccount");

const createVirtualAccount = async (data) => {
  return await VirtualAccount.create(data);
};

const getVirtualAccountByUser = async (userId) => {
  return await VirtualAccount.findOne({
    user: userId,
  });
};

module.exports = {
  createVirtualAccount,
  getVirtualAccountByUser
};