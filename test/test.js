var assert = require('chai').assert;
var ogp = require('../lib/ogp.js');
var nock = require('nock');
var fs = require('fs');

buildUp();
describe('ogp module', testOgp);

function buildUp() {
  nock('http://test.com')
    .get('/')
    .reply(500, "<html><head><head><body></body></html>");
}

function testOgp() {
  describe('get500()', get500);
  describe('parseEmptyString()', parseEmptyString);
  describe('parseSimpleOpenGraphData', parseSimpleOpenGraphData);
}

function get500() {
  function handleDone(done) {
    ogp.get('http://test.com', function(err, openGraphData) {
      assert.typeOf(openGraphData, 'object', 'It is an object');
      assert.equal(openGraphData.statusCode, 500);
      done();
    });
  }

  it('should show a 500 and no open graph data when the site gets an error.', handleDone);
}

function parseEmptyString() {
  var result = ogp.parse('');

  function handle() {
    assert.typeOf(result, 'object', 'it is an object');
  }

  it('should be an empty object', handle);
}

function parseSimpleOpenGraphData() {
  function handle(done) {
    fs.readFile('./test/templates/therock.html', 'utf8', function(err, html) {
      var result = ogp.parse(html);

      assert.equal(result.title, 'The Rock');
      assert.equal(result.type, 'video.movie');
      assert.equal(result.url, 'http://www.imdb.com/title/tt0117500/');
      assert.equal(result.image, 'http://ia.media-imdb.com/images/rock.jpg');
      done();
    });
  }

  it('should find title, type, URL, and image for "The Rock" using default namespace', handle);
}
