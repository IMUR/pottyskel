import { promises as fs } from 'fs';
import path from 'path';
import type { Potty } from '$lib/types';

const filePath = path.join('static', 'PottyList.json');

export const readPotties = async (): Promise<Potty[]> => {
	try {
		const data = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(data) as Potty[];
	} catch (error) {
		console.error('Error reading potties from file:', error);
		throw new Error('Failed to read potties');
	}
};

export const writePotties = async (potties: Potty[]): Promise<void> => {
	try {
		await fs.writeFile(filePath, JSON.stringify(potties, null, 2), 'utf-8');
	} catch (error) {
		console.error('Error writing potties to file:', error);
		throw new Error('Failed to write potties');
	}
};
