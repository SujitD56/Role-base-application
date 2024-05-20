const { decoded } = require("jsonwebtoken");
const authUtils = require("../utils/authUtils");
const { ROLES } = require("../utils/enums/roles");
const { ERROR_MESSAGES } = require("../utils/enums/errorcodes");
const User = require("../models/adminmodel");

exports.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token, "here");
  // console.log(token);
  if (!token) {
    return res.status(401).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
  }
  try {
    const decoded = authUtils.verifyAccessToken(token.split(" ")[1]);
    // console.log(decoded, "decoded");
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
  }
};

exports.authorizeUserProfile = (req, res, next) => {
  if (req.user.role === ROLES.USER) {
    next();
  } else {
    return res.status(403).json({ error: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
  }
};

exports.authenticateAdmin = (req, res, next) => {
  if (req.user.role === ROLES.ADMIN) {
    next();
  } else {
    return res.status(403).json({ error: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
  }
};

exports.checkAdminOwnership = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    if (user.admin.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
    }
    next();
  } catch (error) {
    console.error("Error checking admin ownership:", error);
    res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};


