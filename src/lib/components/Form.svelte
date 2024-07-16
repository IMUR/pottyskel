<script>
  import { submitPotty, fetchSuggestions } from '$lib/utils/api';
  import { loadPotties } from '$lib/utils/stores';
  import { writable } from 'svelte/store';

  let pottyName = '';
  let pottyAddress = '';
  let pottyRule = '';
  let pottyNotes = '';
  let pottyType = '';
  let userLocation = { latitude: 0, longitude: 0 };
  let suggestions = writable([]);

  async function handleSubmit() {
    const newPotty = { pottyName, pottyAddress, pottyRule, pottyNotes, pottyType, ...userLocation };
    await submitPotty(newPotty);
    loadPotties();
  }

  async function handleInput(event) {
    const value = event.target.value;
    const userLoc = { latitude: 0, longitude: 0 }; // Replace with actual user location
    suggestions.set(await fetchSuggestions(value, userLoc));
  }
</script>

<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
  <input type="text" bind:value={pottyName} placeholder="Name" class="input" required />
  <input type="text" bind:value={pottyAddress} on:input={handleInput} placeholder="Address" class="input" required />
  <input type="text" bind:value={pottyRule} placeholder="Rule" class="input" required />
  <textarea bind:value={pottyNotes} placeholder="Notes" class="textarea"></textarea>
  <select bind:value={pottyType} class="select" required>
    <option value="" disabled>Select type</option>
    <option value="public">Public</option>
    <option value="private">Private</option>
  </select>
  <button type="submit" class="btn">Submit</button>
</form>

<ul>
  {#each $suggestions as suggestion}
    <li>{suggestion.properties.formatted}</li>
  {/each}
</ul>

<style>
  .input, .textarea, .select, .btn {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
