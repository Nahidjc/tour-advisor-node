const hotelController = require("../controllers/hotelController");
const router = require("express").Router();
const hotel = require("../middleware/hotelAuth");

router.get("/",hotelController.hotelList);
router.post("/create-room",hotel, hotelController.createRoom);
router.post("/add",hotel, hotelController.addHotel);
module.exports = router;