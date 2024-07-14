import { writable } from 'svelte/store';

// Define the structure of a potty
interface Potty {
	pottyName: string;
	pottyAddress: string;
	pottyRule: string;
	pottyNotes: string;
	pottyType: string;
	latitude: number;
	longitude: number;
}

// Create a writable store for potties
export const potties = writable<Potty[]>([]);

// Function to add a new potty to the store
export function addPotty(newPotty: Potty) {
	potties.update((currentPotties) => [...currentPotties, newPotty]);
}
