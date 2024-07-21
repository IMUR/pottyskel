<script lang="ts">
  import { writable } from 'svelte/store';
  import { getCoordinates, getAutocompleteSuggestions } from '$lib/utils/geoapify';
  import type { Potty } from '$lib/types';

  export let onCloseForm: () => void;

  const initialPotty: Partial<Potty> = {
    pottyName: '',
    pottyAddress: '',
    pottyRule: '',
    pottyNotes: '',
    pottyType: '',
    latitude: undefined,
    longitude: undefined
  };

  const potty = writable<Partial<Potty>>(initialPotty);
  const suggestions = writable<string[]>([]);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const pottyData = $potty;
    if (pottyData.pottyAddress) {
      const coordinates = await getCoordinates(pottyData.pottyAddress);
      pottyData.latitude = coordinates.lat;
      pottyData.longitude = coordinates.lon;
    }
    // Post the potty data to the server or store it locally
    onCloseForm();
  }

  async function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    potty.update(p => ({ ...p, [target.name]: target.value }));
    if (target.name === 'pottyAddress') {
      const results = await getAutocompleteSuggestions(target.value);
      suggestions.set(results);
    }
  }

  function selectSuggestion(suggestion: string) {
    potty.update(p => ({ ...p, pottyAddress: suggestion }));
    suggestions.set([]);
  }
</script>

<form on:submit={handleSubmit} class="space-y-4">
  <label>
    Name
    <input type="text" name="pottyName" on:input={handleInput} bind:value={$potty.pottyName} class="input input-bordered w-full" />
  </label>
  <label>
    Address
    <input type="text" name="pottyAddress" on:input={handleInput} bind:value={$potty.pottyAddress} class="input input-bordered w-full" />
    <ul>
      {#each $suggestions as suggestion}
        <li role="button" tabindex="0" on:click={() => selectSuggestion(suggestion)} on:keydown={(e) => e.key === 'Enter' && selectSuggestion(suggestion)}>
          {suggestion}
        </li>
      {/each}
    </ul>
  </label>
  <label>
    Rule
    <input type="text" name="pottyRule" on:input={handleInput} bind:value={$potty.pottyRule} class="input input-bordered w-full" />
  </label>
  <label>
    Notes
    <input type="text" name="pottyNotes" on:input={handleInput} bind:value={$potty.pottyNotes} class="input input-bordered w-full" />
  </label>
  <label>
    Type
    <input type="text" name="pottyType" on:input={handleInput} bind:value={$potty.pottyType} class="input input-bordered w-full" />
  </label>
  <button type="submit" class="btn btn-primary w-full">Submit</button>
  <button type="button" class="btn w-full" on:click={onCloseForm}>Cancel</button>
</form>
