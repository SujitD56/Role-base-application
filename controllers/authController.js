const authServices = require("../services/authServices");
const { ERROR_MESSAGES } = require("../utils/enums/errorcodes");
// const { generateOTP } = require("../utils/enums/otp");

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      throw new Error(ERROR_MESSAGES.ALL_FIELDS_REQUIRED);
    }
    const userData = {
      username,
      email,
      password,
      role,
    };
    const user = await authServices.registerUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tokens = await authServices.login(email, password);
    res.json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const message = await authServices.forgotPassword(email);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetToken = req.params.resetToken;
    const { password } = req.body;
    const result = await authServices.resetPassword(resetToken, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.sendOTPController = async (req, res) => {
  const { email } = req.body;
  try {
    await authServices.sendOTP(email);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

exports.loginWithOTPController = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const isOTPValid = await authServices.verifyOTP(email, otp);
    if (isOTPValid) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};
