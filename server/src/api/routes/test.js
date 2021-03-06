const router = require("express").Router();
const forum = require("../../models/forum");

const authService = require("../../services/auth/authService");

// Temp endpoints -- To be removed after development
router.post("/addForum", async (req, res) => {
  const result = await authService.register(req.body, "FORUM");
  res.json(result);
});

router.post("/addStudent", async (req, res) => {
  const result = await authService.addStudent(req.body);
  res.json(result);
});
router.post("/addRole", async (req, res) => {
  const result = await authService.addRole(req.body);
  res.json(result);
});

router.get("/getForum", async (req, res) => {
  const result = await forum
    .find({})
    .populate({ path: "forumCoreTeamMembers.studentID", model: "students" });
  res.json(result);
});

router.post("/addFaculty", async (req, res) => {
  const result = await authService.register(req.body, "FACULTY");
  res.json(result);
});

module.exports = router;
