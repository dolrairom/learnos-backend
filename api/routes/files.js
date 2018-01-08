const express = require('express');
const router = express.Router();

var mongodb = require('mongodb').MongoClient;
var url = "mongodb://admin:admin@ds129386.mlab.com:29386/learnos";


//Cambiar forma de recoger el archivo, no se recoge del body de esa forma, al menos no desde Postman
//boolean true si se guarda
router.post('/', (req, res, next) => {
  var inserted = true;
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('learnos');
    db.collection('files').insertOne(body.req.file, function(err, result) {
      if(err){
        console.error('Error: Unable to store file with error: ', err);
        inserted = false;
      }
      res.status(200).json(inserted);
      client.close();
    });
  });
});


router.get('/:name', (req, res, next) => {
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('learnos');
    var existedUser = db.collection('files').findOne({ filename: req.params.name }, function (err, posts) {
      if (err) {
        res.status(500).json(err);
      }
      else {
        if(posts == null){
          console.log('File not found');
        }
        else {
          console.log('file found');
        }
        res.status(200).json(posts);
      }
    });
    client.close();
  });
});


module.exports = router;
