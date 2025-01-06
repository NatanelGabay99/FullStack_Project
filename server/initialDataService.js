const User = require("./users/models/user.model");
const TravelStory = require("./stories/models/travelStory.model");
const bcryptjs = require('bcryptjs');

const fs = require('fs');
const path = require('path');


 const registerUser = async (fullName, email, password) => {
  const hashedPassword = await bcryptjs.hash(password, 10);
 
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    
    await user.save();
};


const createStory = async (title, story, visitedLocation, imageUrl, visitedDate, userId) => {
     const travelStory = new TravelStory({
          title,
          story,
          visitedLocation,
          imageUrl,
          visitedDate,
          userId,
        });
        await travelStory.save();
};



const dataFilePath = path.join(__dirname, 'data.json');

function readDataFromFile() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data from file:', err);
        return null;
    }
}

const createInitialUsers = async () => {
    const data = readDataFromFile();
    if (!data) {
        return;
    }
    data.users.forEach(async (user) => {
        await registerUser(user.fullName, user.email, user.password);
    });
}

const createInitialStories = async () => {
    const data = readDataFromFile();
    if (!data) {
        return;
    }
    data.stories.forEach(async (story) => {
        await createStory(story.title, story.story, story.visitedLocation, story.imageUrl, story.visitedDate, story.userId);
    });
}

module.exports = { createInitialUsers, createInitialStories };