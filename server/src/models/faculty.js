const mongoose = require("mongoose");
const validator = require("validator");

const faculty = new mongoose.Schema({
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
  rollNumber: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => {
        return true;
        //PLEASEEEEEEEE ADDDDDDDDDD ROLL NUMBER VALIDATIONNNNNNNNNNNNN
      },
    },
    message: "{VALUE} is not a valid faculty roll number!",
  },
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
  phone: {
    type: Number,
    validate: {
      validator: (value) => {
        return validator.isMobilePhone(String(value), "en-IN");
      },
      message: `{VALUE} is not a valid Indian contact number.`,
    },
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "roles" }],
});

const facultyModel = mongoose.model("faculty", faculty);
module.exports = facultyModel;