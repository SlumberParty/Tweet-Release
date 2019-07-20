require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

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
      .post('api/v1/tweets')
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
});
