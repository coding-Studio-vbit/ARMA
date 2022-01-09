const router = require("express").Router();
const multer = require("multer");
const checkRolePermissions = require("../../../services/util/checkRole");
const controller = require("../../../services/events/controller");
const multerStorage = require("../../../services/util/multerStorage");

const upload = multer({ storage: multerStorage });

//GET EVENTS
router.get(
  "/",
  (req, res, next) => {
    return checkRolePermissions(req, res, next, "READ_EVENTS");
  },
  controller.getEvents
);

//CREATE EVENT
router.post(
  "/",
  (req, res, next) => {
    checkRolePermissions(req, res, next, "CREATE_EVENTS");
  },
  upload.fields([
    { name: "eventDocument", maxCount: 1 },
    { name: "budgetDocument", maxCount: 1 },
  ]),
  controller.createEvent
);

router.post("/updateBudget", upload.fields([{name: "budgetDocument", maxCount:1}]), controller.updateBudgetDoc);

module.exports = router;
