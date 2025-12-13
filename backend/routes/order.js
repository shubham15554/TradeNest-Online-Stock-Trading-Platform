const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const holdingModel  = require("../models/holdingModel");
const positionModel = require("../models/postionModel");
const orderModel = require("../models/orderModel");
const orderController = require("../controllers/order");
const {watchlist} = require ("../data/data");
const wrapasync = require("../util/wrapasync");
const {verify} = require("../middleware/verify");


router.post("/newOrder/buy" ,verify, wrapasync(orderController.byuOrder));

router.post("/newOrder/sell" ,verify, wrapasync(orderController.sellOrder));

router.post("/buyPendingOrder/:orderId" ,verify, wrapasync(orderController.buyPendingOrder));

router.post("/sellPendingOrder/:orderId" , verify, wrapasync(orderController.sellPendingOrder));

router.get("/allOrders"  , verify, wrapasync(orderController.allOrders))


module.exports = router;


