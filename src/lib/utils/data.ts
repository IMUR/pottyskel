// src/lib/utils/data.ts
export const fetchData = async () => {
	// Fetch data from the server or database
	const response = await fetch('/api/potties');
	const data = await response.json();
	return data;
};
