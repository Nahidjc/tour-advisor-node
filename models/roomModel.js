const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
      title: {
        type: String,
        trim: true,
        require: true,
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
      description: {
        type: String,
        require: true,
      },
      images: {
        type: Object,
        require: true,
      },
   
      booked: {
        type: Boolean,
        default: false,
      }
     } , { timestamps: true, });
    

module.exports = mongoose.model("Room",roomSchema)