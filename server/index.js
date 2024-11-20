const config = require('./config.json');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const express = require('express');
const cors = require('cors');
const jws = require('jsonwebtoken');

const User = require('./models/user.model');

mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));

const PORT = process.env.PORT || 8080;

//create account
app.get("/create-account", async(req, res) => {
}
);

app.listen(PORT, () => {
    console.log("app is listening to port " + PORT);
}
);

module.exports = app;