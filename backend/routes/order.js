const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const holdingModel  = require("../models/holdingModel");
const positionModel = require("../models/postionModel");
const orderModel = require("../models/orderModel");
const orderController = require("../controllers/order");
const {watchlist} = require ("../data/data");
const wrapasync = require("../util/wrapasync");
const {getUser} = require("../middleware/verify");


router.post("/newOrder/buy" ,getUser, wrapasync(orderController.byuOrder));

router.post("/newOrder/sell" ,getUser, wrapasync(orderController.sellOrder));

router.post("/buyPendingOrder/:orderId" ,getUser, wrapasync(orderController.buyPendingOrder));

router.post("/sellPendingOrder/:orderId" , getUser, wrapasync(orderController.sellPendingOrder));

router.get("/allOrders"  , getUser, wrapasync(orderController.allOrders))


module.exports = router;


