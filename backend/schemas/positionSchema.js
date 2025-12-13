

const {Schema} = require("mongoose");

const positionSchema = new Schema({
 
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    isLoss: Boolean,
    user: {                // kis user ne order place kiya
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
   
})

module.exports = positionSchema;