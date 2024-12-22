const config = require("config");
const connectToAtlasDb = require("./mongodb/connectionToAtlas");
const connectToLocalDb = require("./mongodb/connectionToLocalDB");
const ENVIRONMENT = config.get("ENVIRONMENT");

const connectToDb = async () => {
  if (ENVIRONMENT === "development") {
    await connectToLocalDb();
  }
  if (ENVIRONMENT === "production") {
    await connectToAtlasDb();
  }
};

module.exports = connectToDb;