const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth");
const checkRolePermissions = require("../../../services/util/checkRole");
const controller = require("../../../services/halls/controller");

//GET HALLS

router.use(tokenAuth);

// will have to add checkRolePermissions after listing out all the permissions

router.get("/", controller.getHalls);

// ADD HALLS

router.post(
  "/addHall",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.addHall
);

router.put(
  "/editHall",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.editHall
);

router.post(
  "/deleteHall",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.deleteHall
);

router.post("/viewHall", controller.viewHall);

router.post("/getSlots", controller.getSlots);
module.exports = router;
