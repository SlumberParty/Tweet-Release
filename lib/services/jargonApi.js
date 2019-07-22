const request = require('superagent');

function randomJargon() {
  return request
    .get('https://corporatebs-generator.sameerkumar.website/')
    .then(res => res.body);
}

module.exports = { randomJargon };
