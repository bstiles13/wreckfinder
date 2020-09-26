const { map, get } = require('lodash');

const mapArticles = ({ articles, urlKey, titleKey, descriptionKey, imgKey, imgPrefix = '' }) => {
  return map(articles, article => ({
    url: get(article, urlKey),
    title: get(article, titleKey),
    description: get(article, descriptionKey),
    img: get(article, imgKey) && `${imgPrefix}${get(article, imgKey)}`
  }));
};

module.exports = { mapArticles };
