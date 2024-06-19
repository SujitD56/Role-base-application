const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { sendEmail } = require("../utils/enums/email");
const { generateOTP } = require("../utils/enums/otp");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/authUtils");
const { ERROR_MESSAGES } = require("../utils/enums/errorcodes");

async function registerUser(userData) {
  const { username, email, password, role } = userData;
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    throw new Error(ERROR_MESSAGES.USER_ALREADY_REGISTERED);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  return {
    _id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(ERROR_MESSAGES.EMAIL_PASSWORD_INCORRECT);
  }

  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    throw new Error(ERROR_MESSAGES.EMAIL_PASSWORD_INCORRECT);
  }

  return {
    accessToken: generateAccessToken(user._id, user.email, user.role),
    refreshToken: generateRefreshToken(user._id, user.email, user.role),
  };
}

async function forgotPassword(email) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User Not Found");
  }

  const resetToken = user.createPasswordResetToken();
  await user.save();

  const resetUrl = `http://localhost:3001/reset-password/${resetToken}`;

  const message = `Forgot Password? Click on this link to reset your Password: ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password reset token (valid for 10 minutes)",
      message,
    });

    return "Token Sent to email!";
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    console.error(error);

    throw new Error("Failed to send email. Please try again later.");
  }
}

async function resetPassword(resetToken, newPassword) {
  if (!resetToken) {
    throw new Error("Reset token is missing");
  }
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const updateduser = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!updateduser) {
    throw new Error("Token is invalid or has expired");
  }
  // console.log("=====>>", updateduser);
  const salt = await bcrypt.genSalt(10);
  // console.log("salt=>", salt, "newPassword==>", newPassword);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  // console.log("=====>>", hashedPassword);

  updateduser.password = hashedPassword;
  updateduser.passwordResetToken = undefined;
  updateduser.passwordResetExpires = undefined;
  let updatedPassword = await User.findOneAndUpdate(
    { _id: updateduser._id },
    updateduser
  );
  console.log(updatedPassword);

  return {
    _id: updateduser._id,
    username: updateduser.username,
    email: updateduser.email,
    password: updateduser.password,
    message: "Password Reset Successful",
  };
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendOTP(email) {
  try {
    const otp = generateOTP();
    await transporter.sendMail({
      from: '"Your Name" <your-email@example.com>',
      to: email,
      subject: "Your OTP for Login",
      text: `Your OTP is ${otp}`,
    });
    console.log("OTP sent:", otp);
    const user = await User.findOneAndUpdate(
      { email: email },
      { otp: otp },
      { new: true }
    );
    if (!user) {
      console.log("User not found:", email);
      return false;
    }
    return otp;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}

async function verifyOTP(email, enteredOTP) {
  try {
    const user = await User.findOne({ email: email });
    if (!user || !user.otp) {
      console.log("User not found or OTP not set for email:", email);
      return false;
    }
    const storedOTP = user.otp;
    console.log("Stored OTP:", storedOTP);
    console.log("Entered OTP:", enteredOTP);
    return storedOTP === enteredOTP;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}

module.exports = {
  registerUser,
  login,
  forgotPassword,
  resetPassword,
  sendOTP,
  verifyOTP,
};
