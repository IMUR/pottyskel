<script lang="ts">
  import { writable } from 'svelte/store';
  import { pottyList } from '../utils/stores';
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import type { DrawerSettings } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();

  interface AddressSuggestion {
    formatted: string;
    lat: number;
    lon: number;
  }

  interface PottyAddress {
    formatted: string;
    lat: number;
    lon: number;
  }

  let pottyName = '';
  let pottyAddress: PottyAddress | null = null;
  let pottyRule = '';
  let pottyNotes = '';
  let pottyType = '';

  let errorMessage = '';

  let addressSuggestions = writable<AddressSuggestion[]>([]);
  let selectedAddress: AddressSuggestion | null = null;

  async function fetchAddressSuggestions(query: string) {
    try {
      if (query.length > 0) {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=52e42fd1727343ddb979120e8c9d473c`);
        if (response.ok) {
          const data = await response.json();
          addressSuggestions.set(data.features.map((feature: { properties: { formatted: string, lat: number, lon: number } }) => ({
            formatted: feature.properties.formatted,
            lat: feature.properties.lat,
            lon: feature.properties.lon
          })));
        } else {
          addressSuggestions.set([]);
        }
      } else {
        addressSuggestions.set([]);
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      addressSuggestions.set([]);
    }
  }

  function selectAddress(address: AddressSuggestion) {
    selectedAddress = address;
    pottyAddress = {
      formatted: address.formatted,
      lat: address.lat,
      lon: address.lon
    };
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (!pottyName || !pottyAddress || !pottyRule || !pottyNotes) {
      errorMessage = 'Please fill out all required fields.';
      return;
    }

    try {
      const response = await fetch('/api/potties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pottyName,
          pottyAddress: {
            formatted: selectedAddress?.formatted,
            lat: selectedAddress?.lat,
            lon: selectedAddress?.lon
          },
          pottyRule,
          pottyNotes,
          pottyType,
        }),
      });

      if (response.ok) {
        const newPotty = await response.json();
        pottyList.update((list) => [...list, newPotty]);
        drawerStore.close();
        errorMessage = '';
      } else {
        throw new Error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      errorMessage = 'Failed to submit data. Please try again.';
    }
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    fetchAddressSuggestions(target.value);
  }

  function openDrawer() {
    const drawerSettings: DrawerSettings = {
      id: 'example-1',
      meta: { title: 'Add Potty' }
    };
    drawerStore.open(drawerSettings);
  }
</script>

<button on:click={openDrawer}>Open Drawer</button>

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
        bind:value={pottyAddress?.formatted}
        on:input={handleInput}
        required
      />
      <ul>
        {#each $addressSuggestions as suggestion (suggestion.formatted)}
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
    {#if errorMessage}
      <div class="error">{errorMessage}</div>
    {/if}
    <button type="submit">Submit</button>
  </form>
</div>

<style>
  .error {
    color: red;
  }
  /* Add relevant styling here */
</style>
