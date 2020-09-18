const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
  displayName: String,
  id: String
});

module.exports = mongoose.model('user', User);
