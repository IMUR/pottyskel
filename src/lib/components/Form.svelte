<script lang="ts">
  import { writable } from 'svelte/store';
  import { addPotty } from '$lib/utils/api';
  import { getCoordinates } from '$lib/utils/geoapify';

  let pottyName: string = '';
  let pottyAddress: string = '';
  let pottyRule: string = 'Free Access';
  let pottyNotes: string = '';
  let pottyType: string = 'General';

  const submitForm = async () => {
    const coordinates = await getCoordinates(pottyAddress);
    await addPotty({
      pottyName,
      pottyAddress,
      pottyRule,
      pottyNotes,
      pottyType,
      latitude: coordinates.lat,
      longitude: coordinates.lon,
    });

    // Reset form
    pottyName = '';
    pottyAddress = '';
    pottyRule = 'Free Access';
    pottyNotes = '';
    pottyType = 'General';
  };
</script>

<form on:submit|preventDefault={submitForm} class="p-4 bg-white rounded shadow-md">
  <div class="mb-4">
    <label for="pottyName" class="block text-gray-700">Potty Name</label>
    <input id="pottyName" bind:value={pottyName} required class="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
  </div>

  <div class="mb-4">
    <label for="pottyAddress" class="block text-gray-700">Potty Address</label>
    <input id="pottyAddress" bind:value={pottyAddress} required class="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
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
