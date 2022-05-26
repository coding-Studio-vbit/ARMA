const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth");
const controller = require("../../../services/forum/controller");
const multerStorage = require("../../../services/util/multerStorage");
const multer = require("multer");
const checkRole = require("../../../services/util/checkRole");
const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 10 * Math.pow(10, 6) },
});

router.use(tokenAuth);

router.get("/", controller.getForumsList);
router.get(
  "/dashboard",
  (req, res, next) => {
    checkRole(req, res, next, ["FORUM"]);
  },
  controller.dashboard
);
router.post(
  "/addNewForumMembers",
  (req, res, next) => {
    checkRole(req, res, next, ["FC", "ADMIN", "FORUM"]);
  },
  controller.addNewForumMembers
);
router.post(
  "/deleteMember",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN", "FC", "FORUM"]);
  },
  controller.deleteforumMember
);
router.post(
  "/addNewCoreForumMember",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN", "FC", "FORUM"]);
  },
  controller.addNewCoreForumMember
);
router.get("/getEquipments", controller.getEquipments);
router.get("/getCoreForumMembers", controller.getCoreForumMembers);
router.get("/getForumMembers", controller.getForumMembers);
router.post("/forumEventNumber", controller.forumEventNumber);
router.put("/updateProfile", controller.updateProfile);
router.post("/forumViewCard", controller.forumViewCard);
router.post(
  "/profilePicture",
  upload.fields([{ name: "profilePicture", maxCount: 1 }]),
  controller.uploadProfilePicture
);
router.get("/profilePicture", controller.getProfilePicture);
router.post(
  "/dashboardCover",
  (req, res, next) => {
    checkRole(req, res, next, ["FORUM"]);
  },
  upload.fields([{ name: "dashboardCover", maxCount: 1 }]),
  controller.uploadDashboardCover
);
router.get("/dashboardCover", controller.getDashboardCover);
router.post(
  "/deleteForum",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.deleteForum
);
router.post("/viewForum", controller.viewForum);

module.exports = router;
