const User = require("../models/userModel");
const { ERROR_MESSAGES } = require("../utils/enums/errorcodes");

exports.getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return {
      username: user.username,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    throw error;
  }
};

exports.updateUserProfile = async (userId, updateData) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      updateData,
      { new: true }
    );
    if (!updateUser) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return updateUser;
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (adminId, userData) => {
  try {
    userData.adminId = adminId;

    const user = new User(userData);
    await user.save();

    return user;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.FAILED_TO_CREATE_USER);
  }
};
