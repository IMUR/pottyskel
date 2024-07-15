import express from 'express';
import path from 'path';
import { promises as fs } from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;
const filePath = path.join(__dirname, 'static', 'PottyList.json');

interface Potty {
	pottyName: string;
	pottyAddress: string;
	pottyRule: string;
	pottyNotes: string;
	pottyType: string;
	latitude: number;
	longitude: number;
}

app.use(express.json());

app.get('/api/potties', async (req, res) => {
	const data = await fs.readFile(filePath, 'utf-8');
	res.json(JSON.parse(data));
});

app.post('/api/potties', async (req, res) => {
	const newPotty: Potty = req.body;
	const data = await fs.readFile(filePath, 'utf-8');
	const potties: Potty[] = JSON.parse(data);
	potties.push(newPotty);
	await fs.writeFile(filePath, JSON.stringify(potties, null, 2), 'utf-8');
	res.status(201).json(newPotty);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
