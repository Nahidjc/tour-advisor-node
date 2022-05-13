const mongoose = require("mongoose");

const hotelRatingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    rating:{
        type:Number,
        require: true,
    },
    comment:{
        type:String,
        require: true,

    }
})