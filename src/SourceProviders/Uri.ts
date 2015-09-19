/// <reference path="../../typings/tsd.d.ts" />

import * as qhttp from 'q-io/http';

export class Uri {
	public static from(url: string): Q.Promise<qhttp.Response> {
			return qhttp.request(url);
	}
}
