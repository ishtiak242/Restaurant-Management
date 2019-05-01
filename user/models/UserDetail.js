var mongoose = require('mongoose');  

var UserDetails = new mongoose.Schema({ 
    user_type: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true,
        lowercase: true
        },
    user_gender: {
        type: String,
        required: true
        },
    user_age: {
        type: String,
        required: true
    },
    user_place: {
        type: String,
        required: true
    },
    user_address: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_contract: {
        type: String,
        required: true
    },
});
mongoose.model('UserDetail', UserDetails);

module.exports = mongoose.model('UserDetail');