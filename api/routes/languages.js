const express = require('express');
const router = express.Router();

var mongodb = require('mongodb').MongoClient;
var url = "mongodb://admin:admin@ds129386.mlab.com:29386/learnos";


//Add a new level/language to a user
router.post('/', (req, res, next) => {
  const newLanguage = {
    language_name: req.body.language,
    description: req.body.description
  };
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    //var collection = db.collection('users');
    var db = client.db('learnos');
    db.collection('levels').update(
      {},
      {
        '$set': {
          language_name:"1"
        }
      },
      { upsert: false },
      { multi: true }
    );

    db.collection('languages').insertOne(newLanguage, function(err, result) {
      if(err){
        console.error('Error: Unable to store new language with error: ', err);
        res.status(500).send(false);
      }
      else{
        res.status(200).json(true);
        client.close();
      }
    });
  });
});


//Obtains the language/level depending on the id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  if(id === 'guay') {
    res.status(200).json({
      message: 'You discovered the ID',
      id: id
    });
  }
  else {
    res.status(200).json({
      message: 'You passed the ID'
    });
  }
});

//Updates a language's level given an id
router.patch('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Language updated'
  });
});

module.exports = router;
