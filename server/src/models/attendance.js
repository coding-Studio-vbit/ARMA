const mongoose = require("mongoose");

const attendance = new mongoose.Schema({
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
    required: true,
  },
  registrantsList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
    },
  ],
  presence: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
      },
      dates: [Date],
    },
  ],
});

const attendances = mongoose.model("attendance", attendance);
module.exports = attendances;
