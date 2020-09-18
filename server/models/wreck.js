const mongoose = require('mongoose');
const { Schema } = mongoose;

const Wreck = new Schema({
  geometry: {},
  properties: {
    name: '',
    history: ''
  }
});

Wreck.index({ geometry: '2dsphere' });
Wreck.index({
  'properties.name': 'text',
  'properties.history': 'text'
});

module.exports = mongoose.model('wreck', Wreck);
