const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    fooditem:{
        type:String,
        required:true,
        unique:true
    },
    quantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:true
    },
    pic:{
        type:String
    }
});

const food = mongoose.model('food',foodSchema);

module.exports = food;