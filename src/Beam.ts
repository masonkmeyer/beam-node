/// <reference path="OpenGraphProtocolParser.ts"/>
/// <reference path="../typings/tsd.d.ts" />
import http = require('http');
import https = require('https');
import url = require('url');
import { OpenGraphProtocolParser }  from './OpenGraphProtocolParser';
import { System } from './System';

export class Beam {
	constructor() {
		System.noop;
	}

	public static parse(content: string): any {
		return new OpenGraphProtocolParser().parse(content);
	}

	public static get(uri: string, callback: any) {
		let request = Beam.buildRequest(uri);

		request.provider.get(request.url, (res: any) => {
			let content = '';
			res.setEncoding('utf-8');

			let handleData = (data: any) => {
				content += data;
			};

			let handleEnd = () => {
				// follow redirects
				if (res.statusCode >= 300 && res.statusCode < 400) {
					this.get(res.headers.location, callback);
					return;
				}

				let ogp = Beam.getOpenGraphProtocol(res, content);
				callback(null, ogp);
			};

			let handleError = (err: any) => {
				callback(err);
			};

			res.on('data', handleData);
			res.on('end', handleEnd);
			res.on('error', handleError);
		});
	}


	private static getOpenGraphProtocol(response: any, content: any) {
		let ogd = {};
		let result = this.parse(content);

		return {
			statusCode: response.statusCode,
			contentType: response.headers['content-type'],
			openGraphData: result
		};
	}

	private static buildRequest(uri: string) {
		let parsedUrl: url.Url = url.parse(uri);

		// default to http.
		if (!parsedUrl.protocol) {
			uri = 'http://' + url;
			parsedUrl.protocol = 'http:';
		}

		return {
			url: parsedUrl,
			protocol: parsedUrl.protocol,
			provider: parsedUrl.protocol === 'http:' ? http : https
		};
	}
}
