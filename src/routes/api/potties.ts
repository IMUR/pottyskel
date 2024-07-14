import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

let potties = [];

// POST request to add a new potty
export const POST: RequestHandler = async ({ request }) => {
  const newPotty = await request.json();
  potties.push(newPotty);
  return json({ status: 'success', potty: newPotty });
};

// GET request to retrieve all potties
export const GET: RequestHandler = async () => {
  return json(potties);
};