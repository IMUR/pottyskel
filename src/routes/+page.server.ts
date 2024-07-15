import type { PageServerLoad } from './$types';
import { readFile } from 'fs/promises';
import path from 'path';

export const load: PageServerLoad = async () => {
	const filePath = path.join('static', 'PottyList.json');
	try {
		const data = await readFile(filePath, 'utf-8');
		const potties = JSON.parse(data);
		return { potties };
	} catch (error) {
		console.error('Failed to load potties:', error);
		return { potties: [] };
	}
};
