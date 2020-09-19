const User = require('../models/user');
const Wreck = require('../models/wreck');
const { get } = require('lodash');

module.exports = {
  getFavorites: async (req, res) => {
    console.log(`Get favorites REQUEST by ${req.user.displayName}`);
    User.findById(req.user._id)
      .then((user) => {
        Wreck.find({ _id: { $in: get(user, 'favorites', []) } })
          .then((favorites) => {
            console.log(`Get favorites SUCCESS by ${req.user.displayName}`);
            return res.status(200).send(favorites);
          })
          .catch((error) => {
            console.log(`Get favorites ERROR by ${req.user.displayName}`);
            return res.status(500).json({
              status: 'Failed',
              message: 'Database Error',
              data: error
            });
          });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 'Failed',
          message: 'Database Error',
          data: error
        });
      });
  },

  createFavorite: async (req, res) => {
    console.log(`Create favorite REQUEST by ${req.user.displayName}: ${req.body.id}`);
    User.findOneAndUpdate(
      { '_id': req.user._id },
      { '$push': { 'favorites': req.body.id } },
      { new: true, safe: true, upsert: true }
    )
      .then((result) => {
        return res.status(201).json({
          status: 'Success',
          message: 'Resources Are Created Successfully',
          data: result
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 'Failed',
          message: 'Database Error',
          data: error
        });
      });
  },

  deleteFavorite: async (req, res) => {
    console.log(`Delete favorite REQUEST by ${req.user.displayName}: ${req.body.id} `);
    User.findOneAndUpdate(
      { '_id': req.user._id },
      { '$pull': { 'favorites': req.body.id } },
      { new: true, safe: true, upsert: true }
    )
      .then((result) => {
        return res.status(200).json({
          status: 'Success',
          message: 'Resources Were Deleted Successfully',
          data: result
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: 'Failed',
          message: 'Database Error',
          data: error
        });
      });
  }
};
