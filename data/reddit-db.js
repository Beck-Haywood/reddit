/* Mongoose Connection */
require('dotenv').config();
const mongoose = require("mongoose");
assert = require("assert");

const url = "mongodb://mongo:27017/reddit-js";
mongoose.Promise = global.Promise;
const mongo_uri = process.env.MONGODB_URI
mongoose.connect(mongo_uri)
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

module.exports = mongoose.connection;