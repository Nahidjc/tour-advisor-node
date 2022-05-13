const mongoose = require("mongoose");


const hotelRatingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel"
    },
    rating:{
        type:Number,
        require: true,
    },
    comment:{
        type:String,
        
    }
})



const hotelSchema = mongoose.Schema({
    hotelName: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    type:{
        type:String,
        require:true
    },
    description: {
        type: String,
        require:true
    },

    images: {
        type: Object,
    },
    rating:[hotelRatingSchema]

}, { timestamps: true, });


module.exports = mongoose.model("Hotel", hotelSchema)