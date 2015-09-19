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

declare module Beam.OpenGraphProtocol {
	export interface Basic extends Beam.ISemanticData {
		title: string;
		type: string;
		image: string;
		url: string;
		audio?:string;
		description?: string;
		determiner?: string;
		locale?: string;
		// TODO: locale.alternate
		site_name?: string;
		video: string;	
	}
}
