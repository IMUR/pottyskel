import express, { Request, Response } from 'express';
import path from 'path';
import { promises as fs } from 'fs';

interface Potty {
	pottyName: string;
	pottyAddress: string;
	pottyRule: string;
	pottyNotes: string;
	pottyType: string;
	latitude: number;
	longitude: number;
}

const app = express();
const PORT = process.env.PORT || 3000;
const filePath = path.join('static', 'PottyList.json');

app.use(express.json());

app.post('/api/potties', async (req: Request, res: Response) => {
	const newPotty: Potty = req.body;
	const potties = await readPotties();
	potties.push(newPotty);
	await writePotties(potties);
	res.json({ status: 'success', potty: newPotty });
});

app.get('/api/potties', async (req: Request, res: Response) => {
	const potties = await readPotties();
	res.json(potties);
});

const readPotties = async (): Promise<Potty[]> => {
	const data = await fs.readFile(filePath, 'utf-8');
	return JSON.parse(data) as Potty[];
};

const writePotties = async (potties: Potty[]): Promise<void> => {
	await fs.writeFile(filePath, JSON.stringify(potties, null, 2), 'utf-8');
};

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
