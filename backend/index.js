
require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const { createSecretToken } = require("./util/token");
const bcrypt = require("bcrypt");
app.use(express.json());
const mongoose = require("mongoose");
const holdingModel  = require("./models/holdingModel");
const positionModel = require("./models/postionModel");
const orderModel = require("./models/orderModel");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
const {watchlist} = require ("./data/data");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
app.use(cookieParser());
const wrapasync = require("./util/wrapasync");
const axios = require("axios");
const {getUser} = require("./middleware/verify");

// CORS config for multiple frontends
app.use(
  cors({
    origin: ["https://trade-nest-online-stock-trading-pla.vercel.app" , "https://tradenest-dashboard-7rrx.vercel.app"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Component']
  })
);


const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;



app.use("/user" , userRouter);
app.use("/order" , orderRouter);




app.get("/allHoldings" , getUser, wrapasync(async (req , res)=>{
 
  const userId = req.user._id;
  let allHoldings =  await holdingModel.find({user:userId});
  res.json(allHoldings);
  

}));



app.get("/allPositions" ,getUser, wrapasync(async (req , res)=>{
  const userId = req.user._id;
  let allPostiions =  await positionModel.find({user:userId});
  res.json(allPostiions);

}));



app.get("/getUser" , getUser,  (req, res) => {

    const user = req.user; 
    return res.status(200).json({
      status: true,
      user,
    });


} ) 

// error handiling middleware 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  console.log("Error handled:", message);

  res.status(statusCode).json({ message });
});





const url2 = `https://tradenest-online-stock-trading-platform.onrender.com`;
const interval = 5 * 60 * 1000; // 5 minutes

function reloadWebsite() {
  axios
    .get(url2)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);





mongoose.connect(url)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });