require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const loaders = require("./loaders/loaders");
const fs = require("fs");
const path = require("path")
const https = require("https");

const port = 5000 || process.env.PORT;

const startServer = () => {
  const app = express();

  loaders({ app, mongoose });

  const sslServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, '../cert',"key.pem")),
      cert: fs.readFileSync(path.join(__dirname, '../cert', "cert.pem"))
    },
    app
  );

  sslServer.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`);
  });
};

startServer();
