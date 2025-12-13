
const  {model} = require("mongoose");

const holdingSchema = require("../schemas/holdingSchema");


const holdingModel =  model("holding" , holdingSchema);


module.exports = holdingModel;