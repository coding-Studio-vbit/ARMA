const router = require("express").Router();
const checkRolePermissions = require("../../../services/util/checkRole");
const controller = require("../../../services/roles/controller");

// ADD ROLES
// will have to add checkRolePermissions after listing out all the permissions
router.post(
  "/addRoles",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.addRoles
);

// GET ROLES

router.get("/getRoles", controller.getRoles);

router.put(
  "/editRoles",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.editRole
);

router.get("/fetchRoles", controller.fetchRoles);

router.post(
  "/deleteRoles",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.deleteRoles
);

router.post("/viewRoles", controller.viewRoles);

module.exports = router;
