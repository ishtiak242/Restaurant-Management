var mongoose = require('mongoose');  

var OrderSchema = new mongoose.Schema({
    order_description: {
        type: String,
        required: true,
        lowercase: true
        },
    foodDetails:[
        {type: Schema.Types.ObjectId, ref: 'Food_menu'}
      ],
    userDetails:[
        {type: Schema.Types.ObjectId, ref: 'User'}
      ]
});
mongoose.model('Order', OrderSchema);

module.exports = mongoose.model('Order');