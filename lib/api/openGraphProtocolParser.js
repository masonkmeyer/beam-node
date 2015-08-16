var cheerio = require('cheerio');

/* Public API */
exports.parse = function(html) {
  if (!html || typeof html !== 'string' || !html.length) {
    // short cicuit if it isn't HTML.
    return {};
  }

  var $ = cheerio.load(html);

  var data = {};
  var htmlNamespace = $('html').first().attr('prefix');
  if (htmlNamespace) {
    htmlNamespace.split(':').slice(0);
  }

  var namespace =  "og:";
  var metaTags = $('meta');


  for (var i = 0; i < metaTags.length; i++) {
    var tag = $(metaTags[i]);
    var key = tag.attr('property');
    var value = tag.attr('content');
    var indexOfNamespace = key.indexOf(namespace);

    if (indexOfNamespace >= 0) {
      var name = key.replace(namespace, '');
      data[name] = value;
    }
  }

  return data;
};
