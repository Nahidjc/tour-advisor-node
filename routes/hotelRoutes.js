const hotelController = require("../controllers/hotelController");
const router = require("express").Router();
const hotel = require("../middleware/hotelAuth");

router.post("/create-room",hotel, hotelController.createRoom);
module.exports = router;