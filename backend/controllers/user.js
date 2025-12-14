const User = require("../models/userModel");
const { createSecretToken } = require("../util/token");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");


const tempTokens = {}; 
// Format: { tempKey: { token, userId, expires } }

module.exports.signup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, username, createdAt });

    // Create JWT
    const token = createSecretToken(user._id);

   
    const tempKey = uuidv4();
    tempTokens[tempKey] = {
      token,
      userId: user._id,
      expires: Date.now() + 30 * 1000,
    };

    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      tempKey,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }


    const token = createSecretToken(user._id);

    
    const tempKey = uuidv4();
    tempTokens[tempKey] = {
      token,
      userId: user._id,
      expires: Date.now() + 30 * 1000,
    };

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      tempKey,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// module.exports.logout = (req, res) => {
//   res.cookie("token", "", {
//     httpOnly: true,
//     sameSite: "lax", 
//     secure: false,   
//     expires: new Date(0),
//   });
//   res.json({ message: "Logged out successfully" });
// };







module.exports.addFund = async (req, res) => {
  try {
    const userId = req.params.id;
    const amount = req.body.amount;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.availCash += amount;
    await user.save();

    res.json({
      message: "Fund added successfully",
      availCash: user.availCash,
      status: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};


module.exports.retrieveToken = async (req, res) => {
  try {
    const tempKey = req.query.id;
    if (!tempKey) return res.status(400).json({ message: "Temp key is required" });

    const record = tempTokens[tempKey];
    if (!record) return res.status(401).json({ message: "Invalid or expired key" });

    if (Date.now() > record.expires) {
      delete tempTokens[tempKey];
      return res.status(401).json({ message: "Key expired" });
    }

  
    const user = await User.findById(record.userId).select("-password");
    if (!user) {
      delete tempTokens[tempKey];
      return res.status(401).json({ message: "User not found" });
    }

    const token = record.token;

    delete tempTokens[tempKey];

    return res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};
