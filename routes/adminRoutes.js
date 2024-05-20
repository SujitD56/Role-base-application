const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddlewares");

router.post(
  "/users",
  authMiddleware.authenticateUser,
  authMiddleware.authenticateAdmin,
  adminController.createUser
);
router.put(
  "/users/:userId",
  authMiddleware.authenticateUser,
  authMiddleware.authenticateAdmin,
  adminController.updateUser
);
router.delete(
  "/users/:userId",
  authMiddleware.authenticateUser,
  authMiddleware.authenticateAdmin,
  adminController.deleteUser
);
router.get(
  "/users",
  authMiddleware.authenticateUser,
  authMiddleware.authenticateAdmin,
  adminController.getAllUsers
);
module.exports = router;
