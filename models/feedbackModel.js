const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    user: {
        type: Object,
        require: true,
    },
    rating: {
        type: Number,
        require: true,
    },
    fullName: {
        type: String,
        require: true,
    },
    comment: {
        type: String,
        require: true,
    },


}, { timestamps: true, });


module.exports = mongoose.model("Feedback", feedbackSchema)