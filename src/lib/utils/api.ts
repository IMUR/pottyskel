import type { UserLocation, Potty, Suggestion } from '$lib/types';

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export async function fetchSuggestions(value: string, userLocation: UserLocation): Promise<Suggestion[]> {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(value)}&filter=circle:${userLocation.longitude},${userLocation.latitude},8000&bias=proximity:${userLocation.longitude},${userLocation.latitude}&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data.features;
}

export async function submitPotty(newPotty: Potty): Promise<void> {
  const response = await fetch('/api/potties', {
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
