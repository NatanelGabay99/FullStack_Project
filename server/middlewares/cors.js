const cors = require("cors");

const corsMiddleware = cors({
    origin:[
    '*',
    'http://localhost:5173',
    'https://fullstack-project-1-zr1w.onrender.com/',
    ],
});

module.exports = corsMiddleware;