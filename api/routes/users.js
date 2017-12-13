const express = require('express');
const router = express.Router();
//const mongo = require('mongodb').MongoClient;
const assert = require('assert');

var mongodb = require('mongodb').MongoClient;
var url = "mongodb://admin:admin@ds129386.mlab.com:29386/learnos";
//var url = 'mongodb://localhost';

/*
//register a user. coger del body username, email y password
//Get '/' para obtener todas las peticiones dirigidas a users.js
router.get('/', (req, res, next) => {
  var encontrado = true;
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    var user {
      id_: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    var db = client.db('learnos');
    var userFound = db.collection('users').findOne(user);
    if(userFound == null){
      encontrado = false;
      res.json(encontrado);
    }
    else {
      res.json(encontrado);
    }
    client.close();
  });
});*/

//quitar email
//Boolean si existe o no
router.post('/', (req, res, next) => {
  var user = {
    email: req.body.email,
    _id: req.body.username,
    password: req.body.password,
    starter: "true"
  };
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    //var collection = db.collection('users');
    var db = client.db('learnos');
    db.collection('users').insertOne(user, function(err, result) {
      if(err){
        console.error('Error: Unable to store user with error: ', err);
        res.status(500).send('Error: Unable to store user with error: ');
      }
      else{
        res.status(200).json({
          message: 'New user created',
          createdUser: user
        });
        console.log('Item inserted');
        client.close();
      }
    });
  });
});

//Devolver boolean si existe
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
          if((posts._id == req.params.id) && (posts.password == req.params.password)) {
            state = true;
          }
          else {
            state = false;
          }
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

module.exports = router;
