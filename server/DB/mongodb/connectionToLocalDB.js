const mongoose = require("mongoose");
const { createInitialUsers, createInitialStories } = require("../../initialDataService");
const userModel = require("../../users/models/user.model");
const travelStoryModel = require("../../stories/models/travelStory.model");

// a function to connect to the local mongodb
const connectToLocalDb = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");
      console.log("Connected to MongoDB locally");
      if(await userModel.countDocuments() === 0){
        await createInitialUsers();
      }
      if(await travelStoryModel.countDocuments() === 0){
        await createInitialStories();
      }
    } catch (error) {
      console.error("Could not connect to MongoDB locally", error);
    }
  };

  module.exports = connectToLocalDb;