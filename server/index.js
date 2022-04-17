
const mongoose = require("mongoose");
const config = require("./utils/config");
const app = require("./app");

console.log("Starting app..");
console.log("Waiting for connection to MongoDB");
console.log(config)
const PORT = config.PORT;

mongoose
  .connect(config.dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB!");
    console.log("Starting the server ...");

    app.listen(PORT, () => {
      console.log(`✅ Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Could not connect to MongoDB server! Shutting down...");
    process.exit(1);
  });

process.on("unhandledRejection", (err) => {
  console.log(err.name, err);
  console.log("UNHANDLED REJECTION! 💥 Shutting Down...");

  app.close(() => {
    process.exit(1);
  });
});