export const getCoordinates = async (address: string) => {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=52e42fd1727343ddb979120e8c9d473c`
  );
  const data = await response.json();
  return data.features[0].geometry.coordinates;
};
