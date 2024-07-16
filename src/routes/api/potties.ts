import type { RequestHandler } from "@sveltejs/kit";
import fs from "fs";
import path from "path";

const pottiesFile = path.resolve("static", "PottyList.json");

export const POST: RequestHandler = async ({ request }) => {
  const newPotty = await request.json();
  const potties = JSON.parse(fs.readFileSync(pottiesFile, "utf-8"));

  potties.push(newPotty);
  fs.writeFileSync(pottiesFile, JSON.stringify(potties, null, 2));

  return {
    status: 200,
    body: { message: "Potty added successfully" },
  };
};
