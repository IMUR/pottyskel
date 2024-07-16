import { potties } from "./stores";

export async function submitPotty(pottyData) {
  const response = await fetch("/api/potties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pottyData),
  });

  const result = await response.json();
  potties.update((currentPotties) => [...currentPotties, result]);
  return result;
}
