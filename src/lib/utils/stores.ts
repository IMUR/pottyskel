import { writable, derived } from 'svelte/store';

export const potties = writable([]);

export const filteredPotties = derived(potties, ($potties) => {
  // Implement filtering logic based on user preferences
  return $potties.filter(potty => /* some condition */);
});
