const apiService = require("../services/apiServices");

exports.fetchAndSaveEmailHeaders = (req, res) => {
  apiService
    .fetchEmailHeadersFromMailtrap()
    .then((emailHeaders) => apiService.saveEmailHeadersToDatabase(emailHeaders))
    .then((savedEmails) => res.status(200).json(savedEmails))
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    });
};
