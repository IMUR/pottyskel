import { writable } from "svelte/store";

export const pottyList = writable([]);

export async function loadPotties(event: {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}) {
  const response = await event.fetch("/api/potties");
  const data = await response.json();
  pottyList.set(data);
}
