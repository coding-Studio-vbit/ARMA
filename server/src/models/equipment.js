const mongoose = require("mongoose");

const equipment = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase:true,
    unique:true,
    minLength: [
      process.env.MIN_NAME_LENGTH,
      `Name must be minimum ${process.env.MIN_NAME_LENGTH} characters`,
    ],
    maxLength: [
      process.env.MAX_NAME_LENGTH,
      `Name must be max ${process.env.MAX_NAME_LENGTH} characters`,
    ],
  },
  totalCount: { type: Number, min: [1, "totalCount cannot be less than 1"] },
});

const equipments = mongoose.model("equipments", equipment);
module.exports = equipments;
