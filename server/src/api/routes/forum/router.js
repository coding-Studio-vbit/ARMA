const router = require("express").Router();
const controller = require("../../../services/forum/controller");
const multerStorage = require("../../../services/util/multerStorage");
const multer = require("multer");
const upload = multer({storage: multerStorage});


router.get("/dashboard", controller.dashboard);
router.post("/addNewForumMembers" , controller.addNewForumMembers);
router.post("/deleteMember" , controller.deleteforumMember);

router.post("/addNewCoreForumMember" , controller.addNewCoreForumMember);

router.get("/getEquipments", controller.getEquipments);
router.get("/getCoreForumMembers" , controller.getCoreForumMembers)

router.get("/getForumMembers" , controller.getForumMembers)

router.post("/forumEventNumber",controller.forumEventNumber);

router.put("/updateProfile", controller.updateProfile)

router.post("/forumViewCard", controller.forumViewCard)




module.exports = router;
