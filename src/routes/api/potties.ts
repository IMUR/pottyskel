import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'PottyList.json');

export const post: RequestHandler = async ({ request }) => {
  const newPotty = await request.json();
  const potties = JSON.parse(readFileSync(filePath, 'utf-8'));

  potties.push(newPotty);
  writeFileSync(filePath, JSON.stringify(potties, null, 2));

  return {
    status: 201,
    body: newPotty,
  };
};