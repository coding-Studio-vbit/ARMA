const mongooseLoader = (mongoose) => {
  mongoose.set("strictQuery", false);

  const rawUri = process.env.MONGO_CONNECTION_STRING || process.env.MONGODB_URI;
  if (!rawUri) {
    console.error(
      "CRITICAL: MONGO_CONNECTION_STRING is missing! Please configure it in Render Web Service -> Environment."
    );
    return;
  }

  const connectionString = rawUri.trim().replace(/^["']|["']$/g, "");

  console.log("Connecting to database...");
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((error) => {
      console.error("Database connection error:", error.message);
    });

  mongoose.connection.on("error", (error) => {
    console.error("Mongoose runtime error:", error.message);
  });
};
module.exports = mongooseLoader;
