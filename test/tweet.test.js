require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({ handle: 'blah', text: 'blah' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'blah',
          text: 'blah',
          __v: 0
        });
      });
  });

  it('can create a random jargon tweet', () => {
    return request(app)
      .post('/api/v1/tweets?random=true')
      .send({ handle: 'blah', text: 'blah' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'blah',
          text: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all tweets', async() => {
    const tweet = await Tweet.create({ handle: 'blah', text: 'blah' });

    return request(app)
      .get('/api/v1/tweets')
      .then(res => {
        const tweetJSON = JSON.parse(JSON.stringify(tweet));
        expect(res.body).toEqual([tweetJSON]);
      });
  });

  it('gets a tweet by id', async() => {
    const tweet = await Tweet.create({ handle: 'blah', text: 'blah' });

    return request(app)
      .get(`/api/v1/tweets/${tweet._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'blah',
          text: 'blah',
          __v: 0
        });
      });
  });

  it('can update the text of a tweet', async() => {
    const tweet = await Tweet.create({ handle: 'ahh', text: 'ahhh' });

    return request(app)
      .patch(`/api/v1/tweets/${tweet._id}`)
      .send({ text: 'feck' })
      .then(res => {
        expect(res.body.text).toEqual('feck');
      });
  });

  it('can delete a tweet', async() => {
    const tweet = await Tweet.create({ handle: 'ahh', text: 'ahh' });

    return request(app)
      .delete(`/api/v1/tweets/${tweet._id}`)
      .then(res => {
        const tweetJSON = JSON.parse(JSON.stringify(tweet));
        expect(res.body).toEqual(tweetJSON);
      });
  });
});
