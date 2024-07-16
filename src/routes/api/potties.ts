import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { writeFile, readFile } from "fs/promises";
import path from "path";

const filePath = path.resolve("static", "PottyList.json");

export const GET: RequestHandler = async () => {
  try {
    const data = await readFile(filePath, "utf-8");
    const potties = JSON.parse(data);
    return json(potties);
  } catch (error) {
    return json({ error: "Unable to read potty list" }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  const {
    pottyName,
    pottyAddress,
    pottyRule,
    pottyNotes,
    pottyType,
    latitude,
    longitude,
  } = await request.json();

  const newPotty = {
    pottyName,
    pottyAddress,
    pottyRule,
    pottyNotes,
    pottyType,
    latitude,
    longitude,
  };

  try {
    const data = await readFile(filePath, "utf-8");
    const potties = JSON.parse(data);
    potties.push(newPotty);
    await writeFile(filePath, JSON.stringify(potties, null, 2));
    return json({ success: true });
  } catch (error) {
    return json({ error: "Unable to save potty" }, { status: 500 });
  }
};
