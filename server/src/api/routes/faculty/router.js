const router = require("express").Router();
const controller = require("../../../services/forum/controller");
const eventController = require("../../../services/events/controller");


router.get("/getForums", controller.getForumsList);
router.get("/dashboardInfo",eventController.getRequests);

module.exports = router;
