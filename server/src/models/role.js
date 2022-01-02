const mongoose = require("mongoose");

const role = new mongoose.Schema({
	name: {type: String, required: true},
	//arbitrary list of strings that make sense only to the server code
	permissions:[String]
});

const roles = mongoose.model("roles", role)
module.exports = roles