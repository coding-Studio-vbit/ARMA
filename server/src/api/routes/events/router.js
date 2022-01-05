const router = require("express").Router();
const checkRolePermissions = require("../../../services/util/checkRole");
const controller = require("../../../services/events/controller");

router.get("/", checkRolePermissions(req, res, next, "GET_EVENTS"), controller.getEvents);

module.exports = router;
