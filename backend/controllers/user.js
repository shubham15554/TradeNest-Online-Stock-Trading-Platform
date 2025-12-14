


module.exports.signup =  async (req , res , next)=>{

 try {
    const { email, password, username, createdAt } = req.body;
    if(!email || !password || !username){
      return res.json({message:'All fields are required'})
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      token, // send JWT in response body
      user,  // optional user info
    });
   
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }


}

const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const {createSecretToken} = require("../util/token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");  

module.exports.login = async (req , res)=>{
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email ' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
    const token = createSecretToken(user._id);
    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      token, // send JWT in response body
      user,  // optional user info
    });
    
     

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }


}


module.exports.logout = (req, res) => {
  // Clear the token cookie
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "lax", // or "none" in production with HTTPS
    secure: false,   // true in production
    expires: new Date(0), // Expire immediately
  });
  res.json({ message: "Logged out successfully" });
}

module.exports.addFund =  async (req , res)=>{
 
  console.log("request recieved ");
  const userId = req.params.id;
  const amount = req.body.amount;

    let user = await User.findById({_id : userId});
    user.availCash = user.availCash + amount;
   await user.save();
   console.log("added successFully");
   res.json({ message: "Fund added successfully"  , availCash :  user.availCash , status: true});


}