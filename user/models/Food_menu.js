var mongoose = require('mongoose');  

var FoodMenu = new mongoose.Schema({  
    food_tittle: {
        type: String,
        required: true,
        lowercase: true
        },
    food_description: {
        type: String,
        required: true,
        lowercase: true
        },
    food_prize_One: {
        type: String,
        required: true
    },
    food_prize_Two: {
        type: String,
        required: true
    },
    food_prize_Three: {
        type: String,
        required: true
    },
    food_prize_Four: {
        type: String,
        required: true
    },
    food_prize_Five: {
        type: String,
        required: true
    },
    food_prize_Six: {
        type: String,
        required: true
    },
    food_prize_Seven: {
        type: String,
        required: true
    }
    // foodDetails:{
    //     type: String,
    //     ref: 'Order',
    //     required: true
    // }
});
mongoose.model('Food_menu', FoodMenu);

module.exports = mongoose.model('Food_menu');