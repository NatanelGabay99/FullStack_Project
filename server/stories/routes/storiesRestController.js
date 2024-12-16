const authenticateToken = require("../../utilities");
const express = require("express");

const router = express.Router();
const TravelStory = require("../models/travelStory.model");
const upload = require("../../multer/multer");
const fs = require("fs");
const path = require("path");



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
router.get("/get-all-stories", async (req, res) => {

  try {
    // Find all travel stories for the authenticated user
    const travelStories = await TravelStory.find().sort({isFavorite: -1});
    // Respond with the travel stories
    res.status(200).json({ stories: travelStories });
  } catch (error) {
    console.error("Error in /travel-stories:", error);
    res.status(500).json({ error: true, message: error.message });
  }
});

router.get("/get-my-stories", authenticateToken,  async (req, res) => {
 const {userId} = req.user;

  try {
    // Find all travel stories for the authenticated user
    const travelStories = await TravelStory.find({userId}).sort({isFavorite: -1});
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
    res.status(200).json({imageUrl});
  }catch(error){
    res.status(500).json({error: true, message: error.message}); 
  }
});

// Delete an image from the uploads folder
router.delete('/delete-image', async(req, res)=>{
  const {imageUrl} = req.query;
    if(!imageUrl){
      return res.status(400).json({error: true, message: 'ImageURL parameter is required'});
    }
    try{
  // extract the filename from the imageUrl
  const filename = path.basename(imageUrl);
  
  // define the file path
  const filePath = path.join(__dirname, '../../uploads', filename);

  // check if the file exists
  if(fs.existsSync(filePath)){

  // delete the file from the uploads folder
    fs.unlinkSync(filePath);
    res.status(201).json({message: 'Image deleted successfully'});
  } else{
    res.status(401).json({error: true, message: 'Image not found'});
  }
} catch(error){
  res.status(500).json({error: true, message: error.message});
}
});

// Edit travel story
router.put("/edit-story/:id", authenticateToken, async (req, res) => {
  const {id} = req.params;
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
  const { userId } = req.user;

// validate required fiels
  if(!title || !story || !visitedLocation || !visitedDate){
    return res.status(400).json({error: true, message: 'All fields are required'});
  }
  
  // convert visitedDate from milliseconds to a date objecDate object
  const parsedVisitedDate = new Date(parseInt(visitedDate));

  try{
    // find the travel story by ID and ensure it belonhs to the authenticated user
    const travelStory = await TravelStory.findOne({_id: id, userId: userId});

    if(!travelStory){
      return res.status(404).json({error: true, message: 'Travel story not found'});
    }
    
    const placeholderImageUrl = 'http://localhost:8080/assets/placeholder.png';
    
    travelStory.title = title;
    travelStory.story = story;
    travelStory.visitedLocation = visitedLocation;
    travelStory.imageUrl = imageUrl || placeholderImageUrl;
    travelStory.visitedDate = parsedVisitedDate;
    
    await travelStory.save();
    res.status(201).json({ travelStory, message: 'Travel story updated successfully'});
  } catch(error){
    res.status(500).json({error: true, message: error.message});
  }
});


// Delete a travel story
router.delete('/delete-story/:id', authenticateToken, async(req, res)=>{
  const {id} = req.params;
  const {userId} = req.user;

  try{
    // find the travel story by ID and ensure it belonhs to the authenticated user
    const travelStory = await TravelStory.findOne({_id: id, userId: userId});

    if(!travelStory){
      return res.status(404).json({error: true, message: 'Travel story not found'});
    }
    
    // delete the travel story from the database
    await travelStory.deleteOne({_id: id, userId: userId});
    
    // extract the filename from the imageUrl
    const imageUrl = travelStory.imageUrl;
    const filename = path.basename(imageUrl);
    
    // define the file path
    const filePath = path.join(__dirname, '../../uploads', filename);

    // delete the image fuile from the uploads folder
    fs.unlink(filePath, (error)=>{
      if(error){
        console.log('Failed to delete image file:', error);
      }
      });
    
      res.status(201).json({message: 'Traval story deleted successfully'});
    } catch (error){
      res.status(500).json({error: true, message: error.message});
    }
  });


// mark Favorite travel story
router.put('/favorite-story/:id', authenticateToken,  async (req, res) => { 
  const { id } = req.params;
  const { isFavorite } = req.body; // Destructure the boolean value
  const { userId } = req.user;

  try {
    const travelStory = await TravelStory.findOne({ _id: id, userId: userId });
    if (!travelStory) {
      return res.status(404).json({ error: true, message: 'Travel story not found' });
    }

    travelStory.isFavorite = isFavorite;

    await travelStory.save();
    res.status(201).json({ travelStory, message: 'Travel story updated successfully' });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

// search travel stories
router.get('/search', authenticateToken, async(req, res)=>{
  const {query} =req.query;
  const {userId} = req.user;

  if(!query){
    return res.status(404).json({error: true, messaage: 'query  is required'});
  }

  try{
    const searchResults = await TravelStory.find({
      userId: userId,
      $or: [
        {title: {$regex: query, $options: 'i'}},
        {story: {$regex: query, $options: 'i'}},
        {visitedLocation: {$regex: query, $options: 'i'}},
      ],
    }).sort({isFavorite: -1});

    res.status(200).json({stories: searchResults});
  } catch(error){
     res.status(500).json({error: true, message: error.message});
  }
});

// filter travel story
router.get('/filter-stories', authenticateToken, async(req, res)=>{
  const {startDate, endDate} = req.query;
  const {userId} = req.user;
 
  try{
    // convert startDate and endDate from milliseconds to date objects
    const start = new Date(parseInt(startDate));
    const end = new Date(parseInt(endDate));

    // find travel stories that belong to the authenticated user and fall within the date range
    const filteredStories = await TravelStory.find({
      userId: userId,
      visitedDate: {$gte: start, $lte: end},
    }).sort({isFavorite: -1});

    res.status(200).json({stories: filteredStories});


  } catch(error){
    res.status(500).json({error: true, message: error.message});
}
});



module.exports = router;
