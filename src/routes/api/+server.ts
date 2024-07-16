// src/routes/api/+server.ts
import { json } from '@sveltejs/kit';
import fs from 'fs';
import { resolve } from 'path';

const dataFile = resolve('static/PottyList.json');

export async function POST({ request }) {
	const newPotty = await request.json();

	let potties = [];
	if (fs.existsSync(dataFile)) {
		const data = fs.readFileSync(dataFile, 'utf-8');
		potties = JSON.parse(data);
	}

	potties.push(newPotty);
	fs.writeFileSync(dataFile, JSON.stringify(potties, null, 2));

	return json({ success: true });
}

export async function GET() {
	if (fs.existsSync(dataFile)) {
		const data = fs.readFileSync(dataFile, 'utf-8');
		const potties = JSON.parse(data);
		return json(potties);
	}

	return json([]);
}
