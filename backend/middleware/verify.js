
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.verify = verify = async (req ,  res , next)=>{
    const token = req.cookies.token
  if (!token) {
    console.log("verification failed token nhi mila ")
    return res.json({ status: false });
    
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      console.log("something went wrong error aa gya")
     return res.json({ status: false , message: "Verification failed" });
   
    } else {
      const user = await User.findById(data.id).select('-password');
      if (user) {
        req.user = user;
        console.log("user found");
        next();
      } else {
        console.log("user not found");
        return res.json({ status: false  , message: "User not found"});
      }
    }
})
}