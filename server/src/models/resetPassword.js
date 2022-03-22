const mongoose = require("mongoose");
const validator = require("validator");

const ResetPassword = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: `{VALUE} is not a valid email`,
    },
  },
  token: { type: String },
  type: {
    type:String,
    enum: ["FORUM", "FACULTY", "ADMIN"],
  },
});

const resetPassword = mongoose.model("ResetPassword", ResetPassword);
module.exports = resetPassword;