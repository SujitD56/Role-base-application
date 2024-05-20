const userService = require("../services/userServices");
const { ERROR_MESSAGES } = require("../utils/enums/errorcodes");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userProfile = await userService.getUserProfile(userId);
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.FAILED_TO_GET_USER_PROFILE });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updateData = req.body;

    const updateUser = await userService.updateUserProfile(userId, updateData);
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.FAILED_TO_UPDATE_PROFILE });
  }
};
