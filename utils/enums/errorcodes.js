const ERROR_MESSAGES = {
  UNAUTHORIZED_ACCESS: "You are not authorized to access this resource..",
  INVALID_TOKEN: "Invalid access token",
  ALL_FIELDS_REQUIRED: "All fields are mandatory!",
  USER_ALREADY_REGISTERED: "User already registered!",
  EMAIL_PASSWORD_INCORRECT: "Email or password is incorrect",
  INCOMPLETE_USER_DATA: "Incomplete user data",
  ADMIN_REQUIRED: "Only admins can create users",
  ADMIN_DELET: "Only admins can delete users",
  USER_NOT_FOUND: "User not found",
  FAILED_TO_CREATE_USER: "Failed to create user",
  FAILED_TO_GET_USERS: "Failed to get users",
  FAILED_TO_UPDATE_USER: "Failed to update user",
  FAILED_TO_DELETE_USER: "Failed to delete user",
  FAILED_TO_GET_USER_PROFILE: "Failed to get user profile",
  FAILED_TO_UPDATE_PROFILE: "Failed to update profile",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
};

module.exports = { ERROR_MESSAGES };
