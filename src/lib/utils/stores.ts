import { writable } from "svelte/store";

export const pottyList = writable([]);

export async function loadPotties() {
  const response = await fetch("/api/potties");
  const data = await response.json();
  pottyList.set(data);
}

loadPotties();
