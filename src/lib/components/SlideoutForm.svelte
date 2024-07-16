<script lang="ts">
  import { writable } from 'svelte/store';

  let isOpen = writable(false);
  let pottyName = writable('');
  let pottyAddress = writable('');
  let pottyRule = writable('');
  let pottyNotes = writable('');
  let suggestions = writable([]);

  function openDrawer() {
    isOpen.set(true);
  }

  function closeDrawer() {
    isOpen.set(false);
  }

  function handleSubmit() {
    // Handle form submission
  }

  function fetchSuggestions(value: string) {
    // Fetch suggestions based on input value
  }
</script>

<style>
  .drawer {
    width: 100%;
    max-width: 400px;
    height: 100%;
    background: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
  }
  .drawer.open {
    transform: translateX(0);
  }
</style>

<button on:click={openDrawer} class="bg-blue-500 text-white py-2 px-4 rounded">Add Potty</button>

<div class:drawer class:open={$isOpen}>
  <button on:click={closeDrawer} class="absolute top-2 right-2 text-black">X</button>
  <form on:submit|preventDefault={handleSubmit} class="p-4 space-y-4">
    <div>
      <label for="pottyName">Potty Name</label>
      <input id="pottyName" type="text" bind:value={$pottyName} required class="w-full" />
    </div>
    <div>
      <label for="pottyAddress">Potty Address</label>
      <input id="pottyAddress" type="text" bind:value={$pottyAddress} on:input={(e: InputEvent) => fetchSuggestions((e.target as HTMLInputElement).value)} required class="w-full" />
      <ul>
        {#each $suggestions as suggestion}
          <li on:click={() => $pottyAddress = suggestion.formatted} tabindex="0" on:keydown={(e) => e.key === 'Enter' && ($pottyAddress = suggestion.formatted)}>{suggestion.formatted}</li>
        {/each}
      </ul>
    </div>
    <div>
      <label for="pottyRule">Potty Rule</label>
      <select id="pottyRule" bind:value={$pottyRule} required class="w-full">
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
      <textarea id="pottyNotes" bind:value={$pottyNotes} required class="w-full"></textarea>
    </div>
  </form>
</div>
