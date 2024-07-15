<script lang="ts">
  import { writable } from 'svelte/store';
  import { fetchSuggestions, submitPotty } from '$lib/utils/api';
  import type { Suggestion } from '$lib/types';

  let pottyName = '';
  let pottyAddress = '';
  let pottyRule = '';
  let pottyNotes = '';
  let pottyType = '';
  let suggestions: Suggestion[] = [];
  let userLocation = { latitude: 0, longitude: 0 };

  const handleInput = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    suggestions = await fetchSuggestions(value, userLocation);
  };

  const handleSubmit = async () => {
    await submitPotty({ pottyName, pottyAddress, pottyRule, pottyNotes, pottyType, ...userLocation });
    // Reset form fields or show a success message here
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="pottyName">Potty Name</label>
  <input id="pottyName" type="text" bind:value={pottyName} required />

  <label for="pottyAddress">Potty Address</label>
  <input id="pottyAddress" type="text" on:input={handleInput} bind:value={pottyAddress} required />
  <ul>
    {#each suggestions as suggestion}
      <li role="option" tabindex="0" on:click={() => (pottyAddress = suggestion.properties.formatted)}
          on:keydown={(event) => event.key === 'Enter' && (pottyAddress = suggestion.properties.formatted)}>
        {suggestion.properties.formatted}
      </li>
    {/each}
  </ul>

  <label for="pottyRule">Potty Rule</label>
  <select id="pottyRule" bind:value={pottyRule} required>
    <option value="Door Code">Door Code</option>
    <option value="Free Access">Free Access</option>
    <option value="Ask Staff">Ask Staff</option>
    <option value="Call or Text">Call or Text</option>
    <option value="Self Explanatory">Self Explanatory</option>
    <option value="Physical Key">Physical Key</option>
  </select>

  <label for="pottyNotes">Potty Notes</label>
  <input id="pottyNotes" type="text" bind:value={pottyNotes} required />

  <label for="pottyType">Potty Type</label>
  <select id="pottyType" bind:value={pottyType}>
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

<style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    cursor: pointer;
    padding: 0.5em;
    border: 1px solid #ccc;
    margin-top: -1px; /* Prevent double borders */
  }

  li:focus {
    outline: 2px solid #007acc;
    outline-offset: 2px;
  }
</style>
