const packegeController = require("../controllers/packegeController");
const router = require("express").Router();
const host = require("../middleware/hostAuth");

router.post("/create-packege",host, packegeController.createPackege);
module.exports = router;