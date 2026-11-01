const mongooseLoader = (mongoose) => {
  mongoose.set("strictQuery", false);

  const defaultAtlasUri =
    "mongodb+srv://Arma:Armacs@cluster0.tzgo6gd.mongodb.net/arma?retryWrites=true&w=majority";

  let rawUri = process.env.MONGO_CONNECTION_STRING || process.env.MONGODB_URI;

  if (!rawUri || !rawUri.trim()) {
    console.warn("MONGO_CONNECTION_STRING not provided in environment; using Atlas default cluster.");
    rawUri = defaultAtlasUri;
  }

  // Clean URI: remove accidental prefixes, quotes, whitespace
  let connectionString = rawUri.trim();
  connectionString = connectionString.replace(/^MONGO_CONNECTION_STRING\s*=\s*/i, "");
  connectionString = connectionString.replace(/^MONGODB_URI\s*=\s*/i, "");
  connectionString = connectionString.replace(/^["'`]|["'`]$/g, "").trim();

  // If scheme was mangled, fallback to default Atlas URI
  if (!connectionString.startsWith("mongodb://") && !connectionString.startsWith("mongodb+srv://")) {
    console.warn("Invalid MongoDB URI scheme detected (" + connectionString.substring(0, 15) + "); falling back to Atlas cluster.");
    connectionString = defaultAtlasUri;
  }

  global.lastDbError = null;
  global.dbConnectionStringPreview = connectionString.substring(0, 25) + "...";

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
