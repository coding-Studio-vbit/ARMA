const router = require("express").Router();
const controller = require("../../../services/equipment/controller");
const checkRole = require("../../../services/util/checkRole");
const tokenAuth = require("../../middleware/tokenAuth");

router.use(tokenAuth);
router.get("/", controller.getEquipment);
router.get("/getEquipment", controller.getEquipment);

router.post(
  "/addEquipment",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.addEquipment
);

router.put(
  "/editEquipment",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.editEquipment
);

router.post(
  "/deleteEquipment",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.deleteEquipment
);

router.post("/viewEquipment", controller.viewEquipment);

module.exports = router;
