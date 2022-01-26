const authService = require("../../../services/auth/authService");
const router = require("express").Router();

router.post("/addAdmin", async (req, res) => {
  const user = req.body;
  const result = await authService.register(user, "ADMIN");
  res.json(result);
});

router.put("/editAdmin", async (req, res) => {
  const {email,newEmail,newpassword} = req.body;
  const result = await authService.editAdmin(email, newEmail,newpassword);
  res.json(result);
});


router.post("/addFaculty",async(req, res)=>{
  const user = req.body;
  const result = await authService.register(user,"FACULTY");
  res.json(result)
})

router.post("/addForum",async(req, res)=>{
  const user = req.body;
  const result = await authService.register(user,"FORUM");
  res.json(result)
})

router.post("/addStudent", async (req, res) => {
  const result = await authService.addStudent(req.body);
  res.json(result);
});



module.exports = router;
