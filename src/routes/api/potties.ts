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

const potties: Potty[] = [];

// POST request to add a new potty
export const POST: RequestHandler = async ({ request }) => {
	const newPotty: Potty = await request.json();
	potties.push(newPotty);
	return json({ status: 'success', potty: newPotty });
};

// GET request to retrieve all potties
export const GET: RequestHandler = async () => {
	return json(potties);
};
