const router = require("express").Router();

const controller = require("../../../services/students/controller")

// GET STUDENTS
router.get("/", controller.getStudentsList);

router.post("/uploadStudentsList",controller.uploadStudentsList);
module.exports = router;
