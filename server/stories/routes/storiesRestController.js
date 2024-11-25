const authenticateToken = require("../../utilities");

const router = express.Router();
const Story = require("../models/story.model");


// Add travel story
router.post('/add-travel-story', authenticateToken, async (req, res) => {
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
  const {userId} = req.user;

  // validate required fields
  if(!title || !story || !visitedLocation || !imageUrl || !visitedDate){
    return res.status(400).json({error: true, message: "All fields are required"});
  }
});