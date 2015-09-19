declare module Beam {
	export interface Response {
		error: Error;
		ogd: any;
	}

	export interface FetchResponse {
		statusCode: number;
		contentType: string;
		semanticData: ISemanticData;
	}
	
	export interface ISemanticData {}
}


