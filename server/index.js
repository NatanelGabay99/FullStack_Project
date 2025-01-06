require("dotenv").config();
const path = require("path");
const express = require("express");



const app = express();
const usersRouter = require("./users/routes/usersRestController");
const storiesRouter = require("./stories/routes/storiesRestController");
const corsMiddleware = require("./middlewares/cors");
const connectToDb = require("./DB/dbService");

app.use(corsMiddleware); 
app.use(express.json()); 

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/assets', express.static(path.join(__dirname, '/assets')));

app.use(usersRouter);
app.use(storiesRouter);

const PORT = process.env.PORT || 8080;

app.listen (PORT, async () => {
  console.log("app is listening to port " + PORT);
  await connectToDb();
});

module.exports = app;




