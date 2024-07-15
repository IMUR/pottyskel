import { promises as fs } from 'fs';
import path from 'path';

interface Potty {
	pottyName: string;
	pottyAddress: string;
	pottyRule: string;
	pottyNotes: string;
	pottyType: string;
	latitude: number;
	longitude: number;
}

const filePath = path.join('static', 'PottyList.json');

export const readPotties = async (): Promise<Potty[]> => {
	const data = await fs.readFile(filePath, 'utf-8');
	return JSON.parse(data) as Potty[];
};

export const writePotties = async (potties: Potty[]): Promise<void> => {
	await fs.writeFile(filePath, JSON.stringify(potties, null, 2), 'utf-8');
};
