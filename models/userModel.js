const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: {
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
    userName: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: "user",
    },
    images: {
        type: Object,
    },
    hotelName: {
        type: String,
        trim: true,
        unique: true,
        default: "",
    },


}, { timestamps: true, });


module.exports = mongoose.model("User", userSchema)