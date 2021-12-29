const mongoose = require("mongoose");

const hall = new mongoose.Schema({
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
  hallInfo: {
    type: String,
    maxLength: [256, "Hall info cannot exceed 256 characters"],
  },
  capacity: {
    required: true,
    type: Number,
    min: [10, "Min. Hall Capacity has to be 10"],
  },
  bookings: [
    {
      date: Date,
      slots: [{ type: String, enum: ["MORNING", "AFTERNOON"] }],
    },
  ],
});

const halls = mongoose.model("halls", hall);
mongoose.exports = halls;
