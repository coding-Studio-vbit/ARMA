const router = require("express").Router();
const controller = require("../../../services/forum/controller");

router.get("/dashboard", controller.dashboard);

module.exports = router;
