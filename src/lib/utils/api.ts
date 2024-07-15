import type { Suggestion, Potty } from '$lib/types';

const API_KEY = '52e42fd1727343ddb979120e8c9d473c';

interface UserLocation {
	latitude: number;
	longitude: number;
}

export async function fetchSuggestions(value: string, userLocation: UserLocation) {
	const response = await fetch(
		`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(value)}&filter=circle:${userLocation.longitude},${userLocation.latitude},8000&bias=proximity:${userLocation.longitude},${userLocation.latitude}&apiKey=${API_KEY}`
	);
	const data = await response.json();
	return data.features as Suggestion[];
}

export async function submitPotty(newPotty: Potty) {
	const response = await fetch('/api/potties', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newPotty)
	});
	return response;
}
