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
    "http://localhost:3000",
    "http://localhost:3001",
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (
          !origin ||
          allowedOrigins.includes(origin) ||
          origin.endsWith(".netlify.app") ||
          origin.endsWith(".vercel.app") ||
          origin.endsWith(".onrender.com")
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
  app.use("/", api());
};

module.exports = expressLoader;
