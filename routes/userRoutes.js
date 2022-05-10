const userController = require("../controllers/userController");
const router = require("express").Router();


router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/refresh_token", userController.refreshToken);


module.exports = router;