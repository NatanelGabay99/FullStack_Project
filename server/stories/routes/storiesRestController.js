const authenticateToken = require("../../utilities");
const express = require("express");
const router = express.Router();
const TravelStory = require("../models/travelStory.model");
const upload = require("../../multer/multer");
const fs = require("fs");
const path = require("path");
const { error } = require("console");
// Add travel story
router.post("/add-travel-story", authenticateToken, async (req, res) => {
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
  // Validate required fields
  if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }
  try {
    // Create the travel story object
    const travelStory = new TravelStory({
      title,
      story,
      visitedLocation,
      imageUrl,
      visitedDate,
      userId: req.user.userId, // Extracted from token middleware
      isFavorite: false, // Default value for isFavorite
    });
    // Save to database
    await travelStory.save();
    // Respond with the newly created travel story
    return res.status(201).json({
      error: false,
      message: "Travel story added successfully",
      travelStory, // Includes _id, userId, and isFavorite
    });
  } catch (error) {
    console.error("Error in /add-travel-story:", error);
    return res
      .status(500)
      .json({ error: true, message: "Server error while adding travel story" });
  }
});

// Get all travel stories
router.get("/get-all-stories", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  try {
    // Find all travel stories for the authenticated user
    const travelStories = await TravelStory.find({ userId: userId }).sort({isFavorite: -1});
    // Respond with the travel stories
    res.status(200).json({ stories: travelStories });
  } catch (error) {
    console.error("Error in /travel-stories:", error);
    res.status(500).json({ error: true, message: error.message });
  }
});


//Route to handle image upload
router.post('/image-upload', upload.single('image'), async (req, res) => {
  try{
    if(!req.file){
      return res.status(400).json({error: true, message: 'No image uploaded'});
    }

    const imageUrl = `http://localhost:8080/uploads/${req.file.filename}`;
    res.status(201).json({imageUrl});
  }catch(error){
    res.status(500).json({error: true, message: error.message}); 
  }
});



  
module.exports = router;
