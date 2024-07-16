<script lang="ts">
  import { writable } from 'svelte/store';
  import { potties } from '../utils/stores';

  let pottyName = '';
  let pottyAddress = '';
  let pottyRule = '';
  let pottyNotes = '';
  let pottyType = '';

  async function handleSubmit() {
    const response = await fetch('/api/potties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pottyName, pottyAddress, pottyRule, pottyNotes, pottyType }),
    });

    if (response.ok) {
      const newPotty = await response.json();
      potties.update((current) => [...current, newPotty]);
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" bind:value={pottyName} placeholder="Potty Name" required />
  <input type="text" bind:value={pottyAddress} placeholder="Potty Address" required />
  <select bind:value={pottyRule} required>
    <option value="Door Code">Door Code</option>
    <option value="Free Access">Free Access</option>
    <option value="Ask Staff">Ask Staff</option>
    <option value="Call or Text">Call or Text</option>
    <option value="Self Explanatory">Self Explanatory</option>
    <option value="Physical Key">Physical Key</option>
  </select>
  <textarea bind:value={pottyNotes} placeholder="Potty Notes" required></textarea>
  <select bind:value={pottyType}>
    <option value="General">General</option>
    <option value="Supermarket">Supermarket</option>
    <!-- Add other options here -->
  </select>
  <button type="submit">Submit</button>
</form>