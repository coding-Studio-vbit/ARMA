const express = require("express");
const testRouter = require("./routes/test");
const facultyRouter = require("./routes/faculty/router");
const auth = require("./routes/auth/auth");
const tokenAuth = require("./middleware/tokenAuth");
const studentRouter = require("./routes/students/router");
const forumRouter = require("./routes/forum/router");
const eventRouter = require("./routes/events/router");
const adminRouter = require("./routes/admin/router");
const rolesRouter = require("./routes/roles/router");
const hallsRouter = require("./routes/halls/router");
const equipmentRouter = require("./routes/equipment/router");

const api = () => {
  const router = express.Router();
  router.use("/", auth);
  router.use("/students", tokenAuth, studentRouter); //TEMP
  router.use("/faculty", facultyRouter);
  router.use("/forum", forumRouter);
  router.use("/events", eventRouter);
  router.use("/test", testRouter);
  router.use("/admin", adminRouter);
  router.use("/roles", rolesRouter);
  router.use("/halls", hallsRouter);
  router.use("/equipment", equipmentRouter);
  return router;
};

module.exports = api;
