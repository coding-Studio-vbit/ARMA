const mongoose = require("mongoose");
const validator = require("validator");

const forum = new mongoose.Schema({
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
  forumHeads: {
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "students" }],
  },
  facultyCoordinatorID: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "faculty",
  },
  forumMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
    },
  ],
  forumCoreTeamMembers: [
    {
      designation: String,
      studentID: { type: mongoose.Schema.Types.ObjectId, ref: "students" },
    },
  ],
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: `{VALUE} is not a valid email`,
    },
  },
  description: {
    type: String,
    maxLength: [2048, "Forum description too lengthy!"],
  },
  profileCoverPath: {
    type: String,
  },
  forumLogoPath: {
    type: String,
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "roles" }],
});

const forums = mongoose.model("forums", forum);
module.exports = forums;
