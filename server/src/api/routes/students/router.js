const router = require("express").Router();

const controller = require("../../../services/students/controller")

// GET STUDENTS
router.get("/", controller.getStudentsList);

router.post("/uploadStudentsList",controller.uploadStudentsList);
router.put("/editStudent", controller.editStudent);

router.get("/fetchStudents", controller.fetchStudents);

router.post("/studentViewCard", controller.studentViewCard);
router.post("/deleteStudent", controller.deleteStudent);
router.post("/generatePDF", controller.generatePDF);

module.exports = router;
