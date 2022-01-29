const router = require("express").Router();

const controller = require("../../../services/students/controller")

// GET STUDENTS
router.get("/", controller.getStudentsList);

router.put("/editStudent", controller.editStudent);

router.get("/fetchStudents", controller.fetchStudents);

router.post("/studentViewCard", controller.studentViewCard);



module.exports = router;
