const express = require('express');
const router = express.Router();

var mongodb = require('mongodb').MongoClient;
var url = "mongodb://admin:admin@ds129386.mlab.com:29386/learnos";


router.post('/', (req, res, next) => {
  const game = {
    language: req.body.language,
    level: req.body.level,
    options: req.body.options,
    info: req.body.info,
    wording: req.body.wording,
    question: req.body.question,
    answer: req.body.answer
  };
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    //var collection = db.collection('users');
    var db = client.db('learnos');
    db.collection('games').insertOne(game, function(err, result) {
      if(err){
        console.error('Error: Unable to store user with error: ', err);
        res.status(500).send('Error: Unable to store user with error: ');
      }
      else{
        res.status(200).json(true);
        console.log('New level/game created');
        client.close();
      }
    });
  });
});

//obtener mas de un parametro de url
// router.get('/:')
router.get('/:language/:level', (req, res, next) => {
  const language = req.params.language;
  const level = req.params.level;

  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('learnos');

    var cursorGame = db.collection('games').findOne({ $and:[
      { language: language },
      { level: level }
    ]}, function (err, posts) {
      if (err) {
        res.status(500).json(err);
      }
      else {
        var game = {
          language: posts.language,
          level: posts.level,
          options: posts.options,
          info: posts.info,
          wording: posts.wording,
          question: posts.question,
          answer: posts.answer
        }
        res.status(200).json(game);
      }
      client.close();
    });
  });
});


module.exports = router;
