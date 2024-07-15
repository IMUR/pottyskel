import { API_KEY } from '$lib/constants';
import type { Suggestion, Potty } from '$lib/types';

export async function fetchSuggestions(
	value: string,
	latitude: number,
	longitude: number
): Promise<Suggestion[]> {
	const response = await fetch(
		`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(value)}&filter=circle:${longitude},${latitude},8000&bias=proximity:${longitude},${latitude}&apiKey=${API_KEY}`
	);
	const data = await response.json();
	return data.features.map((feature: any) => ({
		properties: {
			formatted: feature.properties.formatted
		},
		geometry: {
			type: feature.geometry.type,
			coordinates: feature.geometry.coordinates
		}
	}));
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
