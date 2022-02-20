const router = require("express").Router();
const checkRolePermissions = require("../../../services/util/checkRole");
const controller = require("../../../services/halls/controller");

//GET HALLS
// will have to add checkRolePermissions after listing out all the permissions

router.get("/getHalls", controller.getHalls);

// ADD HALLS

router.post("/addHall", controller.addHall);

router.put("/editHall", controller.editHall);

module.exports = router;
