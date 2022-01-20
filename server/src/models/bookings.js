const mongoose = require("mongoose");

const Booking = new mongoose.Schema({
  halls:[
      {
          hallID:{ type: mongoose.Schema.Types.ObjectId, ref: "halls" }
      }
  ],
  eventID : {
    type: mongoose.Schema.Types.ObjectId, ref: "events" 
  },
  dates : [Date],
  status:{
      default:"ONHOLD",
      enum:[
          "RESERVED",
          "ONHOLD",
      ]
  }

});


const Bookings = mongoose.model("bookings", Booking);
module.exports = Bookings;


