const mongoose = require("mongoose");

const Reservation = new mongoose.Schema({
  hallId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  status: {
    enum: ["COMPLETED", "NOT COMPLETED"],
  },
  dates: [{ type: String }],
  timeSlots: [{ type: [String], enum: ["MORNING", "AFTERNOON"] }],
});

const reservations = mongoose.model("reservations", Reservation);
module.exports = reservations;
