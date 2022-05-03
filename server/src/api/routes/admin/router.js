const controller = require("../../../services/admin/controller");
const facultyController = require("../../../services/faculty/controller")
const router = require("express").Router();
const checkRole = require("../../../services/util/checkRole");
const tokenAuth = require("../../middleware/tokenAuth");

router.use(tokenAuth)
router.get("/", controller.getAdmins);

//MUST BE ADMIN TO USE THESE.
router.use((req, res,next)=>{
  checkRole(req,res,next, ["ADMIN"])
});

router.post("/addAdmin", async (req, res) => {
  const user = req.body;
  const result = await controller.register(user, "ADMIN");
  res.json(result);
});

router.put("/editAdmin", async (req, res) => {
  const { email, newEmail, newpassword } = req.body;
  const result = await controller.editAdmin(email, newEmail, newpassword);
  res.json(result);
});

router.post("/deleteAdmin", async (req, res) => {
  let { id } = req.body;
  let result = await controller.deleteAdmin(id);
  res.json(result)
});

router.post("/viewAdmin", async (req, res) => {
  let { id } = req.body;
  let result = await controller.viewAdmin(id);
  res.json(result)
});

router.post("/addFaculty", async (req, res) => {
  const user = req.body;
  const result = await controller.register(user, "FACULTY");
  res.json(result);
});
router.put("/editFaculty", facultyController.editFaculty);

router.post("/addForum", async (req, res) => {
  const user = req.body;
  const result = await controller.register(user, "FORUM");
  res.json(result);
});

router.post("/addStudent", async (req, res) => {
  const result = await controller.addStudent(req.body);
  res.json(result);
});

router.post("addCourse", controller.addCourse);
router.post("editCourse", controller.editCourse);

module.exports = router;
