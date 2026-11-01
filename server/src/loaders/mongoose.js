const mongooseLoader = (mongoose) => {
  console.log("Connecting to database...");
  mongoose.connect(process.env.MONGO_CONNECTION_STRING);

  mongoose.connection
    .once("open", () => {
      console.log("Connected to database.");
    })
    .on("error", (error) => {
      console.error(error);
    });
};
module.exports = mongooseLoader;
