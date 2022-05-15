const mongoose = require("mongoose");

const packegeRatingSchema = mongoose.Schema({
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


const packegeSchema = mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    from: {
        type: String,
        require: true,
    },
    destination: {
        type: String,
        require: true,
    },
    comments:[packegeRatingSchema],
    image: {
        type: Object,
        require: true,
      },

}, { timestamps: true, });


module.exports = mongoose.model("Packege", packegeSchema)