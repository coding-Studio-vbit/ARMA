const authService = require("../../../../services/auth/authService");
const router = require("express").Router();

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password, userType, userAgent } = req.body;
  const result = await authService.login(email, password, userAgent, userType);
  console.log(result);
  res.json(result);
});

// Temp endpoints -- To be removed after development
router.post("/addForum", async (req, res) => {
  const result = await authService.register(req.body, "FORUM");
  res.json(result);
});

router.post("/addStudent", async (req, res) => {
  const result = await authService.addStudent(req.body);
  res.json(result);
}); 

module.exports = router;
