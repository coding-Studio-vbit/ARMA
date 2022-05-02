const router = require("express").Router();
const controller = require("../../../services/forum/controller");
const eventController = require("../../../services/events/controller");
const facultyController = require("../../../services/faculty/controller");

router.post("/acceptBudget", facultyController.acceptBudget);
router.post("/commentBudget", facultyController.commentBudget);
router.post("/rejectBudget", facultyController.rejectBudget);
router.post("/acceptEvent", facultyController.approveEvent);
router.post("/rejectEvent", facultyController.rejectEvent);
router.post("/commentEvent", facultyController.commentEvent);
router.get("/getForums", controller.getForumsList);
router.get("/dashboardInfo",eventController.getRequests);
router.get("/getFaculty",facultyController.getFacultyList);
router.put("/editProfile", facultyController.editProfile)
router.put("/editFaculty", facultyController.editFaculty)
router.post("/fetchFaculty", facultyController.fetchFaculty);
router.post("/deleteFaculty", facultyController.deleteFaculty);
router.post("/viewFaculty", facultyController.viewFaculty);


module.exports = router;