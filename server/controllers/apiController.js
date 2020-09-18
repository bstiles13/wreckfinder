const Wreck = require('../models/wreck');

module.exports = {
  getWrecks: async (req, res) => {
    console.log('GET wrecks request');
    try {
      const data = await Wreck.find({});
      res.send(data);
    } catch (err) {
      res.sendStatus(400);
    }
  }
};
