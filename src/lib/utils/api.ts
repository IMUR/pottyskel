// src/lib/utils/api.ts

interface Suggestion {
	properties: {
		formatted: string;
	};
	geometry: { coordinates: [number, number] };
}

interface Potty {
	pottyName: string;
	pottyAddress: string;
	pottyRule: string;
	pottyNotes: string;
	pottyType: string;
	latitude: number;
	longitude: number;
}

const API_KEY = '52e42fd1727343ddb979120e8c9d473c';

export async function fetchSuggestions(
	query: string,
	userLocation: { latitude: number; longitude: number }
): Promise<Suggestion[]> {
	const response = await fetch(
		`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&filter=circle:${userLocation.longitude},${userLocation.latitude},8000&bias=proximity:${userLocation.longitude},${userLocation.latitude}&apiKey=${API_KEY}`
	);
	const data = await response.json();
	return data.features;
}

export async function submitPotty(newPotty: Potty): Promise<Response> {
	return fetch('/api/potties', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newPotty)
	});
}

export async function geocode(address: string) {
	const response = await fetch(
		`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${API_KEY}`
	);
	const data = await response.json();
	return data.features[0].properties;
}

export async function autocomplete(event: Event) {
	const input = event.target as HTMLInputElement;
	const response = await fetch(
		`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input.value)}&apiKey=${API_KEY}`
	);
	const data = await response.json();
	return data.features;
}
