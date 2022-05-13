const mongoose = require("mongoose");




const hotelRatingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    rating:{
        type:Number,
        require: true,
    },
    comment:{
        type:String,

    }
})