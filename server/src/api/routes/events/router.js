const router = require("express").Router();
const multer = require("multer");
const controller = require("../../../services/events/controller");
const checkRole = require("../../../services/util/checkRole");
const multerStorage = require("../../../services/util/multerStorage");
const tokenAuth = require("../../middleware/tokenAuth");
const upload = multer({ storage: multerStorage });


router.use(tokenAuth);

//GET EVENTS
router.get(
  "/",
  (req, res, next) => {
    checkRole(req, res, next, ["FACULTY", "FC", "FO", "ADMIN", "SAC"]);
  },
  controller.getEvents
);

//CREATE EVENT
router.post(
  "/",
  (req, res, next) => {
    checkRole(req, res, next, ["FORUM"]);
  },
  upload.fields([
    { name: "eventDocument", maxCount: 1 },
    { name: "budgetDocument", maxCount: 1 },
  ]),
  controller.createEvent
);

router.post(
  "/updateEventDetails",
  (req, res, next) => {
    checkRole(req, res, next, ["FORUM"]);
  },
  upload.fields([{ name: "eventDocument", maxCount: 1 }]),
  controller.updateEventDetails
);

router.post(
  "/updateBudget",
  (req, res, next) => {
    checkRole(req, res, next, ["FORUM"]);
  },
  upload.fields([{ name: "budgetDocument", maxCount: 1 }]),
  controller.updateBudgetDoc
);

router.post(
  "/reportAndMedia",
  (req, res, next) => {
    checkRole(req, res, next, ["FORUM"]);
  },
  upload.fields([
    { name: "eventReport", maxCount: 1 },
    { name: "eventImages", maxCount: 10 },
  ]),
  controller.reportAndMedia
);

router.post(
  "/uploadRegistrants",
  (req, res, next) => {
    checkRole(req, res, next, ["FORUM"]);
  },
  controller.uploadRegistrantsList
);
router.get(
  "/eventAttendance",
  (req, res, next) => {
    checkRole(req, res, next, ["FORUM"]);
  },
  controller.eventAttendance
);
router.put(
  "/postAttendance",
  (req, res, next) => {
    checkRole(req, res, next, ["FORUM"]);
  },
  controller.postAttendance
);
router.get(
  "activeEvents",
  (req, res, next) => {
    checkRole(req, res, next, ["FORUM"]);
  },
  controller.getActiveEvents
);
router.get(
  "/calendarEvents",
  (req, res, next) => {
    checkRole(req, res, next, ["FACULTY", "ADMIN", "SAC", "FO", "FC"]);
  },
  controller.getCalendarEvents
);
router.get("/getEvent/:id", controller.getEventById);
router.get("/getBudgetDocument/:id", controller.getBudgetDocument);
router.get("/getEventDocument/:id", controller.getEventDocument);
router.post("/updateEventReservations", controller.updateReservations);
router.post("/updateEventEquipment", controller.updateEquipment);
router.get("/getEventEquipment/:id", controller.getEventEquipment);
router.get("/getEventReservations/:id", controller.getEventReservations);
router.get(
  "completeEvent/:eventId",
  (req, res, next) => {
    checkRole(req, res, next, ["FORUM"]);
  },
  controller.completeEvent
);
router.get(
  "cancelEvent/:eventId",
  (req, res, next) => {
    checkRole(req, res, next, ["FORUM"]);
  },
  controller.cancelEvent
);
module.exports = router;
