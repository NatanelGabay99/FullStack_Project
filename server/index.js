require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const express = require("express");

const router = require("./users/routes/usersRestController");
const storiesRouter = require("./stories/routes/storiesRestController");

mongoose.connect(config.connectionString);

const app = express();

// Apply middleware
app.use(express.json()); // Body parser middleware
app.use(cors({ origin: "*" })); // CORS middleware

// Serve static files from the uploads and assets directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/assets', express.static(path.join(__dirname, '/assets')));

// Use routes
app.use(storiesRouter);
app.use(router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("app is listening to port " + PORT);
});

module.exports = app;




