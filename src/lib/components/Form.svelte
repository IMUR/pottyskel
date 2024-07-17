<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { addPotty } from '$lib/utils/api';
  import { getCoordinates, getAutocompleteSuggestions } from '$lib/utils/geoapify';
  import { getDrawerStore } from '@skeletonlabs/skeleton';
  import type { Potty } from '$lib/types';

  let pottyName: string = '';
  let pottyAddress: string = '';
  let pottyRule: string = '';
  let pottyNotes: string = '';
  let pottyType: string = '';
  let autocompleteSuggestions: string[] = [];
  const dispatch = createEventDispatcher();

  const submitForm = async () => {
    try {
      const coordinates = await getCoordinates(pottyAddress);
      const newPotty: Potty = {
        pottyName,
        pottyAddress,
        pottyRule,
        pottyNotes,
        pottyType,
        latitude: coordinates.lat,
        longitude: coordinates.lon,
      };
      await addPotty(newPotty);
      dispatch('refreshPotties');
      getDrawerStore().close();
    } catch (error) {
      console.error('Error adding potty:', error);
    }
    pottyName = '';
    pottyAddress = '';
    pottyRule = '';
    pottyNotes = '';
    pottyType = '';
    autocompleteSuggestions = [];
  };

  const fetchAutocompleteSuggestions = async () => {
    if (pottyAddress.length > 2) {
      try {
        autocompleteSuggestions = await getAutocompleteSuggestions(pottyAddress);
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        autocompleteSuggestions = [];
      }
    } else {
      autocompleteSuggestions = [];
    }
  };

  const selectSuggestion = (suggestion: string) => {
    pottyAddress = suggestion;
    autocompleteSuggestions = [];
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-container')) {
      autocompleteSuggestions = [];
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  const handleKeyDown = (event: KeyboardEvent, suggestion: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      selectSuggestion(suggestion);
    }
  };
</script>

<form on:submit|preventDefault={submitForm} class="p-4 bg-white rounded shadow-md text-black">
  <div class="mb-4">
    <label for="pottyName" class="block text-gray-700">Potty Name</label>
    <input id="pottyName" bind:value={pottyName} required class="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
  </div>

  <div class="mb-4 relative autocomplete-container">
    <label for="pottyAddress" class="block text-gray-700">Potty Address</label>
    <input id="pottyAddress" bind:value={pottyAddress} on:input={fetchAutocompleteSuggestions} required class="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
    {#if autocompleteSuggestions.length > 0}
      <ul class="absolute bg-white border border-gray-300 w-full mt-1 rounded-md z-10 max-h-48 overflow-y-auto">
        {#each autocompleteSuggestions as suggestion}
          <li 
            on:click={() => selectSuggestion(suggestion)} 
            on:keydown={(event) => handleKeyDown(event, suggestion)} 
            tabindex="0" 
            role="menuitem" 
            class="p-2 hover:bg-gray-200 cursor-pointer"
          >
            {suggestion}
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="mb-4">
    <label for="pottyRule" class="block text-gray-700">Potty Rule</label>
    <select id="pottyRule" bind:value={pottyRule} class="mt-1 p-2 block w-full border border-gray-300 rounded-md">
      <option>Door Code</option>
      <option>Free Access</option>
      <option>Ask Staff</option>
      <option>Call or Text</option>
      <option>Self Explanatory</option>
      <option>Physical Key</option>
    </select>
  </div>

  <div class="mb-4">
    <label for="pottyNotes" class="block text-gray-700">Potty Notes</label>
    <textarea id="pottyNotes" bind:value={pottyNotes} required class="mt-1 p-2 block w-full border border-gray-300 rounded-md"></textarea>
  </div>

  <div class="mb-4">
    <label for="pottyType" class="block text-gray-700">Potty Type</label>
    <select id="pottyType" bind:value={pottyType} class="mt-1 p-2 block w-full border border-gray-300 rounded-md">
      <option>General</option>
      <option>Supermarket</option>
      <option>Hospital</option>
      <option>Restaurant</option>
      <option>Retail Store</option>
      <option>Gas Station</option>
      <option>Movie Theater</option>
      <option>Coffee Shop</option>
      <option>Public Restroom</option>
      <option>Open Season</option>
      <option>Mall</option>
      <option>Hardware Store</option>
      <option>Pharmacy</option>
      <option>Parking Structure</option>
      <option>Hotel</option>
    </select>
  </div>

  <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
</form>
