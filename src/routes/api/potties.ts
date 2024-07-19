/* import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import fs from "fs";
import path from "path";

const filePath = path.resolve("static/PottyList.json");

export const GET: RequestHandler = async () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const potties = JSON.parse(data);
    return json(potties, { status: 200 });
  } catch (error) {
    console.error("Error reading PottyList.json:", error);
    return json({ error: "Failed to fetch potties" }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const newPotty = await request.json();
    const data = fs.readFileSync(filePath, "utf8");
    const potties = JSON.parse(data);
    potties.push(newPotty);
    fs.writeFileSync(filePath, JSON.stringify(potties, null, 2));
    return json(newPotty, { status: 201 });
  } catch (error) {
    console.error("Error writing to PottyList.json:", error);
    return json({ error: "Failed to add potty" }, { status: 500 });
  }
};
 */