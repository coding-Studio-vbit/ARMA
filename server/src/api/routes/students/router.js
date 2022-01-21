const router = require("express").Router();

const controller = require("../../../services/students/controller")

// GET STUDENTS
router.get("/", controller.getStudentsList);

router.put("/editStudent", controller.editStudent);


module.exports = router;
