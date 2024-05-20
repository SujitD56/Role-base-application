const express = require("express");
const router = express.Router();
const thirdPartyController = require("../controllers/apiController");

router.get(
  "/fetch-and-save-users",
  thirdPartyController.fetchAndSaveEmailHeaders
);

module.exports = router;
