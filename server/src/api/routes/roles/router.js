const router = require("express").Router();
const checkRole = require("../../../services/util/checkRole");
const controller = require("../../../services/roles/controller");
const tokenAuth = require("../../middleware/tokenAuth");
const roles = require("../../../models/role");
const response = require("../../../services/util/response");

// Special route for creating initial admin role
router.post("/setup", async (req, res) => {
  try {
    const existingRoles = await roles.find({});
    if (existingRoles.length > 0) {
      return res.json(response({ message: "Roles already exist" }, process.env.FAILURE_CODE));
    }
    const result = await controller.addRoles(req, res);
    return result;
  } catch (err) {
    console.log(err);
    return res.json(response({ message: "Failed to create initial role" }, process.env.FAILURE_CODE));
  }
});

router.use(tokenAuth);

router.post(
  "/addRoles",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.addRoles
);

router.get("/", controller.getRoles);
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
