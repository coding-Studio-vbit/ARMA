const router = require("express").Router();
const checkRolePermissions = require("../../../services/util/checkRole");
const controller = require("../../../services/equipment/controller")

// GET EQUIPMENT
// will have to add checkRolePermissions after listing out all the permissions

router.get("/getEquipment",controller.getEquipment);

// ADD EQUIPMENT

router.post("/addEquipment",controller.addEquipment);

router.put("/editEquipment",controller.editEquipment);

router.post("/deleteEquipment", controller.deleteEquipment);

router.post("/viewEquipment", controller.viewEquipment);




module.exports = router;