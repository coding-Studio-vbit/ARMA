const api = require("../api/api");
const cors = require("cors");
const express = require("express");

const expressLoader = (app) => {
  // Request logger for troubleshooting
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      console.log(`[HTTP] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start}ms)`);
    });
    next();
  });

  // Defensive HTTP response headers
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // CORS configuration supporting college domain, localhost, and cloud deploys
  const allowedOrigins = [
    "https://arma.vbithyd.ac.in",
    "https://codingstudio.co.in",
    "https://arma.codingstudio.co.in",
    "https://admin.arma.codingstudio.co.in",
    "https://armaserver.onrender.com",
    "http://localhost:3000",
    "http://localhost:3001",
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (
          !origin ||
          allowedOrigins.includes(origin) ||
          /^https?:\/\/([a-z0-9-]+\.)*codingstudio\.co\.in$/i.test(origin)
        ) {
          callback(null, true);
        } else {
          callback(new Error("CORS: Origin not allowed"));
        }
      },
      credentials: true,
    })
  );

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Health check endpoint for monitoring & Render keep-alive pings
  app.get("/health", (req, res) => {
    const mongoose = require("mongoose");
    res.status(200).json({
      status: "ok",
      database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      dbState: mongoose.connection.readyState,
      dbError: global.lastDbError || null,
      dbPreview: global.dbConnectionStringPreview || null,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  app.use("/", api());
};

module.exports = expressLoader;
