const randomJargon = require('../services/jargonApi');

module.exports = (req, res, next) => {
  randomJargon()
    .then(jargon => {
      req.jargon = jargon.phrase;
      next();
    });
};
