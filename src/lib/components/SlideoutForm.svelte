<script lang="ts">
  import { writable } from 'svelte/store';
  import { pottyList } from '../utils/stores';
  import { onMount } from 'svelte';
  import axios from 'axios';

  let pottyName = '';
  let pottyAddress = '';
  let pottyRule = '';
  let pottyNotes = '';
  let pottyType = '';

  let addressSuggestions = writable([]);
  let selectedAddress = null;

  async function fetchAddressSuggestions(query: string) {
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=52e42fd1727343ddb979120e8c9d473c`);
    addressSuggestions.set(response.data.results);
  }

  function selectAddress(address) {
    selectedAddress = address;
    pottyAddress = address.formatted;
  }

  async function handleSubmit() {
    if (pottyName && pottyAddress && pottyRule && pottyNotes) {
      const response = await axios.post('/api/potties', {
        pottyName,
        pottyAddress: selectedAddress,
        pottyRule,
        pottyNotes,
        pottyType
      });
      if (response.status === 200) {
        pottyList.update(list => [...list, response.data]);
      }
    }
  }
</script>

<div>
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="pottyName">Potty Name</label>
      <input type="text" id="pottyName" bind:value={pottyName} required />
    </div>
    <div>
      <label for="pottyAddress">Potty Address</label>
      <input type="text" id="pottyAddress" bind:value={pottyAddress} on:input={(e) => fetchAddressSuggestions(e.target.value)} required />
      <ul>
        {#each $addressSuggestions as suggestion}
          <li on:click={() => selectAddress(suggestion)}>{suggestion.formatted}</li>
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
