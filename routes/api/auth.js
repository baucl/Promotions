const { Router } = require("express");
const router = Router();
const UserController = require("../../controllers/auth");

router.post("/autenticar", UserController.authenticacion);

module.exports = router;