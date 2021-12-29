require("dotenv").config();
const express = require("express");
const loaders = require("./loaders/loaders");

const port = process.env.PORT || 6000;

const startServer = () => {
  const app = express();
  loaders({app});
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
};

startServer();
