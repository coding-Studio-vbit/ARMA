require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const mongoose = require("mongoose");
const http = require("http");
const express = require("express");
const loaders = require("../loaders/loaders");
const cloudinary = require("cloudinary").v2;

async function runLocalTests() {
  console.log("=========================================");
  console.log("   ARMA Full Local Integration Tests    ");
  console.log("=========================================\n");

  let exitCode = 0;

  // 1. Test Cloudinary Configuration & Ping
  console.log("1. Testing Cloudinary Integration...");
  try {
    if (process.env.CLOUDINARY_URL) {
      cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
    } else {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
    }
    const cldRes = await cloudinary.api.ping();
    console.log("   ✔ Cloudinary ping successful:", JSON.stringify(cldRes));
  } catch (err) {
    console.error("   ❌ Cloudinary test failed:", err.message);
    exitCode = 1;
  }

  // 2. Test MongoDB Atlas Live Connection
  console.log("\n2. Testing MongoDB Atlas Live Connection...");
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("   ✔ Connected to Atlas cluster successfully");

    const rolesCollection = mongoose.connection.db.collection("roles");
    const roles = await rolesCollection.find().toArray();
    console.log(`   ✔ Found ${roles.length} system roles:`, roles.map((r) => r.name).join(", "));

    const adminsCollection = mongoose.connection.db.collection("admins");
    const admins = await adminsCollection.find().toArray();
    console.log(`   ✔ Found ${admins.length} admin account(s):`, admins.map((a) => a.email).join(", "));
  } catch (err) {
    console.error("   ❌ MongoDB Atlas test failed:", err.message);
    exitCode = 1;
  }

  // 3. Test Full Express App Boot & HTTP Endpoints
  console.log("\n3. Testing Express App & HTTP API Endpoints...");
  let server;
  const testPort = 5099;
  try {
    const app = express();
    loaders({ app, mongoose });

    server = await new Promise((resolve, reject) => {
      const s = app.listen(testPort, () => resolve(s));
      s.on("error", reject);
    });
    console.log(`   ✔ Server successfully booted on port ${testPort}`);

    // Helper for local HTTP requests
    const makeRequest = (method, path, body = null, headers = {}) => {
      return new Promise((resolve, reject) => {
        const payload = body ? JSON.stringify(body) : null;
        const options = {
          hostname: "127.0.0.1",
          port: testPort,
          path,
          method,
          headers: {
            "Content-Type": "application/json",
            ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {}),
            ...headers,
          },
        };
        const req = http.request(options, (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            try {
              resolve({ statusCode: res.statusCode, headers: res.headers, body: JSON.parse(data) });
            } catch (e) {
              resolve({ statusCode: res.statusCode, headers: res.headers, raw: data });
            }
          });
        });
        req.on("error", reject);
        if (payload) req.write(payload);
        req.end();
      });
    };

    // Test A: Admin Login with valid credentials
    console.log("   -> Testing POST /login with admin credentials...");
    const loginRes = await makeRequest("POST", "/login", {
      email: "admin@arma.com",
      password: "admin123",
      userType: "ADMIN",
      userAgent: "LocalTestRunner",
    });

    if (loginRes.body && loginRes.body.status === 1 && loginRes.body.response.token) {
      console.log("   ✔ Admin authentication successful!");
      console.log("     Token received:", loginRes.body.response.token.substring(0, 20) + "...");
      console.log("     User Role:", loginRes.body.response.user.role.name || loginRes.body.response.user.role);
    } else {
      console.error("   ❌ Admin login failed:", loginRes.body);
      exitCode = 1;
    }

    // Test B: Login with invalid password
    console.log("   -> Testing POST /login with invalid password...");
    const badLoginRes = await makeRequest("POST", "/login", {
      email: "admin@arma.com",
      password: "wrongpassword",
      userType: "ADMIN",
      userAgent: "LocalTestRunner",
    });
    if (badLoginRes.body && badLoginRes.body.status === 0) {
      console.log("   ✔ Bad login correctly rejected:", badLoginRes.body.response);
    } else {
      console.error("   ❌ Expected status 0 rejection, got:", badLoginRes.body);
      exitCode = 1;
    }

    // Test C: Defensive Security Headers
    console.log("   -> Testing Defensive HTTP Headers (SEC-08)...");
    if (
      loginRes.headers["x-content-type-options"] === "nosniff" &&
      loginRes.headers["x-frame-options"] === "SAMEORIGIN" &&
      loginRes.headers["referrer-policy"] === "strict-origin-when-cross-origin"
    ) {
      console.log("   ✔ All defensive HTTP security headers present");
    } else {
      console.error("   ❌ Missing security headers in response:", loginRes.headers);
      exitCode = 1;
    }

    // Test D: Rate Limiting on /login (SEC-09)
    console.log("   -> Testing Rate Limiting on /login (SEC-09)...");
    let rateLimited = false;
    for (let i = 0; i < 12; i++) {
      const res = await makeRequest("POST", "/login", {
        email: "test@example.com",
        password: "wrong",
        userType: "ADMIN",
        userAgent: "LocalTestRunner",
      });
      if (res.statusCode === 429) {
        rateLimited = true;
        console.log(`   ✔ Rate limiter triggered on request #${i + 1} with HTTP 429`);
        break;
      }
    }
    if (!rateLimited) {
      console.error("   ❌ Rate limiter did not trigger after 12 rapid requests");
      exitCode = 1;
    }
  } catch (err) {
    console.error("   ❌ Express app test failed:", err.message);
    exitCode = 1;
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log("\n   ✔ Test HTTP server stopped cleanly");
    }
    await mongoose.disconnect();
    console.log("   ✔ Database connection closed cleanly");
  }

  console.log("\n=========================================");
  if (exitCode === 0) {
    console.log("   🎉 ALL LOCAL TESTS PASSED CLEANLY!   ");
  } else {
    console.log("   ❌ SOME LOCAL TESTS FAILED           ");
  }
  console.log("=========================================\n");

  process.exit(exitCode);
}

runLocalTests();

