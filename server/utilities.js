const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  try {
    
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 
    if (!token) {
      return res.status(401);
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.error("Error in authenticateToken middleware:", err);
        return res.status(403);
      }

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500);
  }
};

module.exports = authenticateToken;
