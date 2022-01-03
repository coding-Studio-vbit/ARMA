const api = require("../api/api");
const cors = require('cors')
const express = require("express");

const expressLoader = (app) => {
  app.use(cors())
  app.use(express.urlencoded({extended:true}))
  app.use(express.json())
  app.use("/", api());
};

module.exports = expressLoader;
