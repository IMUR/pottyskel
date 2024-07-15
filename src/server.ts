import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const app = express();
const port = 3000;

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

app.use(express.json());

app.get('/api/potties', async (req, res) => {
	try {
		const potties = await readPotties();
		res.json(potties);
	} catch (error) {
		res.status(500).json({ error: 'Failed to read potties' });
	}
});

app.post('/api/potties', async (req, res) => {
	try {
		const newPotty: Potty = req.body;
		const potties = await readPotties();
		potties.push(newPotty);
		await writePotties(potties);
		res.json({ status: 'success', potty: newPotty });
	} catch (error) {
		res.status(500).json({ error: 'Failed to save potty' });
	}
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
