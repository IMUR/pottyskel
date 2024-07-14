const API_KEY = '52e42fd1727343ddb979120e8c9d473c';

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
	// Handle autocomplete suggestions
}
