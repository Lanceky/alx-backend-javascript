const request = require('request');
const { expect } = require('chai');

describe('Index page', () => {
  const options = {
    url: 'http://localhost:1245',
    method: 'GET',
  };

  it('returns correct status code', (done) => {
    request(options, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('returns correct content', (done) => {
    request(options, (error, response, body) => {
      expect(body).to.equal('Hello ALX!');
      done();
    });
  });

  it('returns correct content for /test', (done) => {
    const testOptions = {
      url: 'http://localhost:1245/test',
      method: 'GET',
    };
    request(testOptions, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Hello ALX!');
      done();
    });
  });
});
