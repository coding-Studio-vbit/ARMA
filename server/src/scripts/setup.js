require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const roles = require("../models/role");
const admins = require("../models/admin");

const DEFAULT_ROLES = ["ADMIN", "FORUM", "FACULTY", "SAC", "FO", "FC"];

async function setup() {
  try {
    const mongoUri = process.env.MONGO_CONNECTION_STRING;
    if (!mongoUri) {
      throw new Error("MONGO_CONNECTION_STRING is not defined in environment");
    }

    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(mongoUri);
    console.log("Successfully connected to MongoDB Atlas!");

    // Seed standard system roles
    const createdRoles = {};
    for (const roleName of DEFAULT_ROLES) {
      let roleDoc = await roles.findOne({ name: roleName });
      if (!roleDoc) {
        roleDoc = new roles({ name: roleName });
        await roleDoc.save();
        console.log(`Created role: ${roleName}`);
      } else {
        console.log(`Role already exists: ${roleName}`);
      }
      createdRoles[roleName] = roleDoc._id;
    }

    // Check if initial admin account exists
    let adminUser = await admins.findOne({ email: "admin@arma.com" });
    if (!adminUser) {
      const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUNDS || "10"));
      const password = await bcrypt.hash("admin123", salt);
      adminUser = new admins({
        name: "System Administrator",
        email: "admin@arma.com",
        password: password,
        role: [createdRoles["ADMIN"]],
      });
      await adminUser.save();
      console.log("\n==============================================");
      console.log(" Initial Admin Account Created Successfully!");
      console.log(" Email:    admin@arma.com");
      console.log(" Password: admin123");
      console.log(" (Please change this password after first login)");
      console.log("==============================================\n");
    } else {
      console.log("Admin account (admin@arma.com) already exists.");
    }

    await mongoose.disconnect();
    console.log("Setup complete. Disconnected from database.");
    process.exit(0);
  } catch (error) {
    console.error("Database setup failed:", error.message);
    try {
      await mongoose.disconnect();
    } catch (_) {}
    process.exit(1);
  }
}

if (require.main === module) {
  setup();
}

module.exports = setup;
