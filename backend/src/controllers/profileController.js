const User = require("../models/User.js");

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password");

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile
}