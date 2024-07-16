import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { promises as fs } from "fs";
import path from "path";

const pottyListPath = path.resolve("src/data/PottyList.json");

export const GET: RequestHandler = async () => {
  const data = await fs.readFile(pottyListPath, "utf-8");
  const potties = JSON.parse(data);
  return json(potties);
};

export const POST: RequestHandler = async ({ request }) => {
  const { pottyName, pottyAddress, pottyRule, pottyNotes, pottyType } =
    await request.json();

  const newPotty = {
    pottyName,
    pottyAddress,
    pottyRule,
    pottyNotes,
    pottyType,
    latitude: pottyAddress.lat,
    longitude: pottyAddress.lon,
  };

  const data = await fs.readFile(pottyListPath, "utf-8");
  const potties = JSON.parse(data);
  potties.push(newPotty);

  await fs.writeFile(pottyListPath, JSON.stringify(potties, null, 2));

  return json(newPotty);
};
