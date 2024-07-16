<script lang="ts">
  import { writable } from 'svelte/store';
  import { submitPotty } from '$lib/utils/geoapify';
  import { getGeoapifySuggestions } from '$lib/utils/geoapify';

  let pottyName = '';
  let pottyAddress = '';
  let pottyRule = '';
  let pottyNotes = '';
  let pottyType = '';

  const errors = writable({});

  const validateForm = () => {
    let validationErrors = {};
    if (!pottyName) validationErrors.pottyName = 'Potty Name is required';
    if (!pottyAddress) validationErrors.pottyAddress = 'Potty Address is required';
    if (!pottyRule) validationErrors.pottyRule = 'Potty Rule is required';
    if (!pottyNotes) validationErrors.pottyNotes = 'Potty Notes are required';
    errors.set(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const submitForm = async () => {
    if (!validateForm()) return;

    const pottyData = { pottyName, pottyAddress, pottyRule, pottyNotes, pottyType };
    const response = await submitPotty(pottyData);
    // Handle response...
  };

  let addressSuggestions = [];

  const handleAddressInput = async (event) => {
    const query = event.target.value;
    const suggestions = await getGeoapifySuggestions(query);
    addressSuggestions = suggestions;
  };
</script>

<div class="drawer">
  <input type="checkbox" id="drawer-toggle" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Main content -->
    <label for="drawer-toggle" class="drawer-button">Open Form</label>
  </div>
  <div class="drawer-side">
    <label for="drawer-toggle" class="drawer-overlay"></label>
    <form class="p-4 w-80 bg-base-100" on:submit|preventDefault={submitForm}>
      <h2 class="text-lg font-bold mb-4">Submit Potty Location</h2>
      <div class="mb-4">
        <label class="block mb-1" for="pottyName">Potty Name</label>
        <input id="pottyName" type="text" bind:value={pottyName} class="input input-bordered w-full" required />
        {$errors.pottyName && <p class="text-red-500">{$errors.pottyName}</p>}
      </div>
      <div class="mb-4">
        <label class="block mb-1" for="pottyAddress">Potty Address</label>
        <input id="pottyAddress" type="text" bind:value={pottyAddress} on:input={handleAddressInput} class="input input-bordered w-full" required />
        {$errors.pottyAddress && <p class="text-red-500">{$errors.pottyAddress}</p>}
        <ul class="bg-white border border-gray-300 mt-2">
          {#each addressSuggestions as suggestion}
            <li class="p-2 cursor-pointer hover:bg-gray-100" on:click={() => pottyAddress = suggestion}>{suggestion}</li>
          {/each}
        </ul>
      </div>
      <div class="mb-4">
        <label class="block mb-1" for="pottyRule">Potty Rule</label>
        <select id="pottyRule" bind:value={pottyRule} class="select select-bordered w-full" required>
          <option value="Door Code">Door Code</option>
          <option value="Free Access">Free Access</option>
          <option value="Ask Staff">Ask Staff</option>
          <option value="Call or Text">Call or Text</option>
          <option value="Self Explanatory">Self Explanatory</option>
          <option value="Physical Key">Physical Key</option>
        </select>
        {$errors.pottyRule && <p class="text-red-500">{$errors.pottyRule}</p>}
      </div>
      <div class="mb-4">
        <label class="block mb-1" for="pottyNotes">Potty Notes</label>
        <textarea id="pottyNotes" bind:value={pottyNotes} class="textarea textarea-bordered w-full" required></textarea>
        {$errors.pottyNotes && <p class="text-red-500">{$errors.pottyNotes}</p>}
      </div>
      <div class="mb-4">
        <label class="block mb-1" for="pottyType">Potty Type</label>
        <select id="pottyType" bind:value={pottyType} class="select select-bordered w-full">
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
      <button type="submit" class="btn btn-primary w-full">Submit</button>
    </form>
  </div>
</div>
