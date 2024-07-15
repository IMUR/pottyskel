import { json } from '@sveltejs/kit';
import { promises as fs } from 'fs';
import path from 'path';
import type { RequestHandler } from './$types';
import type { Potty } from '$lib/utils/stores';

const filePath = path.join('static', 'PottyList.json');

const readPotties = async (): Promise<Potty[]> => {
	try {
		const data = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(data) as Potty[];
	} catch (error) {
		console.error('Failed to read potties:', error);
		throw new Error('Failed to read potties');
	}
};

const writePotties = async (potties: Potty[]): Promise<void> => {
	try {
		await fs.writeFile(filePath, JSON.stringify(potties, null, 2), 'utf-8');
	} catch (error) {
		console.error('Failed to write potties:', error);
		throw new Error('Failed to write potties');
	}
};

export const GET: RequestHandler = async () => {
	const potties = await readPotties();
	return json(potties);
};

export const POST: RequestHandler = async ({ request }) => {
	const newPotty: Potty = await request.json();
	const potties = await readPotties();
	potties.push(newPotty);
	await writePotties(potties);
	return json(newPotty);
};
