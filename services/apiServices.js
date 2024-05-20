const axios = require("axios");
const Email = require("../models/apimodel");

function fetchEmailHeadersFromMailtrap() {
  return axios
    .get(
      "https://mailtrap.io/api/accounts/1920099/inboxes/2863496/messages/4212783420/mail_headers",
      {
        headers: {
          "Api-Token": "8870f3cfb52086209900fcfe57992c12",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("Failed to fetch email headers from Mailtrap API");
    });
}

function saveEmailHeadersToDatabase(emailHeaders) {
  return Email.insertMany(emailHeaders.headers)
    .then((savedEmails) => savedEmails)
    .catch((error) => {
      throw new Error("Failed to save email headers to the database");
    });
}

module.exports = {
  fetchEmailHeadersFromMailtrap,
  saveEmailHeadersToDatabase,
};
