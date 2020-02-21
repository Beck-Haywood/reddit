/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

const url = "mongodb://localhost/reddit-js";
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/reddit-js",
  { useNewUrlParser: true }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

module.exports = mongoose.connection;