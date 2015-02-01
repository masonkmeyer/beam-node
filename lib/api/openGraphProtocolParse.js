var cheerio = require('cheerio');

/* Public API */

exports.parse = function(html) {
  if (!html || typeof html !== 'string' || !html.length) {
    // short cicuit if it isn't HTML.
    return {};
  }

  var $ = cheerio.load(html);

  var data = {};
  var namespace = "og:";
  var metaTags = $('meta');

  for (var i = 0; i < metaTags.length; i++) {
    var tag = $(metaTags[i]);
    var key = tag.attr('property');
    var value = tag.attr('content');
    var indexOfNamespace = key.indexOf(namespace);
    if (indexOfNamespace >= 0) {
      var name = key.substr(indexOfNamespace + namespace.length, key.length - indexOfNamespace);
      data[name] = value;
    }
  }

  return data;
};

/* Private API */
function getCustomNamespace($html) {

}
