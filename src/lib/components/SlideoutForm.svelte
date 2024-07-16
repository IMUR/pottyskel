<script lang="ts">
  import { potties } from '../utils/stores';
  import { onMount } from 'svelte';
  import { getDrawerStore } from '@skeletonlabs/skeleton';
  const drawerStore = getDrawerStore();
  interface Suggestion {
    formatted: string;
  }

  interface GeocodeResult {
    features: Array<{
      geometry: {
        coordinates: [number, number];
      };
    }>;
  }

  let pottyName = '';
  let pottyAddress = '';
  let pottyRule = '';
  let pottyNotes = '';
  let pottyType = '';
  let suggestions: Suggestion[] = [];
  let isOpen = false;

  async function fetchSuggestions(query: string) {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=52e42fd1727343ddb979120e8c9d473c`);
    const data = await response.json();
    suggestions = data.results;
  }

  async function handleSubmit() {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${pottyAddress}&apiKey=52e42fd1727343ddb979120e8c9d473c`);
    const geoData: GeocodeResult = await response.json();
    const location = geoData.features[0].geometry.coordinates;

    const newPotty = {
      pottyName,
      pottyAddress,
      pottyRule,
      pottyNotes,
      pottyType,
      latitude: location[1],
      longitude: location[0]
    };
    
    potties.update(current => [...current, newPotty]);

    await fetch('/api/potties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPotty)
    });

    isOpen = false;
  }

  function openDrawer() {
    isOpen = true;
  }

  function closeDrawer() {
    isOpen = false;
  }
</script>

<style>
  .drawer {
    @apply fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-xl transform translate-x-full transition-transform duration-300 ease-in-out;
  }
  .drawer.open {
    @apply translate-x-0;
  }
</style>

<button on:click={openDrawer} class="bg-blue-500 text-white py-2 px-4 rounded">Add Potty</button>

<div class:drawer={isOpen} class:open={isOpen}>
  <button on:click={closeDrawer} class="absolute top-2 right-2 text-black">X</button>
  <form on:submit|preventDefault={handleSubmit} class="p-4 space-y-4">
    <div>
      <label for="pottyName">Potty Name</label>
      <input id="pottyName" type="text" bind:value={pottyName} required class="w-full" />
    </div>
    <div>
      <label for="pottyAddress">Potty Address</label>
      <input id="pottyAddress" type="text" bind:value={pottyAddress} on:input={(e: Event) => fetchSuggestions((e.target as HTMLInputElement).value)} required class="w-full" />
      <ul>
        {#each suggestions as suggestion}
          <li on:click={() => pottyAddress = suggestion.formatted} tabindex="0" on:keydown={(e) => e.key === 'Enter' && (pottyAddress = suggestion.formatted)}>{suggestion.formatted}</li>
        {/each}
      </ul>
    </div>
    <div>
      <label for="pottyRule">Potty Rule</label>
      <select id="pottyRule" bind:value={pottyRule} required class="w-full">
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
      <textarea id="pottyNotes" bind:value={pottyNotes} required class="w-full"></textarea>
    </div>
    <div>
      <label for="pottyType">Potty Type</label>
      <select id="pottyType" bind:value={pottyType} class="w-full">
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
    <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
  </form>
</div>

<script>


export default SlideoutForm