const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  starter: "true"
});

model.exports = mongoose.model('User', schema);
