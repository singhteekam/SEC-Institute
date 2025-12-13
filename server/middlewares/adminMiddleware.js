// adminMiddleware.js

const jwt = require("jsonwebtoken");
const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (req.query.userId && decoded._id !== req.query.userId) {
    next();
  } else {
    console.log("In error");
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = adminMiddleware;
