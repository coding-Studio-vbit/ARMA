const mongoose = require("mongoose");

const role = new mongoose.Schema({
	name: {type: String,
		uppercase:true,
		required: true, 
		enum:[
			"ADMIN",
			"FORUM",
			"FO",
			"SAC",
			"FC",
			"FACULTY"
		]
		,unique:true},
	//arbitrary list of strings that make sense only to the server code
	permissions:[{
		type:String,
		enum:[
			"SAC",
			"FO",
			"FC"
		]
	}]
});

const roles = mongoose.model("roles", role)
module.exports = roles



