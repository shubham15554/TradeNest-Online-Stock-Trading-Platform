const {Schema} = require("mongoose");

const holdingSchema = new Schema({
  name: String,
  qty: Number,
  avg: Number,   // average price
  price: Number,    /// last traded price
  net: String,   
  day: String,   
  isLoss: Boolean, 
  orderType: String,
  user: {                // kis user ne order place kiya
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
});


module.exports = holdingSchema;