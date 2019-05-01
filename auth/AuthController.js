var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/models/User');
// user details 
var UserDetail = require('../user/models/UserDetail');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var VerifyToken = require('./VerifyToken');



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

  router.put('/updateUse/:id', (req, res) => {
    UserDetail.findById(req.params.id, (err,user) => {
      .then(user => {
        user.user_type = req.body.user_type
        user.user_name = req.body.user_name
        user.user_gender = req.body.user_gender
        user.user_age = req.body.user_age
        user.user_place = req.body.user_place
        user.user_address = req.body.user_address
        user.user_email = req.body.user_email
        user.user_contract = req.body.user_contract
        return user.save()
      })
      .then(() => {
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
  })


  module.exports = router;