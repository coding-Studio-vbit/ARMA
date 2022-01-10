const router = require("express").Router();
const controller = require("../../../services/forum/controller");
const multerStorage = require("../../../services/util/multerStorage");
const multer = require("multer");
const upload = multer({storage: multerStorage});

router.get("/dashboard", controller.dashboard);

router.post("/addNewForumMembers" , controller.addNewForumMembers);

router.post("/addNewCoreForumMember" , controller.addNewCoreForumMember);


module.exports = router;
