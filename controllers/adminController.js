const adminServices = require("../services/adminServices");
const { ERROR_MESSAGES } = require("../utils/enums/errorcodes");

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await adminService.getAllUsers();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: ERROR_MESSAGES.FAILED_TO_GET_USERS });
//   }
// };

// exports.updateUser = async (req, res) => {
//   const userData = req.body;
//   try {
//     const updatedUser = await adminService.updateUser(userData._id, userData);
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: ERROR_MESSAGES.FAILED_TO_UPDATE_USER });
//   }
// };

// exports.createUser = async (req, res) => {
//   try {
//     const userData = req.body;
//     const createdUser = await adminService.createUser(userData, req.user);
//     res.status(201).json({ user: createdUser });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: ERROR_MESSAGES.FAILED_TO_CREATE_USER });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const userData = req.body;
//     const deletedUser = await adminService.deleteUser(userData._id, req.user);

//     res.json({ message: "User Deleted Successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ error: ERROR_MESSAGES.FAILED_TO_DELETE_USER });
//   }
// };

// Controller to create a user

exports.createUser = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const user = await adminServices.createUser(adminId, req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json(ERROR_MESSAGES.FAILED_TO_CREATE_USER);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await adminServices.updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json(ERROR_MESSAGES.FAILED_TO_UPDATE_USER);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await adminServices.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json(ERROR_MESSAGES.FAILED_TO_DELETE_USER);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const users = await adminServices.getAdminUsers(adminId);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json(ERROR_MESSAGES.FAILED_TO_GET_USERS);
  }
};
