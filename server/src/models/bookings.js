const mongoose = require("mongoose");

const Booking = new mongoose.Schema({
  halls: [{
    date:{type:Date},
    timeSlot: [{
      type:String,
      enum:["Morning","Afternoon"]
    }],
    hall:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "halls",
    }
  }],
  eventID : {
    type: mongoose.Schema.Types.ObjectId, ref: "events" 
  },
 
  status:{
      enum:[
          "RESERVED",
          "ONHOLD",
      ]
  }

});


const Bookings = mongoose.model("bookings", Booking);
module.exports = Bookings;


