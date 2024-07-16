import type { RequestHandler } from "@sveltejs/kit";
import { writeFileSync, readFileSync } from "fs";
import { json } from "@sveltejs/kit";

const POTTIES_FILE = "PottyList.json";

export const POST: RequestHandler = async ({ request }) => {
  const newPotty = await request.json();
  const potties = JSON.parse(readFileSync(POTTIES_FILE, "utf-8"));
  potties.push(newPotty);
  writeFileSync(POTTIES_FILE, JSON.stringify(potties));
  return json({ success: true }, { status: 201 });
};
