const mongoose = require("mongoose");
const validator = require("validator");

const student = new mongoose.Schema({
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
      message: "{VALUE} is not a valid roll number",
    },
  },
  year: {
    type: Number,
    required: true,
    min: [1, "year can only go as low as 1"],
    max: [4, "year can only go as high as 4"],
  },
  branch: {
    type: String,
    enum: ["CSE", "CSM", "CSM", "CSC", "CSB", "ME", "CE", "EEE", "ECE", "IT"],
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required:true,
    unique:true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: `{VALUE} is not a valid email`,
    },
  },
  phone: {
    type: Number,
    validate: {
      validator: (value) => {
        return validator.isMobilePhone(String(value), "en-IN");
      },
      message: `{VALUE} is not a valid Indian contact number.`,
    },
  },
  attendedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
});

const students = mongoose.model("students", student);
module.exports = students;