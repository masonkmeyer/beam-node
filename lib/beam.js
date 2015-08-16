/* Required Modules */
var http = require('http'),
	https = require('https'),
	urlParse = require('url').parse;

/* Public API */

exports.parse = require('./api/openGraphProtocolParser').parse;

exports.get = function(url, callback) {
	var request = buildRequest(url);
	request.get(function(res) {
		var content = "";
		res.setEncoding('utf-8');

		function handleData(data) {
			content += data;
		}

		function handleEnd() {
			// follow redirects
			if (res.statusCode >= 300 && res.statusCode < 400) {
				exports.parse(res.headers.location, callback);
				return;
			}

			var ogp = getOpenGraphProtocol(res, content);
			callback(null, ogp);
		}

		function handleError(err) {
			callback(err);
		}

		res.on('data', handleData);
		res.on('end', handleEnd);
		res.on('error', handleError);
	});
};

/* Private API */
function getOpenGraphProtocol(response, content) {
	var ogd = {};
	var result = exports.parse(content);

	return {
		statusCode: response.statusCode,
		contentType: response.headers['content-type'],
		openGraphData: result
	};
}

function buildRequest(url) {
	var parsedUrl = urlParse(url);

	// default to http.
	if (!parsedUrl.protocol) {
		url = 'http://' + url;
		parsedUrl.protocol = 'http:';
	}

	return {
		url: url,
		protocol: parsedUrl.protocol,
		provider: parsedUrl.protocol === 'http:' ? http : https,
		get: function(handleResponse) {
			this.provider.get(this.url, handleResponse);
		}
	};
}
