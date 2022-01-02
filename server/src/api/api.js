const express = require("express");
const test = require("./routes/modules/test");
const facultyRouter = require("./routes/modules/faculty/router");
const auth = require("./routes/modules/auth/auth");
const tokenAuth = require("./middleware/tokenAuth");
const studentRouter = require("../api/routes/modules/students/route");

const api = () => {
  const router = express.Router();
  router.use("/", auth);
  
  router.use("/students", studentRouter); //TEMP

  router.use("/faculty", tokenAuth, facultyRouter);
  //router.use(tokenAuth)
  //test(router);
  return router;
};

module.exports = api;
