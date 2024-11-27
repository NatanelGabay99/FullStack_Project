require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./users/routes/usersRestController");
const storiesRouter = require("./stories/routes/storiesRestController");

mongoose.connect(config.connectionString);

const express = require("express");
const app = express();


// Apply middleware in the correct order
app.use(express.json()); // Body parser middleware must come first
app.use(cors({ origin: "*" })); // CORS middleware
app.use(storiesRouter);

app.use(router); // Routes come after middleware

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("app is listening to port " + PORT);
});

module.exports = app;



