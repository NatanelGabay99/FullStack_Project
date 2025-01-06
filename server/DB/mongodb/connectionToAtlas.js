const mongoose = require("mongoose");
require("dotenv").config();
const connectionStringForAtlas = process.env.connectionString

const connectToAtlasDb = async () => {
  try {
    await mongoose.connect(connectionStringForAtlas);
    console.log("Connected to MongoDB in Atlas");
  } catch (error) {
    console.error("Could not connect to MongoDB in Atlas", error);
  }
};
module.exports = connectToAtlasDb;