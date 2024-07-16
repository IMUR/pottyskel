import { json } from "@sveltejs/kit";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "PottyList.json");

export async function POST({ request }) {
  const pottyData = await request.json();
  let potties = JSON.parse(fs.readFileSync(filePath, "utf8"));
  potties.push(pottyData);
  fs.writeFileSync(filePath, JSON.stringify(potties, null, 2));
  return json(pottyData);
}
