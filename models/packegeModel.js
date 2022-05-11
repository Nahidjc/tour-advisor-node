const mongoose = require("mongoose");

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
    img: { data: Buffer, contentType: String }

}, { timestamps: true, });


module.exports = mongoose.model("Packege", packegeSchema)