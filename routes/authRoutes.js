const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { sendOTPController } = require("../controllers/authController");
const { loginWithOTPController } = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:resetToken", authController.resetPassword);

router.post("/send-otp", sendOTPController);
router.post("/loginwith-otp", loginWithOTPController);

module.exports = router;
