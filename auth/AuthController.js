var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/models/User');
// user details 
var UserDetail = require('../user/models/UserDetail');
var FoodDetailes = require('../user/models/Food_menu')
var OrderDetailes = require('../user/models/Order')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var VerifyToken = require('./VerifyToken');
var mongoose = require('mongoose');  



router.post('/register', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
  
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
  
      res.status(200).send({ auth: true, token: token });
    }); 
  });




  router.get('/me', VerifyToken, function(req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
    });

  });


  router.post('/login', function(req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
  
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
  
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
  
      res.status(200).send({ auth: true, token: token });
    });
  
  });



  router.get('/logout', (req, res) => {
      res.status(200).send({auth: false, token: null})
  })







  // user details post route

  router.post('/userdetails', (req, res) => {
    UserDetail.create({
      user_type : req.body.user_type,
      user_name : req.body.user_name,
      user_gender : req.body.user_gender,
      user_age : req.body.user_age,
      user_place : req.body.user_place,
      user_address : req.body.user_address,
      user_email : req.body.user_email,
      user_contract : req.body.user_contract
    }).then(() => {
          res.status(201).json({
          success: true,
          message: "User Profile Post Successful",
         })
      })
      .catch(err => {
        console.log(err);
         res.json({
           success: false,
           message: "User Post Failed",
           message: err,
         })
       })
  })


  // user details get route

  router.get('/getuser/:id', (req, res) => {
    UserDetail.findById(req.params.id, (err, user) => {
      if (err) return res.status(500).send("There was a problem finding the user.");
      else return res.status(200).send(user)
    })
  })

   // user details update route

  router.put('/updateUser/:id', (req, res) => {
    var newuser = new UserDetail({
      user_type : req.body.user_type,
      user_name : req.body.user_name,
      user_gender : req.body.user_gender,
      user_age : req.body.user_age,
      user_place : req.body.user_place,
      user_address : req.body.user_address,
      user_email : req.body.user_email,
      user_contract : req.body.user_contract
    })
    UserDetail.findByIdAndUpdate(req.params.id, {
      user_type : req.body.user_type,
      user_name : req.body.user_name,
      user_gender : req.body.user_gender,
      user_age : req.body.user_age,
      user_place : req.body.user_place,
      user_address : req.body.user_address,
      user_email : req.body.user_email,
      user_contract : req.body.user_contract
    }, newuser, (err,user) => {
      if (err) return res.status(500).send("There was a problem finding the user.");
      else return res.status(200).send("Update successful")
    })
  })

  // user details delete route

  router.delete('/delete/:id', (req, res) => {
    UserDetail.findByIdAndRemove(req.params.id, (err,user) => {
      console.log(req.params.id)
      if(err) return res.status(500).send("There was a problem finding the user!!!")
      else return res.json(user)
    })
  })






  // food_menu details post route

router.post('/addfoodmenu', (req,res) => {
  FoodDetailes.create({
    food_tittle: req.body.food_tittle,
    food_description: req.body.food_description,
    food_prize_One: req.body.food_prize_One,
    food_prize_Two: req.body.food_prize_Two,
    food_prize_Three: req.body.food_prize_Three,
    food_prize_Four: req.body.food_prize_Four,
    food_prize_Five: req.body.food_prize_Five,
    food_prize_Six: req.body.food_prize_Six,
    food_prize_Seven: req.body.food_prize_Seven
  }).then(() => {
    res.status(201).json({
      success: true,
      message: "Food detailes Post Successful",
     })
  })
    .catch(err => {
    console.log(err);
    res.json({
      success: false,
      message: "Food detailes Post Failed",
      message: err,
     })
  })
})

 // food_menu details get route

router.get('/getfoodmenu/:id', (req,res) => {
  FoodDetailes.findById(req.params.id, (err,foodDetailes) => {
    if(err) return res.status(500).send("There is problem fo getting")
    else return res.status(200).send(foodDetailes)
  })
})

 // food_menu details update route

router.put('/updatefood/:id', (req,res) => {
  var newfoodDetailes = new FoodDetailes({
    food_tittle: req.body.food_tittle,
    food_description: req.body.food_description,
    food_prize_One: req.body.food_prize_One,
    food_prize_Two: req.body.food_prize_Two,
    food_prize_Three: req.body.food_prize_Three,
    food_prize_Four: req.body.food_prize_Four,
    food_prize_Five: req.body.food_prize_Five,
    food_prize_Six: req.body.food_prize_Six,
    food_prize_Seven: req.body.food_prize_Seven
  })
  FoodDetailes.findByIdAndUpdate(req.params.id, {
    food_tittle: req.body.food_tittle,
    food_description: req.body.food_description,
    food_prize_One: req.body.food_prize_One,
    food_prize_Two: req.body.food_prize_Two,
    food_prize_Three: req.body.food_prize_Three,
    food_prize_Four: req.body.food_prize_Four,
    food_prize_Five: req.body.food_prize_Five,
    food_prize_Six: req.body.food_prize_Six,
    food_prize_Seven: req.body.food_prize_Seven
  }, newfoodDetailes, (err,foodDetailes) => {
    if(err) return res.status(500).send("There is problem fo getting")
    else return res.status(200).send(foodDetailes)
  })
})

 // food_menu details delete route

router.delete('/deletefoodmenu/:id', (req,res) => {
  FoodDetailes.findByIdAndRemove(req.params.id, (err,foodDetailes) => {
    if(err) return res.status(500).send("There is problem fo getting")
    else return res.status(200).send("deleted successful")
  })
})




 // order details post route

router.post('/addorder' ,(req,res) => {
  var userDetails = new UserDetail({
        _id: new mongoose.Types.ObjectId(),
        user_type: req.body.user_type,
        user_name: req.body.user_name,
        user_gender: req.body.user_gender,
        user_age: req.body.user_age,
        user_address: req.body.user_address,
        user_email: req.body.user_email,
        user_contract: req.body.user_contract
      })
  OrderDetailes.create({
    order_tittle: req.body.order_tittle,
    order_description: req.body.order_description,
    users: req.body.creator 
  })
  .then((result) => {
    res.status(201).json({
      success: true,
      message: "Food detailes Post Successful",
      data: result
     })
  })
  .then(() => {
    res.status(201).json({
      success: true,
      message: "Food detailes Post Successful",
     })
  })
    .catch(err => {
    console.log(err);
    res.json({
      success: false,
      message: "Food detailes Post Failed",
      message: err,
     })
  })
})

 // order details get route

//  router.get('/getOrder/:id', (req,res) => {
//   var userDetails = new UserDetail({
//     _id: new mongoose.Types.ObjectId(),
//     user_type: req.body.user_type,
//     user_name: req.body.user_name,
//     user_gender: req.body.user_gender,
//     user_age: req.body.user_age,
//     user_address: req.body.user_address,
//     user_email: req.body.user_email,
//     user_contract: req.body.user_contract
//   })
//   OrderDetailes.findById(req.params.id, userDetails, (err,orderDetailes) => {
//     if(err) return res.status(500).send("There is problem fo getting")
//     else return res.status(200).send(orderDetailes)
//   })
// })

//  // order details update route

//  router.put('/updateorder/:id', (req,res) => {
//   var neworder = new OrderDetailes({
//     order_description: req.body.order_description,
//     foodDetails: req.body.foodDetails,
//     userDetails: req.body.userDetails
    
//   })
//   OrderDetailes.findByIdAndUpdate(req.params.id, {
//     order_description: req.body.order_description,
//     foodDetails: req.body.foodDetails,
//     userDetails: req.body.userDetails
//   }, neworder, (err,orderDetailes) => {
//     if(err) return res.status(500).send("There is problem fo getting")
//     else return res.status(200).send(orderDetailes)
//   })
// })

//  // order details delete route

//  router.delete('/deleteorder/:id', (req,res) => {
//   OrderDetailes.findByIdAndRemove(req.params.id, (err,orderDetailes) => {
//     if(err) return res.status(500).send("There is problem fo getting")
//     else return res.status(200).send("deleted successful")
//   })
// })


  module.exports = router;