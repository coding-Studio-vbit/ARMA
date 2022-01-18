const router = require("express").Router();

const controller = require("../../../services/students/controller")

// GET STUDENTS
router.get("/", controller.getStudentsList);

module.exports = router;
