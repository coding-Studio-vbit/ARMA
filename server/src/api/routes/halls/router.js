const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth");
const checkRolePermissions = require("../../../services/util/checkRole");
const controller = require("../../../services/halls/controller");

//GET HALLS

router.use(tokenAuth);

// will have to add checkRolePermissions after listing out all the permissions

router.get(
  "/getHalls",
  (req, res, next) => {
    checkRolePermissions(req, res, next, READ_HALLS);
  },
  controller.getHalls
);

// ADD HALLS

router.post(
  "/addHall",
  (req, res, next) => {
    checkRolePermissions(req, res, next, WRITE_HALLS);
  },
  controller.addHall
);

router.put(
  "/editHall",
  (req, res, next) => {
    checkRolePermissions(req, res, next, WRITE_HALLS);
  },
  controller.editHall
);

module.exports = router;
