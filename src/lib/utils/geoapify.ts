const geoapifyApiKey = "52e42fd1727343ddb979120e8c9d473c";

export const getMapStyleUrl = () => {
  return `https://maps.geoapify.com/v1/styles/positron/style.json?apiKey=${geoapifyApiKey}`;
};

export const getCoordinates = async (address: string) => {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address
    )}&apiKey=${geoapifyApiKey}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coordinates");
  }
  const data = await response.json();
  if (data.features.length > 0) {
    return {
      lat: data.features[0].geometry.coordinates[1],
      lon: data.features[0].geometry.coordinates[0],
    };
  } else {
    throw new Error("No coordinates found for this address");
  }
};

export const getAutocompleteSuggestions = async (query: string) => {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      query
    )}&apiKey=${geoapifyApiKey}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch autocomplete suggestions");
  }
  const data = await response.json();
  return data.features.map((feature: any) => feature.properties.formatted);
};

export const getUserLocation = async () => {
  const response = await fetch(
    `https://api.geoapify.com/v1/ipinfo?&apiKey=${geoapifyApiKey}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user location");
  }
  const data = await response.json();
  return {
    lat: data.location.latitude,
    lon: data.location.longitude,
  };
};
