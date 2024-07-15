export interface UserLocation {
	latitude: number;
	longitude: number;
}

export interface Potty {
	pottyName: string;
	pottyAddress: string;
	pottyRule: string;
	pottyNotes: string;
	pottyType?: string;
	latitude: number;
	longitude: number;
}

export interface Suggestion {
	properties: {
		formatted: string;
		// Add other properties as needed
	};
	geometry: {
		type: string;
		coordinates: [number, number];
	};
}
