const mongoose = require('mongoose');

const recievedFoodSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    status:{
        type:String,
        enum:["paid","not paid"]
    },
    item:{
        type:String
    },
    quantity:{
        type:Number
    },
    totalAmount:{
        type:Number
    }
});

const recievedFood = mongoose.model("recievedFood",recievedFoodSchema);

module.exports = recievedFood;