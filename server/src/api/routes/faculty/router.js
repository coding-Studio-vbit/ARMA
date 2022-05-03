const router = require("express").Router();
const controller = require("../../../services/forum/controller");
const eventController = require("../../../services/events/controller");
const facultyController = require("../../../services/faculty/controller");
const checkRole = require("../../../services/util/checkRole");
const tokenAuth = require("../../middleware/tokenAuth");
router.use(tokenAuth);

router.post(
  "/acceptBudget",
  (req, res, next) => {
    checkRole(req, res, next, ["FO"]);
  },
  facultyController.acceptBudget
);
router.post(
  "/commentBudget",
  (req, res, next) => {
    checkRole(req, res, next, ["FO"]);
  },
  facultyController.commentBudget
);
router.post(
  "/rejectBudget",
  (req, res, next) => {
    checkRole(req, res, next, ["FO"]);
  },
  facultyController.rejectBudget
);
router.post(
  "/acceptEvent",
  (req, res, next) => {
    checkRole(req, res, next, ["SAC"]);
  },
  facultyController.approveEvent
);
router.post(
  "/rejectEvent",
  (req, res, next) => {
    checkRole(req, res, next, ["SAC"]);
  },
  facultyController.rejectEvent
);
router.post(
  "/commentEvent",
  (req, res, next) => {
    checkRole(req, res, next, ["SAC"]);
  },
  facultyController.commentEvent
);
router.get("/getForums", controller.getForumsList);
router.get("/dashboardInfo", eventController.getRequests);
router.get("/getFaculty", facultyController.getFacultyList);
router.put("/editProfile", facultyController.editProfile);
router.put(
  "/editFaculty",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  facultyController.editFaculty
);
router.post("/fetchFaculty", facultyController.fetchFaculty);
router.post("/deleteFaculty", facultyController.deleteFaculty);
router.post("/viewFaculty", facultyController.viewFaculty);

module.exports = router;
