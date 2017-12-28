const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');

const userRoutes = require('./api/routes/users');
const levelRoutes = require('./api/routes/levels');
const filesRoutes = require('./api/routes/files');
const gameRoutes = require('./api/routes/games');

//const mongoose = require('mongoose');

//mongoose.connect("localhost:27017/mydb");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload());


//Provides access to any client
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json();
  }
  next();
});

//take all the request send to products to the handler
app.use('/users', userRoutes);
app.use('/levels', levelRoutes);
//app.use('/languages', languageRoutes);
app.use('/games', gameRoutes);

//catch all the request that cannot go to users/levels/languages
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
