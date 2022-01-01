require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const loaders = require("./loaders/loaders");

const port = 5000 || process.env.PORT

const startServer = () => {
  const app = express();
  
  loaders({ app, mongoose });

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
};

startServer();
