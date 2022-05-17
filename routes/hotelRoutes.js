const hotelController = require("../controllers/hotelController");
const router = require("express").Router();
const hotel = require("../middleware/hotelAuth");
const author = require("../middleware/auth");

router.get("/",hotelController.hotelList);
router.get("/details/:id",hotelController.hotelDetails);
router.post("/create-room",hotel, hotelController.createRoom);
router.get("/room/:id", hotelController.roomDetails);
router.post("/add",hotel, hotelController.addHotel);
router.post("/review/:id",author, hotelController.addRating);
router.post("/room-booking/:id",author, hotelController.roomBooking);



module.exports = router;