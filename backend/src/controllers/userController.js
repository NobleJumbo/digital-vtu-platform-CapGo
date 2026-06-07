const User = require("../models/User");

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("-password");

  res.status(200).json({
    success: true,
    user,
  });
};

const updateProfile = async (req, res) => {
  const { name, phone } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      phone,
    },
    {
      new: true,
    }
  ).select("-password");

  res.status(200).json({
    success: true,
    user,
  });
};

module.exports = {
    getProfile,
    updateProfile,
};