const express = require('express');
const router = express.Router();
//const mongo = require('mongodb').MongoClient;
const assert = require('assert');

var mongodb = require('mongodb').MongoClient;
var url = "mongodb://admin:admin@ds129386.mlab.com:29386/learnos";
//var url = 'mongodb://localhost';

var bcrypt = require('bcrypt');


router.post('/', (req, res, next) => {
  var user = {
    email: req.body.email,
    _id: req.body.username,
    password: req.body.password,
    starter: "true"
  };
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('learnos');
    db.collection('users').insertOne(user, function(err, result) {
      if(err){
        console.error('Error: Unable to store user with error: ', err);
        res.status(500).send('Error: Unable to store user with error: ');
      }
      else{
        req.session.name = req.body.username;
        res.status(200).json(true);
        client.close();
      }
    });
  });
});


router.get('/:id/:password', (req, res, next) => {
  var state = "exists";
  var found;
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('learnos');
    var existedUser = db.collection('users').findOne({ _id: req.params.id }, function (err, posts) {
      if (err) {
        res.status(500).json(err);
      }
      else {
        if(posts == null){
          state = "noexists";
        }
        else {
          bcrypt.compare(req.params.password, posts.password, function (err, isMatch) {
            if (err) {
              res.status(500).json(err);
            }
            else {
              if((posts._id == req.params.id) && isMatch) {
                if(posts._id == "admin"){
                  state = "admin";
                }
                else {
                  state = "true";
                }
                req.session.name = req.params.id;
              }
              else {
                state = false;
              }
            }
          });
        }
        res.status(200).json(state);
      }
    });
    client.close();
  });
});



router.patch('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'User updated'
  });
});


router.delete('/', (req, res, next) => {
  req.session.destroy(function(err) {
        if(err){
            console.log("Session impossible to close due to error");
            res.json(false);
        }else{
            console.log("Session closed");;
            res.json(true);
        }
    });
})

module.exports = router;