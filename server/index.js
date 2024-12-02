require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");



mongoose.connect(config.connectionString);

const app = express();
const usersRouter = require("./users/routes/usersRestController");
const storiesRouter = require("./stories/routes/storiesRestController");
const corsMiddleware = require("./middlewares/cors");

// Apply middleware
app.use(express.json()); // Body parser middleware
app.use(corsMiddleware); // CORS middleware

// Serve static files from the uploads and assets directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/assets', express.static(path.join(__dirname, '/assets')));

// Use routes
app.use(usersRouter);
app.use(storiesRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("app is listening to port " + PORT);
});

module.exports = app;




