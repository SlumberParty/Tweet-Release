const { Router } = require('express');
const randomJargon = require('../middleware/jargon');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', randomJargon, (req, res, next) => {
    const {
      handle,
      text
    } = req.body;

    const {
      random
    } = req.query;

    if(random) {
      Tweet
        .create({ handle, text: req.jargon })
        .then(tweet => {
          res.send(tweet);
        })
        .catch(next);
    } else {
      Tweet
        .create({ handle, text })
        .then(tweet => {
          res.send(tweet);
        })
        .catch(next);
    }
  })

  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Tweet
      .findById(req.params.id)
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const {
      text
    } = req.body;

    Tweet
      .findByIdAndUpdate(req.params.id, { text }, { new: true })
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Tweet
      .findByIdAndDelete(req.params.id)
      .then(tweet => res.send(tweet))
      .catch(next);
  });
