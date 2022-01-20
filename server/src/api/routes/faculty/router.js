const router = require("express").Router();
const controller = require("../../../services/forum/controller");
const eventController = require("../../../services/events/controller");
const facultyController = require("../../../services/faculty/controller");

router.get("/getForums", controller.getForumsList);
router.get("/dashboardInfo",eventController.getRequests);
router.get("/getForums", controller.getForumsList);
router.get("/getFaculty",facultyController.getFacultyList);
router.put("/editProfile", facultyController.editProfile)
router.put("/editFaculty", facultyController.editFaculty)


module.exports = router;
