var mongoose = require('mongoose');  

var OrderSchema = new mongoose.Schema({
  order_tittle: {
    type: String,
    required: true,
    lowercase: true
  },
  order_description: {
      type: String,
      required: true,
      lowercase: true
  },
  users: [
    { type: mongoose.Schema.ObjectId, ref: 'Order' }
    ]
});
module.exports = mongoose.model('Order', OrderSchema);