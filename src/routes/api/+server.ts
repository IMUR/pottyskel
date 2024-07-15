import { readPotties, writePotties } from '../../server';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

interface Potty {
	pottyName: string;
	pottyAddress: string;
	pottyRule: string;
	pottyNotes: string;
	pottyType: string;
	latitude: number;
	longitude: number;
}

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
