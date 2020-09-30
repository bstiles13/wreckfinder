const Wreck = require('../models/wreck');
const { get, isEmpty, slice } = require('lodash');
const axios = require('axios');
const { mapArticles } = require('../utils/articleHelper');

module.exports = {
  getWrecks: async (req, res) => {
    console.log(`Get wrecks REQUEST by: ${get(req, 'user.displayName', 'Guest User')}`);
    try {
      const data = await Wreck.find({});

      console.log(`Get wrecks SUCCESS by: ${get(req, 'user.displayName', 'Guest User')}`);

      res.send(data);
    } catch (err) {
      console.log(`Get wrecks ERROR by: ${get(req, 'user.displayName', 'Guest User')}: ${err}`);

      res.sendStatus(400);
    }
  },

  searchWrecks: (req, res) => {
    let query = { $and: [] };
    if (!isEmpty(req.query.description)) {
      query['$and'].push({ '$text': { '$search': req.query.description } });
    };
    if (!isEmpty(req.query.name)) {
      query['$and'].push({ 'properties.name': new RegExp(`${req.query.name}`, 'i') });
    };
    if (!isEmpty(req.query.after) && isEmpty(req.query.before)) {
      query['$and'].push({ '$where': `parseInt(this.properties.yearSunk) > ${req.query.after}` });
    };
    if (!isEmpty(req.query.before) && isEmpty(req.query.after)) {
      query['$and'].push({ '$where': `parseInt(this.properties.yearSunk) < ${req.query.before}` });
    };
    if (!isEmpty(req.query.after) && !isEmpty(req.query.before)) {
      query['$and'].push({ '$where': `parseInt(this.properties.yearSunk) > ${req.query.after} && parseInt(this.properties.yearSunk) < ${req.query.before}` });
    }
    if (req.query.hasName === 'true') {
      query['$and'].push({ 'properties.name': { '$nin': [null, '', 'UNKNOWN', 'UNKNOWN ', 'WRECK', 'WRECK ', 'OBSTRUCTION', 'OBSTRUCTION '] } });
    };
    if (req.query.isVisible === 'true') {
      query['$and'].push({ 'properties.featureType': /visible/i });
    };
    Wreck.find(query).limit(300).then(data => {
      res.json(data);
    }).catch(err => {
      console.log(err);
    });
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
      console.log(`Search radius SUCCESS by: ${get(req, 'user.displayName', 'Guest User')}`);

      res.send(data);
    }).catch(err => {
      console.log(`Search radius ERROR by: ${get(req, 'user.displayName', 'Guest User')}: ${err}`);

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

    let wikiURL = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=info|pageimages|extracts&generator=allpages&inprop=url&gaplimit=10&exlimit=max&explaintext&exintro&gapfrom=${encodeURIComponent(query)}`;
    let nytURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=G7VeD2V5EoQQUNHeQXvtaGgrRjtONHcB&q=${encodeURIComponent(query)}`;
    let locURL = `https://www.loc.gov/pictures/search/?fo=json&q=${encodeURIComponent(query)}`;

    try {
      const wikiResponse = await axios.get(wikiURL);
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

      console.log(`Search articles SUCCESS by: ${get(req, 'user.displayName', 'Guest User')}`);

      res.status(200).send(articles);
    } catch (err) {
      console.log(`Search articles ERROR by: ${get(req, 'user.displayName', 'Guest User')}: ${err}`);
      return res.status(400).json({
        status: 'Failed',
        message: 'Article Query Error',
        data: err
      });
    }
  }
};
