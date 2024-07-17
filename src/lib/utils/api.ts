import type { Potty } from "$lib/types";

// Utility functions to interact with the potty API
export const getPotties = async (): Promise<Potty[]> => {
  const response = await fetch("/api/potties");
  if (!response.ok) {
    throw new Error("Failed to fetch potties");
  }
  return response.json();
};

export const addPotty = async (potty: Potty): Promise<Potty> => {
  const response = await fetch("/api/potties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(potty),
  });
  if (!response.ok) {
    throw new Error("Failed to add potty");
  }
  return response.json();
};
