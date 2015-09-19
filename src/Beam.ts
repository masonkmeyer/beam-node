/// <reference path="../typings/tsd.d.ts" />

import { Uri } from './SourceProviders/Uri';
import { OpenGraphProtocolParser }  from './OpenGraphProtocolParser';
import { System } from './System';
import { Check } from './Check';

export class Beam {
	constructor() {
		System.noop;
	}

	public static parse(content: string): Beam.ISemanticData {
		return new OpenGraphProtocolParser().parse(content);
	}

	public static get(uri: string, callback: (err: Error, ogp: Beam.ISemanticData) => {}): void {
		Check.IsNotNull(uri, 'URL is null');
		Check.IsNotNull(callback, 'Callback is null');

		let ogp: Beam.ISemanticData = null;
		let err: Error = null;

		Beam.processUrl(uri)
			.then((response: QioHTTP.Response) => {
				return Beam.getOpenGraphProtocol(response);
			})
			.then((data: Beam.FetchResponse) => {
				ogp = data;
			})
			.fail((error: Error) => {
				err = error;
			})
			.done(() => {
				callback(err, ogp);
			});
	}

	private static processUrl(uri: string): Q.Promise<QioHTTP.Response> {
		return Uri.from(uri)
			.then((res: QioHTTP.Response) => {
				if (res.status >= 300 && res.status < 400) {
					return Beam.processUrl(uri);
				} else {
					return res;
				}
			});
	}

	private static getOpenGraphProtocol(response: QioHTTP.Response): Q.Promise<Beam.FetchResponse> {
		let ogd = {};

		return response.body.read().then((result: Buffer) => {
			let data = this.parse(result.toString());
			return {
				statusCode: response.status,
				contentType: response.headers['content-type'],
				semanticData: data
			};
		});
	}
}
