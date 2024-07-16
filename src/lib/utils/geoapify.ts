export async function fetchAddressSuggestions(query: string) {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=52e42fd1727343ddb979120e8c9d473c`
  );
  const data = await response.json();
  return data.features.map(
    (feature: {
      properties: { formatted: string; lat: number; lon: number };
    }) => ({
      formatted: feature.properties.formatted,
      lat: feature.properties.lat,
      lon: feature.properties.lon,
    })
  );
}
