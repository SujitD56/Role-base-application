// const Admin = require("../models/adminmodel");
// const bcrypt = require("bcrypt");
// const { ERROR_MESSAGES } = require("../utils/enums/errorcodes");
const User = require("../models/adminmodel");

// const { ROLES } = require("../utils/enums/roles");

// exports.updateUser = async (userId, userData) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       { _id: userId },
//       userData,
//       { new: true }
//     );
//     return updatedUser;
//   } catch (error) {
//     throw new Error(ERROR_MESSAGES.FAILED_TO_UPDATE_USER);
//   }
// };

// exports.createUser = async (userData, requestingUser) => {
//   try {
//     if (
//       !userData.username ||
//       !userData.email ||
//       !userData.password ||
//       !userData.role
//     ) {
//       throw new Error(ERROR_MESSAGES.INCOMPLETE_USER_DATA);
//     }
//     if (!requestingUser || requestingUser.role !== ROLES.ADMIN) {
//       throw new Error(ERROR_MESSAGES.ADMIN_REQUIRED);
//     }

//     const hashedPassword = await bcrypt.hash(userData.password, 10);

//     const newUser = new User({
//       username: userData.username,
//       email: userData.email,
//       password: hashedPassword,
//       role: userData.role,
//     });

//     const createdUser = await newUser.save();

//     return createdUser;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw new Error(ERROR_MESSAGES.FAILED_TO_CREATE_USER);
//   }
// };

// exports.deleteUser = async (userId, requestingUser) => {
//   try {
//     if (!requestingUser || requestingUser.role !== ROLES.ADMIN) {
//       throw new Error(ERROR_MESSAGES.ADMIN_DELET);
//     }
//     const deletedUser = await User.findByIdAndDelete(userId);
//     if (!deletedUser) {
//       throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
//     }
//     return deletedUser;
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     throw new Error(ERROR_MESSAGES.FAILED_TO_DELETE_USER);
//   }
// };

// exports.getAllUsers = async (adminId) => {
//   try {
//     const users = await User.find({ adminId });
//     return users;
//   } catch (error) {
//     throw new Error(ERROR_MESSAGES.FAILED_TO_GET_USERS);
//   }
// };

// Service to create a user

exports.createUser = async (adminId, userData) => {
  try {
    const user = new User({ ...userData, admin: adminId });
    return await user.save();
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async (userId, updatedData) => {
  try {
    return await User.findByIdAndUpdate(userId, updatedData, { new: true });
  } catch (error) {
    throw error;
  }
};

exports.deleteUser = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    throw error;
  }
};

exports.getAdminUsers = async (adminId) => {
  try {
    return await User.find({ admin: adminId });
  } catch (error) {
    throw error;
  }
};
