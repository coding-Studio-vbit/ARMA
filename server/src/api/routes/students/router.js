const router = require("express").Router();

const controller = require("../../../services/students/controller")

router.get("/", controller.getStudentsList);

module.exports = router;
