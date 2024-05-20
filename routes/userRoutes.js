const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddlewares");

router.get(
  "/profile",
  authMiddleware.authenticateUser,
  authMiddleware.authorizeUserProfile,
  userController.getUserProfile
);
router.put(
  "/profile",
  authMiddleware.authenticateUser,
  authMiddleware.authorizeUserProfile,
  userController.updateProfile
);

module.exports = router;
