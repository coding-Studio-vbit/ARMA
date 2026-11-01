const mongooseLoader = (mongoose) => {
  mongoose.set("strictQuery", false);

  const rawUri = process.env.MONGO_CONNECTION_STRING || process.env.MONGODB_URI;

  if (!rawUri || !rawUri.trim()) {
    global.lastDbError = "MONGO_CONNECTION_STRING is missing! Please configure it in Render -> Environment.";
    console.error("CRITICAL: " + global.lastDbError);
    return;
  }

  // Clean URI: remove accidental prefixes, quotes, whitespace
  let connectionString = rawUri.trim();
  connectionString = connectionString.replace(/^MONGO_CONNECTION_STRING\s*=\s*/i, "");
  connectionString = connectionString.replace(/^MONGODB_URI\s*=\s*/i, "");
  connectionString = connectionString.replace(/^["'`]|["'`]$/g, "").trim();

  if (!connectionString.startsWith("mongodb://") && !connectionString.startsWith("mongodb+srv://")) {
    global.lastDbError = "Invalid scheme: connection string must start with mongodb:// or mongodb+srv://";
    console.error("CRITICAL: " + global.lastDbError);
    return;
  }

  global.lastDbError = null;
  global.dbConnectionStringPreview = connectionString.replace(/\/\/[^:]+:[^@]+@/, "//***:***@");

  console.log("Connecting to database: " + global.dbConnectionStringPreview);
  mongoose
    .connect(connectionString, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("Connected to database.");
      global.lastDbError = null;
    })
    .catch((error) => {
      global.lastDbError = error.message;
      console.error("Database connection error:", error.message);
    });

  mongoose.connection.on("error", (error) => {
    global.lastDbError = error.message;
    console.error("Mongoose runtime error:", error.message);
  });
};

module.exports = mongooseLoader;
