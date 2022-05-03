const router = require("express").Router();
const checkRolePermissions = require("../../../services/util/checkRole");
const controller = require("../../../services/equipment/controller");
const checkRole = require("../../../services/util/checkRole");

// GET EQUIPMENT
// will have to add checkRolePermissions after listing out all the permissions

router.get("/getEquipment", controller.getEquipment);

// ADD EQUIPMENT

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
