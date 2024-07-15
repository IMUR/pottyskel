<script lang="ts">
  import { writable } from 'svelte/store';
  import { fetchSuggestions, submitPotty } from '$lib/utils/api';

  type Suggestion = {
    properties: {
      formatted: string;
    };
    geometry: { coordinates: [number, number] };
  };

  interface Potty {
    pottyName: string;
    pottyAddress: string;
    pottyRule: string;
    pottyNotes: string;
    pottyType: string;
    latitude: number;
    longitude: number;
  }

  export let potties = writable<Potty[]>([]);

  let pottyName: string = '';
  let pottyAddress: string = '';
  let pottyRule: string = '';
  let pottyNotes: string = '';
  let pottyType: string = '';
  let suggestions: Suggestion[] = [];
  let showSuggestions: boolean = false;
  let selectedSuggestion: Suggestion | null = null;
  let errorMessage: string = '';

  const userLocation = { latitude: 34.02769842014328, longitude: -118.48420946044928 };

  async function handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      suggestions = await fetchSuggestions(value, userLocation);
      showSuggestions = true;
    } else {
      showSuggestions = false;
    }
  }

  function selectSuggestion(suggestion: Suggestion) {
    pottyAddress = suggestion.properties.formatted;
    selectedSuggestion = suggestion;
    showSuggestions = false;
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    if (!selectedSuggestion) {
      errorMessage = 'Please select an address from the suggestions.';
      return;
    }

    const newPotty: Potty = {
      pottyName,
      pottyAddress,
      pottyRule,
      pottyNotes,
      pottyType,
      latitude: selectedSuggestion.geometry.coordinates[1],
      longitude: selectedSuggestion.geometry.coordinates[0]
    };

    const response = await submitPotty(newPotty);

    if (response.ok) {
      potties.update(potties => [...potties, newPotty]);
      clearForm();
    } else {
      errorMessage = 'Failed to save potty entry';
    }
  }

  function clearForm() {
    pottyName = '';
    pottyAddress = '';
    pottyRule = '';
    pottyNotes = '';
    pottyType = '';
    selectedSuggestion = null;
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="pottyName">Potty Name</label>
    <input id="pottyName" bind:value={pottyName} />
  </div>

  <div>
    <label for="pottyAddress">Potty Address</label>
    <input id="pottyAddress" bind:value={pottyAddress} on:input={handleInput} required />
    {#if showSuggestions}
      <ul>
        {#each suggestions as suggestion (suggestion.properties.formatted)}
          <li style="list-style:none">
            <button type="button" on:click={() => selectSuggestion(suggestion)} on:keypress={() => selectSuggestion(suggestion)}>
              {suggestion.properties.formatted}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div>
    <label for="pottyRule">Potty Rule</label>
    <select id="pottyRule" bind:value={pottyRule} required>
      <option value="Door Code">Door Code</option>
      <option value="Free Access">Free Access</option>
      <option value="Ask Staff">Ask Staff</option>
      <option value="Call or Text">Call or Text</option>
      <option value="Self Explanatory">Self Explanatory</option>
      <option value="Physical Key">Physical Key</option>
    </select>
  </div>

  <div>
    <label for="pottyNotes">Potty Notes</label>
    <textarea id="pottyNotes" bind:value={pottyNotes} required></textarea>
  </div>

  <div>
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
  </div>

  {#if errorMessage}
    <p>{errorMessage}</p>
  {/if}

  <button type="submit">Submit</button>
</form>

<style>
  /* Add necessary styles */
</style>
