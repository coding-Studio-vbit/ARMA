const router = require("express").Router();
const controller = require("../../../services/forum/controller");

router.get("/getForums", controller.getForumsList);


module.exports = router;
