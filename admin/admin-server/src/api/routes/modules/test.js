const express = require("express");
onst faculty = require("./routes/faculty/faculty");

const api = () => {
  const router = express.Router();
  faculty(router);
  test(router);
  return router;
};

module.exports = api;
