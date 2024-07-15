export interface Suggestion {
	properties: {
		formatted: string;
	};
	geometry: {
		type: string;
		coordinates: [number, number];
	};
}

export interface Potty {
	pottyName: string;
	pottyAddress: string;
	pottyRule: string;
	pottyNotes: string;
	pottyType: string;
	latitude: number;
	longitude: number;
}
