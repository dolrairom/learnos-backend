const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const Binary = require('mongodb').Binary;

var mongodb = require('mongodb').MongoClient;
var url = "mongodb://admin:admin@ds129386.mlab.com:29386/learnos";

var mongoose = require('mongoose');
mongoose.connect("mongodb://admin:admin@ds129386.mlab.com:29386/learnos");

let Grid = require("gridfs-stream");
let conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;

conn.once("open", () => {
    gfs = Grid(conn.db);

    router.get('/:username', (req, res) => {
      let username = req.params.username;
        gfs.files.find({
            aliases: username
        }).toArray((err, files) => {

            if (files.length === 0) {
                return res.status(404).send({
                    message: 'File not found'
                });
            }
            let data = [];
            let readstream = gfs.createReadStream({
                filename: files[0].filename
            });

            readstream.on('data', (chunk) => {
                data.push(chunk);
            });

            readstream.on('end', () => {
                data = Buffer.concat(data);
                let img = 'data:image/png;base64,' + Buffer(data).toString('base64');
                res.end(img);
            });

            readstream.on('error', (err) => {
              // if theres an error, respond with a status of 500
              // responds should be sent, otherwise the users will be kept waiting
              // until Connection Time out
                res.status(500).send(err);
                console.log('An error occurred!', err);
            });
        });
    });
    router.post('/:username', (req, res) => {
        mongodb.connect(url, function (err, client) {
          if (err) throw err;
          var db = client.db('learnos');
          db.collection('fs.files').findOne({ aliases: req.params.username }, function (err, posts) {
            if (err) {
              res.status(500).json(err);
            }
            else {
              if(posts != null){ //an old image exists
                /*console.log("deleting image");
                db.collection('fs.files').remove({
                  aliases: req.params.username
                })*/
                db.collection('fs.files').update(
                  { aliases: req.params.username },
                  {
                    $set:{
                      aliases: "deprecated"
                    }
                  },
                  { upsert: true }
                );
                console.log("deleting image");
                db.collection('fs.files').remove({
                  aliases: "deprecated"
                });
              }
            }
          })
          /*
          db.collection('fs.files').remove({ aliases: req.params.username, uploadDate: {$lt : isodate }});
          */
        });

        var username = req.params.username;
        let part = req.files.file;
        let writeStream = gfs.createWriteStream({
            filename: 'img_' + part.name,
            mode: 'w',
            aliases: username,
            content_type: part.mimetype
        });


        writeStream.on('close', (file) => {
          // checking for file
          if(!file) {
            res.status(400).send('No file received');
          }

            return res.status(200).send({
                message: 'Success',
                file: file
            });
            client.close();
        });
        // using callbacks is important !
        // writeStream should end the operation once all data is written to the DB
        writeStream.write(part.data, () => {
          console.log("storing new image");
          writeStream.end();
        });
    });
});



module.exports = router;
