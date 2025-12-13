

const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const holdingModel  = require("../models/holdingModel");
const positionModel = require("../models/postionModel");
const orderModel = require("../models/orderModel");
const orderController = require("../controllers/order");

const {watchlist} = require ("../data/data");

const wrapasync = require("../util/wrapasync");

module.exports.byuOrder =  async (req , res)=>{
    console.log("New order request received");
    const userId = req.user._id;
    const { name, qty, price, mode, productType, orderType, limitPrice } = req.body;

    //  Fetch user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    //  Fetch stock
    const stock = watchlist.find((s) => s.name === name);
    if (!stock) return res.status(400).json({ msg: "Stock not found" });

    let availMargin = user.availCash - user.marginUsed;

    const order = new orderModel({
      name,
      qty,
      price : price, 
      mode,
      productType,
      orderType,
      user: userId,
      limitPrice: limitPrice
    });

    // ------------------ MARKET ORDER ------------------
    if (orderType === "Market") {
      let totalCost;

      if (productType === "CNC") {
        totalCost = price * qty;
      } else {
        totalCost = stock.marginRequired.MIS * qty;
      }

      if (availMargin < totalCost) {
        return res.status(400).json({ msg: "Not enough funds" });
      }

      // Deduct cash immediately
      user.availCash -= totalCost;
      await user.save();                                                                                                           

      order.statusType = "executed";
      await order.save();
      /// add in holdings or positions
      if (productType === "CNC") {
        // Add to holding
        let ltp = price;
        let per = parseFloat(stock.percent);   // → 3.45
        let previousClose = ltp / (1 + per / 100);

        const holding = new holdingModel({
          name: name,
          qty,
          price: price,
          user: userId,
          avg: price,     /// at this price user stock kharidta hai
          isLoss: stock.price < previousClose,
          net: stock.percent,
          orderType: "CNC",
          
        });
        await holding.save();
      }
      else{
        let ltp = stock.price;
        let per = parseFloat(stock.percent);   
        let previousClose = ltp / (1 + per / 100);    
        const position = new positionModel({
          product : "MIS",
          name: name,
          qty,
          price: price,               /// ye current stock price ye ui me change to hota hi rahega  // ye ltp hai
          user: userId,
          avg: price,                 // at this price uesr stock kharidta hai
          isLoss: stock.price < previousClose,
          net: stock.percent,
        });
        await position.save();

      }

      return res.json({ msg: "Market order executed", order , user});
    }

    // ------------------ LIMIT ORDER ------------------
    if (orderType === "Limit") {
      let marginToBlock;

      if(limitPrice <= 0){
        return res.status(400).json({ msg: "Please enter a valid limit price" });
      }

      if (productType === "CNC") {
        marginToBlock = limitPrice * qty;
      } else {
        marginToBlock = stock.marginRequired.MIS * qty;
      }

      if (availMargin < marginToBlock) {
        return res.status(400).json({ msg: "Not enough funds to block" });
      }

      // Block money for limit order
      // user.availCash -= marginToBlock;   // limit order me paisa turant kam nhi hota
      user.marginUsed += marginToBlock;
      await user.save();

      order.statusType = "pending";
      order.blockedMargin = marginToBlock;
      // if(productType === "CNC") order.limitPrice = price;
  
      await order.save();
      return res.json({ msg: "Limit order placed (funds blocked)", order , user});
    }
  
};





module.exports.sellOrder = async (req , res) => {   // for sell order

    console.log("New order sell request received");
    // const userId = req.params.id;
    const userId = req.user._id;
    const { name, qty, price, mode, productType, orderType, limitPrice } = req.body;
    //  Fetch user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    
    //  Fetch stock
    const stock = watchlist.find((s) => s.name === name);
    if (!stock) return res.status(400).json({ msg: "Stock not found" });

    const order = new orderModel({
      name,
      qty, 
      price : price,  //
      mode,
      productType,
      orderType,
      user: userId,
      limitPrice: limitPrice
    });
    // ------------------ MARKET ORDER ------------------
    if(orderType === "Market"){
      if(productType === "CNC"){
          // Remove from holding
          const holding = await holdingModel.findOne({user:userId , name:name});
          if(!holding || holding.qty < qty){
              return res.status(400).json({ msg: "Not enough holdings to sell" });
          }
          else{
              holding.qty  =  holding.qty - qty;
              if(holding.qty === 0){
                  await holdingModel.deleteOne({_id:holding._id});
              }
            
              if(holding.qty > 0) await holding.save();
              order.statusType = "executed";
              user.availCash += price * qty;  // add cash to user account on sell
              await user.save();
              await order.save();
              return res.json({ msg: "Market sell order executed", order , user}); 
            }
      }
      else{
          // Remove from position
          const position = await positionModel.findOne({user:userId , name:name});
          if(!position || position.qty < qty){
              return res.status(400).json({ msg: "Not enough positions to sell" });
          }
          else{
              position.qty  =  position.qty - qty; 
              if(position.qty === 0){
                  await positionModel.deleteOne({_id:position._id});
              }

             if(position.qty > 0) await position.save();
              order.statusType = "executed";
              let pnl = (price - position.avg) * qty; // calculate profit or loss
              user.availCash += pnl  + stock.marginRequired.MIS * qty;// add cash to user account on sell
              await user.save();
              await order.save();
              return res.json({ msg: "Market sell order executed", order , user});

            }
      }
        
    }
    else{
        // Limit order logic can be added here
        if(limitPrice <= 0){
            return res.status(400).json({ msg: "Please enter a valid limit price" });
        }
        if(productType === "CNC"){
            const holding = await holdingModel.findOne({user:userId , name:name , });
            if(!holding || holding.qty < qty){
                return res.status(400).json({ msg: "Not enough holdings to sell" });
            }
            else{
                // proceed with sell order
                
                order.statusType = "pending";
                await order.save();
                return res.json({ msg: "Limit sell order placed", order , user});
            }
        }
        if(productType === "MIS"){
            const position = await positionModel.findOne({user:userId , name:name});
            if(!position || position.qty < qty){
                return res.status(400).json({ msg: "Not enough positions to sell" });
            }else{
                // proceed with sell order
                order.statusType = "pending";
                await order.save();
                return res.json({ msg: "Limit sell order placed", order , user});
            }
        }
        }
    

};







module.exports.buyPendingOrder = async (req , res) => {
  
     
      const orderId = req.params.orderId;
      const order = await orderModel.findById(orderId);
  
      if(!order) return res.status(404).json({ msg: "Order not found" });

      if (order.statusType !== "pending") {
          return res.json({ msg: "Order already executed", order });
      }

      let stock = watchlist.find((s) => s.name === order.name);
      if(!stock) return res.status(400).json({ msg: "Stock not found" });




      const user = await User.findById(order.user);
      if(!order){
          return res.status(404).json({msg:"Order not found"});
      }
      else{
        order.statusType = "executed";
        user.availCash  =  user.availCash - order.blockedMargin;
        user.marginUsed -= order.blockedMargin;
        order.blockedMargin = 0; // reset the blocked margin
        await user.save();
        await order.save();

        if(order.productType === "CNC"){
            const holding = new holdingModel({
              name: order.name,
              qty: order.qty,
              price: order.price,    // curent stock price ye ui me change to hota hi rahega 
              user: user._id,
              avg: order.limitPrice,       // at this price user stock kharidta hai
            });
             
            
            await holding.save();
            await user.save();
        }
        else{
            const position = new positionModel({
              product : "MIS",
              name: order.name,
              qty: order.qty,
              price: order.price,
              user: user._id,
              avg: order.limitPrice,
            });
            await position.save();
          
        }
        return res.json({msg:"Pending buy order executed" , order , user});
      }
  

}


module.exports.sellPendingOrder = async (req , res) => {
    
        const orderId = req.params.orderId;
        const order = await orderModel.findById(orderId);
        let {currPrice} = req.body;
        console.log("Current price for sell pending order:", currPrice);

        if (order.statusType !== "pending") {
            return res.json({ msg: "Order already executed", order });
        }

        let stock = watchlist.find((s) => s.name === order.name);
        if(!stock) return res.status(400).json({ msg: "Stock not found" });

        const user = await User.findById(order.user);

        if(!order) return res.status(404).json({ msg: "Order not found" });
        else{
          order.statusType = "executed";
          await order.save();
          if(order.productType === "CNC"){
              const holding = await holdingModel.findOne({user:user._id , name:order.name});
              if(!holding || holding.qty < order.qty){
                  return res.status(400).json({ msg: "Not enough holdings to sell" });
              }
              else{
                  holding.qty  =  holding.qty - order.qty;
                  if(holding.qty === 0){
                      await holdingModel.deleteOne({_id:holding._id});
                  }
                  if(holding.qty > 0) await holding.save();
                  user.availCash += currPrice * order.qty; // add cash to user account on sell
                  await user.save();
                  return res.json({ msg: "Pending sell order executed", order , user}); 
                }
              }
              else{
                  const position = await positionModel.findOne({user:user._id , name:order.name});
                  if(!position || position.qty < order.qty){
                      return res.status(400).json({ msg: "Not enough positions to sell" });
                  }
                  else{
                      position.qty  =  position.qty - order.qty; 
                      let oldAvg = position.avg;
                      if(position.qty === 0){
                          await positionModel.deleteOne({_id:position._id});
                      }
                      if(position.qty > 0) await position.save();
                      
                      user.availCash += stock.marginRequired.MIS + (currPrice - oldAvg)*order.qty; // add pnl to user account on sell
                      await user.save();
                      return res.json({ msg: "Pending sell order executed", order , user}); 
                    }
              }
          }
  
}


module.exports.allOrders = async (req , res)=>{
  // const userId = req.user.userId;
  const userId = req.user._id;
  let allOrders = await orderModel.find({user:userId});
  res.json(allOrders);
  
  
}