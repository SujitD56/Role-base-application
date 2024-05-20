const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const thirdpartyRoutes = require("./routes/thirdpartyRoutes");

const app = express();

const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/rolebase";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  });
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/thirdparty", thirdpartyRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server Connected on port", PORT);
});
