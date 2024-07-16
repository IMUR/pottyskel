<script lang="ts">
  import { writable } from 'svelte/store';
  import { pottyList } from '../utils/stores';
  import { onMount } from 'svelte';

  // Define the type for address suggestions
  interface AddressSuggestion {
    formatted: string;
    lat: number;
    lon: number;
  }

  let pottyName = '';
  let pottyAddress = '';
  let pottyRule = '';
  let pottyNotes = '';
  let pottyType = '';

  // Initialize writable stores
  let addressSuggestions = writable<AddressSuggestion[]>([]);
  let selectedAddress: AddressSuggestion | null = null;

  // Fetch address suggestions from the Geoapify API
  async function fetchAddressSuggestions(query: string) {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=52e42fd1727343ddb979120e8c9d473c`);
    const data = await response.json();
    addressSuggestions.set(data.results as AddressSuggestion[]);
  }

  // Select an address from the suggestions
  function selectAddress(address: AddressSuggestion) {
    selectedAddress = address;
    pottyAddress = address.formatted;
  }

  // Handle form submission
  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (pottyName && pottyAddress && pottyRule && pottyNotes) {
      const response = await fetch('/api/potties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pottyName,
          pottyAddress: selectedAddress,
          pottyRule,
          pottyNotes,
          pottyType,
        }),
      });

      if (response.ok) {
        const newPotty = await response.json();
        pottyList.update((list) => [...list, newPotty]);
      }
    }
  }

  // Handle input event and fetch address suggestions
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    fetchAddressSuggestions(target.value);
  }
</script>

<div>
  <form on:submit={handleSubmit}>
    <div>
      <label for="pottyName">Potty Name</label>
      <input type="text" id="pottyName" bind:value={pottyName} required />
    </div>
    <div>
      <label for="pottyAddress">Potty Address</label>
      <input
        type="text"
        id="pottyAddress"
        bind:value={pottyAddress}
        on:input={handleInput}
        required
      />
      <ul>
        {#each $addressSuggestions as suggestion}
          <li>
            <button type="button" on:click={() => selectAddress(suggestion)}>
              {suggestion.formatted}
            </button>
          </li>
        {/each}
      </ul>
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
      <input type="text" id="pottyNotes" bind:value={pottyNotes} required />
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
    <button type="submit">Submit</button>
  </form>
</div>

<style>
  /* Add relevant styling here */
</style>
