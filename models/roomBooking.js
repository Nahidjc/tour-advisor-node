const mongoose = require("mongoose");

const roomBookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      price: {
        type: Number,
        trim: true,
        require: true,
      },
      category: {
        type: String,
        require: true,
      }, 
      phoneNumber: {
        type: String,
        require: true,
      },
      address: {
        type: String,
        require: true,
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
      checkin: {
        type: Date,
        default: Date.now,
        require: true,
      },
      checkout: {
        type: Date,
        require: true,
      },
 
     } , { timestamps: true, });
    

module.exports = mongoose.model("RoomBooking",roomBookingSchema)