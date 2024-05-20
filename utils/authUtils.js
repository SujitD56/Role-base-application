const jwt = require("jsonwebtoken");

function generateAccessToken(userId, email, role) {
  return jwt.sign({ userId, email, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  });
}

function generateRefreshToken(userId, email, role) {
  return jwt.sign({ userId, email, role }, process.env.REFRESH_TOKEN_SECRET);
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
};
