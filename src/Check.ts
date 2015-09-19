/// <reference path="../typings/tsd.d.ts" />

/**
 * Throws exceptions for empty strings. 
 */
export class Check {
	/**
	 * Performs a null check on an object.
	 */
	public static isNotNull(item: any, message: string): void {
		if (!item) {
			throw Error(message);
		}
	}	
}