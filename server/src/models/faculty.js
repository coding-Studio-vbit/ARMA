const mongoose = require("mongoose");

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
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: `{VALUE} is not a valid email`,
    },
  },
  password: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "roles" }],
});

const faculty1 = mongoose.model("faculty", faculty);
mongoose.exports = faculty1;
