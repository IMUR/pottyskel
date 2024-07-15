import { writable } from 'svelte/store';
import type { Potty } from '$lib/types';

export const potties = writable<Potty[]>([]);
export const suggestions = writable<string[]>([]);
