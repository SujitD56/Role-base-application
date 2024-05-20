const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ROLES } = require("../utils/enums/roles");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.USER],
    },
    password: {
      type: String,
      require: true,
    },
    otp: {
      type: String,
      require: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10mins

  return resetToken;
};

module.exports = mongoose.model("users", userSchema);
