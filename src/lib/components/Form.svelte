<script lang="ts">
  import { writable } from 'svelte/store';
  import { submitPotty } from '$lib/utils/api';
  import { getGeoapifySuggestions } from '$lib/utils/geoapify';

  let pottyName = '';
  let pottyAddress = '';
  let pottyRule = '';
  let pottyNotes = '';
  let pottyType = '';

  const submitForm = async () => {
    const pottyData = { pottyName, pottyAddress, pottyRule, pottyNotes, pottyType };
    const response = await submitPotty(pottyData);
    // Handle response...
  };
</script>

<form on:submit|preventDefault={submitForm}>
  <input type="text" bind:value={pottyName} placeholder="Potty Name" required />
  <input type="text" bind:value={pottyAddress} placeholder="Potty Address" required />
  <select bind:value={pottyRule}>
    <option value="Door Code">Door Code</option>
    <option value="Free Access">Free Access</option>
    <!-- More options... -->
  </select>
  <textarea bind:value={pottyNotes} placeholder="Potty Notes" required></textarea>
  <select bind:value={pottyType}>
    <option value="General">General</option>
    <option value="Supermarket">Supermarket</option>
    <!-- More options... -->
  </select>
  <button type="submit">Submit</button>
</form>
