const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:resetToken", authController.resetPassword);

router.post("/sendotp", authController.sendOTPController);
router.post("/login-withotp", authController.loginWithOTPController);

module.exports = router;
