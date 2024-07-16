import { writable } from 'svelte/store';
import { fetchPotties } from './api';
import type { Potty } from './types';

export const potties = writable<Potty[]>([]);

export async function loadPotties() {
	try {
		const data = await fetchPotties();
		potties.set(data);
	} catch (error) {
		console.error('Failed to load potties:', error);
	}
}
