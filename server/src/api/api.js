const express = require("express");
const testRouter = require("./routes/test");
const facultyRouter = require("./routes/faculty/router");
const auth = require("./routes/auth/auth");
const tokenAuth = require("./middleware/tokenAuth");
const studentRouter = require("./routes/students/router");
const forumRouter = require("./routes/forum/router");
const eventRouter = require("./routes/events/router");

const api = () => {
  const router = express.Router();
  router.use("/", auth);
  router.use("/students", studentRouter); //TEMP
  router.use("/faculty", tokenAuth, facultyRouter);
  router.use("/forum", tokenAuth, forumRouter);
  router.use("/events", tokenAuth, eventRouter);
  router.use("/test", testRouter);
  return router;
};

module.exports = api;
