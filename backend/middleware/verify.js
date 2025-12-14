const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const getUser = async (req, res, next) => {
  
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
     
    if (!token) {
      console.log("No token provided")
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findById(decoded.id).select("-password"); // exclude password

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    
    console.log("user found");
    // Attach user to request object for next middleware/route
    req.user = user;
    next();

  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      console.log("Invalid token");
      return res.status(401).json({ message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
        console.log("token expired");
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Failed to authenticate token", error });
     console.log("authentication fail");
  }
};

module.exports.getUser = getUser;
