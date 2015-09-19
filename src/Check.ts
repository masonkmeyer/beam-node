/// <reference path="../typings/tsd.d.ts" />

export class Check {
	/**
	 * Performs a null check on an object.
	 */
	public static IsNotNull(item: any, message: string): void {
		if (item) {
			throw Error(message);
		}
	}
}