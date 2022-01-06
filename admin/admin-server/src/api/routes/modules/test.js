const express = require("express");
const test = require("./routes/test");
const faculty = require("./routes/faculty/faculty");

const api = () => {
  const router = express.Router();
  faculty(router);
  test(router);
  return router;
};

module.exports = api;
