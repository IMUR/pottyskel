const GEOAPIFY_API_KEY = "52e42fd1727343ddb979120e8c9d473c";

export async function fetchAddressSuggestions(
  query: string
): Promise<string[]> {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${GEOAPIFY_API_KEY}`
  );
  const data = await response.json();
  return data.features.map((feature) => feature.properties.formatted);
}

export async function geocodeAddress(
  address: string
): Promise<{ lat: number; lon: number }> {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${GEOAPIFY_API_KEY}`
  );
  const data = await response.json();
  const feature = data.features[0];
  return {
    lat: feature.geometry.coordinates[1],
    lon: feature.geometry.coordinates[0],
  };
}
