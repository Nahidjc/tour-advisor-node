const mongoose = require("mongoose");


const hotelRatingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    rating: {
        type: Number,
        require: true,
    },
    comment: {
        type: String,

    }
})



const hotelSchema = mongoose.Schema({
    manager:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
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
    isHotel: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },

    image: {
        type: Object,
    },
    rating: [hotelRatingSchema]

}, { timestamps: true, });


module.exports = mongoose.model("Hotel", hotelSchema)