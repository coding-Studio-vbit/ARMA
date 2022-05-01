const router = require("express").Router();
const multer = require("multer");
const controller = require("../../../services/events/controller");
const multerStorage = require("../../../services/util/multerStorage");
const tokenAuth = require("../../middleware/tokenAuth");
const upload = multer({ storage: multerStorage });

router.use(tokenAuth);

//GET EVENTS
router.get("/", controller.getEvents);

//CREATE EVENT
router.post(
  "/",
  upload.fields([
    { name: "eventDocument", maxCount: 1 },
    { name: "budgetDocument", maxCount: 1 },
  ]),
  controller.createEvent
);

router.post(
  "/updateEventDetails",
  upload.fields([{ name: "eventDocument", maxCount: 1 }]),
  controller.updateEventDetails
);

router.post(
  "/updateBudget",
  upload.fields([{ name: "budgetDocument", maxCount: 1 }]),
  controller.updateBudgetDoc
);

router.post(
  "/reportAndMedia",
  upload.fields([
    { name: "eventReport", maxCount: 1 },
    { name: "eventImages", maxCount: 10 },
  ]),
  controller.reportAndMedia
);

router.post("/uploadRegistrants", controller.uploadRegistrantsList);
router.get("/eventAttendance", controller.eventAttendance);
router.put("/postAttendance", controller.postAttendance);
router.get("activeEvents", controller.getActiveEvents);
router.get("/calendarEvents", controller.getCalendarEvents);
router.get("/getEvent/:id", controller.getEventById);
router.get("/getBudgetDocument/:id", controller.getBudgetDocument);
router.post("/updateEventReservations", controller.updateReservations);
router.post("/updateEventEquipment", controller.updateEquipment);
router.get("/getEventEquipment/:id", controller.getEventEquipment);
router.get("/getEventReservations/:id", controller.getEventReservations);
module.exports = router;
