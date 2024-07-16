const API_KEY = '52e42fd1727343ddb979120e8c9d473c';

export async function fetchAddressSuggestions(query: string) {
  const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${API_KEY}`);
  const data = await response.json();
  return data.results;
}