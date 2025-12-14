const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const {createSecretToken} = require("../util/token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const wrapasync = require("../util/wrapasync");
const {verify} = require("../middleware/verify");

const userController = require("../controllers/user");
router.post("/signup" , wrapasync(userController.signup));

router.post("/login" , wrapasync(userController.login));

router.post("/logout" , userController.logout);

router.post("/:id/addFund" , wrapasync(userController.addFund));



module.exports = router;