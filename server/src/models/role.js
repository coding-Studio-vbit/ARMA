const mongoose = require("mongoose");

const role = new mongoose.Schema({
  name: { type: String, uppercase: true, required: true, unique: true },
});

const roles = mongoose.model("roles", role);
module.exports = roles;
