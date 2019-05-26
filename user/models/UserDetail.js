var mongoose = require('mongoose');  

var UserDetails = new mongoose.Schema({ 
    creator: [
        { type: mongoose.Schema.ObjectId, ref: 'User' }
    ],
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
    }
})

// UserDetails.virtual('orders').aggregate([
//     { $lookup:
//        {
//          from: 'Order',
//          localField: 'users',
//          foreignField: '_id',
//          as: 'userdetails'
//        }
//      }
//     ]).toArray(function(err, res) {
//     if (err) throw err;
//     console.log(JSON.stringify(res));
//     UserDetails.close();
//   });

// UserDetails.virtual('orders', {
//     ref: 'Order',
//     localField: 'users',
//     foreignField: 'creator'
//   })

//   UserDetails.pre('find', autoPopulateComments)


// function autoPopulateComments (next) {
//   this.populate('comments', 'body')
//   next()
// }

mongoose.model('UserDetail', UserDetails);

module.exports = mongoose.model('UserDetail');