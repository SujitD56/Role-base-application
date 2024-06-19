const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  date: { type: Date },
  from: { type: String },
  to: { type: String },
  message_id: { type: String },
  subject: { type: String },
  mime_version: { type: String },
  content_type: { type: String },
  content_transfer_encoding: { type: String },
  bcc: { type: String },
});
const Email = mongoose.model("Email", emailSchema);
module.exports = Email;
