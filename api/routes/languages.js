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


//Obtains all the languages availables
router.get('/', (req, res, next) => {
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('learnos');
    /*
    var myCursor = db.collection('languages').find();
    var myDocument = myCursor.hasNext() ? myCursor.next() : null;
    if (myDocument) {
        res.status(200).send('ok');
        printjson(myDocument.language_name);
    }
    */

    db.collection('allLanguages').find({}).toArray(function(err, languages) {
            res.status(200).send(languages);
            console.log(JSON.stringify(languages, null, 2));
        });

    client.close();
  });
});

//Obtains the language/level depending on the id
router.get('/index', (req, res, next) => {
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('learnos');

    db.collection('languages').find({}, { _id: false }).toArray(function(err, languages) {
            res.status(200).send(languages);
            console.log(JSON.stringify(languages, null, 2));
        });

    client.close();
  });
});



module.exports = router;
