const express = require('express');
const router = express.Router();
const multer = require('multer');

var mongodb = require('mongodb').MongoClient;
var url = "mongodb://admin:admin@ds129386.mlab.com:29386/learnos";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.filename);
  }
});

const upload = multer({storage: storage});


router.post('/', upload.single('fileUpload'), (req, res, next) => {
  console.log(req.files);
  //res.status(200).send(req.files);
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('learnos');
    db.collection('files').insertOne(req.body.formData, function(err, result) {
      if(err){
        console.error('Error: Unable to store file with error: ', err);
        res.status(200).json(false);
      }
      else {
        res.status(200).json(true);
      }
    //  res.status(200).json(inserted);
      client.close();
    });
  });
});


/*
//Cambiar forma de recoger el archivo, no se recoge del body de esa forma, al menos no desde Postman
//boolean true si se guarda
router.post('/', (req, res, next) => {
  var inserted = true;
  console.log("name:" +req.file);


  res.status(200).send(req.files);

  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('learnos');
    db.collection('files').insertOne(req.file, function(err, result) {
      if(err){
        console.error('Error: Unable to store file with error: ', err);
        inserted = false;
      }
      res.status(200).json(inserted);
      client.close();
    });
  });
});
*/
/*
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
*/

//Obtains all the languages availables
router.get('/', (req, res, next) => {
  mongodb.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('learnos');

    db.collection('files').find({}).toArray(function(err, files) {
            res.status(200).send(files);
            console.log(JSON.stringify(files, null, 2));
        });

    client.close();
  });
});




module.exports = router;
