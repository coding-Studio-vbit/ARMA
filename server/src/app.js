require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const loaders = require("./loaders/loaders");
const fs = require("fs");
const path = require("path");
const https = require("https");

const port = process.env.PORT || 5001;
const enableLocalSsl = process.env.ENABLE_LOCAL_SSL === "true";

const startServer = () => {
  const app = express();

  loaders({ app, mongoose });

  if (enableLocalSsl) {
    // Custom VPS HTTPS with local SSL certificates
    try {
      const sslServer = https.createServer(
        {
          key: fs.readFileSync(path.join(__dirname, "../cert", "key.key")),
          cert: fs.readFileSync(path.join(__dirname, "../cert", "cert.pem")),
        },
        app
      );

      sslServer.listen(port, () => {
        console.log(`Server running with local SSL at https://localhost:${port}`);
      });
    } catch (error) {
      console.error("Failed to start HTTPS server with local certs:", error.message);
      process.exit(1);
    }
  } else {
    // Standard HTTP: used in development and on cloud platforms (Render, Railway, Fly.io) where SSL is handled at edge
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port} (Port: ${port})`);
    });
  }
};

startServer();
