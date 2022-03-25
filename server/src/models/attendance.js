const mongoose = require("mongoose");

const attendance = new mongoose.Schema({
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
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
      dates: [],
    },
  ],
});

const attendances = mongoose.model("attendance", attendance);
module.exports = attendances;
