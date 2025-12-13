

const {Schema} = require("mongoose");

const orderSchema = new Schema({

    name: String,
    qty: Number,
    price: Number,
    mode: String,        // buy or sell
    orderType: String,   // market or limit
    productType: String,  // CNC or MIS
    statusType :{
        type : String,
        default: "pending"
    },
    user: {                // kis user ne order place kiya
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  blockedMargin: Number,   // us order ke liye kitna paisa block hua hai
  limitPrice: {
    type: Number,
    
  }  // kiten pr mai limit order place kiya hai ya kharidna chata hu
});

module.exports = {orderSchema};
