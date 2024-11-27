const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // Check if the token is missing
    if (!token) {
      return res.status(401); // Unauthorized
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403); // Forbidden
      }

      // Attach user information to the request object
      req.user = user;
      next();
    });
  } catch (err) {
    console.error("Error in authenticateToken middleware:", err);
    return res.status(500); // Internal Server Error
  }
};

module.exports = authenticateToken;
