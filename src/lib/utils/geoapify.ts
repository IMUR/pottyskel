export async function getGeoapifySuggestions(query: string) {
  const apiKey = "52e42fd1727343ddb979120e8c9d473c";
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${apiKey}`
  );
  const data = await response.json();
  return data.features.map((feature) => feature.properties.formatted);
}
