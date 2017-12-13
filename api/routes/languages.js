const express = require('express');
const router = express.Router();

var mongodb = require('mongodb').MongoClient;
var url = "mongodb://admin:admin@ds129386.mlab.com:29386/learnos";

//Get '/' para obtener todas las peticiones dirigidas a languages.js
/*router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET in languages'
  });
});*/

//Add a new level/language to a user
router.post('/', (req, res, next) => {
  const newLanguage = {
    language_name: req.body.language,
    current_level: req.body.level,
    id_user: req.body.id
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
          message: 'New language/level passed',
          newLanguage: newLanguage
        });
        console.log('Item inserted');
        client.close();
      }
    });
  });
});

/*
//Add a new level/language to a user
router.post('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'New language/level passed'
  });
});
*/

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
