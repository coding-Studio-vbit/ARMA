const authService = require("../../../services/auth/authService");
const router = require("express").Router();

router.post("/login", async (req, res) => {
  const { email, password, userType, userAgent } = req.body;
  const result = await authService.login(email, password, userAgent, userType);
  res.json(result);
});

router.post("/register", async (req, res) => {
  const { userType, ...user } = req.body;
  const result = await authService.register(user, userType);
  res.json(result);
});

router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  const result = await authService.forgotPassword(email);
  res.json(result);
});

module.exports = router;
