const packegeController = require("../controllers/packegeController");
const router = require("express").Router();
const host = require("../middleware/hostAuth");

router.post("/create-packege",host, packegeController.createPackege);
router.get("",packegeController.packegeList);
router.get("/:id",packegeController.packegeDetails);


module.exports = router;