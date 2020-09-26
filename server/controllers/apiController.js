const Wreck = require('../models/wreck');
const { get, isEmpty, slice } = require('lodash');
const axios = require('axios');
const { mapArticles } = require('../utils/articleHelper');

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

    const { query } = req.query;

    console.log('query', query);

    let wikiURL = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=info|pageimages|extracts&generator=allpages&inprop=url&gaplimit=10&exlimit=max&explaintext&exintro&gapfrom=${encodeURIComponent(query)}`;
    let nytURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=G7VeD2V5EoQQUNHeQXvtaGgrRjtONHcB&q=${encodeURIComponent(query)}`;
    let locURL = `https://www.loc.gov/pictures/search/?fo=json&q=${encodeURIComponent(query)}`;

    try {
      const wikiResponse = await axios.get(wikiURL);
      console.log('WIKI', wikiResponse);
      const nytResponse = await axios.get(nytURL);
      const locResponse = await axios.get(locURL);

      const articles = {};

      if (!isEmpty(get(wikiResponse, 'data.query.pages'))) {
        const wikiArticles = slice(Object.values(wikiResponse.data.query.pages), 1);
        articles['wikipedia'] = mapArticles({
          articles: wikiArticles,
          urlKey: 'fullurl',
          titleKey: 'title',
          descriptionKey: 'extract',
          imgKey: 'thumbnail.source'
        });
      }

      if (!isEmpty(get(nytResponse, 'data.response.docs'))) {
        articles['newYorkTimes'] = mapArticles({
          articles: nytResponse.data.response.docs,
          urlKey: 'web_url',
          titleKey: 'headline.main',
          descriptionKey: 'abstract',
          imgKey: 'multimedia.0.url',
          imgPrefix: 'https://www.nytimes.com/'
        });
      }

      if (!isEmpty(get(locResponse, 'data.results'))) {
        articles['libraryOfCongress'] = mapArticles({
          articles: locResponse.data.results,
          urlKey: 'links.item',
          titleKey: 'title',
          descriptionKey: 'extract',
          imgKey: 'image.full'
        });
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
