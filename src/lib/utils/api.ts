const API_KEY = '52e42fd1727343ddb979120e8c9d473c';

export interface UserLocation {
	latitude: number;
	longitude: number;
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

export async function fetchSuggestions(value: string, userLocation: UserLocation) {
	if (!userLocation || !userLocation.latitude || !userLocation.longitude) {
		throw new Error('Invalid user location');
	}

	const response = await fetch(
		`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(value)}&filter=circle:${userLocation.longitude},${userLocation.latitude},8000&bias=proximity:${userLocation.longitude},${userLocation.latitude}&apiKey=${API_KEY}`
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch suggestions: ${response.statusText}`);
	}

	const data = await response.json();
	if (!data.features) {
		throw new Error('No features found in the API response');
	}

	return data.features;
}

export async function submitPotty(newPotty: Potty) {
	const response = await fetch('/api/potties', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newPotty)
	});

	if (!response.ok) {
		throw new Error(`Failed to submit potty: ${response.statusText}`);
	}

	return response.json();
}
