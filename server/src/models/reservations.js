const mongoose = require("mongoose");

const Reservation = new mongoose.Schema({
  hallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "halls",
  },
  forumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "forums",
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
  },
  status: {
    type: String,
    enum: ["COMPLETED", "NOT COMPLETED"],
    default: "NOT COMPLETED",
  },
  dates: [{ type: String }],
  timeSlots: [[{ type: String }]],
});

Reservation.index({ hallId: 1, status: 1 });
Reservation.index({ eventId: 1 });

const reservations = mongoose.model("reservations", Reservation);
module.exports = reservations;
