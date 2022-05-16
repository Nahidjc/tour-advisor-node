const user = require("../middleware/auth");
const router = require("express").Router();
const User = require("../models/userModel");
const Feedback = require("../models/feedbackModel");


router.get("", async (req, res) => {
    try {
        console.log("Get feedback");
        const feedbacks = await Feedback.find().select({
            "createdAt": 0,
            "updatedAt": 0,
            "__v": 0
        }).populate("user")
        res.json({
            result: feedbacks.length,
            feedbacks,
            status: "Successfully feedback done",
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

router.post("", user, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        if (!rating || !comment) {
            return res.status(400).json({ msg: "Invalid Feedback Credentials." });
        }
        const user = req.user.id;
        const author = await User.findOne({ _id: user });
        const newFeedback = new Feedback({
            user:author,
            rating,
            fullName: author.fullName,
            comment,
        });
        await newFeedback.save();
        res.json({
            status: "Successfully feedback done",
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

module.exports = router;
