const controller = require("../../../services/admin/controller");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const result = await controller.getAdmins(req, res);
  res.json(result);
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
});

router.post("/viewAdmin", async (req, res) => {
  let { id } = req.body;
  let result = await controller.viewAdmin(id);
});

router.post("/addFaculty", async (req, res) => {
  const user = req.body;
  const result = await controller.register(user, "FACULTY");
  res.json(result);
});

router.post("/addForum", async (req, res) => {
  const user = req.body;
  const result = await controller.register(user, "FORUM");
  res.json(result);
});

router.post("/addStudent", async (req, res) => {
  const result = await controller.addStudent(req.body);
  res.json(result);
});

module.exports = router;
