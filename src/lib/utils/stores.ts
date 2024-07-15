import { writable } from 'svelte/store';

export interface Potty {
	pottyName: string;
	pottyAddress: string;
	pottyRule: string;
	pottyNotes: string;
	pottyType: string;
	latitude: number;
	longitude: number;
}

export const potties = writable<Potty[]>([]);
