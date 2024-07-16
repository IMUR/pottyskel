<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchSuggestions, submitPotty } from '$lib/utils/api';
  import { potties } from '$lib/utils/stores';
  import { writable } from 'svelte/store';

  let input = '';
  let suggestions = writable([]);

  async function handleInput(event: Event) {
    input = (event.target as HTMLInputElement).value;
    if (input.length > 2) {
      const result = await fetchSuggestions(input);
      suggestions.set(result);
    }
  }

  async function handleSubmit() {
    const newPotty = { /* Collect form data */ };
    await submitPotty(newPotty);
    potties.update(current => [...current, newPotty]);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" bind:value={input} on:input={handleInput} />
  <ul>
    {#each $suggestions as suggestion}
      <li>{suggestion}</li>
    {/each}
  </ul>
  <button type="submit">Submit</button>
</form>

<style>
  /* Add necessary styles */
</style>
