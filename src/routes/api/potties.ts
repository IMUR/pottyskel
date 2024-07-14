import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
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

const readPotties = async (): Promise<Potty[]> => {
	const data = await fs.readFile(filePath, 'utf-8');
	return JSON.parse(data) as Potty[];
};

const writePotties = async (potties: Potty[]): Promise<void> => {
	await fs.writeFile(filePath, JSON.stringify(potties, null, 2), 'utf-8');
};

export const POST: RequestHandler = async ({ request }) => {
	const newPotty: Potty = await request.json();
	const potties = await readPotties();
	potties.push(newPotty);
	await writePotties(potties);
	return json({ status: 'success', potty: newPotty });
};

export const GET: RequestHandler = async () => {
	const potties = await readPotties();
	return json(potties);
};
