const Wreck = require('../models/wreck');
const { get } = require('lodash');

module.exports = {
  getWrecks: async (req, res) => {
    console.log(`Get wrecks REQUEST by: ${get(req, 'user.displayName', 'Guest User')}`);
    try {
      const data = await Wreck.find({});
      res.send(data);
    } catch (err) {
      res.sendStatus(400);
    }
  },

  searchRadius: (req, res) => {
    console.log(`Search radius REQUEST by: ${get(req, 'user.displayName', 'Guest User')}`);

    let lng = parseFloat(req.query.lng);
    let lat = parseFloat(req.query.lat);
    let radius = parseInt(req.query.radius) * 1609.34;

    Wreck.find({
      'geometry': {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: radius
        }
      }
    }
    ).limit(100).then(data => {
      res.send(data);
    }).catch(err => {
      return res.status(400).json({
        status: 'Failed',
        message: 'Database Error',
        data: err
      });
    });
  }
};
