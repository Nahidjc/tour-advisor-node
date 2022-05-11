const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    rating: {
        type: Number,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    comment: {
        type: String,
        require: true,
    },


}, { timestamps: true, });


module.exports = mongoose.model("Feedback", feedbackSchema)