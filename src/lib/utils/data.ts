export async function fetchJSONFile<T>(filePath: string): Promise<T> {
	const response = await fetch(filePath);
	const data = await response.json();
	return data as T;
}
