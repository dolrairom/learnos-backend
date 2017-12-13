const express = require('express');
const router = express.Router();

var mongodb = require('mongodb').MongoClient;
var url = "mongodb://admin:admin@ds129386.mlab.com:29386/learnos";

//Assigns levels to the new user.
router.post('/:id', (req, res, next) => {
  const levelsAssigned = {
    _id: req.params.id,
    c: "1",
    java: "1",
    python: "1",
  };
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    //var collection = db.collection('users');
    var db = client.db('learnos');
    db.collection('levels').insertOne(levelsAssigned, function(err, result) {
      if(err){
        console.error('Error: Unable to store levels into user with error: ', err);
        res.status(500).send('Error: Unable to store levels into user with error: ');
      }
      else{
        res.status(200).json(true);
        console.log('Item inserted');
        client.close();
      }
    });
  });
});


//Updates the level of the user once it passes it.
router.patch('/:id/:language/:level', (req, res, next) => {
  var state = false;
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    var WriteResult;
    var db = client.db('learnos');
    if(req.params.language == "c"){
      WriteResult = db.collection('levels').update(
        { _id: req.params.id },
        {
          $set:{
            c: req.params.level
          }
        },
        { upsert: true }
      );
    }
    else if(req.params.language == "java"){
      WriteResult = db.collection('levels').update(
        { _id: req.params.id },
        {
          $set:{
            java: req.params.level
          }
        },
        { upsert: true }
      );
    }
    else if(req.params.language == "python") {
      WriteResult = db.collection('levels').update(
        { _id: req.params.id },
        {
          $set:{
            python: req.params.level
          }
        },
        { upsert: true }
      );
    }
    if(!WriteResult.writeConcernError){
      state = true;
      res.status(200).json(state);
    }
    client.close();
  });
});

module.exports = router;
