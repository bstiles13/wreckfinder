const Wreck = require('../models/wreck');
const { get } = require('lodash');
const axios = require('axios');

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
  },

  searchArticles: async (req, res) => {
    console.log(`Search articles REQUEST by: ${get(req, 'user.displayName', 'Guest User')}`);

    let wikiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=titanic+shipwreck';
    let nytURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=G7VeD2V5EoQQUNHeQXvtaGgrRjtONHcB&q=' + 'titanic+shipwreck';
    let locURL = 'https://www.loc.gov/pictures/search/?fo=json&q=shipwreck';

    try {
      const wikiResponse = await axios.get(wikiURL);
      const nytResponse = await axios.get(nytURL);
      const locResponse = await axios.get(locURL);

      const articles = {};

      if (get(wikiResponse, 'data.query.pages')) {
        articles['wikipedia'] = wikiResponse.data.query.pages;
      }

      if (get(nytResponse, 'data.response.docs')) {
        articles['newYorkTimes'] = nytResponse.data.response.docs;
      }

      if (get(locResponse, 'data.results')) {
        articles['libraryOfCongress'] = locResponse.data.results;
      }

      res.status(200).send(articles);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 'Failed',
        message: 'Article Query Error',
        data: err
      });
    }
  }
};
