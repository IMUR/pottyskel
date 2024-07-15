<script lang="ts">
  import { fetchSuggestions, fetchGeolocation, submitPotty } from '$lib/utils/api';
  import type { Suggestion, Potty, UserLocation } from '$lib/types';
  import { onMount } from 'svelte';

  let pottyName = '';
  let pottyAddress = '';
  let pottyRule = 'Door Code';
  let pottyNotes = '';
  let pottyType = 'General';
  let suggestions: Suggestion[] = [];
  let userLocation: UserLocation | null = null;

  async function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!userLocation) {
      userLocation = await fetchGeolocation('');
    }
    suggestions = await fetchSuggestions(target.value, userLocation);
  }

  async function handleSubmit() {
    const newPotty: Potty = {
      pottyName,
      pottyAddress,
      pottyRule,
      pottyNotes,
      pottyType,
      latitude: userLocation ? userLocation.latitude : 0,
      longitude: userLocation ? userLocation.longitude : 0,
    };
    await submitPotty(newPotty);
  }

  onMount(async () => {
    userLocation = await fetchGeolocation('');
  });
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" bind:value={pottyName} placeholder="Potty Name" required />
  <input type="text" bind:value={pottyAddress} on:input={handleInput} placeholder="Potty Address" required />
  <select bind:value={pottyRule} required>
    <option value="Door Code">Door Code</option>
    <option value="Free Access">Free Access</option>
    <option value="Ask Staff">Ask Staff</option>
    <option value="Call or Text">Call or Text</option>
    <option value="Self Explanatory">Self Explanatory</option>
    <option value="Physical Key">Physical Key</option>
  </select>
  <input type="text" bind:value={pottyNotes} placeholder="Potty Notes" required />
  <select bind:value={pottyType}>
    <option value="General">General</option>
    <option value="Supermarket">Supermarket</option>
    <option value="Hospital">Hospital</option>
    <option value="Restaurant">Restaurant</option>
    <option value="Retail Store">Retail Store</option>
    <option value="Gas Station">Gas Station</option>
    <option value="Movie Theater">Movie Theater</option>
    <option value="Coffee Shop">Coffee Shop</option>
    <option value="Public Restroom">Public Restroom</option>
    <option value="Open Season">Open Season</option>
    <option value="Mall">Mall</option>
    <option value="Hardware Store">Hardware Store</option>
    <option value="Pharmacy">Pharmacy</option>
    <option value="Parking Structure">Parking Structure</option>
    <option value="Hotel">Hotel</option>
  </select>
  <button type="submit">Submit</button>
</form>

{#if suggestions.length > 0}
  <ul>
    {#each suggestions as suggestion}
      <li>{suggestion.properties.formatted}</li>
    {/each}
  </ul>
{/if}
