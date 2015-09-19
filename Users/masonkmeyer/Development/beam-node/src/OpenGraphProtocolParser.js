/// <reference path="IParser.ts"/>
/// <reference path="../typings/tsd.d.ts" />
'use strict';
var OpenGraphProtocolParser = (function () {
    function OpenGraphProtocolParser() {
    }
    OpenGraphProtocolParser.prototype.parse = function (content) {
        if (_.isString(content) || _.isEmpty(content)) {
            return {};
        }
        var $ = cheerio.load(content);
        var data = {};
        var htmlNamespace = $('html').first().attr('prefix');
        if (htmlNamespace) {
            htmlNamespace.split(':').slice(0);
        }
        var namespace = 'og:';
        var metaTags = $('meta');
        for (var _i = 0; _i < metaTags.length; _i++) {
            var tag = metaTags[_i];
            var key = tag.attr('property');
            var value = tag.attr('content');
            if (key) {
                var indexOfNamespace = key.indexOf(namespace);
                if (indexOfNamespace >= 0) {
                    var name_1 = key.replace(namespace, '');
                    data[name_1] = value;
                }
            }
        }
        return data;
    };
    return OpenGraphProtocolParser;
})();
exports.OpenGraphProtocolParser = OpenGraphProtocolParser;
