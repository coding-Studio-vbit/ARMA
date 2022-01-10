const authService = require("../../../services/auth/authService");
const router = require("express").Router();

router.post("/addAdmin", async (req, res) => {
  const user = req.body;
  const result = await authService.register(user, "ADMIN");
  res.json(result);
});



module.exports = router;
