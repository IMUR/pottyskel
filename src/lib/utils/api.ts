// src/lib/utils/api.ts
import type { Potty } from '$lib/types';

export async function fetchSuggestions(
	value: string,
	userLocation: { latitude: number; longitude: number }
) {
	const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
	const response = await fetch(
		`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(value)}&filter=circle:${userLocation.longitude},${userLocation.latitude},8000&bias=proximity:${userLocation.longitude},${userLocation.latitude}&apiKey=${API_KEY}`
	);
	const data = await response.json();
	return data.features;
}

export async function submitPotty(newPotty: Potty) {
	const response = await fetch('/api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newPotty)
	});

	if (!response.ok) {
		throw new Error('Failed to submit potty');
	}
}

export async function getPotties() {
	const response = await fetch('/api');
	if (response.ok) {
		return await response.json();
	}
	throw new Error('Failed to fetch potties');
}
