const hotelController = require("../controllers/hotelController");
const router = require("express").Router();
const hotel = require("../middleware/hotelAuth");

router.get("/",hotelController.hotelList);
router.get("/details/:id",hotelController.hotelDetails);
router.post("/create-room",hotel, hotelController.createRoom);
router.get("/room/:id", hotelController.roomDetails);
router.post("/add",hotel, hotelController.addHotel);
module.exports = router;