const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const holdingModel  = require("../models/holdingModel");
const positionModel = require("../models/postionModel");
const orderModel = require("../models/orderModel");
const orderController = require("../controllers/order");
const {watchlist} = require ("../data/data");
const wrapasync = require("../util/wrapasync");