const mongoose = require("mongoose");
const validator = require("validator");

const Admin = new mongoose.Schema({
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
  password: String,
  name: {
    type: String,
    required: true,
    minLength: [
      process.env.MIN_NAME_LENGTH,
      `Name must be minimum ${process.env.MIN_NAME_LENGTH} characters`,
    ],
    maxLength: [
      process.env.MAX_NAME_LENGTH,
      `Name must be max ${process.env.MAX_NAME_LENGTH} characters`,
    ],
  },
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: "roles" }],
});

const admins = mongoose.model("Admins", Admin);
module.exports = admins;
